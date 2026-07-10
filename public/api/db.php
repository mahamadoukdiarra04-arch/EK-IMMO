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

    $pdo->exec("
        CREATE TABLE IF NOT EXISTS ekimmo_business_sync (
            state_id VARCHAR(80) NOT NULL PRIMARY KEY,
            revision INT UNSIGNED NOT NULL DEFAULT 0,
            synced_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    ");

    $pdo->exec("
        CREATE TABLE IF NOT EXISTS ekimmo_properties (
            state_id VARCHAR(80) NOT NULL,
            code VARCHAR(120) NOT NULL,
            name VARCHAR(220) NOT NULL DEFAULT '',
            property_type VARCHAR(120) NOT NULL DEFAULT '',
            status VARCHAR(80) NOT NULL DEFAULT '',
            owner_name VARCHAR(180) NOT NULL DEFAULT '',
            tenant_name VARCHAR(180) NOT NULL DEFAULT '',
            district VARCHAR(180) NOT NULL DEFAULT '',
            address TEXT NULL,
            financial_mode VARCHAR(140) NOT NULL DEFAULT '',
            rent_amount BIGINT UNSIGNED NOT NULL DEFAULT 0,
            sale_amount BIGINT UNSIGNED NOT NULL DEFAULT 0,
            deposit_amount BIGINT UNSIGNED NOT NULL DEFAULT 0,
            archived TINYINT(1) NOT NULL DEFAULT 0,
            payload_json LONGTEXT NOT NULL,
            updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY (state_id, code),
            INDEX idx_properties_status (status),
            INDEX idx_properties_owner (owner_name),
            INDEX idx_properties_tenant (tenant_name),
            INDEX idx_properties_archived (archived)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    ");

    $pdo->exec("
        CREATE TABLE IF NOT EXISTS ekimmo_clients (
            state_id VARCHAR(80) NOT NULL,
            client_id VARCHAR(140) NOT NULL,
            client_type VARCHAR(40) NOT NULL,
            name VARCHAR(220) NOT NULL DEFAULT '',
            phone VARCHAR(80) NOT NULL DEFAULT '',
            email VARCHAR(190) NOT NULL DEFAULT '',
            status VARCHAR(80) NOT NULL DEFAULT '',
            linked_property VARCHAR(220) NOT NULL DEFAULT '',
            payload_json LONGTEXT NOT NULL,
            updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY (state_id, client_id),
            INDEX idx_clients_type (client_type),
            INDEX idx_clients_name (name),
            INDEX idx_clients_status (status)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    ");

    $pdo->exec("
        CREATE TABLE IF NOT EXISTS ekimmo_contracts (
            state_id VARCHAR(80) NOT NULL,
            contract_id VARCHAR(140) NOT NULL,
            contract_number VARCHAR(140) NOT NULL DEFAULT '',
            contract_type VARCHAR(120) NOT NULL DEFAULT '',
            status VARCHAR(80) NOT NULL DEFAULT '',
            property_name VARCHAR(220) NOT NULL DEFAULT '',
            owner_name VARCHAR(180) NOT NULL DEFAULT '',
            client_name VARCHAR(180) NOT NULL DEFAULT '',
            start_date VARCHAR(40) NOT NULL DEFAULT '',
            end_date VARCHAR(40) NOT NULL DEFAULT '',
            amount BIGINT UNSIGNED NOT NULL DEFAULT 0,
            deposit_amount BIGINT UNSIGNED NOT NULL DEFAULT 0,
            commission_rule VARCHAR(180) NOT NULL DEFAULT '',
            payload_json LONGTEXT NOT NULL,
            updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY (state_id, contract_id),
            INDEX idx_contracts_number (contract_number),
            INDEX idx_contracts_status (status),
            INDEX idx_contracts_property (property_name),
            INDEX idx_contracts_client (client_name)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    ");

    $pdo->exec("
        CREATE TABLE IF NOT EXISTS ekimmo_payments (
            state_id VARCHAR(80) NOT NULL,
            payment_id VARCHAR(140) NOT NULL,
            reference VARCHAR(140) NOT NULL DEFAULT '',
            period_label VARCHAR(120) NOT NULL DEFAULT '',
            tenant_name VARCHAR(180) NOT NULL DEFAULT '',
            property_name VARCHAR(220) NOT NULL DEFAULT '',
            owner_name VARCHAR(180) NOT NULL DEFAULT '',
            expected_amount BIGINT UNSIGNED NOT NULL DEFAULT 0,
            paid_amount BIGINT UNSIGNED NOT NULL DEFAULT 0,
            balance_amount BIGINT UNSIGNED NOT NULL DEFAULT 0,
            status VARCHAR(80) NOT NULL DEFAULT '',
            payment_date VARCHAR(40) NOT NULL DEFAULT '',
            payload_json LONGTEXT NOT NULL,
            updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY (state_id, payment_id),
            INDEX idx_payments_reference (reference),
            INDEX idx_payments_status (status),
            INDEX idx_payments_property (property_name),
            INDEX idx_payments_tenant (tenant_name)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    ");

    $pdo->exec("
        CREATE TABLE IF NOT EXISTS ekimmo_charges (
            state_id VARCHAR(80) NOT NULL,
            charge_id VARCHAR(140) NOT NULL,
            reference VARCHAR(140) NOT NULL DEFAULT '',
            charge_type VARCHAR(120) NOT NULL DEFAULT '',
            status VARCHAR(80) NOT NULL DEFAULT '',
            property_name VARCHAR(220) NOT NULL DEFAULT '',
            owner_name VARCHAR(180) NOT NULL DEFAULT '',
            tenant_name VARCHAR(180) NOT NULL DEFAULT '',
            amount BIGINT UNSIGNED NOT NULL DEFAULT 0,
            payer VARCHAR(120) NOT NULL DEFAULT '',
            charge_date VARCHAR(40) NOT NULL DEFAULT '',
            payload_json LONGTEXT NOT NULL,
            updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY (state_id, charge_id),
            INDEX idx_charges_status (status),
            INDEX idx_charges_property (property_name),
            INDEX idx_charges_owner (owner_name)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    ");

    $pdo->exec("
        CREATE TABLE IF NOT EXISTS ekimmo_documents (
            state_id VARCHAR(80) NOT NULL,
            document_id VARCHAR(160) NOT NULL,
            document_type VARCHAR(120) NOT NULL DEFAULT '',
            category VARCHAR(140) NOT NULL DEFAULT '',
            title VARCHAR(240) NOT NULL DEFAULT '',
            reference VARCHAR(160) NOT NULL DEFAULT '',
            linked_type VARCHAR(80) NOT NULL DEFAULT '',
            linked_id VARCHAR(180) NOT NULL DEFAULT '',
            status VARCHAR(80) NOT NULL DEFAULT '',
            file_name VARCHAR(255) NOT NULL DEFAULT '',
            file_url VARCHAR(255) NOT NULL DEFAULT '',
            payload_json LONGTEXT NOT NULL,
            updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY (state_id, document_id),
            INDEX idx_documents_category (category),
            INDEX idx_documents_linked (linked_type, linked_id),
            INDEX idx_documents_status (status)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    ");

    $pdo->exec("
        CREATE TABLE IF NOT EXISTS ekimmo_histories (
            state_id VARCHAR(80) NOT NULL,
            history_id VARCHAR(180) NOT NULL,
            entity_type VARCHAR(80) NOT NULL DEFAULT '',
            entity_id VARCHAR(180) NOT NULL DEFAULT '',
            title VARCHAR(220) NOT NULL DEFAULT '',
            detail TEXT NULL,
            event_date VARCHAR(80) NOT NULL DEFAULT '',
            user_name VARCHAR(180) NOT NULL DEFAULT '',
            payload_json LONGTEXT NOT NULL,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (state_id, history_id),
            INDEX idx_histories_entity (entity_type, entity_id),
            INDEX idx_histories_date (event_date)
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
