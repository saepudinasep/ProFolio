<?php

namespace Database\Seeders;

use App\Models\TeamMember;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TeamMemberSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        TeamMember::create([
            'name' => 'Asep Saepudin',
            'position' => 'Full Stack Developer',
            'bio' => 'Full Stack Developer focused on building modern web applications.',
            'photo' => null,
            'social_links' => [
                'github' => 'https://github.com/saepudinasep',
                'linkedin' => null,
                'instagram' => null,
            ],
        ]);
    }
}
