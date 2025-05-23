<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Models\Project;
use Illuminate\Support\Facades\Gate;

class ProjectController extends Controller
{
    function index()
    {
        return Project::all();
    }

    function show($id)
    {
        $project = Project::findOrFail($id);
        Gate::authorize('view', $project);
        return $project;
    }

    function store(StoreProjectRequest $request)
    {
        $user = $request->user();

        $project = new Project($request->all());
        $project->user_id = $user->id;
        $project->save();

        return response()->json($project, 201);
    }

    function update(UpdateProjectRequest $request, $id)
    {
        $project = Project::find($id);

        Gate::authorize('update', $project);

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

        Gate::authorize('delete', $project);

        if ($project) {
            $project->delete();
            return response()->json(['message' => 'Project deleted'], 200);
        }
        return response()->json(['message' => 'Project not found'], 404);
    }
}
