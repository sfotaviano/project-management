<?php

namespace App\Repositories\Eloquent;

use App\Models\Project;
use App\Repositories\ProjectRepositoryInterface;

class ProjectRepository extends BaseRepository implements ProjectRepositoryInterface

{
  public function __construct(Project $model)
  {
    parent::__construct($model);
  }
}
