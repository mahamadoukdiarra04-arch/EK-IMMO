<?php
declare(strict_types=1);

function ek_business_array($value): array
{
    return is_array($value) ? $value : [];
}

function ek_business_text($value): string
{
    return is_scalar($value) ? trim((string) $value) : '';
}

function ek_business_normalize(string $value): string
{
    $value = str_replace(["\xc2\xa0", "\xe2\x80\xaf"], ' ', $value);
    $converted = @iconv('UTF-8', 'ASCII//TRANSLIT//IGNORE', $value);
    $normalized = is_string($converted) ? $converted : $value;
    return strtolower(trim(preg_replace('/\s+/', ' ', $normalized) ?? $normalized));
}

function ek_business_money_to_int($value): int
{
    if (is_int($value)) {
        return max(0, $value);
    }
    if (is_float($value)) {
        return max(0, (int) round($value));
    }
    $digits = preg_replace('/[^\d]/', '', (string) $value);
    return $digits === '' ? 0 : (int) $digits;
}

function ek_business_format_fcfa(int $amount): string
{
    return number_format(max(0, $amount), 0, ',', ' ') . ' FCFA';
}

function ek_business_get(array $item, string $key, $default = '')
{
    return array_key_exists($key, $item) ? $item[$key] : $default;
}

function ek_business_period_label(): string
{
    $months = [
        1 => 'Janvier',
        2 => 'Fevrier',
        3 => 'Mars',
        4 => 'Avril',
        5 => 'Mai',
        6 => 'Juin',
        7 => 'Juillet',
        8 => 'Aout',
        9 => 'Septembre',
        10 => 'Octobre',
        11 => 'Novembre',
        12 => 'Decembre',
    ];
    $month = (int) date('n');
    return ($months[$month] ?? 'Mois en cours') . ' ' . date('Y');
}

function ek_business_index_by_name(array $items): array
{
    $index = [];
    foreach ($items as $item) {
        if (!is_array($item)) {
            continue;
        }
        $name = ek_business_text($item['name'] ?? '');
        if ($name !== '') {
            $index[ek_business_normalize($name)] = $item;
        }
    }
    return $index;
}

function ek_business_apply_property_state(array $state): array
{
    $properties = ek_business_array($state['createdProperties'] ?? []);
    $overrides = ek_business_array($state['propertyOverrides'] ?? []);
    $archives = ek_business_array($state['archivedProperties'] ?? []);
    $result = [];

    foreach ($properties as $property) {
        if (!is_array($property)) {
            continue;
        }
        $code = ek_business_text($property['code'] ?? '');
        if ($code !== '' && isset($overrides[$code]) && is_array($overrides[$code])) {
            $property = array_replace($property, $overrides[$code]);
        }
        if ($code !== '' && isset($archives[$code])) {
            $property['status'] = 'Archive';
            $property['archived'] = true;
            if (is_array($archives[$code])) {
                $property['archiveReason'] = ek_business_text($archives[$code]['reason'] ?? '');
                $property['archiveDate'] = ek_business_text($archives[$code]['date'] ?? '');
            }
        }
        $result[] = $property;
    }

    return $result;
}

function ek_business_active_properties(array $state): array
{
    return array_values(array_filter(
        ek_business_apply_property_state($state),
        static fn(array $property): bool => empty($property['archived'])
    ));
}

function ek_business_apply_owner_state(array $state): array
{
    $owners = ek_business_array($state['createdOwners'] ?? []);
    $overrides = ek_business_array($state['ownerOverrides'] ?? []);
    $result = [];

    foreach ($owners as $owner) {
        if (!is_array($owner)) {
            continue;
        }
        $id = ek_business_text($owner['id'] ?? '');
        if ($id !== '' && isset($overrides[$id]) && is_array($overrides[$id])) {
            $owner = array_replace($owner, $overrides[$id]);
        }
        $result[] = $owner;
    }

    return $result;
}

function ek_business_apply_tenant_state(array $state): array
{
    $tenants = ek_business_array($state['createdTenants'] ?? []);
    $overrides = ek_business_array($state['tenantOverrides'] ?? []);
    $result = [];

    foreach ($tenants as $tenant) {
        if (!is_array($tenant)) {
            continue;
        }
        $id = ek_business_text($tenant['id'] ?? '');
        if ($id !== '' && isset($overrides[$id]) && is_array($overrides[$id])) {
            $tenant = array_replace($tenant, $overrides[$id]);
        }
        $result[] = $tenant;
    }

    return $result;
}

function ek_business_property_by_name(array $properties, string $name): ?array
{
    $needle = ek_business_normalize($name);
    foreach ($properties as $property) {
        if (ek_business_normalize(ek_business_text($property['name'] ?? '')) === $needle) {
            return $property;
        }
    }
    return null;
}

function ek_business_tenant_by_name(array $tenants, string $name): ?array
{
    $needle = ek_business_normalize($name);
    foreach ($tenants as $tenant) {
        if (ek_business_normalize(ek_business_text($tenant['name'] ?? '')) === $needle) {
            return $tenant;
        }
    }
    return null;
}

function ek_business_is_agency_collected(?array $property): bool
{
    if (!$property) {
        return false;
    }
    $mode = ek_business_normalize(ek_business_text($property['financialMode'] ?? ''));
    $status = ek_business_normalize(ek_business_text($property['status'] ?? ''));
    if (str_contains($mode, 'direct') && str_contains($mode, 'propr')) {
        return false;
    }
    if (str_contains($mode, 'entretien seul') || str_contains($status, 'entretien seul')) {
        return false;
    }
    return true;
}

function ek_business_is_rent_bearing(array $property): bool
{
    if (!ek_business_is_agency_collected($property)) {
        return false;
    }
    $status = ek_business_normalize(ek_business_text($property['status'] ?? ''));
    $tenant = ek_business_normalize(ek_business_text($property['tenant'] ?? ''));
    $hasTenant = $tenant !== '' && !in_array($tenant, ['libre', 'n/a', 'non applicable', 'aucun'], true);
    return $hasTenant && (
        str_contains($status, 'lou') ||
        str_contains($status, 'occupe') ||
        str_contains($status, 'gestion multi')
    );
}

function ek_business_expected_rent(array $property, array $tenants): int
{
    $tenant = ek_business_tenant_by_name($tenants, ek_business_text($property['tenant'] ?? ''));
    $tenantRent = $tenant ? ek_business_money_to_int($tenant['rent'] ?? 0) : 0;
    return $tenantRent > 0 ? $tenantRent : ek_business_money_to_int($property['price'] ?? 0);
}

function ek_business_payment_key(array $item): string
{
    return ek_business_normalize(
        ek_business_text($item['period'] ?? '') . '|' .
        ek_business_text($item['tenant'] ?? '') . '|' .
        ek_business_text($item['property'] ?? '')
    );
}

function ek_business_payment_status(int $expected, int $paid): string
{
    if ($expected <= 0 && $paid <= 0) {
        return 'À vérifier';
    }
    if ($paid >= $expected && $expected > 0) {
        return 'Payé';
    }
    if ($paid > 0) {
        return 'Partiel';
    }
    return 'En retard';
}

function ek_business_normalized_payments(array $state, array $properties, array $tenants): array
{
    $payments = ek_business_array($state['recordedPayments'] ?? []);
    $result = [];

    foreach ($payments as $payment) {
        if (!is_array($payment)) {
            continue;
        }

        $propertyName = ek_business_text($payment['property'] ?? '');
        $property = ek_business_property_by_name($properties, $propertyName);
        $tenantName = ek_business_text($payment['tenant'] ?? ($property['tenant'] ?? ''));
        $period = ek_business_text($payment['period'] ?? '') ?: ek_business_period_label();
        $expected = $property ? ek_business_expected_rent($property, $tenants) : 0;
        $declaredDue = ek_business_money_to_int($payment['due'] ?? ($payment['expected'] ?? 0));
        if ($expected <= 0) {
            $expected = $declaredDue;
        }
        $paid = ek_business_money_to_int($payment['paid'] ?? ($payment['amountNow'] ?? 0));
        $balance = max($expected - $paid, 0);
        $status = ek_business_payment_status($expected, $paid);
        $valid = (bool) ($property && ek_business_is_agency_collected($property));
        $warning = '';
        if (!$property) {
            $warning = 'Bien introuvable côté serveur.';
        } elseif (!$valid) {
            $warning = 'Paiement agence non autorisé pour ce mode financier.';
        }

        $result[] = array_replace($payment, [
            'period' => $period,
            'tenant' => $tenantName,
            'property' => $propertyName,
            'owner' => ek_business_text($payment['owner'] ?? ($property['owner'] ?? '')),
            'due' => ek_business_format_fcfa($expected),
            'expected' => ek_business_format_fcfa($expected),
            'paid' => ek_business_format_fcfa($paid),
            'balance' => ek_business_format_fcfa($balance),
            'status' => $status,
            'dueValue' => $expected,
            'paidValue' => $paid,
            'balanceValue' => $balance,
            'serverValid' => $valid,
            'serverWarning' => $warning,
        ]);
    }

    return $result;
}

function ek_business_rent_rows(array $properties, array $tenants, array $payments): array
{
    $rows = [];
    $period = ek_business_period_label();

    foreach ($properties as $property) {
        if (!ek_business_is_rent_bearing($property)) {
            continue;
        }
        $tenantName = ek_business_text($property['tenant'] ?? '');
        $expected = ek_business_expected_rent($property, $tenants);
        if ($expected <= 0) {
            continue;
        }
        $propertyName = ek_business_text($property['name'] ?? '');
        $relatedPayments = array_values(array_filter($payments, static function (array $payment) use ($propertyName, $tenantName): bool {
            return ek_business_normalize(ek_business_text($payment['property'] ?? '')) === ek_business_normalize($propertyName)
                && ek_business_normalize(ek_business_text($payment['tenant'] ?? '')) === ek_business_normalize($tenantName);
        }));
        $paid = array_reduce($relatedPayments, static fn(int $sum, array $payment): int => $sum + ek_business_money_to_int($payment['paid'] ?? 0), 0);
        $rowPeriod = ek_business_text($relatedPayments[0]['period'] ?? '') ?: $period;
        $balance = max($expected - $paid, 0);

        $rows[] = [
            'period' => $rowPeriod,
            'tenant' => $tenantName,
            'property' => $propertyName,
            'owner' => ek_business_text($property['owner'] ?? ''),
            'expected' => ek_business_format_fcfa($expected),
            'paid' => ek_business_format_fcfa($paid),
            'balance' => ek_business_format_fcfa($balance),
            'status' => ek_business_payment_status($expected, $paid),
            'expectedValue' => $expected,
            'paidValue' => $paid,
            'balanceValue' => $balance,
        ];
    }

    return $rows;
}

function ek_business_charge_key(array $charge): string
{
    $id = ek_business_text($charge['id'] ?? '');
    if ($id !== '') {
        return $id;
    }
    return ek_business_normalize(
        ek_business_text($charge['property'] ?? 'bien') . '-' .
        ek_business_text($charge['type'] ?? 'charge') . '-' .
        ek_business_text($charge['date'] ?? 'date')
    );
}

function ek_business_charges(array $state): array
{
    $charges = ek_business_array($state['maintenanceCharges'] ?? []);
    $overrides = ek_business_array($state['chargeOverrides'] ?? []);
    $result = [];

    foreach ($charges as $charge) {
        if (!is_array($charge)) {
            continue;
        }
        $key = ek_business_charge_key($charge);
        if (isset($overrides[$key]) && is_array($overrides[$key])) {
            $charge = array_replace($charge, $overrides[$key]);
        }
        $amount = ek_business_money_to_int($charge['amount'] ?? 0);
        $result[] = array_replace($charge, [
            'amount' => ek_business_format_fcfa($amount),
            'amountValue' => $amount,
            'status' => ek_business_text($charge['status'] ?? '') ?: 'À valider',
            'payer' => ek_business_text($charge['payer'] ?? '') ?: 'À déterminer',
        ]);
    }

    return $result;
}

function ek_business_owner_deductible_charge(array $charge): bool
{
    $payer = ek_business_normalize(ek_business_text($charge['payer'] ?? ''));
    $status = ek_business_normalize(ek_business_text($charge['status'] ?? ''));
    return str_contains($payer, 'propr')
        && (
            str_contains($status, 'valid') ||
            str_contains($status, 'pay') ||
            str_contains($status, 'deduire') ||
            str_contains($status, 'deduite')
        );
}

function ek_business_commission_amount($rule, int $collected): int
{
    $text = ek_business_text($rule);
    if (preg_match('/(\d+(?:[.,]\d+)?)\s*%/', $text, $matches)) {
        return (int) round($collected * ((float) str_replace(',', '.', $matches[1])) / 100);
    }
    $fixed = ek_business_money_to_int($text);
    return $fixed > 0 ? $fixed : (int) round($collected * 0.05);
}

function ek_business_commission_key(array $commission): string
{
    $id = ek_business_text($commission['id'] ?? '');
    if ($id !== '') {
        return $id;
    }
    return ek_business_normalize(
        ek_business_text($commission['operation'] ?? 'commission') . '-' .
        ek_business_text($commission['property'] ?? 'bien') . '-' .
        ek_business_text($commission['owner'] ?? 'proprietaire')
    );
}

function ek_business_commission_type(array $commission): string
{
    $type = ek_business_text($commission['commissionType'] ?? '');
    if ($type !== '') {
        return $type;
    }
    $text = ek_business_normalize(ek_business_text($commission['operation'] ?? '') . ' ' . ek_business_text($commission['calculationBase'] ?? ''));
    if (str_contains($text, 'vente')) {
        return 'Vente';
    }
    if (str_contains($text, 'mandat') || str_contains($text, 'premier loyer') || str_contains($text, 'entree')) {
        return 'Entrée locataire';
    }
    return 'Gestion récurrente';
}

function ek_business_commission_payer(array $commission): string
{
    $payer = ek_business_text($commission['commissionPayer'] ?? ($commission['payer'] ?? ''));
    if ($payer === 'Propriétaire' || $payer === 'Locataire') {
        return $payer;
    }
    return ek_business_commission_type($commission) === 'Entrée locataire' ? 'Locataire' : 'Propriétaire';
}

function ek_business_commission_collection_status(array $commission): string
{
    $status = ek_business_text($commission['collectionStatus'] ?? '');
    if ($status !== '') {
        return $status;
    }
    if (!empty($commission['collectionConfirmed']) || !empty($commission['encaissementConfirmed'])) {
        return 'Encaissée';
    }
    $text = ek_business_normalize(ek_business_text($commission['status'] ?? ''));
    foreach (['encaissee', 'integree', 'associee', 'payee', 'validee'] as $word) {
        if (str_contains($text, $word)) {
            return 'Encaissée';
        }
    }
    return 'À encaisser';
}

function ek_business_commission_collected(array $commission): bool
{
    return ek_business_commission_collection_status($commission) === 'Encaissée';
}

function ek_business_commission_owner_charged(array $commission): bool
{
    return ek_business_commission_payer($commission) === 'Propriétaire';
}

function ek_business_apply_commission_business_fields(array $commission): array
{
    $payer = ek_business_commission_payer($commission);
    $status = ek_business_commission_collection_status($commission);
    $baseAmount = ek_business_money_to_int($commission['collected'] ?? 0);
    $commissionAmount = ek_business_money_to_int($commission['commission'] ?? 0);
    $ownerNet = $payer === 'Propriétaire' ? max($baseAmount - $commissionAmount, 0) : $baseAmount;

    $commission['commissionPayer'] = $payer;
    $commission['collectionStatus'] = $status;
    $commission['collectionConfirmed'] = $status === 'Encaissée';
    $commission['collectionMode'] = ek_business_text($commission['collectionMode'] ?? '') ?: ($payer === 'Propriétaire' ? 'Déduction reversement' : '');
    $commission['ownerNet'] = ek_business_format_fcfa($ownerNet);
    $commission['ownerNetValue'] = $ownerNet;
    $commission['commissionValue'] = $commissionAmount;

    return $commission;
}

function ek_business_commissions(array $state, array $properties, array $payments): array
{
    $generated = [];
    $index = 1;
    $overrides = ek_business_array($state['commissionOverrides'] ?? []);

    foreach ($payments as $payment) {
        $paid = ek_business_money_to_int($payment['paid'] ?? 0);
        if ($paid <= 0 || empty($payment['serverValid'])) {
            continue;
        }
        $property = ek_business_property_by_name($properties, ek_business_text($payment['property'] ?? ''));
        if (!$property || !ek_business_is_agency_collected($property)) {
            continue;
        }
        $rule = $property['commission'] ?? '5%';
        $commission = ek_business_commission_amount($rule, $paid);
        $generated[] = ek_business_apply_commission_business_fields([
            'id' => sprintf('COM-SRV-%03d', $index++),
            'operation' => 'Encaissement ' . ek_business_text($payment['property'] ?? ''),
            'commissionType' => 'Gestion récurrente',
            'trigger' => 'Paiement loyer',
            'property' => ek_business_text($payment['property'] ?? ''),
            'owner' => ek_business_text($payment['owner'] ?? ($property['owner'] ?? '')),
            'client' => ek_business_text($payment['tenant'] ?? ''),
            'period' => ek_business_text($payment['period'] ?? ''),
            'date' => ek_business_text($payment['date'] ?? ''),
            'collected' => ek_business_format_fcfa($paid),
            'mode' => str_contains(ek_business_text($rule), '%') ? 'Pourcentage' : 'Montant fixe',
            'rate' => ek_business_text($rule) ?: '5%',
            'fixedAmount' => str_contains(ek_business_text($rule), '%') ? '' : ek_business_text($rule),
            'calculationBase' => 'Paiement encaisse',
            'appliedOn' => 'Paiement encaisse',
            'commission' => ek_business_format_fcfa($commission),
            'ownerNet' => ek_business_format_fcfa(max($paid - $commission, 0)),
            'commissionPayer' => 'Propriétaire',
            'collectionStatus' => 'À encaisser',
            'collectionConfirmed' => false,
            'collectionMode' => 'Déduction reversement',
            'status' => 'À confirmer',
            'paymentReference' => ek_business_text($payment['reference'] ?? ''),
            'integratedInOwnerStatement' => false,
            'commissionValue' => $commission,
            'ownerNetValue' => max($paid - $commission, 0),
        ]);
    }

    $result = [];
    $existing = [];
    foreach ($generated as $commission) {
        $key = ek_business_commission_key($commission);
        if (isset($overrides[$key]) && is_array($overrides[$key])) {
            $commission = array_replace($commission, $overrides[$key]);
        }
        $commission = ek_business_apply_commission_business_fields($commission);
        $existing[ek_business_commission_key($commission)] = true;
        $result[] = $commission;
    }

    foreach ($overrides as $key => $commission) {
        if (!is_array($commission) || empty($commission['__created']) || isset($existing[(string) $key])) {
            continue;
        }
        $result[] = ek_business_apply_commission_business_fields($commission);
    }

    return $result;
}

function ek_business_owner_names(array $owners, array $properties, array $payments): array
{
    $names = [];
    foreach ($owners as $owner) {
        $name = ek_business_text($owner['name'] ?? '');
        if ($name !== '') {
            $names[$name] = true;
        }
    }
    foreach ($properties as $property) {
        $name = ek_business_text($property['owner'] ?? '');
        if ($name !== '') {
            $names[$name] = true;
        }
    }
    foreach ($payments as $payment) {
        $name = ek_business_text($payment['owner'] ?? '');
        if ($name !== '') {
            $names[$name] = true;
        }
    }
    return array_keys($names);
}

function ek_business_reversals(array $state, array $owners, array $properties, array $payments, array $charges, array $commissions): array
{
    $manual = ek_business_array($state['ownerReversements'] ?? []);
    $result = [];

    foreach (ek_business_owner_names($owners, $properties, $payments) as $ownerName) {
        $ownerPayments = array_values(array_filter($payments, static fn(array $payment): bool => ek_business_text($payment['owner'] ?? '') === $ownerName && !empty($payment['serverValid'])));
        $ownerCharges = array_values(array_filter($charges, static fn(array $charge): bool => ek_business_text($charge['owner'] ?? '') === $ownerName && ek_business_owner_deductible_charge($charge)));
        $ownerCommissions = array_values(array_filter($commissions, static fn(array $commission): bool => ek_business_text($commission['owner'] ?? '') === $ownerName && ek_business_commission_owner_charged($commission) && ek_business_commission_collected($commission)));
        $ownerManual = array_values(array_filter($manual, static fn($reversal): bool => is_array($reversal) && ek_business_text($reversal['owner'] ?? '') === $ownerName));

        $collected = array_reduce($ownerPayments, static fn(int $sum, array $payment): int => $sum + ek_business_money_to_int($payment['paid'] ?? 0), 0);
        $commission = array_reduce($ownerCommissions, static fn(int $sum, array $item): int => $sum + ek_business_money_to_int($item['commission'] ?? 0), 0);
        $chargeTotal = array_reduce($ownerCharges, static fn(int $sum, array $charge): int => $sum + ek_business_money_to_int($charge['amount'] ?? 0), 0);
        $paid = array_reduce($ownerManual, static fn(int $sum, array $item): int => $sum + ek_business_money_to_int($item['paid'] ?? ($item['amount'] ?? 0)), 0);
        $net = max($collected - $commission - $chargeTotal, 0);
        $balance = max($net - $paid, 0);

        if ($collected === 0 && $commission === 0 && $chargeTotal === 0 && $paid === 0) {
            continue;
        }

        $result[] = [
            'reference' => 'REV-SRV-' . strtoupper(substr(sha1($ownerName), 0, 6)),
            'owner' => $ownerName,
            'collected' => ek_business_format_fcfa($collected),
            'commission' => ek_business_format_fcfa($commission),
            'charges' => ek_business_format_fcfa($chargeTotal),
            'paid' => ek_business_format_fcfa($paid),
            'balance' => ek_business_format_fcfa($balance),
            'status' => $balance > 0 ? 'À reverser' : 'Soldé',
            'period' => ek_business_period_label(),
            'collectedValue' => $collected,
            'commissionValue' => $commission,
            'chargesValue' => $chargeTotal,
            'paidValue' => $paid,
            'balanceValue' => $balance,
        ];
    }

    return $result;
}

function ek_business_dashboard_totals(array $properties, array $rentRows, array $payments, array $charges, array $commissions, array $reversals): array
{
    $activeCount = count($properties);
    $available = 0;
    $rented = 0;
    $reserved = 0;
    $sale = 0;
    $maintenanceOnly = 0;
    $maintenanceAmount = 0;

    foreach ($properties as $property) {
        $status = ek_business_normalize(ek_business_text($property['status'] ?? ''));
        $period = ek_business_normalize(ek_business_text($property['period'] ?? ''));
        if (str_contains($status, 'disponible')) {
            $available++;
        }
        if (ek_business_is_rent_bearing($property)) {
            $rented++;
        }
        if (str_contains($status, 'reserv')) {
            $reserved++;
        }
        if (str_contains($period, 'vente') || str_contains($status, 'vendu')) {
            $sale++;
        }
        if (str_contains($status, 'entretien seul') || str_contains(ek_business_normalize(ek_business_text($property['financialMode'] ?? '')), 'entretien seul')) {
            $maintenanceOnly++;
            $maintenanceAmount += ek_business_money_to_int($property['price'] ?? 0);
        }
    }

    $rentExpected = array_reduce($rentRows, static fn(int $sum, array $row): int => $sum + ek_business_money_to_int($row['expected'] ?? 0), 0);
    $rentPaid = array_reduce($rentRows, static fn(int $sum, array $row): int => $sum + ek_business_money_to_int($row['paid'] ?? 0), 0);
    $arrears = array_reduce($rentRows, static fn(int $sum, array $row): int => $sum + ek_business_money_to_int($row['balance'] ?? 0), 0);
    $paymentsPaid = array_reduce($payments, static fn(int $sum, array $payment): int => $sum + ek_business_money_to_int($payment['paid'] ?? 0), 0);
    $commissionTotal = array_reduce($commissions, static fn(int $sum, array $commission): int => ek_business_commission_collected($commission) ? $sum + ek_business_money_to_int($commission['commission'] ?? 0) : $sum, 0);
    $chargeTotal = array_reduce($charges, static function (int $sum, array $charge): int {
        $status = ek_business_normalize(ek_business_text($charge['status'] ?? ''));
        return str_contains($status, 'annul') ? $sum : $sum + ek_business_money_to_int($charge['amount'] ?? 0);
    }, 0);
    $ownerNet = array_reduce($reversals, static fn(int $sum, array $reversal): int => $sum + ek_business_money_to_int($reversal['balance'] ?? 0), 0);

    return [
        'total' => $activeCount,
        'available' => $available,
        'rented' => $rented,
        'reserved' => $reserved,
        'sale' => $sale,
        'maintenanceOnly' => $maintenanceOnly,
        'rentalManaged' => max(0, $activeCount - $maintenanceOnly),
        'rentExpected' => $rentExpected,
        'rentPaid' => $rentPaid,
        'paymentsPaid' => $paymentsPaid,
        'arrears' => $arrears,
        'maintenanceAmount' => $maintenanceAmount,
        'commissionTotal' => $commissionTotal,
        'chargeTotal' => $chargeTotal,
        'ownerNet' => $ownerNet,
    ];
}

function ek_business_validations(array $properties, array $payments, array $charges, array $reversals): array
{
    $warnings = [];
    foreach ($payments as $payment) {
        if (empty($payment['serverValid'])) {
            $warnings[] = [
                'type' => 'payment',
                'reference' => ek_business_text($payment['reference'] ?? ''),
                'message' => ek_business_text($payment['serverWarning'] ?? 'Paiement a verifier.'),
            ];
        }
        if (ek_business_money_to_int($payment['paid'] ?? 0) > ek_business_money_to_int($payment['due'] ?? 0) && ek_business_money_to_int($payment['due'] ?? 0) > 0) {
            $warnings[] = [
                'type' => 'payment',
                'reference' => ek_business_text($payment['reference'] ?? ''),
                'message' => 'Montant payé supérieur au montant attendu.',
            ];
        }
    }
    foreach ($charges as $charge) {
        if (ek_business_money_to_int($charge['amount'] ?? 0) <= 0) {
            $warnings[] = [
                'type' => 'charge',
                'reference' => ek_business_text($charge['id'] ?? ''),
                'message' => 'Montant de charge absent ou nul.',
            ];
        }
    }
    foreach ($reversals as $reversal) {
        if (ek_business_money_to_int($reversal['paid'] ?? 0) > ek_business_money_to_int($reversal['collected'] ?? 0)) {
            $warnings[] = [
                'type' => 'reversal',
                'reference' => ek_business_text($reversal['reference'] ?? ''),
                'message' => 'Reversement supérieur aux encaissements du propriétaire.',
            ];
        }
    }
    return $warnings;
}

function ek_business_payload(array $state, array $user = [], bool $includeFinanceLists = true): array
{
    $properties = ek_business_active_properties($state);
    $owners = ek_business_apply_owner_state($state);
    $tenants = ek_business_apply_tenant_state($state);
    $payments = ek_business_normalized_payments($state, $properties, $tenants);
    $rentRows = ek_business_rent_rows($properties, $tenants, $payments);
    $charges = ek_business_charges($state);
    $commissions = ek_business_commissions($state, $properties, $payments);
    $reversals = ek_business_reversals($state, $owners, $properties, $payments, $charges, $commissions);
    $totals = ek_business_dashboard_totals($properties, $rentRows, $payments, $charges, $commissions, $reversals);

    $payload = [
        'generatedAt' => gmdate('c'),
        'period' => ek_business_period_label(),
        'totals' => $totals,
        'labels' => [
            'rentExpected' => ek_business_format_fcfa($totals['rentExpected']),
            'rentPaid' => ek_business_format_fcfa($totals['rentPaid']),
            'arrears' => ek_business_format_fcfa($totals['arrears']),
            'commissions' => ek_business_format_fcfa($totals['commissionTotal']),
            'charges' => ek_business_format_fcfa($totals['chargeTotal']),
            'ownerNet' => ek_business_format_fcfa($totals['ownerNet']),
        ],
        'validations' => ek_business_validations($properties, $payments, $charges, $reversals),
    ];

    if ($includeFinanceLists) {
        $payload['payments'] = $payments;
        $payload['rentRows'] = $rentRows;
        $payload['charges'] = $charges;
        $payload['commissions'] = $commissions;
        $payload['reversals'] = $reversals;
    }

    return $payload;
}

function ek_business_normalize_state(array $state): array
{
    $properties = ek_business_active_properties($state);
    $tenants = ek_business_apply_tenant_state($state);
    $state['recordedPayments'] = ek_business_normalized_payments($state, $properties, $tenants);
    $state['maintenanceCharges'] = ek_business_charges($state);
    return $state;
}
