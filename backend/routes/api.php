<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Api\ServiceController;
use App\Http\Controllers\Api\PlanController;

// Rutas Públicas
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/services', [ServiceController::class, 'index']);
Route::get('/plans', [PlanController::class, 'index']);

// Rutas Protegidas
Route::middleware(['auth:api'])->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/refresh', [AuthController::class, 'refresh']);
    Route::get('/me', [AuthController::class, 'me']);
    
    Route::delete('/users/{id}', [AuthController::class, 'destroy']);
    Route::put('/users/{id}', [AuthController::class, 'update']);
});

Route::get('/health', function () {
    return response()->json(['status' => 'OK', 'message' => 'API de New Start funcionando']);
});
