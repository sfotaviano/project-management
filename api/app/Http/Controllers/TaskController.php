<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Repositories\TaskRepositoryInterface;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Gate;

class TaskController extends Controller
{
    public function __construct(private TaskRepositoryInterface $taskRepository) {}

    function index(): JsonResponse
    {
        $tasks = $this->taskRepository->findAll();
        return response()->json($tasks, 200);
    }

    function show(int $id): JsonResponse
    {
        $task = $this->taskRepository->find($id);
        if (!$task) {
            return response()->json(['message' => 'Task not found'], 404);
        }

        Gate::authorize('view', $task);
        return response()->json($task, 200);
    }

    function store(StoreTaskRequest $request): JsonResponse
    {
        $user = $request->user();

        $data = $request->merge(['user_id' => $user->id])->toArray();
        $task = $this->taskRepository->create($data);
        return response()->json($task, 201);
    }

    function update(UpdateTaskRequest $request, int $id): JsonResponse
    {
        $task = $this->taskRepository->find($id);

        Gate::authorize('update', $task);

        if ($task) {
            $data = $request->except('user_id');
            $response = $this->taskRepository->update($id, $data);
            return response()->json($response, 200);
        }
        return response()->json(['message' => 'Task not found'], 404);
    }

    function destroy(int $id): JsonResponse
    {
        $task = $this->taskRepository->find($id);

        Gate::authorize('delete', $task);

        if ($task) {
            $this->taskRepository->delete($id);
            return response()->json(['message' => 'Task deleted'], 200);
        }
        return response()->json(['message' => 'Task not found'], 404);
    }
}
