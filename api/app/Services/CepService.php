<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class CepService
{
  public function getAddressByCep(string $cep): ?array
  {
    $response = Http::get("https://viacep.com.br/ws/{$cep}/json/");
    if ($response->failed() || isset($response->json()['erro'])) {
      return null;
    }
    return $response->json();
  }
}
