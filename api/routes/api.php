<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CepController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\TaskController;
use Illuminate\Support\Facades\Route;


Route::middleware('auth:sanctum')->group(function () {
  Route::apiResource('project', ProjectController::class);
  Route::apiResource('task', TaskController::class);
  Route::get('/report', [ReportController::class, 'show']);
});

Route::group([], function () {
  Route::post('/login', [AuthController::class, 'login']);
  Route::post('/register', [AuthController::class, 'register']);
});

Route::group([], function () {
  Route::get('/cep/{cep}', [CepController::class, 'show']);
});
