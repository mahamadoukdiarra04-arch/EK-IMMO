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

    $payload = [
        'ok' => true,
        'user' => user_public_payload($user),
        'permissions' => role_permissions($pdo, (string) $user['role']),
        'csrfToken' => csrf_token(),
    ];
    if (user_has_permission($pdo, $user, 'Administration', 'voir')) {
        $payload['admin'] = admin_payload($pdo);
    }
    json_response($payload);
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

    $payload = [
        'ok' => true,
        'user' => user_public_payload($user),
        'permissions' => role_permissions($pdo, (string) $user['role']),
        'csrfToken' => csrf_token(),
    ];
    if (user_has_permission($pdo, $user, 'Administration', 'voir')) {
        $payload['admin'] = admin_payload($pdo);
    }
    json_response($payload);
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
    $email = trim((string) ($body['email'] ?? ''));
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        json_response([
            'ok' => false,
            'code' => 'invalid_email',
            'message' => 'Adresse email invalide.',
        ], 400);
    }

    $user = find_user_by_identifier($pdo, $email);
    $matched = $user ? user_public_payload($user) : null;
    $lines = [
        'Demande de récupération de mot de passe E.K immo',
        '',
        'Email renseigné : ' . $email,
        'Date : ' . date('d/m/Y H:i:s'),
        'Adresse IP : ' . (string) ($_SERVER['REMOTE_ADDR'] ?? 'Adresse inconnue'),
        'Navigateur : ' . (string) ($_SERVER['HTTP_USER_AGENT'] ?? 'Navigateur inconnu'),
        '',
        'Compte correspondant : ' . ($matched ? 'Oui' : 'Non'),
    ];
    if ($matched) {
        $lines[] = 'Nom : ' . $matched['name'];
        $lines[] = 'Identifiant : ' . $matched['identifier'];
        $lines[] = 'Email du compte : ' . $matched['email'];
        $lines[] = 'Rôle : ' . $matched['role'];
        $lines[] = 'Statut : ' . $matched['status'];
    }
    $lines[] = '';
    $lines[] = 'Action recommandée : vérifier la demande puis modifier le mot de passe depuis Plus / Administration / Utilisateurs.';

    $sent = send_app_mail('contact@ekimmo-mali.com', 'E.K immo - Demande de mot de passe oublié', implode("\n", $lines));
    audit_admin($pdo, null, 'forgot_password_request', $matched['id'] ?? null, 'Demande pour ' . $email . ($sent ? ' envoyée par email.' : ' non envoyée par email.'));
    if (!$sent) {
        json_response([
            'ok' => false,
            'code' => 'mail_failed',
            'message' => 'Impossible d’envoyer la demande pour le moment. Veuillez réessayer.',
        ], 500);
    }

    json_response([
        'ok' => true,
        'message' => 'Si cette adresse est associée à un compte, la demande a été transmise à l’administration.',
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
        $password = (string) ($body['temporaryPassword'] ?? $body['password'] ?? $userPayload['temporaryPassword'] ?? '123456');

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
        if (!empty($body['sendInvitation'])) {
            send_app_mail(
                'contact@ekimmo-mali.com',
                'E.K immo - Nouvel utilisateur créé',
                "Un utilisateur a été créé dans E.K immo.\n\nNom : $name\nIdentifiant : $identifier\nEmail : $email\nRôle : " . (string) ($userPayload['role'] ?? 'Gestion locative & recouvrement') . "\n\nL’administration doit communiquer les accès au collaborateur."
            );
        }
        $created = find_user_by_id($pdo, $id);
        json_response(['ok' => true, 'user' => $created ? user_public_payload($created) : $userPayload, 'admin' => admin_payload($pdo)]);
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
        if ($targetId === (string) $admin['id'] && $status !== 'Actif') {
            json_response([
                'ok' => false,
                'code' => 'self_lockout_forbidden',
                'message' => 'Vous ne pouvez pas suspendre votre propre compte administrateur.',
            ], 400);
        }
        $statement = $pdo->prepare('UPDATE ekimmo_users SET status = :status WHERE id = :id');
        $statement->execute(['id' => $targetId, 'status' => $status]);
        audit_admin($pdo, $admin, 'set_user_status', $targetId, $status);
    }

    if ($action === 'set_user_role') {
        $role = (string) ($body['role'] ?? $values['role'] ?? 'Gestion locative & recouvrement');
        if ($targetId === (string) $admin['id'] && $role !== 'Administrateur') {
            json_response([
                'ok' => false,
                'code' => 'self_role_change_forbidden',
                'message' => 'Vous ne pouvez pas retirer votre propre rôle administrateur.',
            ], 400);
        }
        $statement = $pdo->prepare('UPDATE ekimmo_users SET role = :role WHERE id = :id');
        $statement->execute(['id' => $targetId, 'role' => $role]);
        audit_admin($pdo, $admin, 'set_user_role', $targetId, $role);
    }

    if ($action === 'set_user_password') {
        $password = (string) ($body['password'] ?? $body['temporaryPassword'] ?? $values['newPassword'] ?? $values['temporaryPassword'] ?? '');
        if (strlen($password) < 6) {
            json_response([
                'ok' => false,
                'code' => 'weak_password',
                'message' => 'Le mot de passe temporaire doit contenir au moins 6 caracteres.',
            ], 400);
        }
        $statement = $pdo->prepare('UPDATE ekimmo_users SET password_hash = :password_hash WHERE id = :id');
        $statement->execute(['id' => $targetId, 'password_hash' => password_hash($password, PASSWORD_DEFAULT)]);
        $detail = (string) ($body['detail'] ?? $values['detail'] ?? 'Mot de passe utilisateur modifié par l’administration.');
        audit_admin($pdo, $admin, 'set_user_password', $targetId, $detail);
        if (!empty($body['notifyContact']) || !empty($values['notifyContact'])) {
            $target = find_user_by_id($pdo, $targetId);
            send_app_mail(
                'contact@ekimmo-mali.com',
                'E.K immo - Mot de passe utilisateur modifié',
                "Le mot de passe d’un utilisateur a été modifié.\n\nUtilisateur : " . (string) ($target['name'] ?? $targetId) . "\nIdentifiant : " . (string) ($target['identifier'] ?? '') . "\nEmail : " . (string) ($target['email'] ?? '') . "\nAction réalisée par : " . (string) ($admin['name'] ?? 'Administrateur') . "\nDate : " . date('d/m/Y H:i:s') . "\n\nPar sécurité, le mot de passe n’est pas inclus dans ce message."
            );
        }
    }

    $updated = find_user_by_id($pdo, $targetId);
    json_response(['ok' => true, 'user' => $updated ? user_public_payload($updated) : null, 'admin' => admin_payload($pdo)]);
}

if (in_array($action, ['save_role_permissions', 'create_role', 'update_role', 'duplicate_role', 'set_role_status'], true)) {
    $admin = require_admin($pdo);
    $role = (string) ($body['role'] ?? '');
    $values = is_array($body['values'] ?? null) ? $body['values'] : [];
    $permissions = is_array($body['permissions'] ?? null) ? $body['permissions'] : [];

    if ($action === 'create_role') {
        $role = trim((string) ($values['name'] ?? $body['name'] ?? ''));
        if ($role === '') {
            json_response(['ok' => false, 'code' => 'invalid_role', 'message' => 'Nom du rôle obligatoire.'], 400);
        }
        $sourceRole = (string) ($values['sourceRole'] ?? 'Communication & prospection');
        $permissions = (($values['copyPermissions'] ?? 'Non') === 'Oui') ? role_permissions($pdo, $sourceRole) : default_permission_matrix($sourceRole);
        $statement = $pdo->prepare('
            INSERT INTO ekimmo_role_permissions (role_name, description, payload, status)
            VALUES (:role_name, :description, :payload, :status)
            ON DUPLICATE KEY UPDATE description = VALUES(description), payload = VALUES(payload), status = VALUES(status)
        ');
        $statement->execute([
            'role_name' => $role,
            'description' => (string) ($values['description'] ?? 'Rôle personnalisé E.K immo.'),
            'payload' => json_encode($permissions, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
            'status' => 'Actif',
        ]);
        audit_admin($pdo, $admin, 'create_role', $role, 'Rôle créé.');
        json_response(['ok' => true, 'admin' => admin_payload($pdo)]);
    }

    if ($action === 'update_role') {
        $nextName = trim((string) ($values['name'] ?? $role));
        if ($role === '' || $nextName === '') {
            json_response(['ok' => false, 'code' => 'invalid_role', 'message' => 'Rôle invalide.'], 400);
        }
        if ($role === 'Administrateur' && $nextName !== 'Administrateur') {
            json_response([
                'ok' => false,
                'code' => 'admin_role_protected',
                'message' => 'Le rôle Administrateur ne peut pas être renommé.',
            ], 400);
        }
        $currentPermissions = role_permissions($pdo, $role);
        $description = (string) ($values['description'] ?? '');
        if ($nextName !== $role) {
            $delete = $pdo->prepare('DELETE FROM ekimmo_role_permissions WHERE role_name = :role_name');
            $delete->execute(['role_name' => $role]);
        }
        $statement = $pdo->prepare('
            INSERT INTO ekimmo_role_permissions (role_name, description, payload, status)
            VALUES (:role_name, :description, :payload, :status)
            ON DUPLICATE KEY UPDATE description = VALUES(description), payload = VALUES(payload), status = VALUES(status)
        ');
        $statement->execute([
            'role_name' => $nextName,
            'description' => $description,
            'payload' => json_encode($currentPermissions, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
            'status' => (string) ($values['status'] ?? 'Actif'),
        ]);
        if ($nextName !== $role) {
            $users = $pdo->prepare('UPDATE ekimmo_users SET role = :next_role WHERE role = :old_role');
            $users->execute(['next_role' => $nextName, 'old_role' => $role]);
        }
        audit_admin($pdo, $admin, 'update_role', $nextName, $nextName !== $role ? "Renommé depuis $role." : 'Rôle modifié.');
        json_response(['ok' => true, 'admin' => admin_payload($pdo)]);
    }

    if ($action === 'duplicate_role') {
        $sourceRole = (string) ($values['sourceRole'] ?? $role);
        $nextName = trim((string) ($values['name'] ?? ''));
        if ($sourceRole === '' || $nextName === '') {
            json_response(['ok' => false, 'code' => 'invalid_role', 'message' => 'Rôle source ou destination invalide.'], 400);
        }
        $statement = $pdo->prepare('
            INSERT INTO ekimmo_role_permissions (role_name, description, payload, status)
            VALUES (:role_name, :description, :payload, :status)
            ON DUPLICATE KEY UPDATE description = VALUES(description), payload = VALUES(payload), status = VALUES(status)
        ');
        $statement->execute([
            'role_name' => $nextName,
            'description' => 'Copie du rôle ' . $sourceRole,
            'payload' => json_encode(role_permissions($pdo, $sourceRole), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
            'status' => 'Actif',
        ]);
        audit_admin($pdo, $admin, 'duplicate_role', $nextName, 'Copie de ' . $sourceRole);
        json_response(['ok' => true, 'admin' => admin_payload($pdo)]);
    }

    if ($action === 'set_role_status') {
        if ($role === '') {
            json_response(['ok' => false, 'code' => 'invalid_role', 'message' => 'Rôle invalide.'], 400);
        }
        $status = (string) ($body['status'] ?? $values['status'] ?? 'Inactif');
        if ($role === 'Administrateur' && $status !== 'Actif') {
            json_response([
                'ok' => false,
                'code' => 'admin_role_protected',
                'message' => 'Le rôle Administrateur ne peut pas être désactivé.',
            ], 400);
        }
        $statement = $pdo->prepare('UPDATE ekimmo_role_permissions SET status = :status WHERE role_name = :role_name');
        $statement->execute(['role_name' => $role, 'status' => $status]);
        audit_admin($pdo, $admin, 'set_role_status', $role, $status);
        json_response(['ok' => true, 'admin' => admin_payload($pdo)]);
    }

    if ($role === '' || !$permissions) {
        json_response([
            'ok' => false,
            'code' => 'invalid_role',
            'message' => 'Role ou permissions invalides.',
        ], 400);
    }

    $statement = $pdo->prepare('
        INSERT INTO ekimmo_role_permissions (role_name, description, payload, status)
        VALUES (:role_name, :description, :payload, :status)
        ON DUPLICATE KEY UPDATE payload = VALUES(payload), status = VALUES(status)
    ');
    $statement->execute([
        'role_name' => $role,
        'description' => (string) ($body['description'] ?? ''),
        'payload' => json_encode($permissions, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
        'status' => (string) ($body['status'] ?? 'Actif'),
    ]);
    audit_admin($pdo, $admin, 'save_role_permissions', $role, 'Permissions serveur mises a jour.');
    json_response(['ok' => true, 'admin' => admin_payload($pdo)]);
}

if ($action === 'save_admin_settings') {
    $admin = require_admin($pdo);
    $settings = is_array($body['settings'] ?? null) ? $body['settings'] : [];
    $payload = array_merge(default_admin_settings(), $settings);
    $statement = $pdo->prepare('
        INSERT INTO ekimmo_admin_settings (setting_key, payload, updated_by)
        VALUES (:setting_key, :payload, :updated_by)
        ON DUPLICATE KEY UPDATE payload = VALUES(payload), updated_by = VALUES(updated_by)
    ');
    $statement->execute([
        'setting_key' => 'general',
        'payload' => json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
        'updated_by' => $admin['id'],
    ]);
    audit_admin($pdo, $admin, 'save_admin_settings', 'general', 'Paramètres généraux enregistrés.');
    json_response(['ok' => true, 'admin' => admin_payload($pdo)]);
}

if ($action === 'archive_template') {
    $admin = require_admin($pdo);
    $template = is_array($body['template'] ?? null) ? $body['template'] : [];
    $values = is_array($body['values'] ?? null) ? $body['values'] : [];
    $key = (string) ($template['key'] ?? '');
    if ($key === '') {
        json_response(['ok' => false, 'code' => 'invalid_template', 'message' => 'Modèle introuvable.'], 400);
    }
    $id = 'template-archive-' . preg_replace('/[^A-Za-z0-9_-]+/', '-', $key) . '-' . date('YmdHis');
    $statement = $pdo->prepare('
        INSERT INTO ekimmo_template_archives
            (id, template_key, label, source, format, reason, comment, status, archived_by)
        VALUES
            (:id, :template_key, :label, :source, :format, :reason, :comment, :status, :archived_by)
        ON DUPLICATE KEY UPDATE reason = VALUES(reason), comment = VALUES(comment), status = VALUES(status)
    ');
    $statement->execute([
        'id' => $id,
        'template_key' => $key,
        'label' => (string) ($template['label'] ?? $key),
        'source' => (string) ($template['source'] ?? ''),
        'format' => (string) ($template['format'] ?? ''),
        'reason' => (string) ($values['reason'] ?? ''),
        'comment' => (string) ($values['comment'] ?? ''),
        'status' => 'Archivé',
        'archived_by' => $admin['id'],
    ]);
    audit_admin($pdo, $admin, 'archive_template', $key, (string) ($values['reason'] ?? 'Modèle archivé.'));
    json_response(['ok' => true, 'admin' => admin_payload($pdo)]);
}

json_response([
    'ok' => false,
    'code' => 'unknown_action',
    'message' => 'Action non reconnue.',
], 400);
