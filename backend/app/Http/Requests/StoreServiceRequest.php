<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreServiceRequest extends FormRequest
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
            'title' => [
                'required',
                'string',
                'max:255',
            ],

            'description' => [
                'required',
                'string',
            ],

            'icon' => [
                'nullable',
                'string',
                'max:255',
            ],

            'order' => [
                'required',
                'integer',
                'min:0',
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'title.required' => 'Judul layanan wajib diisi.',
            'description.required' => 'Deskripsi layanan wajib diisi.',
            'order.integer' => 'Urutan harus berupa angka.',
            'order.min' => 'Urutan tidak boleh kurang dari 0.',
        ];
    }
}
