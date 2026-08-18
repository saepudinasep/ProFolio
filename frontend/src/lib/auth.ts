import { api } from './api';
import { tokenStorage } from './storage';

import type { LoginCredentials, LoginResponse, MeResponse, User } from '@/types/auth';

/**
 * Login
 */
export async function login(credentials: LoginCredentials): Promise<User> {
  const response = await api.post<LoginResponse>('/api/login', credentials);

  const { token, user } = response.data.data;

  tokenStorage.set(token);

  return user;
}

/**
 * Get authenticated user
 */
export async function getCurrentUser(): Promise<User> {
  const response = await api.get<MeResponse>('/api/me');

  return response.data.data.user;
}

/**
 * Logout
 */
export async function logout(): Promise<void> {
  try {
    await api.post('/api/logout');
  } finally {
    tokenStorage.remove();
  }
}

/**
 * Check token existence
 */
export function isAuthenticated(): boolean {
  return tokenStorage.get() !== null;
}

/**
 * Get stored token
 */
export function getToken(): string | null {
  return tokenStorage.get();
}
