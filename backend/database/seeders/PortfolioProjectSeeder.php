<?php

namespace Database\Seeders;

use App\Models\PortfolioProject;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PortfolioProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        PortfolioProject::create([
            'title' => 'Blog Management System',
            'slug' => 'blog-management-system',
            'category' => 'Web Development',
            'client' => null,
            'description' => 'A blog management system built using Go and React.',
            'thumbnail' => 'portfolio/blog-management-system.jpg',
            'project_url' => null,
        ]);

        PortfolioProject::create([
            'title' => 'Laundry Management System',
            'slug' => 'laundry-management-system',
            'category' => 'Web Application',
            'client' => null,
            'description' => 'Laundry management application for managing transactions, customers and packages.',
            'thumbnail' => 'portfolio/laundry-management-system.jpg',
            'project_url' => null,
        ]);

        PortfolioProject::create([
            'title' => 'SQL Learning Platform',
            'slug' => 'sql-learning-platform',
            'category' => 'Education',
            'client' => null,
            'description' => 'Interactive platform for learning SQL from beginner to advanced level.',
            'thumbnail' => 'portfolio/sql-learning-platform.jpg',
            'project_url' => null,
        ]);
    }
}
