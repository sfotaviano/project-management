<?php

namespace App\Repositories\Eloquent;

use App\Models\User;
use App\Repositories\UserRepositoryInterface;

class UserRepository extends BaseRepository implements UserRepositoryInterface
{
  public function __construct(User $model)
  {
    parent::__construct($model);
  }

  public function findByEmail(string $email): ?User
  {
    return $this->model->where('email', $email)->first();
  }
}
