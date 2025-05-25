<?php

namespace Tests\Feature;

use App\Models\Project;
use App\Models\Task;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TaskTest extends TestCase
{
    use RefreshDatabase;

    protected $user;
    protected $project;

    public function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create();
        $this->actingAs($this->user, 'sanctum');

        $this->project = Project::factory()->create(['user_id' => $this->user->id]);
    }

    public function test_user_can_list_tasks()
    {
        Task::factory()->count(3)->create([
            'user_id' => $this->user->id,
            'project_id' => $this->project->id,
        ]);

        $response = $this->get('/api/task');

        $response->assertStatus(200)
            ->assertJsonCount(3);
    }

    public function test_user_can_view_a_task()
    {
        $task = Task::factory()->create([
            'user_id' => $this->user->id,
            'project_id' => $this->project->id,
        ]);

        $response = $this->get("/api/task/{$task->id}");

        $response->assertStatus(200)
            ->assertJsonFragment((['id' => $task->id]));
    }

    public function test_user_can_create_a_task()
    {
        $data = [
            'title' => 'New Task',
            'description' => 'Test task',
            'completed_date' => now()->addDays(10)->toDateString(),
            'status' => 'pending',
            'project_id' => $this->project->id,
        ];

        $response = $this->postJson('/api/task', $data);

        $response->assertStatus(201)
            ->assertJsonFragment(['title' => 'New Task']);
        $this->assertDatabaseHas('tasks', ['title' => 'New Task']);
    }

    public function test_user_can_update_a_task()
    {
        $task = Task::factory()->create([
            'user_id' => $this->user->id,
            'project_id' => $this->project->id,
        ]);

        $update = [
            'title' => 'Updated Task',
            'project_id' => $this->project->id,
        ];

        $response = $this->putJson("/api/task/{$task->id}", $update);

        $response->assertStatus(200)
            ->assertJsonFragment(['title' => 'Updated Task']);
        $this->assertDatabaseHas('tasks', ['title' => 'Updated Task']);
    }

    public function test_user_can_delete_a_task()
    {
        $task = Task::factory()->create([
            'user_id' => $this->user->id,
            'project_id' => $this->project->id,
        ]);

        $response = $this->delete("/api/task/{$task->id}");

        $response->assertStatus(200);
        $this->assertDatabaseMissing('tasks', ['id' => $task->id]);
    }

    public function test_user_cannot_view_others_task()
    {
        $otherUser = User::factory()->create();
        $task = Task::factory()->create([
            'user_id' => $otherUser->id,
            'project_id' => $this->project->id,
        ]);

        $response = $this->get("/api/task/{$task->id}");

        $response->assertStatus(403);
    }

    public function test_user_cannot_update_others_task()
    {
        $otherUser = User::factory()->create();
        $task = Task::factory()->create([
            'user_id' => $otherUser->id,
            'project_id' => $this->project->id,
        ]);

        $update = [
            'title' => 'Updated Task',
            'project_id' => $this->project->id,
        ];

        $response = $this->putJson("/api/task/{$task->id}", $update);

        $response->assertStatus(403);
    }

    public function test_user_cannot_delete_others_task()
    {
        $otherUser = User::factory()->create();
        $task = Task::factory()->create([
            'user_id' => $otherUser->id,
            'project_id' => $this->project->id,
        ]);

        $response = $this->delete("/api/task/{$task->id}");

        $response->assertStatus(403);
    }
}
