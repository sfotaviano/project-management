<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TaskController;
use Illuminate\Support\Facades\Route;


// Rota de autenticação para usuários
Route::middleware('auth:sanctum')->group(function () {
  // Route::apiResource('user', UserController::class);
  Route::apiResource('project', ProjectController::class);
  Route::apiResource('task', TaskController::class);
});

// Rota de login para autenticação via Sanctum
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
