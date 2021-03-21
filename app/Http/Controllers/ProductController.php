<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductRequest;
use Illuminate\Http\Request;

use App\Models\Product;
use App\Models\Category;

class ProductController extends Controller
{
    //* Add products
    public function addProduct(ProductRequest $request)
    {

        // return $request;
        $image = $request->image;
        //! image upload 
        $to = time() . '.' . $image->extension();
        //! Move picture to server
        $image->move(public_path() . '/images', $to);
        $Product = Product::Create([
            'name' => $request->name,
            'description' => $request->description,
            "category_id" => $request->category,
            'price' => $request->price,
            'image' => $to
        ]);
        if ($Product) {
            return dataToResponse('success', 'Succès', 'Great . The product added', true, 200, $Product);
        }
    }

    //* Get products
    public function getProducts()
    {
        return Product::All();
    }

    //* Get all Categories
    public function getCategories()
    {
        return Category::All();
    }
    //* Get all Product by Categories
    public function filter(Request $request)
    {
        return  Product::where('category_id', $request->data)->get();
    }
}
