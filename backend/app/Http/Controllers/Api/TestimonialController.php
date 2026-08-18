<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTestimonialRequest;
use App\Http\Requests\UpdateTestimonialRequest;
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
    public function store(StoreTestimonialRequest $request): JsonResponse
    {
        $testimonial = Testimonial::create($request->validated());

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
    public function update(UpdateTestimonialRequest $request, Testimonial $testimonial): JsonResponse
    {
        $testimonial->update($request->validated());

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
