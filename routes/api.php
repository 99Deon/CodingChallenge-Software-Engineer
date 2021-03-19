<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;

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

######### Produts #########
Route::post("/add/product", [ProductController::class, "addProduct"]); //Add product
Route::get("/fetch/products", [ProductController::class, "getProducts"]); //get product
Route::get("/fetch/categories", [ProductController::class, "getCategories"]);//get categories
