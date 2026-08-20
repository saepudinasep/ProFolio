import { api } from './api';
import { tokenStorage } from './storage';

import type { LoginCredentials, LoginResponse, MeResponse, User } from '@/types/auth';

/**
 * Login
 */
export async function login(credentials: LoginCredentials): Promise<User> {
  const response = await api.post<LoginResponse>('/login', credentials);

  const { user, token } = response.data.data;

  tokenStorage.set(token);

  return user;
}

/**
 * Get authenticated user
 */
export async function getCurrentUser(): Promise<User> {
  const response = await api.get<MeResponse>('/me');

  return response.data.data;
}

/**
 * Logout
 */
export async function logout(): Promise<void> {
  try {
    await api.post('/logout');
  } finally {
    tokenStorage.remove();
  }
}

/**
 * Check whether authentication token exists.
 */
export function isAuthenticated(): boolean {
  return tokenStorage.get() !== null;
}

/**
 * Get stored authentication token.
 */
export function getToken(): string | null {
  return tokenStorage.get();
}
