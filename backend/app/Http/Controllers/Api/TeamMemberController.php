<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTeamMemberRequest;
use App\Http\Requests\UpdateTeamMemberRequest;
use App\Http\Resources\TeamMemberResource;
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
            'data' => TeamMemberResource::collection($teamMembers),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTeamMemberRequest $request): JsonResponse
    {
        $teamMember = TeamMember::create($request->validated());

        return response()->json([
            'success' => true,
            'message' => 'Team member created successfully.',
            'data' => new TeamMemberResource($teamMember),
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
            'data' => new TeamMemberResource($teamMember),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTeamMemberRequest $request, TeamMember $teamMember): JsonResponse
    {
        $teamMember->update($request->validated());

        return response()->json([
            'success' => true,
            'message' => 'Team member updated successfully.',
            'data' => new TeamMemberResource($teamMember->fresh()),
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
            'data' => null,
        ]);
    }
}
