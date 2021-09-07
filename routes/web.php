<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Gate;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canSeeSecret' => Gate::allows('access-secret'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('welcome');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard', [
        'canSeeSecret' => Gate::allows('access-secret')
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/secret', function () {
    Gate::authorize('access-secret');

    return Inertia::render('Secret', [
        'canSeeSecret' => Gate::allows('access-secret')
    ]);
})->middleware(['auth', 'verified'])->name('secret');

Route::get('/admin', function () {
    Gate::authorize('access-admin');

    return Inertia::render('Admin', [
        'apiUrl' => URL::to('/api'),
        'csrfUrl' => URL::to('/sanctum/csrf-cookie')
    ]);
})->middleware(['auth', 'verified'])->name('admin');

require __DIR__.'/auth.php';
