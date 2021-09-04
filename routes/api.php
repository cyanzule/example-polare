<?php

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
 */

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// TODO split this into its separate functions (make it paginated!)

Route::middleware('auth:sanctum')->get('/users', function (Request $request) {
    $ids = $request->input('ids');
    if ($ids) {
        return User::findMany($ids);
    }
    $limit = $request->input('limit', 10);
    $sortField = $request->input('field', 'id');
    $sortOrder = strtolower($request->input('order'));

    $users = User::orderBy($sortField, $sortOrder);

    $id = $request->input('id');
    $target = $request->input('target');
    if ($id && $target) {
        $users = $users::where($target, '=, $id');
    }

    return $users->paginate($limit);
});

Route::middleware('auth:sanctum')->get('/users/{id}', function ($id) {
    return User::find($id);
});

// TODO post for creating users remotely (hijack RegisteredUserController)

Route::middleware('auth:sanctum')->put('/users', function (Request $request) {
    $ids = $request->input('ids');
    $data = $request->input('data');
    return User::findMany($ids)
        ->update($data);
});

Route::middleware('auth:sanctum')->put('/users/{id}', function (Request $request, $id) {
    $data = $request->input('data');
    User::find($id)->update($data);
    return User::find($id);
});

Route::middleware('auth:sanctum')->delete('/users/{id}', function ($id) {
    return User::find($id)->delete();
});
