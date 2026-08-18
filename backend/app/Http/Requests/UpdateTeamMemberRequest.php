<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateTeamMemberRequest extends FormRequest
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
            'name' => [
                'required',
                'string',
                'max:255',
            ],

            'position' => [
                'required',
                'string',
                'max:255',
            ],

            'bio' => [
                'nullable',
                'string',
            ],

            'photo' => [
                'nullable',
                'string',
                'max:255',
            ],

            'social_links' => [
                'nullable',
                'array',
            ],

            'social_links.linkedin' => [
                'nullable',
                'url',
                'max:255',
            ],

            'social_links.github' => [
                'nullable',
                'url',
                'max:255',
            ],

            'social_links.instagram' => [
                'nullable',
                'url',
                'max:255',
            ],

            'social_links.youtube' => [
                'nullable',
                'url',
                'max:255',
            ],

            'social_links.tiktok' => [
                'nullable',
                'url',
                'max:255',
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Nama anggota wajib diisi.',
            'position.required' => 'Posisi anggota wajib diisi.',
            'social_links.array' => 'Social links harus berupa object.',
            'social_links.linkedin.url' => 'URL LinkedIn tidak valid.',
            'social_links.github.url' => 'URL GitHub tidak valid.',
            'social_links.instagram.url' => 'URL Instagram tidak valid.',
            'social_links.youtube.url' => 'URL YouTube tidak valid.',
            'social_links.tiktok.url' => 'URL TikTok tidak valid.',
        ];
    }
}
