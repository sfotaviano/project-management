<?php

namespace Tests\Unit;

use App\Models\User;
use PHPUnit\Framework\TestCase;

class UserTest extends TestCase
{
    public function test_user_can_be_instantiated_with_attributes()
    {
        $data = ['name' => 'João', 'email' => 'joao@email.com'];
        $user = new User($data);

        $this->assertEquals('João', $user->name);
        $this->assertEquals('joao@email.com', $user->email);
    }

    public function test_user_attributes_can_be_set_and_get()
    {
        $user = new User();
        $user->name = 'Maria';
        $user->email = 'maria@email.com';

        $this->assertEquals('Maria', $user->name);
        $this->assertEquals('maria@email.com', $user->email);
    }
}