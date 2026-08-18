<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PortfolioProjectResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'category' => $this->category,
            'client' => $this->client,
            'description' => $this->description,
            'thumbnail' => $this->thumbnail,
            'project_url' => $this->project_url,

            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
