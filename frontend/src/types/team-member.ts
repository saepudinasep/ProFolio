export interface SocialLinks {
  linkedin?: string | null;
  github?: string | null;
  [key: string]: string | null | undefined;
}

export interface TeamMember {
  id: number;
  name: string;
  position: string;
  bio: string | null;
  photo: string | null;
  social_links: SocialLinks;
  created_at: string;
  updated_at: string;
}

export interface TeamMemberPayload {
  name: string;
  position: string;
  bio?: string | null;
  photo?: string | null;
  social_links?: SocialLinks | null;
}
