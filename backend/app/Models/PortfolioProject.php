<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PortfolioProject extends Model
{
    protected $fillable = [
        'title',
        'slug',
        'category',
        'client',
        'description',
        'thumbnail',
        'project_url',
    ];
}
