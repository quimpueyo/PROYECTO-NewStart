<?php

require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';

$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);

// Simulate a POST request to /api/register
$request = Illuminate\Http\Request::create('/api/register', 'POST', [
    'name' => 'TestDirect',
    'lastname' => 'UserDirect',
    'email' => 'direct_test@example.com',
    'password' => 'password123',
    'destination_country' => 'Spain'
]);

$request->headers->set('Content-Type', 'application/json');
$request->headers->set('Accept', 'application/json');

echo "Sending request...\n";
$start = microtime(true);

$response = $kernel->handle($request);

echo "Response status: " . $response->getStatusCode() . "\n";
echo "Response body: " . $response->getContent() . "\n";
echo "Time: " . (microtime(true) - $start) . "s\n";

$kernel->terminate($request, $response);
