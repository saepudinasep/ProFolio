<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $services = Service::orderBy('order')->get();

        return response()->json([
            'success' => true,
            'message' => 'Services retrieved successfully.',
            'data' => $services,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'icon' => ['nullable', 'string', 'max:255'],
            'order' => ['nullable', 'integer', 'min:0'],
        ]);

        $service = Service::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Service created successfully.',
            'data' => $service,
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Service $service): JsonResponse
    {
        return response()->json([
            'success' => true,
            'message' => 'Service retrieved successfully.',
            'data' => $service,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Service $service): JsonResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'icon' => ['nullable', 'string', 'max:255'],
            'order' => ['nullable', 'integer', 'min:0'],
        ]);

        $service->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Service updated successfully.',
            'data' => $service->fresh(),
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Service $service)
    {
        $service->delete();

        return response()->json([
            'success' => true,
            'message' => 'Service deleted successfully.',
        ]);
    }
}
