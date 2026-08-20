export interface ContactMessagePayload {
  name: string;
  email: string;
  phone?: string | null;
  subject?: string | null;
  message: string;
}

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  is_read: boolean;
  created_at: string;
  updated_at: string;
}

export interface ContactMessageResponse {
  success: boolean;
  message: string;
  data: ContactMessage;
}
