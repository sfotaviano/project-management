<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    function index()
    {
        return Task::all();
    }

    function show($id)
    {
        return Task::findOrFail($id);
    }

    function store(Request $request)
    {
        $task = new Task($request->all());
        $task->save();
        return response()->json($task, 201);
    }

    function update(Request $request, $id)
    {
        $task = Task::find($id);
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
        if ($task) {
            $task->delete();
            return response()->json(['message' => 'Task deleted'], 200);
        }
        return response()->json(['message' => 'Task not found'], 404);
    }
}
