<?php

declare(strict_types=1);

use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\PHPMailer;

require __DIR__ . '/../vendor/autoload.php';

header('Content-Type: application/json');

function respond(int $status, array $payload): never
{
    http_response_code($status);
    echo json_encode($payload);
    exit;
}

function env_value(string $name, ?string $default = null): ?string
{
    $value = getenv($name);
    if ($value === false || $value === '') {
        return $default;
    }

    return $value;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(405, ['error' => 'Method not allowed']);
}

$contentType = $_SERVER['CONTENT_TYPE'] ?? '';
$rawBody = file_get_contents('php://input') ?: '';
$data = str_contains($contentType, 'application/json')
    ? json_decode($rawBody, true)
    : $_POST;

if (!is_array($data)) {
    respond(400, ['error' => 'Invalid request body']);
}

$name = trim((string)($data['name'] ?? ''));
$email = trim((string)($data['email'] ?? ''));
$company = trim((string)($data['company'] ?? ''));
$message = trim((string)($data['message'] ?? ''));
$website = trim((string)($data['website'] ?? ''));

// Honeypot field: real visitors never fill this in.
if ($website !== '') {
    respond(200, ['ok' => true]);
}

if ($name === '' || $email === '' || $message === '') {
    respond(422, ['error' => 'Name, email, and message are required']);
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(422, ['error' => 'Please enter a valid email address']);
}

if (strlen($name) > 120 || strlen($email) > 254 || strlen($company) > 160 || strlen($message) > 4000) {
    respond(422, ['error' => 'One or more fields is too long']);
}

$smtpHost = env_value('SMTP_HOST', 'smtp.purelymail.com');
$smtpPort = (int)env_value('SMTP_PORT', '465');
$smtpEncryption = strtolower((string)env_value('SMTP_ENCRYPTION', 'ssl'));
$smtpUser = env_value('SMTP_USER');
$smtpPass = env_value('SMTP_PASS');
$contactTo = env_value('CONTACT_TO');
$contactFrom = env_value('CONTACT_FROM', $smtpUser);

if ($smtpUser === null || $smtpPass === null || $contactTo === null || $contactFrom === null) {
    error_log('Contact form is missing SMTP_USER, SMTP_PASS, CONTACT_TO, or CONTACT_FROM.');
    respond(500, ['error' => 'Contact form is not configured yet']);
}

$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host = $smtpHost;
    $mail->Port = $smtpPort;
    $mail->SMTPAuth = true;
    $mail->Username = $smtpUser;
    $mail->Password = $smtpPass;

    if ($smtpEncryption === 'ssl' || $smtpEncryption === 'smtps') {
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    } elseif ($smtpEncryption === 'tls' || $smtpEncryption === 'starttls') {
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    }

    $mail->CharSet = PHPMailer::CHARSET_UTF8;
    $mail->setFrom($contactFrom, 'Hillwork Website');
    $mail->addAddress($contactTo);
    $mail->addReplyTo($email, $name);
    $mail->Subject = 'Hillwork inquiry from ' . $name;
    $mail->Body = implode("\n", [
        'New Hillwork website inquiry',
        '',
        'Name: ' . $name,
        'Email: ' . $email,
        'Company: ' . ($company !== '' ? $company : 'Not provided'),
        '',
        'Message:',
        $message,
    ]);

    $mail->send();
    respond(200, ['ok' => true]);
} catch (Exception $exception) {
    error_log('Contact mail failed: ' . $mail->ErrorInfo);
    respond(500, ['error' => 'Unable to send message right now']);
}
