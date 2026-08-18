<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdatePortfolioProjectRequest extends FormRequest
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

            'slug' => [
                'required',
                'string',
                'max:255',
                Rule::unique('portfolio_projects', 'slug')
                    ->ignore($this->portfolioProject),
            ],

            'category' => [
                'required',
                'string',
                'max:255',
            ],

            'client' => [
                'nullable',
                'string',
                'max:255',
            ],

            'description' => [
                'required',
                'string',
            ],

            'thumbnail' => [
                'required',
                'string',
                'max:255',
            ],

            'project_url' => [
                'nullable',
                'url',
                'max:255',
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'title.required' => 'Judul project wajib diisi.',
            'slug.required' => 'Slug project wajib diisi.',
            'slug.unique' => 'Slug project sudah digunakan.',
            'category.required' => 'Kategori project wajib diisi.',
            'description.required' => 'Deskripsi project wajib diisi.',
            'thumbnail.required' => 'Thumbnail project wajib diisi.',
            'project_url.url' => 'URL project tidak valid.',
        ];
    }
}
