<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TeamMember extends Model
{
    protected $fillable = [
        'name',
        'position',
        'bio',
        'photo',
        'social_links',
    ];

    protected function casts(): array
    {
        return [
            'social_links' => 'array',
        ];
    }
}
