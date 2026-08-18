<?php

namespace Database\Seeders;

use App\Models\Page;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Page::create([
            'slug' => 'home',
            'title' => 'Home',
            'content' => '<h1>Welcome to My Portfolio</h1><p>Full Stack Developer Portfolio.</p>',
            'meta_title' => 'Asep Saepudin - Full Stack Developer',
            'meta_description' => 'Portfolio website of Asep Saepudin as a Full Stack Developer.',
        ]);

        Page::create([
            'slug' => 'about',
            'title' => 'About',
            'content' => '<h1>About Me</h1><p>I am a Full Stack Developer.</p>',
            'meta_title' => 'About - Asep Saepudin',
            'meta_description' => 'Learn more about Asep Saepudin.',
        ]);

        Page::create([
            'slug' => 'contact',
            'title' => 'Contact',
            'content' => '<h1>Contact Me</h1><p>Feel free to contact me.</p>',
            'meta_title' => 'Contact - Asep Saepudin',
            'meta_description' => 'Contact Asep Saepudin.',
        ]);
    }
}
