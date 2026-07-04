<?php
declare(strict_types=1);

require_once __DIR__ . '/db.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

function empty_state(): array
{
    return [
        'schemaVersion' => 1,
        'createdProperties' => [],
        'propertyOverrides' => new stdClass(),
        'createdOwners' => [],
        'ownerOverrides' => new stdClass(),
        'ownerReversements' => [],
        'createdTenants' => [],
        'tenantOverrides' => new stdClass(),
        'tenantRelances' => [],
        'tenantReceiptArchives' => [],
        'createdProspects' => [],
        'prospectOverrides' => new stdClass(),
        'prospectProposals' => new stdClass(),
        'prospectActivities' => new stdClass(),
        'scheduledProspectVisits' => [],
        'prospectConversions' => new stdClass(),
        'visitOverrides' => new stdClass(),
        'visitHistories' => new stdClass(),
        'generatedContracts' => [],
        'contractOverrides' => new stdClass(),
        'contractTimelines' => new stdClass(),
        'contractDeadlines' => new stdClass(),
        'recordedPayments' => [],
        'paymentHistories' => new stdClass(),
        'paymentProofs' => new stdClass(),
        'arrearsStatusOverrides' => new stdClass(),
        'arrearsPromises' => new stdClass(),
        'arrearsHistories' => new stdClass(),
        'commissionOverrides' => new stdClass(),
        'scheduledMaintenances' => [],
        'maintenanceCharges' => [],
        'maintenanceOverrides' => new stdClass(),
        'reversalOverrides' => new stdClass(),
        'chargeOverrides' => new stdClass(),
        'propertyHistoryOverrides' => new stdClass(),
        'missingDocumentRequests' => [],
        'propertyPdfArchives' => [],
        'propertyDocumentArchives' => [],
        'archivedProperties' => new stdClass(),
        'createdUsers' => [],
        'userOverrides' => new stdClass(),
        'userHistories' => new stdClass(),
    ];
}

function read_state(PDO $pdo): array
{
    $statement = $pdo->prepare('SELECT payload, revision, updated_at FROM ekimmo_app_state WHERE id = :id');
    $statement->execute(['id' => APP_STATE_ID]);
    $row = $statement->fetch();

    if (!$row) {
        return [
            'data' => empty_state(),
            'revision' => 0,
            'updated_at' => null,
        ];
    }

    $decoded = json_decode((string) $row['payload'], true);
    return [
        'data' => is_array($decoded) ? $decoded : empty_state(),
        'revision' => (int) $row['revision'],
        'updated_at' => $row['updated_at'],
    ];
}

function item_key(array $item): ?string
{
    foreach (['id', 'code', 'reference', 'number', 'receipt', 'name'] as $field) {
        if (isset($item[$field]) && $item[$field] !== '') {
            return $field . ':' . (string) $item[$field];
        }
    }

    return null;
}

function is_list_array(array $value): bool
{
    return array_keys($value) === range(0, count($value) - 1);
}

function merge_lists(array $current, array $incoming): array
{
    $merged = [];
    $positions = [];

    foreach ($current as $item) {
        if (is_array($item) && ($key = item_key($item))) {
            $positions[$key] = count($merged);
        }
        $merged[] = $item;
    }

    foreach ($incoming as $item) {
        if (is_array($item) && ($key = item_key($item))) {
            if (array_key_exists($key, $positions)) {
                $position = $positions[$key];
                $existing = is_array($merged[$position]) ? $merged[$position] : [];
                $merged[$position] = merge_values($existing, $item);
                continue;
            }
            $positions[$key] = count($merged);
            $merged[] = $item;
            continue;
        }

        $encoded = json_encode($item, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        $exists = false;
        foreach ($merged as $existing) {
            if (json_encode($existing, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) === $encoded) {
                $exists = true;
                break;
            }
        }
        if (!$exists) {
            $merged[] = $item;
        }
    }

    return $merged;
}

function merge_values($current, $incoming)
{
    if (is_array($current) && is_array($incoming)) {
        if (is_list_array($current) || is_list_array($incoming)) {
            return merge_lists(is_list_array($current) ? $current : [], is_list_array($incoming) ? $incoming : []);
        }

        $merged = $current;
        foreach ($incoming as $key => $value) {
            $merged[$key] = array_key_exists($key, $merged) ? merge_values($merged[$key], $value) : $value;
        }
        return $merged;
    }

    return $incoming;
}

function persist_state(PDO $pdo, array $data, int $clientRevision): array
{
    $pdo->beginTransaction();
    try {
        $statement = $pdo->prepare('SELECT payload, revision FROM ekimmo_app_state WHERE id = :id FOR UPDATE');
        $statement->execute(['id' => APP_STATE_ID]);
        $row = $statement->fetch();

        if (!$row) {
            $payload = json_encode(merge_values(empty_state(), $data), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
            $insert = $pdo->prepare('INSERT INTO ekimmo_app_state (id, payload, revision) VALUES (:id, :payload, 1)');
            $insert->execute(['id' => APP_STATE_ID, 'payload' => $payload]);
            $pdo->commit();
            return ['data' => json_decode($payload, true), 'revision' => 1, 'merged' => false];
        }

        $currentRevision = (int) $row['revision'];
        $currentData = json_decode((string) $row['payload'], true);
        if (!is_array($currentData)) {
            $currentData = empty_state();
        }

        $merged = $clientRevision > 0 && $clientRevision < $currentRevision
            ? merge_values($currentData, $data)
            : merge_values(empty_state(), $data);

        $nextRevision = $currentRevision + 1;
        $payload = json_encode($merged, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        $update = $pdo->prepare('UPDATE ekimmo_app_state SET payload = :payload, revision = :revision WHERE id = :id');
        $update->execute(['payload' => $payload, 'revision' => $nextRevision, 'id' => APP_STATE_ID]);
        $pdo->commit();

        return [
            'data' => json_decode($payload, true),
            'revision' => $nextRevision,
            'merged' => $clientRevision > 0 && $clientRevision < $currentRevision,
        ];
    } catch (Throwable $exception) {
        $pdo->rollBack();
        json_response([
            'ok' => false,
            'code' => 'state_save_failed',
            'message' => 'Enregistrement impossible.',
        ], 500);
    }
}

$pdo = db();
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

if ($method === 'GET') {
    $state = read_state($pdo);
    json_response([
        'ok' => true,
        'data' => merge_values(empty_state(), $state['data']),
        'revision' => $state['revision'],
        'updated_at' => $state['updated_at'],
    ]);
}

if ($method === 'POST' || $method === 'PUT') {
    $raw = file_get_contents('php://input') ?: '{}';
    $body = json_decode($raw, true);
    if (!is_array($body) || !isset($body['data']) || !is_array($body['data'])) {
        json_response([
            'ok' => false,
            'code' => 'invalid_payload',
            'message' => 'Payload invalide.',
        ], 400);
    }

    $result = persist_state($pdo, $body['data'], (int) ($body['revision'] ?? 0));
    json_response([
        'ok' => true,
        'data' => $result['data'],
        'revision' => $result['revision'],
        'merged' => $result['merged'],
    ]);
}

json_response([
    'ok' => false,
    'code' => 'method_not_allowed',
    'message' => 'Méthode non autorisée.',
], 405);
