export interface PortfolioProject {
  id: number;
  title: string;
  slug: string;
  category: string;
  client: string | null;
  description: string;
  thumbnail: string | null;
  project_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface PortfolioProjectPayload {
  title: string;
  slug: string;
  category: string;
  client?: string | null;
  description: string;
  thumbnail?: string | null;
  project_url?: string | null;
}
