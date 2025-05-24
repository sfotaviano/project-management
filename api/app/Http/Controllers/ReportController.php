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

        $totalTaskCompleted = Task::where('status', 'completed')->count();
        $totalTaskPlanned = Task::where('status', 'pending')->count();

        $response = [
            'projects' => [
                'total' => $totalProjects,
                'completed' => $totalProjectsCompleted,
                'in_progress' => $totalProjectsInProgress,
                'planned' => $totalProjectsPlanned,
            ],
            'task' => [
                'completed' => $totalTaskCompleted,
                'pending' => $totalTaskPlanned,
            ],
        ];

        return response()->json($response, 200);
    }
}
