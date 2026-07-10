<?php
declare(strict_types=1);

require_once __DIR__ . '/auth_lib.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

const EK_UPLOAD_MAX_BYTES = 10485760; // 10 Mo

$pdo = db();
$user = require_user($pdo);
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

if ($method === 'GET') {
    $requestedId = trim((string) ($_GET['id'] ?? ''));
    $requestedPath = trim((string) ($_GET['path'] ?? ''));
    if ($requestedId !== '' || $requestedPath !== '') {
        serve_upload_file($pdo, $user, $requestedId, $requestedPath);
    }

    $module = normalize_upload_module((string) ($_GET['module'] ?? 'Docs'));
    if (!user_can_access_state_module($pdo, $user, $module, 'read')) {
        json_response(['ok' => false, 'code' => 'forbidden', 'message' => 'Consultation des fichiers non autorisée.'], 403);
    }

    $linkedType = trim((string) ($_GET['linked_type'] ?? $_GET['linkedType'] ?? ''));
    $linkedId = trim((string) ($_GET['linked_id'] ?? $_GET['linkedId'] ?? ''));
    $sql = 'SELECT * FROM ekimmo_uploads WHERE status = "Actif" AND module = :module';
    $params = ['module' => $module];
    if ($linkedType !== '') {
        $sql .= ' AND linked_type = :linked_type';
        $params['linked_type'] = $linkedType;
    }
    if ($linkedId !== '') {
        $sql .= ' AND linked_id = :linked_id';
        $params['linked_id'] = $linkedId;
    }
    $sql .= ' ORDER BY created_at DESC LIMIT 200';
    $statement = $pdo->prepare($sql);
    $statement->execute($params);
    json_response([
        'ok' => true,
        'uploads' => array_map('upload_public_payload', $statement->fetchAll() ?: []),
        'csrfToken' => csrf_token(),
    ]);
}

if ($method === 'DELETE') {
    require_csrf();
    $body = request_json();
    $id = (string) ($body['id'] ?? $_GET['id'] ?? '');
    if ($id === '') {
        json_response(['ok' => false, 'code' => 'missing_upload', 'message' => 'Fichier introuvable.'], 400);
    }
    $upload = find_upload($pdo, $id);
    if (!$upload) {
        json_response(['ok' => false, 'code' => 'missing_upload', 'message' => 'Fichier introuvable.'], 404);
    }
    $module = normalize_upload_module((string) $upload['module']);
    $isOwner = (string) ($upload['user_id'] ?? '') === (string) ($user['id'] ?? '');
    if (!$isOwner && !user_can_access_state_module($pdo, $user, $module, 'write')) {
        json_response(['ok' => false, 'code' => 'forbidden', 'message' => 'Suppression du fichier non autorisée.'], 403);
    }

    $fileRemoved = remove_uploaded_file_from_disk($upload);
    $statement = $pdo->prepare('UPDATE ekimmo_uploads SET status = "Supprimé" WHERE id = :id');
    $statement->execute(['id' => $id]);
    audit_admin($pdo, $user, 'delete_upload', $id, 'Fichier marqué comme supprimé.');
    json_response(['ok' => true, 'fileRemoved' => $fileRemoved, 'csrfToken' => csrf_token()]);
}

if ($method !== 'POST') {
    json_response(['ok' => false, 'code' => 'method_not_allowed', 'message' => 'Méthode non autorisée.'], 405);
}

require_csrf();

$module = normalize_upload_module((string) ($_POST['module'] ?? 'Docs'));
if (!user_can_access_state_module($pdo, $user, $module, 'write')) {
    json_response(['ok' => false, 'code' => 'forbidden', 'message' => 'Envoi de fichier non autorisé.'], 403);
}

$file = $_FILES['file'] ?? null;
if (!is_array($file) || ($file['error'] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_OK) {
    json_response(['ok' => false, 'code' => 'upload_failed', 'message' => upload_error_message((int) ($file['error'] ?? UPLOAD_ERR_NO_FILE))], 400);
}

$size = (int) ($file['size'] ?? 0);
if ($size <= 0 || $size > EK_UPLOAD_MAX_BYTES) {
    json_response(['ok' => false, 'code' => 'invalid_size', 'message' => 'Le fichier doit peser 10 Mo maximum.'], 400);
}

$originalName = sanitize_upload_name((string) ($file['name'] ?? 'document'));
$extension = strtolower(pathinfo($originalName, PATHINFO_EXTENSION));
$allowedExtensions = [
    'pdf' => 'application/pdf',
    'jpg' => 'image/jpeg',
    'jpeg' => 'image/jpeg',
    'png' => 'image/png',
    'webp' => 'image/webp',
    'doc' => 'application/msword',
    'docx' => 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];
if (!array_key_exists($extension, $allowedExtensions)) {
    json_response(['ok' => false, 'code' => 'invalid_extension', 'message' => 'Format non autorisé. Formats acceptés : PDF, JPG, PNG, WEBP, DOC, DOCX.'], 400);
}

$mimeType = detect_upload_mime((string) ($file['tmp_name'] ?? ''), $allowedExtensions[$extension]);
if (!is_upload_mime_allowed($mimeType, $extension)) {
    json_response(['ok' => false, 'code' => 'invalid_mime', 'message' => 'Type de fichier non reconnu ou non autorisé.'], 400);
}

$uploadId = 'UPL-' . date('YmdHis') . '-' . bin2hex(random_bytes(6));
$storedName = $uploadId . '.' . $extension;
$relativeDir = 'uploads/' . date('Y/m');
$baseDir = dirname(__DIR__) . DIRECTORY_SEPARATOR . 'uploads';
$targetDir = dirname(__DIR__) . DIRECTORY_SEPARATOR . str_replace('/', DIRECTORY_SEPARATOR, $relativeDir);
ensure_upload_directory($baseDir, $targetDir);

$targetPath = $targetDir . DIRECTORY_SEPARATOR . $storedName;
if (!move_uploaded_file((string) $file['tmp_name'], $targetPath)) {
    json_response(['ok' => false, 'code' => 'move_failed', 'message' => 'Impossible d’enregistrer le fichier.'], 500);
}

$publicUrl = protected_upload_url($uploadId);
$category = trim((string) ($_POST['category'] ?? ''));
$linkedType = trim((string) ($_POST['linkedType'] ?? $_POST['linked_type'] ?? ''));
$linkedId = trim((string) ($_POST['linkedId'] ?? $_POST['linked_id'] ?? ''));

$statement = $pdo->prepare('
    INSERT INTO ekimmo_uploads
        (id, user_id, module, category, linked_type, linked_id, original_name, stored_name, relative_path, public_url, mime_type, file_size)
    VALUES
        (:id, :user_id, :module, :category, :linked_type, :linked_id, :original_name, :stored_name, :relative_path, :public_url, :mime_type, :file_size)
');
$statement->execute([
    'id' => $uploadId,
    'user_id' => (string) ($user['id'] ?? ''),
    'module' => $module,
    'category' => $category,
    'linked_type' => $linkedType,
    'linked_id' => $linkedId,
    'original_name' => $originalName,
    'stored_name' => $storedName,
    'relative_path' => $relativeDir . '/' . $storedName,
    'public_url' => $publicUrl,
    'mime_type' => $mimeType,
    'file_size' => $size,
]);

audit_admin($pdo, $user, 'upload_file', $uploadId, trim("$module $category $linkedType $linkedId"));

$upload = find_upload($pdo, $uploadId);
json_response([
    'ok' => true,
    'upload' => upload_public_payload($upload ?: [
        'id' => $uploadId,
        'module' => $module,
        'category' => $category,
        'linked_type' => $linkedType,
        'linked_id' => $linkedId,
        'original_name' => $originalName,
        'stored_name' => $storedName,
        'public_url' => $publicUrl,
        'mime_type' => $mimeType,
        'file_size' => $size,
        'created_at' => date('Y-m-d H:i:s'),
    ]),
    'csrfToken' => csrf_token(),
]);

function normalize_upload_module(string $module): string
{
    $aliases = [
        'Docs' => 'Contrats',
        'Documents' => 'Contrats',
        'Document' => 'Contrats',
        'Charges' => 'Finance',
        'Entretiens' => 'Finance',
        'Reversements' => 'Finance',
        'Paiements' => 'Finance',
        'Impayés' => 'Finance',
        'Impaye' => 'Finance',
        'Clients' => 'Clients',
        'Biens' => 'Biens',
        'Contrats' => 'Contrats',
        'Finance' => 'Finance',
        'Rapports' => 'Rapports',
        'Administration' => 'Administration',
    ];
    $trimmed = trim($module);
    return $aliases[$trimmed] ?? 'Contrats';
}

function sanitize_upload_name(string $name): string
{
    $name = basename(str_replace('\\', '/', $name));
    $name = preg_replace('/[^\pL\pN._ -]+/u', '_', $name) ?: 'document';
    $name = trim($name, " ._-\t\n\r\0\x0B");
    return substr($name !== '' ? $name : 'document', 0, 180);
}

function detect_upload_mime(string $path, string $fallback): string
{
    if (function_exists('finfo_open')) {
        $finfo = finfo_open(FILEINFO_MIME_TYPE);
        if ($finfo) {
            $detected = finfo_file($finfo, $path);
            finfo_close($finfo);
            if (is_string($detected) && $detected !== '') {
                return $detected;
            }
        }
    }
    return $fallback;
}

function is_upload_mime_allowed(string $mimeType, string $extension): bool
{
    $mimeType = strtolower($mimeType);
    if ($extension === 'docx') {
        return in_array($mimeType, [
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/zip',
            'application/octet-stream',
        ], true);
    }
    if ($extension === 'doc') {
        return in_array($mimeType, ['application/msword', 'application/octet-stream'], true);
    }
    $allowed = [
        'pdf' => ['application/pdf'],
        'jpg' => ['image/jpeg'],
        'jpeg' => ['image/jpeg'],
        'png' => ['image/png'],
        'webp' => ['image/webp'],
    ];
    return in_array($mimeType, $allowed[$extension] ?? [], true);
}

function ensure_upload_directory(string $baseDir, string $targetDir): void
{
    if (!is_dir($baseDir) && !mkdir($baseDir, 0755, true) && !is_dir($baseDir)) {
        json_response(['ok' => false, 'code' => 'directory_failed', 'message' => 'Dossier uploads indisponible.'], 500);
    }
    $htaccess = $baseDir . DIRECTORY_SEPARATOR . '.htaccess';
    $htaccessContent = upload_htaccess_content();
    if (!is_file($htaccess) || trim((string) @file_get_contents($htaccess)) !== trim($htaccessContent)) {
        @file_put_contents($htaccess, $htaccessContent);
    }
    if (!is_dir($targetDir) && !mkdir($targetDir, 0755, true) && !is_dir($targetDir)) {
        json_response(['ok' => false, 'code' => 'directory_failed', 'message' => 'Dossier uploads indisponible.'], 500);
    }
}

function upload_public_payload(array $row): array
{
    $legacyUrl = (string) ($row['public_url'] ?? '');
    return [
        'id' => (string) $row['id'],
        'module' => (string) ($row['module'] ?? ''),
        'category' => (string) ($row['category'] ?? ''),
        'linkedType' => (string) ($row['linked_type'] ?? ''),
        'linkedId' => (string) ($row['linked_id'] ?? ''),
        'originalName' => (string) ($row['original_name'] ?? ''),
        'storedName' => (string) ($row['stored_name'] ?? ''),
        'url' => protected_upload_url((string) $row['id']),
        'legacyUrl' => str_starts_with($legacyUrl, '/uploads/') ? $legacyUrl : '',
        'mimeType' => (string) ($row['mime_type'] ?? ''),
        'size' => (int) ($row['file_size'] ?? 0),
        'createdAt' => isset($row['created_at']) ? (string) $row['created_at'] : '',
    ];
}

function find_upload(PDO $pdo, string $id): ?array
{
    $statement = $pdo->prepare('SELECT * FROM ekimmo_uploads WHERE id = :id LIMIT 1');
    $statement->execute(['id' => $id]);
    $row = $statement->fetch();
    return is_array($row) ? $row : null;
}

function find_upload_by_path(PDO $pdo, string $path): ?array
{
    $normalized = normalize_requested_upload_path($path);
    if ($normalized === '') {
        return null;
    }
    $statement = $pdo->prepare('SELECT * FROM ekimmo_uploads WHERE relative_path = :path LIMIT 1');
    $statement->execute(['path' => $normalized]);
    $row = $statement->fetch();
    return is_array($row) ? $row : null;
}

function protected_upload_url(string $id): string
{
    return '/api/uploads.php?id=' . rawurlencode($id) . '&file=1';
}

function normalize_requested_upload_path(string $path): string
{
    $path = str_replace('\\', '/', rawurldecode($path));
    $path = ltrim($path, '/');
    if ($path === '' || str_contains($path, '..')) {
        return '';
    }
    if (!str_starts_with($path, 'uploads/')) {
        $path = 'uploads/' . $path;
    }
    return $path;
}

function can_read_upload(PDO $pdo, array $user, array $upload): bool
{
    if (($user['role'] ?? '') === 'Administrateur') {
        return true;
    }
    $module = normalize_upload_module((string) ($upload['module'] ?? 'Docs'));
    if (user_can_access_state_module($pdo, $user, $module, 'read')) {
        return true;
    }
    return (string) ($upload['user_id'] ?? '') === (string) ($user['id'] ?? '');
}

function serve_upload_file(PDO $pdo, array $user, string $id, string $path): void
{
    $upload = $id !== '' ? find_upload($pdo, $id) : find_upload_by_path($pdo, $path);
    if (!$upload || (string) ($upload['status'] ?? 'Actif') !== 'Actif') {
        json_response(['ok' => false, 'code' => 'missing_upload', 'message' => 'Fichier introuvable.'], 404);
    }
    if (!can_read_upload($pdo, $user, $upload)) {
        json_response(['ok' => false, 'code' => 'forbidden', 'message' => 'Consultation du fichier non autorisee.'], 403);
    }

    $filePath = upload_disk_path($upload);
    if ($filePath === '' || !is_file($filePath)) {
        json_response(['ok' => false, 'code' => 'missing_file', 'message' => 'Fichier indisponible.'], 404);
    }

    $mimeType = (string) ($upload['mime_type'] ?? 'application/octet-stream');
    $fileName = sanitize_upload_name((string) ($upload['original_name'] ?? basename($filePath)));
    $disposition = isset($_GET['download']) ? 'attachment' : 'inline';

    header('Content-Type: ' . $mimeType);
    header('Content-Length: ' . (string) filesize($filePath));
    header('Content-Disposition: ' . $disposition . '; filename="' . addcslashes($fileName, '"\\') . '"');
    header('Cache-Control: private, no-store, max-age=0');
    header('X-Content-Type-Options: nosniff');
    readfile($filePath);
    exit;
}

function upload_disk_path(array $upload): string
{
    $relativePath = (string) ($upload['relative_path'] ?? '');
    if ($relativePath === '' || str_contains($relativePath, '..')) {
        return '';
    }
    $publicRoot = realpath(dirname(__DIR__));
    if ($publicRoot === false) {
        return '';
    }
    $normalizedRelative = str_replace(['/', '\\'], DIRECTORY_SEPARATOR, $relativePath);
    $targetPath = $publicRoot . DIRECTORY_SEPARATOR . $normalizedRelative;
    $uploadsPrefix = $publicRoot . DIRECTORY_SEPARATOR . 'uploads' . DIRECTORY_SEPARATOR;
    if (!str_starts_with($targetPath, $uploadsPrefix)) {
        return '';
    }
    return $targetPath;
}

function upload_htaccess_content(): string
{
    return implode("\n", [
        'Options -Indexes',
        '',
        '<IfModule mod_rewrite.c>',
        '  RewriteEngine On',
        '  RewriteCond %{REQUEST_FILENAME} -f',
        '  RewriteRule ^(.+)$ /api/uploads.php?path=$1 [QSA,L]',
        '</IfModule>',
        '',
        '<IfModule !mod_rewrite.c>',
        '  Require all denied',
        '</IfModule>',
        '',
        'RemoveHandler .php .phtml .php3 .php4 .php5 .php7 .php8 .phar',
        '<FilesMatch "\.(php|phtml|phar|cgi|pl|asp|aspx|jsp|sh)$">',
        '  Require all denied',
        '</FilesMatch>',
        '',
    ]);
}

function remove_uploaded_file_from_disk(array $upload): bool
{
    $targetPath = upload_disk_path($upload);
    if ($targetPath === '') {
        return false;
    }
    $publicRoot = realpath(dirname(__DIR__));
    if ($publicRoot === false) {
        return false;
    }
    $realTarget = realpath($targetPath);
    $uploadsPrefix = $publicRoot . DIRECTORY_SEPARATOR . 'uploads' . DIRECTORY_SEPARATOR;
    if ($realTarget !== false && str_starts_with($realTarget, $uploadsPrefix) && is_file($realTarget)) {
        return @unlink($realTarget);
    }
    if (is_file($targetPath) && str_starts_with($targetPath, $uploadsPrefix)) {
        return @unlink($targetPath);
    }
    return false;
}

function upload_error_message(int $error): string
{
    return match ($error) {
        UPLOAD_ERR_INI_SIZE, UPLOAD_ERR_FORM_SIZE => 'Le fichier est trop volumineux.',
        UPLOAD_ERR_PARTIAL => 'Le fichier n’a pas été transmis entièrement.',
        UPLOAD_ERR_NO_FILE => 'Aucun fichier sélectionné.',
        default => 'Envoi du fichier impossible.',
    };
}
