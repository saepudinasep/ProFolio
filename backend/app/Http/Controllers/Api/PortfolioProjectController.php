<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePortfolioProjectRequest;
use App\Http\Requests\UpdatePortfolioProjectRequest;
use App\Http\Resources\PortfolioProjectResource;
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
            'data' => PortfolioProjectResource::collection($projects),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePortfolioProjectRequest $request): JsonResponse
    {
        $project = PortfolioProject::create($request->validated());

        return response()->json([
            'success' => true,
            'message' => 'Portfolio project created successfully.',
            'data' => new PortfolioProjectResource($project),
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
            'data' => new PortfolioProjectResource($portfolioProject),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePortfolioProjectRequest $request, PortfolioProject $portfolioProject): JsonResponse
    {
        $portfolioProject->update($request->validated());

        return response()->json([
            'success' => true,
            'message' => 'Portfolio project updated successfully.',
            'data' => new PortfolioProjectResource($portfolioProject->fresh()),
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
            'data' => null,
        ]);
    }

    public function showBySlug(string $slug): JsonResponse
    {
        $project = PortfolioProject::where('slug', $slug)->firstOrFail();

        return response()->json([
            'success' => true,
            'message' => 'Portfolio project retrieved successfully.',
            'data' => new PortfolioProjectResource($project),
        ]);
    }
}
