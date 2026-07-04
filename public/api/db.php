<?php
declare(strict_types=1);

function json_response(array $payload, int $status = 200): void
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store');
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function require_config(): void
{
    $configPath = __DIR__ . '/config.php';
    if (!is_file($configPath)) {
        json_response([
            'ok' => false,
            'code' => 'missing_config',
            'message' => 'Configuration base de données absente.',
        ], 503);
    }

    require_once $configPath;

    foreach (['DB_HOST', 'DB_NAME', 'DB_USER', 'DB_PASSWORD'] as $constant) {
        if (!defined($constant)) {
            json_response([
                'ok' => false,
                'code' => 'invalid_config',
                'message' => "Constante $constant absente.",
            ], 503);
        }
    }

    if (!defined('APP_STATE_ID')) {
        define('APP_STATE_ID', 'production');
    }
}

function db(): PDO
{
    require_config();

    static $pdo = null;
    if ($pdo instanceof PDO) {
        return $pdo;
    }

    $dsn = sprintf('mysql:host=%s;dbname=%s;charset=utf8mb4', DB_HOST, DB_NAME);
    try {
        $pdo = new PDO($dsn, DB_USER, DB_PASSWORD, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ]);
    } catch (Throwable $exception) {
        json_response([
            'ok' => false,
            'code' => 'db_connection_failed',
            'message' => 'Connexion base de données impossible.',
        ], 503);
    }

    ensure_schema($pdo);
    return $pdo;
}

function ensure_schema(PDO $pdo): void
{
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS ekimmo_app_state (
            id VARCHAR(80) NOT NULL PRIMARY KEY,
            payload LONGTEXT NOT NULL,
            revision INT UNSIGNED NOT NULL DEFAULT 1,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    ");
}
