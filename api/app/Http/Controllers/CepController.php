<?php

namespace App\Http\Controllers;

use App\Services\CepService;
use Illuminate\Http\JsonResponse;

class CepController extends Controller
{
    public function __construct(private CepService $cepService) {}

    public function show(string $cep): JsonResponse
    {
        $data = $this->cepService->getAddressByCep($cep);
        if (is_null($data)) {
            return response()->json(['message' => 'CEP não encontrado'], 404);
        }
        return response()->json($data, 200);
    }
}
