<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Testimonial;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TestimonialController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $testimonials = Testimonial::latest()->get();

        return response()->json([
            'success' => true,
            'message' => 'Testimonials retrieved successfully.',
            'data' => $testimonials,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'client_name' => ['required', 'string', 'max:255'],
            'client_position' => ['nullable', 'string', 'max:255'],
            'company' => ['nullable', 'string', 'max:255'],
            'photo' => ['nullable', 'string', 'max:255'],
            'message' => ['required', 'string'],
            'rating' => ['nullable', 'integer', 'min:1', 'max:5'],
        ]);

        $testimonial = Testimonial::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Testimonial created successfully.',
            'data' => $testimonial,
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Testimonial $testimonial)
    {
        return response()->json([
            'success' => true,
            'message' => 'Testimonial retrieved successfully.',
            'data' => $testimonial,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Testimonial $testimonial): JsonResponse
    {
        $validated = $request->validate([
            'client_name' => ['required', 'string', 'max:255'],
            'client_position' => ['nullable', 'string', 'max:255'],
            'company' => ['nullable', 'string', 'max:255'],
            'photo' => ['nullable', 'string', 'max:255'],
            'message' => ['required', 'string'],
            'rating' => ['nullable', 'integer', 'min:1', 'max:5'],
        ]);

        $testimonial->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Testimonial updated successfully.',
            'data' => $testimonial->fresh(),
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Testimonial $testimonial): JsonResponse
    {
        $testimonial->delete();

        return response()->json([
            'success' => true,
            'message' => 'Testimonial deleted successfully.',
        ]);
    }
}
