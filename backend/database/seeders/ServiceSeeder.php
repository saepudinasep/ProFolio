<?php

namespace Database\Seeders;

use App\Models\Service;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ServiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Service::create([
            'title' => 'Web Development',
            'description' => 'Develop modern and responsive websites using modern technologies.',
            'icon' => 'code',
            'order' => 1,
        ]);

        Service::create([
            'title' => 'Backend Development',
            'description' => 'Build reliable REST APIs and backend applications.',
            'icon' => 'server',
            'order' => 2,
        ]);

        Service::create([
            'title' => 'Frontend Development',
            'description' => 'Build modern user interfaces with React and Next.js.',
            'icon' => 'layout',
            'order' => 3,
        ]);
    }
}
