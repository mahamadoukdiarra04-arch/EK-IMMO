<?php
declare(strict_types=1);

require_once __DIR__ . '/auth_lib.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
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
$user = require_user($pdo);
$body = request_json();
$action = (string) ($body['action'] ?? '');

if ($action !== 'generate_pdf') {
    json_response([
        'ok' => false,
        'code' => 'unknown_action',
        'message' => 'Action non reconnue.',
    ], 400);
}

$payload = is_array($body['payload'] ?? null) ? $body['payload'] : [];
$module = normalize_document_module((string) ($payload['module'] ?? 'Docs'));

if (!can_export_document($pdo, $user, $module)) {
    json_response([
        'ok' => false,
        'code' => 'forbidden',
        'message' => 'Export PDF non autorise.',
    ], 403);
}

$fileName = sanitize_file_name((string) ($body['fileName'] ?? $payload['fileName'] ?? 'EKIMMO_Document.pdf'));
$title = (string) ($payload['title'] ?? 'Document E.K immo');
$documentType = (string) ($payload['documentType'] ?? $title);
$pdf = build_server_pdf($payload, $user);

record_document_export($pdo, $user, [
    'document_type' => $documentType,
    'file_name' => $fileName,
    'module' => $module,
    'payload_json' => json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
]);

header('Content-Type: application/pdf');
header('Content-Disposition: attachment; filename="' . addcslashes($fileName, '"\\') . '"');
header('Content-Length: ' . strlen($pdf));
header('Cache-Control: no-store');
echo $pdf;
exit;

function normalize_document_module(string $module): string
{
    $normalized = trim($module);
    $aliases = [
        'Docs' => 'Contrats',
        'Documents' => 'Contrats',
        'Document' => 'Contrats',
        'Charges' => 'Finance',
        'Entretiens' => 'Finance',
        'Reversements' => 'Finance',
        'Clients' => 'Clients',
        'Biens' => 'Biens',
        'Contrats' => 'Contrats',
        'Finance' => 'Finance',
        'Rapports' => 'Rapports',
        'Administration' => 'Administration',
    ];

    return $aliases[$normalized] ?? 'Contrats';
}

function can_export_document(PDO $pdo, array $user, string $module): bool
{
    if (($user['role'] ?? '') === 'Administrateur') {
        return true;
    }

    return user_has_permission($pdo, $user, $module, 'exporter');
}

function sanitize_file_name(string $fileName): string
{
    $clean = preg_replace('/[^A-Za-z0-9._-]+/', '_', $fileName) ?: 'EKIMMO_Document.pdf';
    if (!str_ends_with(strtolower($clean), '.pdf')) {
        $clean .= '.pdf';
    }
    return substr($clean, 0, 180);
}

function pdf_text(string $value): string
{
    $text = trim((string) $value);
    if (function_exists('iconv')) {
        $converted = @iconv('UTF-8', 'ASCII//TRANSLIT//IGNORE', $text);
        if (is_string($converted)) {
            $text = $converted;
        }
    }
    $text = preg_replace('/[^\x20-\x7E]/', ' ', $text) ?? '';
    $text = preg_replace('/\s+/', ' ', $text) ?? '';
    return str_replace(['\\', '(', ')'], ['\\\\', '\\(', '\\)'], $text);
}

function raw_pdf_text(string $text, int $size, float $x, float $y, string $font = 'F1'): string
{
    return "0.04 0.11 0.24 rg BT /$font $size Tf 1 0 0 1 " . number_format($x, 2, '.', '') . ' ' . number_format($y, 2, '.', '') . ' Tm (' . pdf_text($text) . ") Tj ET\n";
}

function wrap_pdf_lines(string $text, int $maxChars): array
{
    $plain = trim(preg_replace('/\s+/', ' ', $text) ?? '');
    if ($plain === '') {
        return [''];
    }

    $words = explode(' ', $plain);
    $lines = [];
    $line = '';
    foreach ($words as $word) {
        $candidate = $line === '' ? $word : "$line $word";
        if (strlen($candidate) > $maxChars && $line !== '') {
            $lines[] = $line;
            $line = $word;
        } else {
            $line = $candidate;
        }
    }
    if ($line !== '') {
        $lines[] = $line;
    }
    return $lines;
}

function build_server_pdf(array $payload, array $user): string
{
    $pages = [];
    $content = '';
    $y = 790.0;
    $margin = 44.0;
    $pageNumber = 1;

    $newPage = static function () use (&$pages, &$content, &$y, &$pageNumber, $margin): void {
        if ($content !== '') {
            $content .= raw_pdf_text('Page ' . $pageNumber, 8, 520, 24, 'F1');
            $pages[] = $content;
            $pageNumber++;
        }
        $content = '';
        $y = 790.0;
        $content .= "0.02 0.18 0.37 rg 0 812 595 30 re f\n";
        $content .= "0.78 0.63 0.10 rg 0 808 595 4 re f\n";
        $content .= raw_pdf_text('E.K IMMO', 15, $margin, 821, 'F2');
    };

    $ensureSpace = static function (float $needed) use (&$y, $newPage): void {
        if ($y - $needed < 58) {
            $newPage();
        }
    };

    $line = static function (float $fromX, float $toX, float $lineY) use (&$content): void {
        $content .= "0.82 0.87 0.92 RG 0.7 w " . number_format($fromX, 2, '.', '') . ' ' . number_format($lineY, 2, '.', '') . ' m ' . number_format($toX, 2, '.', '') . ' ' . number_format($lineY, 2, '.', '') . " l S\n";
    };

    $writeLines = static function (array $lines, int $size, float $x, string $font = 'F1', float $leading = 14) use (&$content, &$y, $ensureSpace): void {
        foreach ($lines as $item) {
            $ensureSpace($leading + 4);
            $content .= raw_pdf_text((string) $item, $size, $x, $y, $font);
            $y -= $leading;
        }
    };

    $newPage();
    $title = (string) ($payload['title'] ?? 'Document E.K immo');
    $subtitle = (string) ($payload['subtitle'] ?? '');
    $reference = (string) ($payload['reference'] ?? '');
    $generatedAt = date('d/m/Y H:i');

    $content .= raw_pdf_text($title, 22, $margin, $y, 'F2');
    $y -= 26;
    if ($subtitle !== '') {
        $writeLines(wrap_pdf_lines($subtitle, 88), 10, $margin, 'F1', 13);
    }
    if ($reference !== '') {
        $content .= raw_pdf_text('Reference : ' . $reference, 10, $margin, $y, 'F2');
        $y -= 18;
    }
    $content .= raw_pdf_text('Genere le : ' . $generatedAt, 9, $margin, $y, 'F1');
    $content .= raw_pdf_text('Utilisateur : ' . (string) ($user['name'] ?? $user['identifier'] ?? ''), 9, 330, $y, 'F1');
    $y -= 24;
    $line($margin, 551, $y);
    $y -= 22;

    $fields = is_array($payload['fields'] ?? null) ? $payload['fields'] : [];
    if ($fields) {
        $content .= raw_pdf_text('Informations', 13, $margin, $y, 'F2');
        $y -= 18;
        foreach ($fields as $field) {
            if (!is_array($field)) {
                continue;
            }
            $label = (string) ($field['label'] ?? '');
            $value = (string) ($field['value'] ?? '');
            if ($label === '' && $value === '') {
                continue;
            }
            $ensureSpace(28);
            $content .= "0.95 0.97 0.99 rg " . number_format($margin, 2, '.', '') . ' ' . number_format($y - 13, 2, '.', '') . " 507 22 re f\n";
            $content .= raw_pdf_text($label, 8, $margin + 10, $y - 4, 'F2');
            $writeLines(wrap_pdf_lines($value, 72), 9, $margin + 160, 'F1', 11);
            $y -= 5;
        }
        $y -= 8;
    }

    $paragraphs = is_array($payload['paragraphs'] ?? null) ? $payload['paragraphs'] : [];
    foreach ($paragraphs as $paragraph) {
        $writeLines(wrap_pdf_lines((string) $paragraph, 96), 9, $margin, 'F1', 13);
        $y -= 6;
    }

    $table = is_array($payload['table'] ?? null) ? $payload['table'] : null;
    if ($table) {
        $columns = is_array($table['columns'] ?? null) ? array_values($table['columns']) : [];
        $rows = is_array($table['rows'] ?? null) ? array_values($table['rows']) : [];
        if ($columns) {
            $ensureSpace(44);
            $content .= raw_pdf_text((string) ($table['title'] ?? 'Detail'), 13, $margin, $y, 'F2');
            $y -= 20;
            $colCount = max(1, count($columns));
            $colWidth = 507 / $colCount;
            $content .= "0.91 0.94 0.98 rg " . number_format($margin, 2, '.', '') . ' ' . number_format($y - 6, 2, '.', '') . " 507 20 re f\n";
            foreach ($columns as $index => $column) {
                $content .= raw_pdf_text((string) $column, 7, $margin + ($index * $colWidth) + 6, $y, 'F2');
            }
            $y -= 22;
            foreach ($rows as $row) {
                $ensureSpace(28);
                $cells = is_array($row) ? array_values($row) : [$row];
                $maxLines = 1;
                $wrappedCells = [];
                foreach ($columns as $index => $_column) {
                    $cell = (string) ($cells[$index] ?? '');
                    $wrapped = wrap_pdf_lines($cell, max(14, (int) floor($colWidth / 5.2)));
                    $wrappedCells[$index] = array_slice($wrapped, 0, 3);
                    $maxLines = max($maxLines, count($wrappedCells[$index]));
                }
                $rowHeight = 13 * $maxLines + 8;
                $ensureSpace($rowHeight + 4);
                $content .= "0.98 0.99 1.00 rg " . number_format($margin, 2, '.', '') . ' ' . number_format($y - $rowHeight + 7, 2, '.', '') . ' 507 ' . number_format($rowHeight, 2, '.', '') . " re f\n";
                foreach ($wrappedCells as $index => $wrapped) {
                    $cellY = $y;
                    foreach ($wrapped as $lineText) {
                        $content .= raw_pdf_text($lineText, 7, $margin + ($index * $colWidth) + 6, $cellY, 'F1');
                        $cellY -= 11;
                    }
                }
                $y -= $rowHeight + 4;
            }
        }
    }

    $footer = (string) ($payload['footer'] ?? 'E.K immo - Gestion immobiliere au Mali');
    $ensureSpace(36);
    $line($margin, 551, $y);
    $y -= 18;
    $writeLines(wrap_pdf_lines($footer, 98), 8, $margin, 'F1', 11);

    if ($content !== '') {
        $content .= raw_pdf_text('Page ' . $pageNumber, 8, 520, 24, 'F1');
        $pages[] = $content;
    }

    return assemble_pdf($pages);
}

function assemble_pdf(array $pages): string
{
    $objects = [
        '<< /Type /Catalog /Pages 2 0 R >>',
        '',
        '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',
        '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>',
    ];

    $kids = [];
    foreach ($pages as $index => $content) {
        $pageObjectId = 5 + ($index * 2);
        $contentObjectId = $pageObjectId + 1;
        $kids[] = $pageObjectId . ' 0 R';
        $objects[] = '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents ' . $contentObjectId . ' 0 R >>';
        $objects[] = '<< /Length ' . strlen($content) . " >>\nstream\n" . $content . "\nendstream";
    }

    $objects[1] = '<< /Type /Pages /Kids [' . implode(' ', $kids) . '] /Count ' . count($pages) . ' >>';

    $pdf = "%PDF-1.4\n";
    $offsets = [0];
    foreach ($objects as $index => $object) {
        $offsets[] = strlen($pdf);
        $pdf .= ($index + 1) . " 0 obj\n" . $object . "\nendobj\n";
    }
    $xrefOffset = strlen($pdf);
    $pdf .= "xref\n0 " . (count($objects) + 1) . "\n0000000000 65535 f \n";
    foreach (array_slice($offsets, 1) as $offset) {
        $pdf .= str_pad((string) $offset, 10, '0', STR_PAD_LEFT) . " 00000 n \n";
    }
    $pdf .= "trailer\n<< /Size " . (count($objects) + 1) . " /Root 1 0 R >>\nstartxref\n" . $xrefOffset . "\n%%EOF";
    return $pdf;
}

function record_document_export(PDO $pdo, array $user, array $record): void
{
    $statement = $pdo->prepare('
        INSERT INTO ekimmo_document_exports (user_id, document_type, file_name, module, payload_json)
        VALUES (:user_id, :document_type, :file_name, :module, :payload_json)
    ');
    $statement->execute([
        'user_id' => $user['id'] ?? null,
        'document_type' => $record['document_type'] ?? 'Document',
        'file_name' => $record['file_name'] ?? 'EKIMMO_Document.pdf',
        'module' => $record['module'] ?? 'Docs',
        'payload_json' => $record['payload_json'] ?? null,
    ]);
}
