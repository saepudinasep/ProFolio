export interface Page {
  id: number;
  slug: string;
  title: string;
  content: string;
  meta_title: string | null;
  meta_description: string | null;
  created_at: string;
  updated_at: string;
}

export interface PagePayload {
  slug: string;
  title: string;
  content: string;
  meta_title?: string | null;
  meta_description?: string | null;
}
