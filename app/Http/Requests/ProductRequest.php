<?php

namespace App\Http\Requests;

use App\Http\Requests\Api\FormRequest;

class ProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'required|max:255',
            'description' => 'required|max:1000',
            'price' => 'required',
            'image' => 'required | mimes:jpeg,jpg,png,png | max:1000'
        ];
    }
}
