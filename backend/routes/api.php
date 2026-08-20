<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ContactMessageController;
use App\Http\Controllers\Api\PageController;
use App\Http\Controllers\Api\PortfolioProjectController;
use App\Http\Controllers\Api\ServiceController;
use App\Http\Controllers\Api\TeamMemberController;
use App\Http\Controllers\Api\TestimonialController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Authentication
|--------------------------------------------------------------------------
*/

Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);
});

/*
|--------------------------------------------------------------------------
| Public API
|--------------------------------------------------------------------------
*/

Route::get('/pages', [PageController::class, 'index']);
Route::get('/pages/{page}', [PageController::class, 'show']);

Route::get('/services', [ServiceController::class, 'index']);
Route::get('/services/{service}', [ServiceController::class, 'show']);

Route::get(
    '/portfolio-projects',
    [PortfolioProjectController::class, 'index']
);

Route::get(
    '/portfolio-projects/{slug}',
    [PortfolioProjectController::class, 'showBySlug']
);

Route::get(
    '/testimonials',
    [TestimonialController::class, 'index']
);

Route::get(
    '/testimonials/{testimonial}',
    [TestimonialController::class, 'show']
);

Route::get(
    '/team-members',
    [TeamMemberController::class, 'index']
);

Route::get(
    '/team-members/{teamMember}',
    [TeamMemberController::class, 'show']
);

Route::post(
    '/contact-messages',
    [ContactMessageController::class, 'store']
);

/*
|--------------------------------------------------------------------------
| Admin API
|--------------------------------------------------------------------------
|
| Admin mempunyai full access terhadap content management.
|
*/

Route::middleware([
    'auth:sanctum',
    'role:admin',
])
    ->prefix('admin')
    ->group(function () {

        Route::apiResource(
            'pages',
            PageController::class
        );

        Route::apiResource(
            'services',
            ServiceController::class
        );

        Route::apiResource(
            'portfolio-projects',
            PortfolioProjectController::class
        );

        Route::apiResource(
            'testimonials',
            TestimonialController::class
        );

        Route::apiResource(
            'team-members',
            TeamMemberController::class
        );
    });

/*
|--------------------------------------------------------------------------
| Editor API
|--------------------------------------------------------------------------
|
| Editor dapat mengelola content tetapi tidak dapat menghapus data.
|
*/

Route::middleware([
    'auth:sanctum',
    'role:editor',
])
    ->prefix('editor')
    ->group(function () {

        Route::apiResource(
            'pages',
            PageController::class
        )->except(['destroy']);

        Route::apiResource(
            'services',
            ServiceController::class
        )->except(['destroy']);

        Route::apiResource(
            'portfolio-projects',
            PortfolioProjectController::class
        )->except(['destroy']);

        Route::apiResource(
            'testimonials',
            TestimonialController::class
        )->except(['destroy']);

        Route::apiResource(
            'team-members',
            TeamMemberController::class
        )->except(['destroy']);
    });
