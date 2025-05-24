<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class CepController extends Controller
{
   public function show($cep)
    {
        $response = Http::get("https://viacep.com.br/ws/{$cep}/json/");
        if ($response->failed() || isset($response->json()['erro'])) {
            return response()->json(['message' => 'CEP não encontrado'], 404);
        }
        return response()->json($response->json());
    }
}
