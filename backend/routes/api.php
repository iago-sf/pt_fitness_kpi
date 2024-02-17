<?php

use App\Http\Controllers\Api\LinkController;
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

Route::get('/redirect/{id}', [LinkController::class, 'getLink']);
Route::post('/store-url', [LinkController::class, 'store']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/get-urls', [LinkController::class, 'getUrls']);
    Route::put('/update-url', [LinkController::class, 'update']);
    Route::delete('/delete-url/{id}', [LinkController::class, 'delete']);
});
