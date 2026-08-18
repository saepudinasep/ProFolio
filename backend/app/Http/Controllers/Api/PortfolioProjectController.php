<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PortfolioProject;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PortfolioProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $projects = PortfolioProject::latest()->get();

        return response()->json([
            'success' => true,
            'message' => 'Portfolio projects retrieved successfully.',
            'data' => $projects,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['required', 'string', 'max:255', 'unique:portfolio_projects,slug'],
            'category' => ['required', 'string', 'max:255'],
            'client' => ['nullable', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'thumbnail' => ['required', 'string', 'max:255'],
            'project_url' => ['nullable', 'url', 'max:255'],
        ]);

        $project = PortfolioProject::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Portfolio project created successfully.',
            'data' => $project,
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(PortfolioProject $portfolioProject): JsonResponse
    {
        return response()->json([
            'success' => true,
            'message' => 'Portfolio project retrieved successfully.',
            'data' => $portfolioProject,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, PortfolioProject $portfolioProject): JsonResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'slug' => [
                'required',
                'string',
                'max:255',
                'unique:portfolio_projects,slug,' . $portfolioProject->id,
            ],
            'category' => ['required', 'string', 'max:255'],
            'client' => ['nullable', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'thumbnail' => ['required', 'string', 'max:255'],
            'project_url' => ['nullable', 'url', 'max:255'],
        ]);

        $portfolioProject->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Portfolio project updated successfully.',
            'data' => $portfolioProject->fresh(),
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PortfolioProject $portfolioProject)
    {
        $portfolioProject->delete();

        return response()->json([
            'success' => true,
            'message' => 'Portfolio project deleted successfully.',
        ]);
    }
}
