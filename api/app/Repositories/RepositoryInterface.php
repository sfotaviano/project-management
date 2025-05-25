<?php

namespace App\Repositories;

use Illuminate\Database\Eloquent\Model;

interface RepositoryInterface
{
  public function findAll(): array;
  public function find(int $id): ?Model;
  public function create(array $data): Model;
  public function update(int $id, array $data): ?Model;
  public function delete(int $id): bool;
} 