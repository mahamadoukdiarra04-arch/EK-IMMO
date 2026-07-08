<?php
declare(strict_types=1);

require_once __DIR__ . '/auth_lib.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

const BACKUP_SCHEMA_VERSION = 1;
const BACKUP_CONFIRMATION_PHRASE = 'RESTAURER EKIMMO';

function backup_tables(): array
{
    return [
        'ekimmo_app_state',
        'ekimmo_users',
        'ekimmo_role_permissions',
        'ekimmo_admin_settings',
        'ekimmo_document_exports',
        'ekimmo_uploads',
        'ekimmo_template_archives',
        'ekimmo_admin_audit',
    ];
}

function restorable_tables(): array
{
    return [
        'ekimmo_app_state',
        'ekimmo_users',
        'ekimmo_role_permissions',
        'ekimmo_admin_settings',
        'ekimmo_document_exports',
        'ekimmo_uploads',
        'ekimmo_template_archives',
    ];
}

function existing_tables(PDO $pdo, array $tables): array
{
    $statement = $pdo->prepare('
        SELECT COUNT(*) AS table_count
        FROM INFORMATION_SCHEMA.TABLES
        WHERE TABLE_SCHEMA = DATABASE()
          AND TABLE_NAME = :table_name
    ');
    $existing = [];
    foreach ($tables as $table) {
        $statement->execute(['table_name' => $table]);
        $row = $statement->fetch();
        if ((int) ($row['table_count'] ?? 0) > 0) {
            $existing[] = $table;
        }
    }
    return $existing;
}

function table_columns(PDO $pdo, string $table): array
{
    $statement = $pdo->prepare('
        SELECT COLUMN_NAME
        FROM INFORMATION_SCHEMA.COLUMNS
        WHERE TABLE_SCHEMA = DATABASE()
          AND TABLE_NAME = :table_name
        ORDER BY ORDINAL_POSITION ASC
    ');
    $statement->execute(['table_name' => $table]);
    return array_map(static fn (array $row): string => (string) $row['COLUMN_NAME'], $statement->fetchAll() ?: []);
}

function export_table(PDO $pdo, string $table): array
{
    $columns = table_columns($pdo, $table);
    $rows = $pdo->query("SELECT * FROM `$table`")->fetchAll() ?: [];
    return [
        'columns' => $columns,
        'rows' => $rows,
        'count' => count($rows),
    ];
}

function build_backup_payload(PDO $pdo, array $admin): array
{
    $tables = [];
    $counts = [];
    foreach (existing_tables($pdo, backup_tables()) as $table) {
        $export = export_table($pdo, $table);
        $tables[$table] = $export;
        $counts[$table] = $export['count'];
    }

    $databaseName = (string) ($pdo->query('SELECT DATABASE() AS db_name')->fetch()['db_name'] ?? '');
    return [
        'ok' => true,
        'app' => 'E.K immo',
        'schemaVersion' => BACKUP_SCHEMA_VERSION,
        'generatedAt' => gmdate('c'),
        'generatedBy' => [
            'id' => (string) ($admin['id'] ?? ''),
            'name' => (string) ($admin['name'] ?? ''),
            'role' => (string) ($admin['role'] ?? ''),
        ],
        'database' => [
            'name' => $databaseName,
            'stateId' => defined('APP_STATE_ID') ? APP_STATE_ID : 'production',
        ],
        'restorableTables' => restorable_tables(),
        'counts' => $counts,
        'tables' => $tables,
    ];
}

function validate_backup_payload(array $backup): array
{
    if (($backup['app'] ?? '') !== 'E.K immo' || (int) ($backup['schemaVersion'] ?? 0) < 1) {
        json_response([
            'ok' => false,
            'code' => 'invalid_backup',
            'message' => 'Fichier de sauvegarde E.K immo invalide.',
        ], 400);
    }

    $tables = $backup['tables'] ?? null;
    if (!is_array($tables)) {
        json_response([
            'ok' => false,
            'code' => 'invalid_backup_tables',
            'message' => 'La sauvegarde ne contient pas de tables restaurables.',
        ], 400);
    }

    $summary = [];
    foreach (restorable_tables() as $table) {
        if (!isset($tables[$table]) || !is_array($tables[$table])) {
            continue;
        }
        $rows = $tables[$table]['rows'] ?? [];
        if (!is_array($rows)) {
            json_response([
                'ok' => false,
                'code' => 'invalid_backup_rows',
                'message' => "La table $table contient des donnees invalides.",
            ], 400);
        }
        $summary[$table] = count($rows);
    }

    if (!$summary) {
        json_response([
            'ok' => false,
            'code' => 'empty_backup',
            'message' => 'Aucune table restaurable trouvee dans ce fichier.',
        ], 400);
    }

    return $summary;
}

function insert_backup_rows(PDO $pdo, string $table, array $rows): void
{
    if (!$rows) {
        return;
    }

    $columns = table_columns($pdo, $table);
    $columnLookup = array_fill_keys($columns, true);
    foreach ($rows as $row) {
        if (!is_array($row)) {
            continue;
        }
        $filtered = array_filter(
            $row,
            static fn ($key): bool => isset($columnLookup[$key]),
            ARRAY_FILTER_USE_KEY
        );
        if (!$filtered) {
            continue;
        }

        $insertColumns = array_keys($filtered);
        $quotedColumns = array_map(static fn (string $column): string => "`$column`", $insertColumns);
        $placeholders = array_map(static fn (string $column): string => ':' . $column, $insertColumns);
        $statement = $pdo->prepare(
            "INSERT INTO `$table` (" . implode(', ', $quotedColumns) . ') VALUES (' . implode(', ', $placeholders) . ')'
        );
        $statement->execute($filtered);
    }
}

function restore_backup(PDO $pdo, array $backup): array
{
    $summary = validate_backup_payload($backup);
    $availableTables = existing_tables($pdo, restorable_tables());
    $restored = [];

    $pdo->beginTransaction();
    try {
        $pdo->exec('SET FOREIGN_KEY_CHECKS=0');
        foreach ($availableTables as $table) {
            if (!isset($backup['tables'][$table])) {
                continue;
            }
            $pdo->exec("DELETE FROM `$table`");
            $rows = $backup['tables'][$table]['rows'] ?? [];
            insert_backup_rows($pdo, $table, is_array($rows) ? $rows : []);
            $restored[$table] = count(is_array($rows) ? $rows : []);
        }
        $pdo->exec('SET FOREIGN_KEY_CHECKS=1');
        $pdo->commit();
    } catch (Throwable $exception) {
        try {
            $pdo->exec('SET FOREIGN_KEY_CHECKS=1');
        } catch (Throwable) {
            // Ignore secondary cleanup failure.
        }
        $pdo->rollBack();
        json_response([
            'ok' => false,
            'code' => 'restore_failed',
            'message' => 'Restauration impossible. La base n’a pas ete modifiee.',
        ], 500);
    }

    return [
        'summary' => $summary,
        'restored' => $restored,
    ];
}

$pdo = db();
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

if ($method !== 'POST') {
    json_response([
        'ok' => false,
        'code' => 'method_not_allowed',
        'message' => 'Methode non autorisee.',
    ], 405);
}

require_csrf();
$admin = require_admin($pdo);
$body = request_json();
$action = (string) ($body['action'] ?? '');

if ($action === 'create_backup') {
    $backup = build_backup_payload($pdo, $admin);
    audit_admin($pdo, $admin, 'database_backup_export', 'database', 'Sauvegarde applicative exportee.');

    $filename = 'EKIMMO_Backup_' . gmdate('Y-m-d_His') . '.json';
    http_response_code(200);
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store');
    header('Content-Disposition: attachment; filename="' . $filename . '"');
    echo json_encode($backup, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);
    exit;
}

if ($action === 'validate_backup') {
    $backup = is_array($body['backup'] ?? null) ? $body['backup'] : [];
    $summary = validate_backup_payload($backup);
    audit_admin($pdo, $admin, 'database_backup_validate', 'database', 'Fichier de sauvegarde verifie.');
    json_response([
        'ok' => true,
        'generatedAt' => (string) ($backup['generatedAt'] ?? ''),
        'generatedBy' => $backup['generatedBy'] ?? null,
        'summary' => $summary,
    ]);
}

if ($action === 'restore_backup') {
    $confirmation = trim((string) ($body['confirmation'] ?? ''));
    if ($confirmation !== BACKUP_CONFIRMATION_PHRASE) {
        json_response([
            'ok' => false,
            'code' => 'confirmation_required',
            'message' => 'Saisissez la phrase de confirmation exacte avant restauration.',
        ], 400);
    }
    $backup = is_array($body['backup'] ?? null) ? $body['backup'] : [];
    $result = restore_backup($pdo, $backup);
    audit_admin($pdo, $admin, 'database_backup_restore', 'database', 'Restauration applicative terminee.');
    json_response([
        'ok' => true,
        'message' => 'Base restauree avec succes. Reconnectez-vous pour recharger les donnees.',
        ...$result,
    ]);
}

json_response([
    'ok' => false,
    'code' => 'unknown_action',
    'message' => 'Action non reconnue.',
], 400);
