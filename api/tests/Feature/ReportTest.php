<?php

namespace Tests\Feature;

use App\Models\Project;
use App\Models\Task;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ReportTest extends TestCase
{
    use RefreshDatabase;

    protected $user;

    public function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create();
        $this->actingAs($this->user, 'sanctum');
    }

    public function test_report_returns_correct_project_and_task_counts()
    {
        Project::factory()->count(2)->create(['user_id' => $this->user->id, 'status' => 'planned']);
        $project = Project::factory()->create(['user_id' => $this->user->id, 'status' => 'completed']);

        Task::factory()->count(2)->create([
            'user_id' => $this->user->id,
            'status' => 'pending',
            'project_id' => $project->id,
        ]);
        Task::factory()->create([
            'user_id' => $this->user->id,
            'status' => 'completed',
            'project_id' => $project->id,
        ]);

        $response = $this->getJson('/api/report');

        $response->assertStatus(200)
            ->assertJsonFragment([
                'projects' => [
                    'total' => 3,
                    'completed' => 1,
                    'in_progress' => 0,
                    'planned' => 2,
                ],
            ])
            ->assertJsonFragment([
                'tasks' => [
                    'total' => 3,
                    'completed' => 1,
                    'in_progress' => 0,
                    'pending' => 2,
                ]
            ]);
    }

    public function test_report_returns_empty_counts_when_no_projects_or_tasks()
    {
        $response = $this->getJson('/api/report');

        $response->assertStatus(200)
            ->assertJsonFragment([
                'projects' => [
                    'total' => 0,
                    'completed' => 0,
                    'in_progress' => 0,
                    'planned' => 0,
                ],
            ])
            ->assertJsonFragment([
                'tasks' => [
                    'total' => 0,
                    'completed' => 0,
                    'in_progress' => 0,
                    'pending' => 0,
                ]
            ]);
    }
}
