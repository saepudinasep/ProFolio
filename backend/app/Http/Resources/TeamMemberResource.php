<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TeamMemberResource extends JsonResource
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
            'name' => $this->name,
            'position' => $this->position,
            'bio' => $this->bio,
            'photo' => $this->photo,
            'social_links' => $this->social_links,

            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
