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
            description TEXT NULL,
            payload LONGTEXT NOT NULL,
            status VARCHAR(40) NOT NULL DEFAULT 'Actif',
            updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    ");
    ensure_column($pdo, 'ekimmo_role_permissions', 'description', 'TEXT NULL AFTER role_name');

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

    $pdo->exec("
        CREATE TABLE IF NOT EXISTS ekimmo_document_exports (
            id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
            user_id VARCHAR(80) NULL,
            document_type VARCHAR(120) NOT NULL,
            file_name VARCHAR(220) NOT NULL,
            module VARCHAR(80) NOT NULL DEFAULT 'Docs',
            payload_json LONGTEXT NULL,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            INDEX idx_document_exports_user (user_id),
            INDEX idx_document_exports_module (module),
            INDEX idx_document_exports_created (created_at)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    ");

    $pdo->exec("
        CREATE TABLE IF NOT EXISTS ekimmo_uploads (
            id VARCHAR(120) NOT NULL PRIMARY KEY,
            user_id VARCHAR(80) NULL,
            module VARCHAR(80) NOT NULL DEFAULT 'Docs',
            category VARCHAR(120) NOT NULL DEFAULT '',
            linked_type VARCHAR(80) NOT NULL DEFAULT '',
            linked_id VARCHAR(160) NOT NULL DEFAULT '',
            original_name VARCHAR(255) NOT NULL,
            stored_name VARCHAR(255) NOT NULL,
            relative_path VARCHAR(255) NOT NULL,
            public_url VARCHAR(255) NOT NULL,
            mime_type VARCHAR(120) NOT NULL DEFAULT '',
            file_size BIGINT UNSIGNED NOT NULL DEFAULT 0,
            status VARCHAR(40) NOT NULL DEFAULT 'Actif',
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            INDEX idx_uploads_user (user_id),
            INDEX idx_uploads_module (module),
            INDEX idx_uploads_linked (linked_type, linked_id),
            INDEX idx_uploads_status (status),
            INDEX idx_uploads_created (created_at)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    ");

    $pdo->exec("
        CREATE TABLE IF NOT EXISTS ekimmo_admin_settings (
            setting_key VARCHAR(120) NOT NULL PRIMARY KEY,
            payload LONGTEXT NOT NULL,
            updated_by VARCHAR(80) NULL,
            updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    ");

    $pdo->exec("
        CREATE TABLE IF NOT EXISTS ekimmo_template_archives (
            id VARCHAR(140) NOT NULL PRIMARY KEY,
            template_key VARCHAR(120) NOT NULL,
            label VARCHAR(180) NOT NULL,
            source VARCHAR(220) NOT NULL DEFAULT '',
            format VARCHAR(40) NOT NULL DEFAULT '',
            reason TEXT NULL,
            comment TEXT NULL,
            status VARCHAR(40) NOT NULL DEFAULT 'Archivé',
            archived_by VARCHAR(80) NULL,
            archived_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            INDEX idx_template_archives_key (template_key),
            INDEX idx_template_archives_status (status)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    ");

    seed_default_users($pdo);
    seed_default_role_permissions($pdo);
    seed_default_settings($pdo);
}

function ensure_column(PDO $pdo, string $table, string $column, string $definition): void
{
    $statement = $pdo->prepare('
        SELECT COUNT(*) AS count_columns
        FROM INFORMATION_SCHEMA.COLUMNS
        WHERE TABLE_SCHEMA = DATABASE()
          AND TABLE_NAME = :table_name
          AND COLUMN_NAME = :column_name
    ');
    $statement->execute(['table_name' => $table, 'column_name' => $column]);
    $row = $statement->fetch();
    if ((int) ($row['count_columns'] ?? 0) > 0) {
        return;
    }
    $pdo->exec("ALTER TABLE `$table` ADD COLUMN `$column` $definition");
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

function empty_permission_matrix(): array
{
    $modules = ['Dashboard', 'Biens', 'Clients', 'Contrats', 'Finance', 'Rapports', 'Administration'];
    $permissions = ['voir', 'creer', 'modifier', 'supprimer', 'valider', 'exporter'];
    $matrix = [];

    foreach ($modules as $module) {
        $matrix[$module] = [];
        foreach ($permissions as $permission) {
            $matrix[$module][$permission] = false;
        }
    }

    return $matrix;
}

function seed_default_role_permissions(PDO $pdo): void
{
    $roles = [
        'Administrateur' => 'Accès complet à tous les modules et réglages sensibles.',
        'Gestion locative & recouvrement' => 'Gestion des loyers, paiements, relances, dossiers locataires, visites et courriers.',
        'Communication & prospection' => 'Mise en ligne des biens, prospection, visites, contenus et visibilité commerciale.',
    ];
    $exists = $pdo->prepare('SELECT role_name FROM ekimmo_role_permissions WHERE role_name = :role_name LIMIT 1');
    $insert = $pdo->prepare('INSERT INTO ekimmo_role_permissions (role_name, description, payload, status) VALUES (:role_name, :description, :payload, :status)');

    foreach ($roles as $role => $description) {
        $exists->execute(['role_name' => $role]);
        if ($exists->fetch()) {
            continue;
        }
        $insert->execute([
            'role_name' => $role,
            'description' => $description,
            'payload' => json_encode(default_permission_matrix($role), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
            'status' => 'Actif',
        ]);
    }
}

function default_admin_settings(): array
{
    return [
        'agencyName' => 'E.K immo',
        'city' => 'Bamako',
        'currency' => 'FCFA',
        'defaultCommission' => '5%',
        'address' => 'Niaréla rue ACHKHABAD en face de la mairie, Bamako',
        'latePaymentAlerts' => 'Activé',
        'managerReversalValidation' => 'Activé',
        'receiptAutoArchive' => 'Activé',
        'ownerDirectCollection' => 'Suivi séparé',
        'notificationEmail' => 'contact@ekimmo-mali.com',
    ];
}

function seed_default_settings(PDO $pdo): void
{
    $exists = $pdo->prepare('SELECT setting_key FROM ekimmo_admin_settings WHERE setting_key = :setting_key LIMIT 1');
    $exists->execute(['setting_key' => 'general']);
    if ($exists->fetch()) {
        return;
    }

    $insert = $pdo->prepare('INSERT INTO ekimmo_admin_settings (setting_key, payload) VALUES (:setting_key, :payload)');
    $insert->execute([
        'setting_key' => 'general',
        'payload' => json_encode(default_admin_settings(), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
    ]);
}
