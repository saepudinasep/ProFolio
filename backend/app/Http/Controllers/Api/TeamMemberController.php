<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\TeamMember;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Js;

class TeamMemberController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $teamMembers = TeamMember::latest()->get();

        return response()->json([
            'success' => true,
            'message' => 'Team members retrieved successfully.',
            'data' => $teamMembers,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'position' => ['required', 'string', 'max:255'],
            'bio' => ['nullable', 'string'],
            'photo' => ['nullable', 'string', 'max:255'],
            'social_links' => ['nullable', 'array'],
        ]);

        $teamMember = TeamMember::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Team member created successfully.',
            'data' => $teamMember,
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(TeamMember $teamMember): JsonResponse
    {
        return response()->json([
            'success' => true,
            'message' => 'Team member retrieved successfully.',
            'data' => $teamMember,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, TeamMember $teamMember): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'position' => ['required', 'string', 'max:255'],
            'bio' => ['nullable', 'string'],
            'photo' => ['nullable', 'string', 'max:255'],
            'social_links' => ['nullable', 'array'],
        ]);

        $teamMember->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Team member updated successfully.',
            'data' => $teamMember->fresh(),
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TeamMember $teamMember): JsonResponse
    {
        $teamMember->delete();

        return response()->json([
            'success' => true,
            'message' => 'Team member deleted successfully.',
        ]);
    }
}
