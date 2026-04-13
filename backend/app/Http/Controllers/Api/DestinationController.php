<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class DestinationController extends Controller
{
    public function index()
    {
        return response()->json(\App\Models\Destination::with('items')->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'flag_img' => 'nullable|string',
            'cover_image' => 'nullable|string',
        ]);

        $destination = \App\Models\Destination::create($validated);
        return response()->json($destination, 201);
    }

    public function show($id)
    {
        $destination = \App\Models\Destination::with('items')->find($id);
        if (!$destination) return response()->json(['message' => 'Destino no encontrado'], 404);
        return response()->json($destination);
    }

    public function update(Request $request, $id)
    {
        $destination = \App\Models\Destination::find($id);
        if (!$destination) return response()->json(['message' => 'Destino no encontrado'], 404);

        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'flag_img' => 'nullable|string',
            'cover_image' => 'nullable|string',
        ]);

        $destination->update($validated);
        return response()->json($destination);
    }

    public function destroy($id)
    {
        $destination = \App\Models\Destination::find($id);
        if (!$destination) return response()->json(['message' => 'Destino no encontrado'], 404);
        $destination->delete();
        return response()->json(['message' => 'Destino eliminado']);
    }
}
