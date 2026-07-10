<?php
declare(strict_types=1);

require_once __DIR__ . '/auth_lib.php';
require_once __DIR__ . '/business_lib.php';
require_once __DIR__ . '/business_store.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

$pdo = db();
$user = require_user($pdo);

if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'GET') {
    json_response([
        'ok' => false,
        'code' => 'method_not_allowed',
        'message' => 'Méthode non autorisée.',
    ], 405);
}

$statement = $pdo->prepare('SELECT payload, revision FROM ekimmo_app_state WHERE id = :id');
$statement->execute(['id' => APP_STATE_ID]);
$row = $statement->fetch();
$data = [];
$revision = 0;

if ($row) {
    $decoded = json_decode((string) $row['payload'], true);
    $data = is_array($decoded) ? $decoded : [];
    $revision = (int) $row['revision'];
}

$canReadFinance = user_can_access_state_module($pdo, $user, 'Finance', 'read');
ek_sync_business_state_if_needed($pdo, $data, $revision);

json_response([
    'ok' => true,
    'revision' => $revision,
    'business' => ek_business_payload($data, $user, $canReadFinance),
    'storage' => [
        'mode' => 'relational_projection',
        'counts' => ek_business_store_counts($pdo),
    ],
    'csrfToken' => csrf_token(),
]);
