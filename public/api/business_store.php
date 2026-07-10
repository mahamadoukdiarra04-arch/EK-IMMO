<?php
declare(strict_types=1);

require_once __DIR__ . '/business_lib.php';

function ek_store_state_id(): string
{
    return defined('APP_STATE_ID') ? APP_STATE_ID : 'production';
}

function ek_store_json($value): string
{
    return json_encode($value, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) ?: '{}';
}

function ek_store_text($value): string
{
    return is_scalar($value) ? trim((string) $value) : '';
}

function ek_store_hash(string $prefix, $payload): string
{
    return $prefix . '-' . substr(sha1(ek_store_json($payload)), 0, 24);
}

function ek_store_record_id(array $item, array $fields, string $prefix): string
{
    foreach ($fields as $field) {
        $value = ek_store_text($item[$field] ?? '');
        if ($value !== '') {
            return $value;
        }
    }
    return ek_store_hash($prefix, $item);
}

function ek_store_apply_overrides(array $items, array $overrides, array $idFields): array
{
    $result = [];
    foreach ($items as $item) {
        if (!is_array($item)) {
            continue;
        }
        $id = ek_store_record_id($item, $idFields, 'item');
        if (isset($overrides[$id]) && is_array($overrides[$id])) {
            $item = array_replace($item, $overrides[$id]);
        }
        $result[] = $item;
    }
    return $result;
}

function ek_store_insert_rows(PDO $pdo, string $table, array $columns, array $rows): void
{
    if (!$rows) {
        return;
    }

    $quotedColumns = array_map(static fn(string $column): string => "`$column`", $columns);
    $placeholders = array_map(static fn(string $column): string => ':' . $column, $columns);
    $statement = $pdo->prepare(
        "INSERT INTO `$table` (" . implode(', ', $quotedColumns) . ') VALUES (' . implode(', ', $placeholders) . ')'
    );

    foreach ($rows as $row) {
        $payload = [];
        foreach ($columns as $column) {
            $payload[$column] = $row[$column] ?? null;
        }
        $statement->execute($payload);
    }
}

function ek_store_flatten_records($value): array
{
    if (!is_array($value)) {
        return [];
    }
    if (array_keys($value) === range(0, count($value) - 1)) {
        return array_values(array_filter($value, 'is_array'));
    }

    $records = [];
    foreach ($value as $key => $item) {
        if (is_array($item) && array_keys($item) === range(0, count($item) - 1)) {
            foreach ($item as $subItem) {
                if (is_array($subItem)) {
                    $records[] = is_array($subItem) ? array_replace(['linkedId' => (string) $key], $subItem) : $subItem;
                }
            }
            continue;
        }
        if (is_array($item)) {
            $records[] = array_replace(['linkedId' => (string) $key], $item);
        }
    }
    return $records;
}

function ek_store_prospects(array $state): array
{
    return ek_store_apply_overrides(
        ek_business_array($state['createdProspects'] ?? []),
        ek_business_array($state['prospectOverrides'] ?? []),
        ['id', 'name']
    );
}

function ek_store_contracts(array $state): array
{
    return ek_store_apply_overrides(
        ek_business_array($state['generatedContracts'] ?? []),
        ek_business_array($state['contractOverrides'] ?? []),
        ['number', 'id']
    );
}

function ek_store_documents(array $state): array
{
    $sources = [
        'propertyPdfArchives' => 'Fiche bien PDF',
        'propertyDocumentArchives' => 'Document bien',
        'tenantReceiptArchives' => 'Recu locataire',
        'missingDocumentRequests' => 'Document demande',
    ];
    $documents = [];

    foreach ($sources as $key => $type) {
        foreach (ek_store_flatten_records($state[$key] ?? []) as $record) {
            $record['documentType'] = ek_store_text($record['documentType'] ?? '') ?: $type;
            $record['sourceStateKey'] = $key;
            $documents[] = $record;
        }
    }

    return $documents;
}

function ek_store_history_rows(array $state): array
{
    $sources = [
        'propertyHistoryOverrides' => 'property',
        'contractTimelines' => 'contract',
        'paymentHistories' => 'payment',
        'arrearsHistories' => 'arrears',
        'userHistories' => 'user',
        'prospectActivities' => 'prospect',
        'visitHistories' => 'visit',
    ];
    $rows = [];

    foreach ($sources as $key => $entityType) {
        $bucket = ek_business_array($state[$key] ?? []);
        foreach ($bucket as $entityId => $entries) {
            if (!is_array($entries)) {
                continue;
            }
            $sequence = 0;
            foreach ($entries as $entry) {
                if (!is_array($entry)) {
                    continue;
                }
                $sequence++;
                $title = ek_store_text($entry['title'] ?? ($entry['action'] ?? ($entry[0] ?? 'Historique')));
                $detail = ek_store_text($entry['detail'] ?? ($entry['comment'] ?? ($entry[1] ?? '')));
                $eventDate = ek_store_text($entry['date'] ?? ($entry['createdAt'] ?? ($entry[2] ?? '')));
                $userName = ek_store_text($entry['user'] ?? ($entry['agent'] ?? ''));
                $payload = [
                    'source' => $key,
                    'entityType' => $entityType,
                    'entityId' => (string) $entityId,
                    'sequence' => $sequence,
                    'entry' => $entry,
                ];
                $rows[] = [
                    'history_id' => ek_store_hash('hist', $payload),
                    'entity_type' => $entityType,
                    'entity_id' => (string) $entityId,
                    'title' => $title,
                    'detail' => $detail,
                    'event_date' => $eventDate,
                    'user_name' => $userName,
                    'payload_json' => ek_store_json($payload),
                ];
            }
        }
    }

    return $rows;
}

function ek_sync_business_state(PDO $pdo, array $state, int $revision): void
{
    $stateId = ek_store_state_id();
    $ownTransaction = !$pdo->inTransaction();

    if ($ownTransaction) {
        $pdo->beginTransaction();
    }

    try {
        $tables = [
            'ekimmo_properties',
            'ekimmo_clients',
            'ekimmo_contracts',
            'ekimmo_payments',
            'ekimmo_charges',
            'ekimmo_documents',
            'ekimmo_histories',
        ];
        foreach ($tables as $table) {
            $delete = $pdo->prepare("DELETE FROM `$table` WHERE state_id = :state_id");
            $delete->execute(['state_id' => $stateId]);
        }

        $properties = ek_business_apply_property_state($state);
        $owners = ek_business_apply_owner_state($state);
        $tenants = ek_business_apply_tenant_state($state);
        $prospects = ek_store_prospects($state);
        $contracts = ek_store_contracts($state);
        $payments = ek_business_normalized_payments($state, $properties, $tenants);
        $charges = ek_business_charges($state);
        $documents = ek_store_documents($state);
        $histories = ek_store_history_rows($state);

        $propertyRows = [];
        foreach ($properties as $property) {
            if (!is_array($property)) {
                continue;
            }
            $code = ek_store_record_id($property, ['code', 'id', 'name'], 'property');
            $propertyRows[] = [
                'state_id' => $stateId,
                'code' => $code,
                'name' => ek_store_text($property['name'] ?? ''),
                'property_type' => ek_store_text($property['type'] ?? ''),
                'status' => ek_store_text($property['status'] ?? ''),
                'owner_name' => ek_store_text($property['owner'] ?? ''),
                'tenant_name' => ek_store_text($property['tenant'] ?? ''),
                'district' => ek_store_text($property['district'] ?? ''),
                'address' => ek_store_text($property['address'] ?? ''),
                'financial_mode' => ek_store_text($property['financialMode'] ?? ''),
                'rent_amount' => ek_business_money_to_int($property['price'] ?? 0),
                'sale_amount' => ek_business_money_to_int($property['salePrice'] ?? 0),
                'deposit_amount' => ek_business_money_to_int($property['deposit'] ?? 0),
                'archived' => !empty($property['archived']) ? 1 : 0,
                'payload_json' => ek_store_json($property),
            ];
        }
        ek_store_insert_rows($pdo, 'ekimmo_properties', [
            'state_id', 'code', 'name', 'property_type', 'status', 'owner_name', 'tenant_name', 'district', 'address',
            'financial_mode', 'rent_amount', 'sale_amount', 'deposit_amount', 'archived', 'payload_json',
        ], $propertyRows);

        $clientRows = [];
        foreach ([['owner', $owners], ['tenant', $tenants], ['prospect', $prospects]] as [$clientType, $items]) {
            foreach ($items as $item) {
                if (!is_array($item)) {
                    continue;
                }
                $clientRows[] = [
                    'state_id' => $stateId,
                    'client_id' => $clientType . ':' . ek_store_record_id($item, ['id', 'name', 'email', 'phone'], 'client'),
                    'client_type' => $clientType,
                    'name' => ek_store_text($item['name'] ?? ''),
                    'phone' => ek_store_text($item['phone'] ?? ''),
                    'email' => ek_store_text($item['email'] ?? ''),
                    'status' => ek_store_text($item['status'] ?? ($item['paymentStatus'] ?? '')),
                    'linked_property' => ek_store_text($item['property'] ?? ($item['need'] ?? '')),
                    'payload_json' => ek_store_json($item),
                ];
            }
        }
        ek_store_insert_rows($pdo, 'ekimmo_clients', [
            'state_id', 'client_id', 'client_type', 'name', 'phone', 'email', 'status', 'linked_property', 'payload_json',
        ], $clientRows);

        $contractRows = [];
        foreach ($contracts as $contract) {
            if (!is_array($contract)) {
                continue;
            }
            $contractRows[] = [
                'state_id' => $stateId,
                'contract_id' => ek_store_record_id($contract, ['number', 'id'], 'contract'),
                'contract_number' => ek_store_text($contract['number'] ?? ''),
                'contract_type' => ek_store_text($contract['type'] ?? ''),
                'status' => ek_store_text($contract['status'] ?? ''),
                'property_name' => ek_store_text($contract['property'] ?? ''),
                'owner_name' => ek_store_text($contract['owner'] ?? ''),
                'client_name' => ek_store_text($contract['client'] ?? ($contract['tenant'] ?? '')),
                'start_date' => ek_store_text($contract['start'] ?? ''),
                'end_date' => ek_store_text($contract['end'] ?? ''),
                'amount' => ek_business_money_to_int($contract['amount'] ?? 0),
                'deposit_amount' => ek_business_money_to_int($contract['deposit'] ?? 0),
                'commission_rule' => ek_store_text($contract['commission'] ?? ($contract['commissionRate'] ?? '')),
                'payload_json' => ek_store_json($contract),
            ];
        }
        ek_store_insert_rows($pdo, 'ekimmo_contracts', [
            'state_id', 'contract_id', 'contract_number', 'contract_type', 'status', 'property_name', 'owner_name',
            'client_name', 'start_date', 'end_date', 'amount', 'deposit_amount', 'commission_rule', 'payload_json',
        ], $contractRows);

        $paymentRows = [];
        foreach ($payments as $payment) {
            if (!is_array($payment)) {
                continue;
            }
            $paymentRows[] = [
                'state_id' => $stateId,
                'payment_id' => ek_store_record_id($payment, ['reference', 'id'], 'payment'),
                'reference' => ek_store_text($payment['reference'] ?? ''),
                'period_label' => ek_store_text($payment['period'] ?? ''),
                'tenant_name' => ek_store_text($payment['tenant'] ?? ''),
                'property_name' => ek_store_text($payment['property'] ?? ''),
                'owner_name' => ek_store_text($payment['owner'] ?? ''),
                'expected_amount' => ek_business_money_to_int($payment['expected'] ?? ($payment['due'] ?? 0)),
                'paid_amount' => ek_business_money_to_int($payment['paid'] ?? 0),
                'balance_amount' => ek_business_money_to_int($payment['balance'] ?? 0),
                'status' => ek_store_text($payment['status'] ?? ''),
                'payment_date' => ek_store_text($payment['date'] ?? ''),
                'payload_json' => ek_store_json($payment),
            ];
        }
        ek_store_insert_rows($pdo, 'ekimmo_payments', [
            'state_id', 'payment_id', 'reference', 'period_label', 'tenant_name', 'property_name', 'owner_name',
            'expected_amount', 'paid_amount', 'balance_amount', 'status', 'payment_date', 'payload_json',
        ], $paymentRows);

        $chargeRows = [];
        foreach ($charges as $charge) {
            if (!is_array($charge)) {
                continue;
            }
            $chargeRows[] = [
                'state_id' => $stateId,
                'charge_id' => ek_business_charge_key($charge),
                'reference' => ek_store_text($charge['reference'] ?? ($charge['id'] ?? '')),
                'charge_type' => ek_store_text($charge['type'] ?? ''),
                'status' => ek_store_text($charge['status'] ?? ''),
                'property_name' => ek_store_text($charge['property'] ?? ''),
                'owner_name' => ek_store_text($charge['owner'] ?? ''),
                'tenant_name' => ek_store_text($charge['tenant'] ?? ''),
                'amount' => ek_business_money_to_int($charge['amount'] ?? 0),
                'payer' => ek_store_text($charge['payer'] ?? ''),
                'charge_date' => ek_store_text($charge['date'] ?? ''),
                'payload_json' => ek_store_json($charge),
            ];
        }
        ek_store_insert_rows($pdo, 'ekimmo_charges', [
            'state_id', 'charge_id', 'reference', 'charge_type', 'status', 'property_name', 'owner_name',
            'tenant_name', 'amount', 'payer', 'charge_date', 'payload_json',
        ], $chargeRows);

        $documentRows = [];
        foreach ($documents as $document) {
            if (!is_array($document)) {
                continue;
            }
            $documentRows[] = [
                'state_id' => $stateId,
                'document_id' => ek_store_record_id($document, ['id', 'reference', 'fileName', 'title'], 'document'),
                'document_type' => ek_store_text($document['documentType'] ?? ($document['type'] ?? '')),
                'category' => ek_store_text($document['category'] ?? ''),
                'title' => ek_store_text($document['title'] ?? ($document['name'] ?? '')),
                'reference' => ek_store_text($document['reference'] ?? ''),
                'linked_type' => ek_store_text($document['linkedType'] ?? ($document['sourceStateKey'] ?? '')),
                'linked_id' => ek_store_text($document['linkedId'] ?? ($document['propertyCode'] ?? ($document['tenantId'] ?? ''))),
                'status' => ek_store_text($document['status'] ?? ''),
                'file_name' => ek_store_text($document['fileName'] ?? ($document['originalName'] ?? '')),
                'file_url' => ek_store_text($document['fileUrl'] ?? ($document['url'] ?? '')),
                'payload_json' => ek_store_json($document),
            ];
        }
        ek_store_insert_rows($pdo, 'ekimmo_documents', [
            'state_id', 'document_id', 'document_type', 'category', 'title', 'reference', 'linked_type', 'linked_id',
            'status', 'file_name', 'file_url', 'payload_json',
        ], $documentRows);

        $historyRows = array_map(static function (array $history) use ($stateId): array {
            return array_replace(['state_id' => $stateId], $history);
        }, $histories);
        ek_store_insert_rows($pdo, 'ekimmo_histories', [
            'state_id', 'history_id', 'entity_type', 'entity_id', 'title', 'detail', 'event_date', 'user_name', 'payload_json',
        ], $historyRows);

        $sync = $pdo->prepare('
            INSERT INTO ekimmo_business_sync (state_id, revision)
            VALUES (:state_id, :revision)
            ON DUPLICATE KEY UPDATE revision = VALUES(revision)
        ');
        $sync->execute(['state_id' => $stateId, 'revision' => max(0, $revision)]);

        if ($ownTransaction) {
            $pdo->commit();
        }
    } catch (Throwable $exception) {
        if ($ownTransaction) {
            $pdo->rollBack();
        }
        throw $exception;
    }
}

function ek_sync_business_state_if_needed(PDO $pdo, array $state, int $revision): void
{
    if ($revision <= 0) {
        return;
    }

    $statement = $pdo->prepare('SELECT revision FROM ekimmo_business_sync WHERE state_id = :state_id LIMIT 1');
    $statement->execute(['state_id' => ek_store_state_id()]);
    $row = $statement->fetch();
    if ($row && (int) ($row['revision'] ?? 0) === $revision) {
        return;
    }

    ek_sync_business_state($pdo, $state, $revision);
}

function ek_business_store_counts(PDO $pdo): array
{
    $stateId = ek_store_state_id();
    $tables = [
        'properties' => 'ekimmo_properties',
        'clients' => 'ekimmo_clients',
        'contracts' => 'ekimmo_contracts',
        'payments' => 'ekimmo_payments',
        'charges' => 'ekimmo_charges',
        'documents' => 'ekimmo_documents',
        'histories' => 'ekimmo_histories',
    ];
    $counts = [];
    foreach ($tables as $key => $table) {
        $statement = $pdo->prepare("SELECT COUNT(*) AS count_rows FROM `$table` WHERE state_id = :state_id");
        $statement->execute(['state_id' => $stateId]);
        $counts[$key] = (int) ($statement->fetch()['count_rows'] ?? 0);
    }
    return $counts;
}
