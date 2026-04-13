<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    public function index()
    {
        return response()->json(\App\Models\Service::all());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'icon' => 'nullable|string',
            'category' => 'nullable|string',
            'country' => 'nullable|string',
        ]);

        $service = \App\Models\Service::create($validated);
        return response()->json($service, 201);
    }

    public function show($id)
    {
        $service = \App\Models\Service::find($id);
        if (!$service) return response()->json(['message' => 'Servicio no encontrado'], 404);
        return response()->json($service);
    }

    public function update(Request $request, $id)
    {
        $service = \App\Models\Service::find($id);
        if (!$service) return response()->json(['message' => 'Servicio no encontrado'], 404);

        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'icon' => 'nullable|string',
            'category' => 'nullable|string',
            'country' => 'nullable|string',
        ]);

        $service->update($validated);
        return response()->json($service);
    }

    public function destroy($id)
    {
        $service = \App\Models\Service::find($id);
        if (!$service) return response()->json(['message' => 'Servicio no encontrado'], 404);
        $service->delete();
        return response()->json(['message' => 'Servicio eliminado']);
    }
}
