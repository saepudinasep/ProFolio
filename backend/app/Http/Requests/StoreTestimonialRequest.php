<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreTestimonialRequest extends FormRequest
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
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'client_name' => [
                'required',
                'string',
                'max:255',
            ],

            'client_position' => [
                'nullable',
                'string',
                'max:255',
            ],

            'company' => [
                'nullable',
                'string',
                'max:255',
            ],

            'photo' => [
                'nullable',
                'string',
                'max:255',
            ],

            'message' => [
                'required',
                'string',
            ],

            'rating' => [
                'nullable',
                'integer',
                'between:1,5',
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'client_name.required' => 'Nama client wajib diisi.',
            'message.required' => 'Pesan testimonial wajib diisi.',
            'rating.integer' => 'Rating harus berupa angka.',
            'rating.between' => 'Rating harus antara 1 sampai 5.',
        ];
    }
}
