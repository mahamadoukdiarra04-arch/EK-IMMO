<?php
declare(strict_types=1);

require_once __DIR__ . '/auth_lib.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

$pdo = db();
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

if ($method === 'GET') {
    $user = current_user($pdo);
    if (!$user) {
        json_response([
            'ok' => false,
            'code' => 'auth_required',
            'message' => 'Connexion requise.',
        ], 401);
    }

    json_response([
        'ok' => true,
        'user' => user_public_payload($user),
        'permissions' => role_permissions($pdo, (string) $user['role']),
        'csrfToken' => csrf_token(),
    ]);
}

if ($method !== 'POST') {
    json_response([
        'ok' => false,
        'code' => 'method_not_allowed',
        'message' => 'Methode non autorisee.',
    ], 405);
}

$body = request_json();
$action = (string) ($body['action'] ?? '');

if ($action === 'login') {
    $identifier = (string) ($body['identifier'] ?? '');
    $password = (string) ($body['password'] ?? '');
    $user = find_user_by_identifier($pdo, $identifier);

    if (!$user || !password_verify($password, (string) $user['password_hash']) || $user['status'] !== 'Actif') {
        json_response([
            'ok' => false,
            'code' => 'invalid_credentials',
            'message' => 'Identifiant ou mot de passe incorrect.',
        ], 401);
    }

    start_app_session();
    session_regenerate_id(true);
    $_SESSION['ekimmo_user_id'] = $user['id'];
    $_SESSION['ekimmo_csrf'] = bin2hex(random_bytes(32));

    $update = $pdo->prepare('UPDATE ekimmo_users SET last_login_at = NOW() WHERE id = :id');
    $update->execute(['id' => $user['id']]);
    $user = find_user_by_id($pdo, (string) $user['id']) ?? $user;

    json_response([
        'ok' => true,
        'user' => user_public_payload($user),
        'permissions' => role_permissions($pdo, (string) $user['role']),
        'csrfToken' => csrf_token(),
    ]);
}

if ($action === 'logout') {
    start_app_session();
    $_SESSION = [];
    if (ini_get('session.use_cookies')) {
        $params = session_get_cookie_params();
        setcookie(session_name(), '', time() - 42000, $params['path'], $params['domain'] ?? '', (bool) $params['secure'], (bool) $params['httponly']);
    }
    session_destroy();
    json_response(['ok' => true]);
}

if ($action === 'forgot_password') {
    json_response([
        'ok' => true,
        'message' => 'Si cette adresse est associee a un compte, un lien de reinitialisation a ete envoye.',
    ]);
}

require_csrf();
$actor = require_user($pdo);

if ($action === 'change_password') {
    $currentPassword = (string) ($body['currentPassword'] ?? '');
    $newPassword = (string) ($body['newPassword'] ?? '');

    if (!password_verify($currentPassword, (string) $actor['password_hash'])) {
        json_response([
            'ok' => false,
            'code' => 'invalid_current_password',
            'message' => 'Mot de passe actuel incorrect.',
        ], 400);
    }
    if (strlen($newPassword) < 6) {
        json_response([
            'ok' => false,
            'code' => 'weak_password',
            'message' => 'Le nouveau mot de passe doit contenir au moins 6 caracteres.',
        ], 400);
    }

    $statement = $pdo->prepare('UPDATE ekimmo_users SET password_hash = :password_hash WHERE id = :id');
    $statement->execute([
        'password_hash' => password_hash($newPassword, PASSWORD_DEFAULT),
        'id' => $actor['id'],
    ]);
    audit_admin($pdo, $actor, 'change_password', (string) $actor['id'], 'Mot de passe utilisateur mis a jour.');
    json_response(['ok' => true]);
}

if (in_array($action, ['create_user', 'update_user', 'set_user_status', 'set_user_role', 'set_user_password'], true)) {
    $admin = require_admin($pdo);
    $userPayload = is_array($body['user'] ?? null) ? $body['user'] : [];
    $values = is_array($body['values'] ?? null) ? $body['values'] : [];

    if ($action === 'create_user') {
        $id = (string) ($userPayload['id'] ?? ('USR-' . date('YmdHis')));
        $name = trim((string) ($userPayload['name'] ?? 'Nouvel utilisateur'));
        $identifier = trim((string) ($userPayload['identifier'] ?? strtok($name, ' ')));
        $email = trim((string) ($userPayload['email'] ?? ''));
        $password = (string) ($body['temporaryPassword'] ?? $userPayload['temporaryPassword'] ?? '123456');

        if ($email === '' || $identifier === '') {
            json_response([
                'ok' => false,
                'code' => 'invalid_user',
                'message' => 'Identifiant et email obligatoires.',
            ], 400);
        }

        $statement = $pdo->prepare('
            INSERT INTO ekimmo_users
                (id, identifier, name, initials, email, phone, role, status, report_access_mode, report_access_json, scope, password_hash)
            VALUES
                (:id, :identifier, :name, :initials, :email, :phone, :role, :status, :report_access_mode, :report_access_json, :scope, :password_hash)
            ON DUPLICATE KEY UPDATE
                name = VALUES(name),
                initials = VALUES(initials),
                phone = VALUES(phone),
                role = VALUES(role),
                status = VALUES(status),
                report_access_mode = VALUES(report_access_mode),
                report_access_json = VALUES(report_access_json),
                scope = VALUES(scope)
        ');
        $statement->execute([
            'id' => $id,
            'identifier' => $identifier,
            'name' => $name,
            'initials' => (string) ($userPayload['initials'] ?? ''),
            'email' => $email,
            'phone' => (string) ($userPayload['phone'] ?? ''),
            'role' => (string) ($userPayload['role'] ?? 'Gestion locative & recouvrement'),
            'status' => (string) ($userPayload['status'] ?? 'Actif'),
            'report_access_mode' => (string) ($userPayload['reportAccessMode'] ?? 'Selon le role'),
            'report_access_json' => json_encode($userPayload['reportAccess'] ?? [], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
            'scope' => (string) ($userPayload['scope'] ?? ''),
            'password_hash' => password_hash($password, PASSWORD_DEFAULT),
        ]);
        audit_admin($pdo, $admin, 'create_user', $id, $name);
        $created = find_user_by_id($pdo, $id);
        json_response(['ok' => true, 'user' => $created ? user_public_payload($created) : $userPayload]);
    }

    $targetId = (string) ($userPayload['id'] ?? $values['id'] ?? '');
    if ($targetId === '') {
        json_response([
            'ok' => false,
            'code' => 'missing_user',
            'message' => 'Utilisateur introuvable.',
        ], 400);
    }

    if ($action === 'update_user') {
        $statement = $pdo->prepare('
            UPDATE ekimmo_users
            SET name = :name,
                email = :email,
                phone = :phone,
                role = :role,
                status = :status,
                report_access_mode = :report_access_mode,
                report_access_json = :report_access_json
            WHERE id = :id
        ');
        $statement->execute([
            'id' => $targetId,
            'name' => (string) ($values['name'] ?? $userPayload['name'] ?? ''),
            'email' => (string) ($values['email'] ?? $userPayload['email'] ?? ''),
            'phone' => (string) ($values['phone'] ?? $userPayload['phone'] ?? ''),
            'role' => (string) ($values['role'] ?? $userPayload['role'] ?? 'Gestion locative & recouvrement'),
            'status' => (string) ($values['status'] ?? $userPayload['status'] ?? 'Actif'),
            'report_access_mode' => (string) ($values['reportAccessMode'] ?? $userPayload['reportAccessMode'] ?? 'Selon le role'),
            'report_access_json' => json_encode($values['reportAccess'] ?? $userPayload['reportAccess'] ?? [], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
        ]);
        audit_admin($pdo, $admin, 'update_user', $targetId, 'Profil utilisateur modifie.');
    }

    if ($action === 'set_user_status') {
        $status = (string) ($body['status'] ?? $values['status'] ?? 'Suspendu');
        $statement = $pdo->prepare('UPDATE ekimmo_users SET status = :status WHERE id = :id');
        $statement->execute(['id' => $targetId, 'status' => $status]);
        audit_admin($pdo, $admin, 'set_user_status', $targetId, $status);
    }

    if ($action === 'set_user_role') {
        $role = (string) ($body['role'] ?? $values['role'] ?? 'Gestion locative & recouvrement');
        $statement = $pdo->prepare('UPDATE ekimmo_users SET role = :role WHERE id = :id');
        $statement->execute(['id' => $targetId, 'role' => $role]);
        audit_admin($pdo, $admin, 'set_user_role', $targetId, $role);
    }

    if ($action === 'set_user_password') {
        $password = (string) ($body['temporaryPassword'] ?? $values['temporaryPassword'] ?? '');
        if (strlen($password) < 6) {
            json_response([
                'ok' => false,
                'code' => 'weak_password',
                'message' => 'Le mot de passe temporaire doit contenir au moins 6 caracteres.',
            ], 400);
        }
        $statement = $pdo->prepare('UPDATE ekimmo_users SET password_hash = :password_hash WHERE id = :id');
        $statement->execute(['id' => $targetId, 'password_hash' => password_hash($password, PASSWORD_DEFAULT)]);
        audit_admin($pdo, $admin, 'set_user_password', $targetId, 'Mot de passe temporaire genere.');
    }

    $updated = find_user_by_id($pdo, $targetId);
    json_response(['ok' => true, 'user' => $updated ? user_public_payload($updated) : null]);
}

if ($action === 'save_role_permissions') {
    $admin = require_admin($pdo);
    $role = (string) ($body['role'] ?? '');
    $permissions = is_array($body['permissions'] ?? null) ? $body['permissions'] : [];

    if ($role === '' || !$permissions) {
        json_response([
            'ok' => false,
            'code' => 'invalid_role',
            'message' => 'Role ou permissions invalides.',
        ], 400);
    }

    $statement = $pdo->prepare('
        INSERT INTO ekimmo_role_permissions (role_name, payload, status)
        VALUES (:role_name, :payload, :status)
        ON DUPLICATE KEY UPDATE payload = VALUES(payload), status = VALUES(status)
    ');
    $statement->execute([
        'role_name' => $role,
        'payload' => json_encode($permissions, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
        'status' => (string) ($body['status'] ?? 'Actif'),
    ]);
    audit_admin($pdo, $admin, 'save_role_permissions', $role, 'Permissions serveur mises a jour.');
    json_response(['ok' => true, 'permissions' => $permissions]);
}

json_response([
    'ok' => false,
    'code' => 'unknown_action',
    'message' => 'Action non reconnue.',
], 400);
