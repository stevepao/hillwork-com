<?php

declare(strict_types=1);

header('Content-Type: application/json');
header('Cache-Control: no-store');

$siteKey = getenv('TURNSTILE_SITE_KEY');

echo json_encode([
    'turnstileSiteKey' => $siteKey === false ? '' : $siteKey,
]);
