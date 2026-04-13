<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PlanController extends Controller
{
    public function index()
    {
        return response()->json(\App\Models\Plan::all());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric',
            'features' => 'nullable|array',
            'target_country' => 'nullable|string',
            'is_featured' => 'boolean',
        ]);

        $plan = \App\Models\Plan::create($validated);
        return response()->json($plan, 201);
    }

    public function show($id)
    {
        $plan = \App\Models\Plan::find($id);
        if (!$plan) return response()->json(['message' => 'Plan no encontrado'], 404);
        return response()->json($plan);
    }

    public function update(Request $request, $id)
    {
        $plan = \App\Models\Plan::find($id);
        if (!$plan) return response()->json(['message' => 'Plan no encontrado'], 404);

        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'price' => 'sometimes|required|numeric',
            'features' => 'nullable|array',
            'target_country' => 'nullable|string',
            'is_featured' => 'boolean',
        ]);

        $plan->update($validated);
        return response()->json($plan);
    }

    public function destroy($id)
    {
        $plan = \App\Models\Plan::find($id);
        if (!$plan) return response()->json(['message' => 'Plan no encontrado'], 404);
        $plan->delete();
        return response()->json(['message' => 'Plan eliminado']);
    }
}
