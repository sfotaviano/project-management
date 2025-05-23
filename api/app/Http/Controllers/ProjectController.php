<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    function index()
    {
        return Project::all();
    }

    function show($id)
    {
        return Project::findOrFail($id);
    }

    function store(Request $request)
    {
        $project = new Project($request->all());
        $project->save();
        return response()->json($project, 201);
    }

    function update(Request $request, $id)
    {
        $project = Project::find($id);
        if ($project) {
            $project->fill($request->all());
            $project->save();
            return response()->json($project, 200);
        }
        return response()->json(['message' => 'Project not found'], 404);
    }

    function destroy($id)
    {
        $project = Project::find($id);
        if ($project) {
            $project->delete();
            return response()->json(['message' => 'Project deleted'], 200);
        }
        return response()->json(['message' => 'Project not found'], 404);
    }
}
