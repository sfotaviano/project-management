<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Task;

class ReportController extends Controller
{
    public function show()
    {
        $totalProjects = Project::count();
        $totalProjectsCompleted = Project::where('status', 'completed')->count();
        $totalProjectsInProgress = Project::where('status', 'in_progress')->count();
        $totalProjectsPlanned = Project::where('status', 'planned')->count();

        $totalTasks = Task::count();
        $totalTaskCompleted = Task::where('status', 'completed')->count();
        $totalTaskInProgress = Task::where('status', 'in_progress')->count();
        $totalTaskPending = Task::where('status', 'pending')->count();

        $response = [
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

        return response()->json($response, 200);
    }
}
