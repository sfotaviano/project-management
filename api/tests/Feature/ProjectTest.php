<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Project;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProjectTest extends TestCase
{
    use RefreshDatabase;

    protected $user;

    protected function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create();
        $this->actingAs($this->user, 'sanctum');
    }

    public function test_user_can_list_projects()
    {
        Project::factory()->count(3)->create(['user_id' => $this->user->id]);

        $response = $this->get('/api/project');

        $response->assertStatus(200)
            ->assertJsonCount(3);
    }

    public function test_user_can_view_a_project()
    {
        $project = Project::factory()->create(['user_id' => $this->user->id]);

        $response = $this->get("/api/project/{$project->id}");

        $response->assertStatus(200)
            ->assertJsonFragment(['id' => $project->id]);
    }

    public function test_user_can_create_a_project()
    {
        $data = [
            'name' => 'New Project',
            'description' => 'Test project',
            'start_date' => now()->toDateString(),
            'end_date' => now()->addDays(10)->toDateString(),
            'status' => 'planned',
        ];

        $response = $this->postJson('/api/project', $data);

        $response->assertStatus(201)
            ->assertJsonFragment(['name' => 'New Project']);
        $this->assertDatabaseHas('projects', ['name' => 'New Project']);
    }

    public function test_user_can_update_a_project()
    {
        $project = Project::factory()->create(['user_id' => $this->user->id]);

        $update = ['name' => 'Updated Project'];

        $response = $this->putJson("/api/project/{$project->id}", $update);

        $response->assertStatus(200)
            ->assertJsonFragment(['name' => 'Updated Project']);
        $this->assertDatabaseHas('projects', ['id' => $project->id, 'name' => 'Updated Project']);
    }

    public function test_user_can_delete_a_project()
    {
        $project = Project::factory()->create(['user_id' => $this->user->id]);

        $response = $this->delete("/api/project/{$project->id}");

        $response->assertStatus(200);
        $this->assertDatabaseMissing('projects', ['id' => $project->id]);
    }

    public function test_user_cannot_view_others_project()
    {
        $otherUser = User::factory()->create();
        $project = Project::factory()->create(['user_id' => $otherUser->id]);

        $response = $this->get("/api/project/{$project->id}");

        $response->assertStatus(403);
    }

    public function test_user_cannot_update_others_project()
    {
        $otherUser = User::factory()->create();
        $project = Project::factory()->create(['user_id' => $otherUser->id]);

        $update = ['name' => 'Hacked Project'];

        $response = $this->putJson("/api/project/{$project->id}", $update);

        $response->assertStatus(403);
    }

    public function test_user_cannot_delete_others_project()
    {
        $otherUser = User::factory()->create();
        $project = Project::factory()->create(['user_id' => $otherUser->id]);

        $response = $this->delete("/api/project/{$project->id}");

        $response->assertStatus(403);
    }
}
