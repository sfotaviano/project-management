<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Models\Project;
use App\Repositories\ProjectRepositoryInterface;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Gate;

class ProjectController extends Controller
{
    public function __construct(private ProjectRepositoryInterface $projectRepository) {}

    function index(): JsonResponse
    {
        $projects = $this->projectRepository->findAll();
        return response()->json($projects, 200);
    }

    function show(int $id): JsonResponse
    {
        $project = $this->projectRepository->find($id);
        if (!$project) {
            return response()->json(['message' => 'Project not found'], 404);
        }

        Gate::authorize('view', $project);
        return response()->json($project, 200);
    }

    function store(StoreProjectRequest $request): JsonResponse
    {
        $user = $request->user();

        $data = $request->merge(['user_id' => $user->id])->toArray();
        $project = $this->projectRepository->create($data);
        return response()->json($project, 201);
    }

    function update(UpdateProjectRequest $request, int $id): JsonResponse
    {
        $project = $this->projectRepository->find($id);

        Gate::authorize('update', $project);

        if ($project) {
            $data = $request->except('user_id');
            $response = $this->projectRepository->update($id, $data);
            return response()->json($response, 200);
        }
        return response()->json(['message' => 'Project not found'], 404);
    }

    function destroy(int $id): JsonResponse
    {
        $project = $this->projectRepository->find($id);

        Gate::authorize('delete', $project);

        if ($project) {
            $this->projectRepository->delete($id);
            return response()->json(['message' => 'Project deleted'], 200);
        }
        return response()->json(['message' => 'Project not found'], 404);
    }
}
