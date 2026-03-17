<?php

require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';

$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$start = microtime(true);
echo "Creating user...\n";

$user = \App\Models\User::create([
    'name' => 'TestScript',
    'lastname' => 'TestScript',
    'email' => 'script@example.com',
    'password' => \Illuminate\Support\Facades\Hash::make('password123')
]);

echo "Created user in " . (microtime(true) - $start) . "\n";
