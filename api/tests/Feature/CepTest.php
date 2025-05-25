<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Http;
use Tests\TestCase;

class CepTest extends TestCase
{
    public function test_show_returns_address_data_for_valid_cep()
    {
        // Mock da resposta do ViaCEP
        Http::fake([
            'viacep.com.br/ws/01001000/json/' => Http::response([
                'cep' => '01001-000',
                'logradouro' => 'Praça da Sé',
                'bairro' => 'Sé',
                'localidade' => 'São Paulo',
                'uf' => 'SP',
            ], 200),
        ]);

        $response = $this->get('/api/cep/01001000');

        $response->assertStatus(200)
            ->assertJsonFragment([
                'cep' => '01001-000',
                'logradouro' => 'Praça da Sé',
            ]);
    }

    public function test_show_returns_404_for_invalid_cep()
    {
        // Mock da resposta do ViaCEP para CEP inválido
        Http::fake([
            'viacep.com.br/ws/00000000/json/' => Http::response(['erro' => true], 200),
        ]);

        $response = $this->get('/api/cep/00000000');

        $response->assertStatus(404)
            ->assertJsonFragment(['message' => 'CEP não encontrado']);
    }
}
