<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PublicController extends Controller
{
    public function clue()
    {
        return view('welcome');
    }
}
