<?php

namespace Database\Seeders;

use App\Models\Testimonial;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TestimonialSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Testimonial::create([
            'client_name' => 'John Doe',
            'client_position' => 'Project Manager',
            'company' => 'Example Company',
            'photo' => null,
            'message' => 'Great work and excellent communication throughout the project.',
            'rating' => 5,
        ]);

        Testimonial::create([
            'client_name' => 'Jane Smith',
            'client_position' => 'Business Owner',
            'company' => 'Example Business',
            'photo' => null,
            'message' => 'The application was delivered professionally and on time.',
            'rating' => 5,
        ]);
    }
}
