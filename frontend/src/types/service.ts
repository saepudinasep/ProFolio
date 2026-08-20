export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string | null;
  order: number;
  created_at: string;
  updated_at: string;
}

export interface ServicePayload {
  title: string;
  description: string;
  icon?: string | null;
  order: number;
}
