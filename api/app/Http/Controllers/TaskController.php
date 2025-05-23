<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class TaskController extends Controller
{
    function index()
    {
        return Task::all();
    }

    function show($id)
    {
        $task = Task::findOrFail($id);
        Gate::authorize('view', $task);
        return $task;
    }

    function store(StoreTaskRequest $request)
    {
        $user = $request->user();

        $task = new Task($request->all());
        $task->user_id = $user->id;
        $task->save();

        return response()->json($task, 201);
    }

    function update(UpdateTaskRequest $request, $id)
    {
        $task = Task::find($id);

        Gate::authorize('update', $task);

        if ($task) {
            $task->fill($request->all());
            $task->save();
            return response()->json($task, 200);
        }
        return response()->json(['message' => 'Task not found'], 404);
    }

    function destroy($id)
    {
        $task = Task::find($id);

        Gate::authorize('delete', $task);

        if ($task) {
            $task->delete();
            return response()->json(['message' => 'Task deleted'], 200);
        }
        return response()->json(['message' => 'Task not found'], 404);
    }
}
