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

    $pdo->exec("
        CREATE TABLE IF NOT EXISTS ekimmo_users (
            id VARCHAR(80) NOT NULL PRIMARY KEY,
            identifier VARCHAR(80) NOT NULL UNIQUE,
            name VARCHAR(160) NOT NULL,
            initials VARCHAR(20) NOT NULL DEFAULT '',
            email VARCHAR(190) NOT NULL UNIQUE,
            phone VARCHAR(60) NOT NULL DEFAULT '',
            role VARCHAR(100) NOT NULL,
            status VARCHAR(40) NOT NULL DEFAULT 'Actif',
            report_access_mode VARCHAR(80) NOT NULL DEFAULT 'Selon le role',
            report_access_json LONGTEXT NULL,
            scope TEXT NULL,
            password_hash VARCHAR(255) NOT NULL,
            last_login_at DATETIME NULL,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    ");

    $pdo->exec("
        CREATE TABLE IF NOT EXISTS ekimmo_role_permissions (
            role_name VARCHAR(120) NOT NULL PRIMARY KEY,
            payload LONGTEXT NOT NULL,
            status VARCHAR(40) NOT NULL DEFAULT 'Actif',
            updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    ");

    $pdo->exec("
        CREATE TABLE IF NOT EXISTS ekimmo_admin_audit (
            id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
            actor_id VARCHAR(80) NULL,
            action VARCHAR(120) NOT NULL,
            target_id VARCHAR(120) NULL,
            detail TEXT NULL,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    ");

    seed_default_users($pdo);
    seed_default_role_permissions($pdo);
}

function seed_default_users(PDO $pdo): void
{
    $users = [
        [
            'id' => 'USR-2026-001',
            'identifier' => 'NIARO',
            'name' => 'Niaro Admin',
            'initials' => 'NA',
            'email' => 'admin@ekimmo-mali.com',
            'phone' => '+223 72 77 71 77',
            'role' => 'Administrateur',
            'status' => 'Actif',
            'report_access_mode' => 'Tous rapports',
            'scope' => 'Administration complete, parametrage, suivi global et validation.',
        ],
        [
            'id' => 'USR-2026-002',
            'identifier' => 'Makan',
            'name' => 'Makan Sissoko',
            'initials' => 'MS',
            'email' => 'makan.sissoko@ekimmo-mali.com',
            'phone' => '+223 76 12 45 89',
            'role' => 'Gestion locative & recouvrement',
            'status' => 'Actif',
            'report_access_mode' => 'Selon le role',
            'scope' => 'Gestion locative, loyers, paiements, relances, dossiers locataires, courriers, visites et etats des lieux.',
        ],
        [
            'id' => 'USR-2026-003',
            'identifier' => 'Aboubacar',
            'name' => 'Aboubacar Sidiki Diallo',
            'initials' => 'AD',
            'email' => 'aboubacar.diallo@ekimmo-mali.com',
            'phone' => '+223 70 24 18 66',
            'role' => 'Communication & prospection',
            'status' => 'Actif',
            'report_access_mode' => 'Selon le role',
            'scope' => 'Mise en ligne des biens, contenus immobiliers, communication digitale, prospection et visites.',
        ],
    ];

    $exists = $pdo->prepare('SELECT id FROM ekimmo_users WHERE identifier = :identifier OR email = :email LIMIT 1');
    $insert = $pdo->prepare('
        INSERT INTO ekimmo_users
            (id, identifier, name, initials, email, phone, role, status, report_access_mode, scope, password_hash)
        VALUES
            (:id, :identifier, :name, :initials, :email, :phone, :role, :status, :report_access_mode, :scope, :password_hash)
    ');

    foreach ($users as $user) {
        $exists->execute(['identifier' => $user['identifier'], 'email' => $user['email']]);
        if ($exists->fetch()) {
            continue;
        }

        $insert->execute([
            ...$user,
            'password_hash' => password_hash('123456', PASSWORD_DEFAULT),
        ]);
    }
}

function default_permission_matrix(string $role): array
{
    $modules = ['Dashboard', 'Biens', 'Clients', 'Contrats', 'Finance', 'Rapports', 'Administration'];
    $permissions = ['voir', 'creer', 'modifier', 'supprimer', 'valider', 'exporter'];
    $matrix = [];

    foreach ($modules as $module) {
        $matrix[$module] = [];
        foreach ($permissions as $permission) {
            $allowed = false;
            if ($role === 'Administrateur') {
                $allowed = true;
            } elseif ($role === 'Gestion locative & recouvrement') {
                $allowedModules = ['Dashboard', 'Biens', 'Clients', 'Contrats', 'Finance', 'Rapports'];
                $allowed = in_array($module, $allowedModules, true) && (
                    in_array($permission, ['voir', 'creer', 'modifier', 'exporter'], true) ||
                    ($permission === 'valider' && in_array($module, ['Finance', 'Contrats'], true))
                );
            } elseif ($role === 'Communication & prospection') {
                $allowedModules = ['Dashboard', 'Biens', 'Clients', 'Contrats', 'Rapports'];
                $allowed = in_array($module, $allowedModules, true) &&
                    in_array($permission, ['voir', 'creer', 'modifier', 'exporter'], true);
            }
            $matrix[$module][$permission] = $allowed;
        }
    }

    return $matrix;
}

function seed_default_role_permissions(PDO $pdo): void
{
    $roles = ['Administrateur', 'Gestion locative & recouvrement', 'Communication & prospection'];
    $exists = $pdo->prepare('SELECT role_name FROM ekimmo_role_permissions WHERE role_name = :role_name LIMIT 1');
    $insert = $pdo->prepare('INSERT INTO ekimmo_role_permissions (role_name, payload, status) VALUES (:role_name, :payload, :status)');

    foreach ($roles as $role) {
        $exists->execute(['role_name' => $role]);
        if ($exists->fetch()) {
            continue;
        }
        $insert->execute([
            'role_name' => $role,
            'payload' => json_encode(default_permission_matrix($role), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
            'status' => 'Actif',
        ]);
    }
}
