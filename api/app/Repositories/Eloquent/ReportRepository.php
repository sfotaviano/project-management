<?php

namespace App\Repositories\Eloquent;

use App\Models\Project;
use App\Models\Task;
use App\Repositories\ReportRepositoryInterface;

class ReportRepository implements ReportRepositoryInterface
{
  public function generate(?array $params = []): array
  {
    $totalProjects = Project::count();
    $totalProjectsCompleted = Project::where('status', 'completed')->count();
    $totalProjectsInProgress = Project::where('status', 'in_progress')->count();
    $totalProjectsPlanned = Project::where('status', 'planned')->count();

    $totalTasks = Task::count();
    $totalTaskCompleted = Task::where('status', 'completed')->count();
    $totalTaskInProgress = Task::where('status', 'in_progress')->count();
    $totalTaskPending = Task::where('status', 'pending')->count();

    return [
      'projects' => [
        'total' => $totalProjects,
        'completed' => $totalProjectsCompleted,
        'in_progress' => $totalProjectsInProgress,
        'planned' => $totalProjectsPlanned,
      ],
      'tasks' => [
        'total' => $totalTasks,
        'completed' => $totalTaskCompleted,
        'in_progress' => $totalTaskInProgress,
        'pending' => $totalTaskPending,
      ],
    ];
  }
}
