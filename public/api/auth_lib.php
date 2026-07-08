<?php
declare(strict_types=1);

require_once __DIR__ . '/db.php';

function start_app_session(): void
{
    if (session_status() === PHP_SESSION_ACTIVE) {
        return;
    }

    $secure = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off');
    session_set_cookie_params([
        'lifetime' => 0,
        'path' => '/',
        'secure' => $secure,
        'httponly' => true,
        'samesite' => 'Lax',
    ]);
    session_start();
}

function request_json(): array
{
    $raw = file_get_contents('php://input') ?: '{}';
    $payload = json_decode($raw, true);
    return is_array($payload) ? $payload : [];
}

function normalize_identifier(string $value): string
{
    return strtolower(trim($value));
}

function user_public_payload(array $user): array
{
    return [
        'id' => (string) $user['id'],
        'identifier' => (string) $user['identifier'],
        'name' => (string) $user['name'],
        'initials' => (string) ($user['initials'] ?? ''),
        'email' => (string) $user['email'],
        'phone' => (string) ($user['phone'] ?? ''),
        'role' => (string) $user['role'],
        'status' => (string) $user['status'],
        'lastLogin' => $user['last_login_at'] ? date('d/m/Y H:i', strtotime((string) $user['last_login_at'])) : 'Jamais connecté',
        'reportAccessMode' => (string) ($user['report_access_mode'] ?? 'Selon le role'),
        'reportAccess' => json_decode((string) ($user['report_access_json'] ?? '[]'), true) ?: [],
        'scope' => (string) ($user['scope'] ?? ''),
    ];
}

function safe_mail_headers(): string
{
    return implode("\r\n", [
        'From: E.K immo <noreply@ekimmo.pro>',
        'Reply-To: contact@ekimmo-mali.com',
        'MIME-Version: 1.0',
        'Content-Type: text/plain; charset=UTF-8',
        'X-Mailer: PHP/' . phpversion(),
    ]);
}

function send_app_mail(string $to, string $subject, string $message): bool
{
    $cleanSubject = trim(preg_replace('/[\r\n]+/', ' ', $subject) ?? $subject);
    return @mail($to, $cleanSubject, $message, safe_mail_headers());
}

function find_user_by_identifier(PDO $pdo, string $identifier): ?array
{
    $statement = $pdo->prepare('
        SELECT * FROM ekimmo_users
        WHERE LOWER(identifier) = :identifier_value
           OR LOWER(email) = :email_value
           OR LOWER(name) = :name_value
        LIMIT 1
    ');
    $normalized = normalize_identifier($identifier);
    $statement->execute([
        'identifier_value' => $normalized,
        'email_value' => $normalized,
        'name_value' => $normalized,
    ]);
    $user = $statement->fetch();
    return is_array($user) ? $user : null;
}

function find_user_by_id(PDO $pdo, string $id): ?array
{
    $statement = $pdo->prepare('SELECT * FROM ekimmo_users WHERE id = :id LIMIT 1');
    $statement->execute(['id' => $id]);
    $user = $statement->fetch();
    return is_array($user) ? $user : null;
}

function role_permissions(PDO $pdo, string $role): array
{
    if ($role === 'Administrateur') {
        return default_permission_matrix('Administrateur');
    }

    $statement = $pdo->prepare('SELECT payload, status FROM ekimmo_role_permissions WHERE role_name = :role_name LIMIT 1');
    $statement->execute(['role_name' => $role]);
    $row = $statement->fetch();
    if (!$row) {
        return default_permission_matrix($role);
    }
    if ($row['status'] === 'Inactif') {
        return empty_permission_matrix();
    }

    $decoded = json_decode((string) $row['payload'], true);
    return is_array($decoded) ? $decoded : default_permission_matrix($role);
}

function user_has_permission(PDO $pdo, array $user, string $module, string $permission): bool
{
    if (($user['status'] ?? '') !== 'Actif') {
        return false;
    }
    if (($user['role'] ?? '') === 'Administrateur') {
        return true;
    }

    $permissions = role_permissions($pdo, (string) $user['role']);
    return (bool) ($permissions[$module][$permission] ?? false);
}

function current_user(PDO $pdo): ?array
{
    start_app_session();
    $id = $_SESSION['ekimmo_user_id'] ?? '';
    if (!is_string($id) || $id === '') {
        return null;
    }

    $user = find_user_by_id($pdo, $id);
    if (!$user || $user['status'] !== 'Actif') {
        $_SESSION = [];
        session_destroy();
        return null;
    }

    return $user;
}

function require_user(PDO $pdo): array
{
    $user = current_user($pdo);
    if (!$user) {
        json_response([
            'ok' => false,
            'code' => 'auth_required',
            'message' => 'Connexion requise.',
        ], 401);
    }
    return $user;
}

function require_admin(PDO $pdo): array
{
    $user = require_user($pdo);
    if (!user_has_permission($pdo, $user, 'Administration', 'modifier')) {
        json_response([
            'ok' => false,
            'code' => 'forbidden',
            'message' => 'Acces administrateur requis.',
        ], 403);
    }
    return $user;
}

function csrf_token(): string
{
    start_app_session();
    if (empty($_SESSION['ekimmo_csrf'])) {
        $_SESSION['ekimmo_csrf'] = bin2hex(random_bytes(32));
    }
    return (string) $_SESSION['ekimmo_csrf'];
}

function require_csrf(): void
{
    start_app_session();
    $token = $_SERVER['HTTP_X_CSRF_TOKEN'] ?? '';
    if (!is_string($token) || $token === '' || !hash_equals((string) ($_SESSION['ekimmo_csrf'] ?? ''), $token)) {
        json_response([
            'ok' => false,
            'code' => 'invalid_csrf',
            'message' => 'Session expirée. Reconnectez-vous.',
        ], 419);
    }
}

function audit_admin(PDO $pdo, ?array $actor, string $action, ?string $targetId = null, ?string $detail = null): void
{
    $statement = $pdo->prepare('INSERT INTO ekimmo_admin_audit (actor_id, action, target_id, detail) VALUES (:actor_id, :action, :target_id, :detail)');
    $statement->execute([
        'actor_id' => $actor['id'] ?? null,
        'action' => $action,
        'target_id' => $targetId,
        'detail' => $detail,
    ]);
}

function list_public_users(PDO $pdo): array
{
    $statement = $pdo->query('
        SELECT *
        FROM ekimmo_users
        ORDER BY FIELD(role, "Administrateur", "Gestion locative & recouvrement", "Communication & prospection") = 0,
                 FIELD(role, "Administrateur", "Gestion locative & recouvrement", "Communication & prospection"),
                 created_at ASC,
                 name ASC
    ');
    $rows = $statement->fetchAll();
    return array_map('user_public_payload', is_array($rows) ? $rows : []);
}

function list_role_profiles(PDO $pdo): array
{
    $statement = $pdo->query('SELECT role_name, description, payload, status, updated_at FROM ekimmo_role_permissions ORDER BY role_name ASC');
    $rows = $statement->fetchAll();
    $roles = [];
    foreach (is_array($rows) ? $rows : [] as $row) {
        $name = (string) $row['role_name'];
        $permissions = json_decode((string) $row['payload'], true);
        $roles[] = [
            'name' => $name,
            'description' => (string) ($row['description'] ?? ''),
            'status' => (string) ($row['status'] ?? 'Actif'),
            'permissions' => $name === 'Administrateur'
                ? default_permission_matrix('Administrateur')
                : (is_array($permissions) ? $permissions : default_permission_matrix($name)),
            'updatedAt' => (string) ($row['updated_at'] ?? ''),
        ];
    }
    return $roles;
}

function admin_settings_payload(PDO $pdo): array
{
    $statement = $pdo->prepare('SELECT payload FROM ekimmo_admin_settings WHERE setting_key = :setting_key LIMIT 1');
    $statement->execute(['setting_key' => 'general']);
    $row = $statement->fetch();
    $decoded = $row ? json_decode((string) $row['payload'], true) : [];
    return array_merge(default_admin_settings(), is_array($decoded) ? $decoded : []);
}

function template_archives_payload(PDO $pdo): array
{
    $statement = $pdo->query('
        SELECT id, template_key, label, source, format, reason, comment, status, archived_by, archived_at
        FROM ekimmo_template_archives
        ORDER BY archived_at DESC
        LIMIT 200
    ');
    $rows = $statement->fetchAll();
    return array_map(static function (array $row): array {
        return [
            'id' => (string) $row['id'],
            'key' => (string) $row['template_key'],
            'label' => (string) $row['label'],
            'source' => (string) $row['source'],
            'format' => (string) $row['format'],
            'reason' => (string) ($row['reason'] ?? ''),
            'comment' => (string) ($row['comment'] ?? ''),
            'status' => (string) $row['status'],
            'date' => $row['archived_at'] ? date('d/m/Y H:i', strtotime((string) $row['archived_at'])) : '',
            'archivedBy' => (string) ($row['archived_by'] ?? ''),
        ];
    }, is_array($rows) ? $rows : []);
}

function audit_payload(PDO $pdo): array
{
    $statement = $pdo->query('
        SELECT audit.*, users.name AS actor_name
        FROM ekimmo_admin_audit audit
        LEFT JOIN ekimmo_users users ON users.id = audit.actor_id
        ORDER BY audit.created_at DESC
        LIMIT 200
    ');
    $rows = $statement->fetchAll();
    return array_map(static function (array $row): array {
        $date = $row['created_at'] ? strtotime((string) $row['created_at']) : false;
        return [
            'id' => (int) $row['id'],
            'date' => $date ? date('d/m/Y', $date) : '',
            'time' => $date ? date('H:i', $date) : '',
            'user' => (string) ($row['actor_name'] ?? 'Système'),
            'action' => (string) $row['action'],
            'target' => (string) ($row['target_id'] ?? ''),
            'detail' => (string) ($row['detail'] ?? ''),
        ];
    }, is_array($rows) ? $rows : []);
}

function admin_payload(PDO $pdo): array
{
    return [
        'users' => list_public_users($pdo),
        'roles' => list_role_profiles($pdo),
        'settings' => admin_settings_payload($pdo),
        'templateArchives' => template_archives_payload($pdo),
        'audit' => audit_payload($pdo),
    ];
}

function user_can_access_state_module(PDO $pdo, array $user, string $module, string $mode): bool
{
    if (($user['role'] ?? '') === 'Administrateur') {
        return true;
    }

    if ($mode === 'read') {
        foreach (['voir', 'creer', 'modifier', 'valider'] as $permission) {
            if (user_has_permission($pdo, $user, $module, $permission)) {
                return true;
            }
        }
        return false;
    }

    foreach (['creer', 'modifier', 'valider'] as $permission) {
        if (user_has_permission($pdo, $user, $module, $permission)) {
            return true;
        }
    }

    return false;
}

function state_keys_for_user(PDO $pdo, array $user, string $mode = 'read'): array
{
    if (($user['role'] ?? '') === 'Administrateur') {
        return ['*'];
    }

    $keys = ['schemaVersion'];
    $add = static function (array $items) use (&$keys): void {
        foreach ($items as $item) {
            if (!in_array($item, $keys, true)) {
                $keys[] = $item;
            }
        }
    };

    if (user_can_access_state_module($pdo, $user, 'Biens', $mode)) {
        $add(['createdProperties', 'propertyOverrides', 'propertyHistoryOverrides', 'propertyPdfArchives', 'propertyDocumentArchives', 'archivedProperties']);
    }
    if (user_can_access_state_module($pdo, $user, 'Clients', $mode)) {
        $add(['createdOwners', 'ownerOverrides', 'createdTenants', 'tenantOverrides', 'tenantRelances', 'tenantReceiptArchives', 'createdProspects', 'prospectOverrides', 'prospectProposals', 'prospectActivities', 'scheduledProspectVisits', 'prospectConversions', 'visitOverrides', 'visitHistories']);
    }
    if (user_can_access_state_module($pdo, $user, 'Contrats', $mode)) {
        $add(['generatedContracts', 'contractOverrides', 'contractTimelines', 'contractDeadlines', 'missingDocumentRequests', 'propertyDocumentArchives']);
    }
    if (user_can_access_state_module($pdo, $user, 'Finance', $mode)) {
        $add(['ownerReversements', 'recordedPayments', 'paymentHistories', 'paymentProofs', 'arrearsStatusOverrides', 'arrearsPromises', 'arrearsHistories', 'commissionOverrides', 'scheduledMaintenances', 'maintenanceCharges', 'maintenanceOverrides', 'reversalOverrides', 'chargeOverrides']);
    }
    if (user_can_access_state_module($pdo, $user, 'Administration', $mode)) {
        $add(['createdUsers', 'userOverrides', 'userHistories']);
    }

    return $keys;
}

function filter_state_for_user(PDO $pdo, array $data, array $user): array
{
    if (($user['role'] ?? '') === 'Administrateur') {
        return $data;
    }

    $allowed = state_keys_for_user($pdo, $user, 'read');
    return array_intersect_key($data, array_flip($allowed));
}

function filter_write_state_for_user(PDO $pdo, array $data, array $user): array
{
    if (($user['role'] ?? '') === 'Administrateur') {
        return $data;
    }

    $allowed = state_keys_for_user($pdo, $user, 'write');
    return array_intersect_key($data, array_flip($allowed));
}
