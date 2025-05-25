<?php

namespace App\Repositories\Eloquent;

use App\Repositories\RepositoryInterface;
use Illuminate\Database\Eloquent\Model;

class BaseRepository implements RepositoryInterface
{
  protected Model $model;

  public function __construct(Model $model)
  {
    $this->model = $model;
  }

  public function findAll(): array
  {
    return $this->model->all()->toArray();
  }

  public function find(int $id): ?Model
  {
    return $this->model->find($id);
  }

  public function create(array $data): Model
  {
    $model = $this->model->newInstance();
    $model->fill($data);
    $model->save();
    return $model;
  }

  public function update(int $id, array $data): ?Model
  {
    $model = $this->find($id);
    if ($model) {
      $model->update($data);
      return $model;
    }
    return null;
  }

  public function delete(int $id): bool
  {
    $model = $this->find($id);
    return $model ? $model->delete() : false;
  }
}
