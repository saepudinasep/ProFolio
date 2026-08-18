<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Page;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $pages = Page::latest()->get();

        return response()->json([
            'success' => true,
            'message' => 'Pages retrieved successfully.',
            'data' => $pages,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'slug' => ['required', 'string', 'max:255', 'unique:pages,slug'],
            'title' => ['required', 'string', 'max:255'],
            'content' => ['required', 'string'],
            'meta_title' => ['nullable', 'string', 'max:255'],
            'meta_description' => ['nullable', 'string'],
        ]);

        $page = Page::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Page created successfully.',
            'data' => $page,
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Page $page): JsonResponse
    {
        return response()->json([
            'success' => true,
            'message' => 'Page retrieved successfully.',
            'data' => $page,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Page $page): JsonResponse
    {
        $validated = $request->validate([
            'slug' => [
                'required',
                'string',
                'max:255',
                'unique:pages,slug,' . $page->id,
            ],
            'title' => ['required', 'string', 'max:255'],
            'content' => ['required', 'string'],
            'meta_title' => ['nullable', 'string', 'max:255'],
            'meta_description' => ['nullable', 'string'],
        ]);

        $page->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Page updated successfully.',
            'data' => $page->fresh(),
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Page $page): JsonResponse
    {
        $page->delete();

        return response()->json([
            'success' => true,
            'message' => 'Page deleted successfully.',
        ]);
    }
}
