import { api } from '@/lib/api';

import type { ContactMessagePayload, ContactMessageResponse } from '@/types/contact';

export async function createContactMessage(
  payload: ContactMessagePayload,
): Promise<ContactMessageResponse> {
  const response = await api.post<ContactMessageResponse>('/contact-messages', payload);

  return response.data;
}
