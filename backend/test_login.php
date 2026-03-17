<?php
// Test login
$data = json_encode([
    'email' => 'apitester@example.com',
    'password' => 'password123'
]);

$context = stream_context_create([
    'http' => [
        'method' => 'POST',
        'header' => "Content-Type: application/json\r\nAccept: application/json\r\n",
        'content' => $data,
        'timeout' => 10
    ]
]);

echo "Calling login API...\n";
$start = microtime(true);
$result = @file_get_contents('http://127.0.0.1:8000/api/login', false, $context);
$elapsed = microtime(true) - $start;

if ($result === false) {
    echo "FAILED! Error: " . error_get_last()['message'] . "\n";
} else {
    echo "OK! Response: $result\n";
}
echo "Time: {$elapsed}s\n";
