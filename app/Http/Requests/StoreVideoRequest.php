<?php

namespace App\Http\Requests;

use App\Rules\UserAuthenticatedRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreVideoRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string|max:100',
            'description' => 'required|string|max:1500',
            'privacy' => 'required|string',
            'thumbnail' => 'mimes:jpg,gif,png',
            'file_reference' => 'required|mimes:mp4,mpg,wmv,mov',
            'user_id' => ['required', 'exists:users,id', new UserAuthenticatedRule],
            'category_id' => 'required|exists:categories,id'
        ];
    }
}
