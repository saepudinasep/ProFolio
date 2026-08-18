<?php

use Illuminate\Auth\AuthenticationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use App\Http\Middleware\RoleMiddleware;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Exceptions\ThrottleRequestsException;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        api: __DIR__ . '/../routes/api.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->alias([
            'role' => RoleMiddleware::class,
        ]);
        // $middleware->statefulApi();
    })
    ->withExceptions(function (Exceptions $exceptions) {
        /*
        |--------------------------------------------------------------------------
        | Render API Errors as JSON
        |--------------------------------------------------------------------------
        */

        $exceptions->shouldRenderJsonWhen(
            fn($request, $input) =>
            $request->is('api/*') || $request->expectsJson()
        );

        /*
        |--------------------------------------------------------------------------
        | 422 Validation Error
        |--------------------------------------------------------------------------
        */

        $exceptions->render(function (
            ValidationException $e,
            $request
        ) {
            if (!$request->is('api/*')) {
                return null;
            }

            return response()->json([
                'success' => false,
                'message' => 'Data yang diberikan tidak valid.',
                'errors' => $e->errors(),
            ], 422);
        });

        /*
        |--------------------------------------------------------------------------
        | 401 Unauthenticated
        |--------------------------------------------------------------------------
        */

        $exceptions->render(function (
            AuthenticationException $e,
            $request
        ) {
            if (!$request->is('api/*')) {
                return null;
            }

            return response()->json([
                'success' => false,
                'message' => 'Unauthenticated.',
                'errors' => null,
            ], 401);
        });

        /*
        |--------------------------------------------------------------------------
        | 403 Forbidden
        |--------------------------------------------------------------------------
        */

        $exceptions->render(function (
            AccessDeniedHttpException $e,
            $request
        ) {
            if (!$request->is('api/*')) {
                return null;
            }

            return response()->json([
                'success' => false,
                'message' => 'Anda tidak memiliki izin untuk mengakses resource ini.',
                'errors' => null,
            ], 403);
        });

        /*
        |--------------------------------------------------------------------------
        | 404 Model Not Found
        |--------------------------------------------------------------------------
        */

        $exceptions->render(function (
            ModelNotFoundException $e,
            $request
        ) {
            if (!$request->is('api/*')) {
                return null;
            }

            return response()->json([
                'success' => false,
                'message' => 'Data yang diminta tidak ditemukan.',
                'errors' => null,
            ], 404);
        });

        /*
        |--------------------------------------------------------------------------
        | 404 Route Not Found
        |--------------------------------------------------------------------------
        */

        $exceptions->render(function (
            NotFoundHttpException $e,
            $request
        ) {
            if (!$request->is('api/*')) {
                return null;
            }

            return response()->json([
                'success' => false,
                'message' => 'Endpoint atau resource tidak ditemukan.',
                'errors' => null,
            ], 404);
        });

        /*
        |--------------------------------------------------------------------------
        | 405 Method Not Allowed
        |--------------------------------------------------------------------------
        */

        $exceptions->render(function (
            MethodNotAllowedHttpException $e,
            $request
        ) {
            if (!$request->is('api/*')) {
                return null;
            }

            return response()->json([
                'success' => false,
                'message' => 'HTTP method tidak diperbolehkan untuk endpoint ini.',
                'errors' => null,
            ], 405);
        });

        /*
        |--------------------------------------------------------------------------
        | 429 Too Many Requests
        |--------------------------------------------------------------------------
        */

        $exceptions->render(function (
            ThrottleRequestsException $e,
            $request
        ) {
            if (!$request->is('api/*')) {
                return null;
            }

            return response()->json([
                'success' => false,
                'message' => 'Terlalu banyak request. Silakan coba lagi nanti.',
                'errors' => null,
            ], 429);
        });

        /*
        |--------------------------------------------------------------------------
        | 500 Internal Server Error
        |--------------------------------------------------------------------------
        */

        $exceptions->render(function (
            \Throwable $e,
            $request
        ) {
            if (!$request->is('api/*')) {
                return null;
            }

            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan pada server.',
                'errors' => null,
            ], 500);
        });
    })->create();
