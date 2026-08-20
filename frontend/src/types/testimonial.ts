export interface Testimonial {
  id: number;
  client_name: string;
  client_position: string | null;
  company: string | null;
  photo: string | null;
  message: string;
  rating: number | null;
  created_at: string;
  updated_at: string;
}

export interface TestimonialPayload {
  client_name: string;
  client_position?: string | null;
  company?: string | null;
  photo?: string | null;
  message: string;
  rating?: number | null;
}
