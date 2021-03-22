<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        DB::table('products')->insert([
            'name' => Str::random(10),
            'description' => Str::random(100),
            'price' => rand(1, 25),
            'image' => Str::random(10) . ".png",
            'category_id' => Str::random(10),

        ]);
    }
}
