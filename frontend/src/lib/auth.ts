import { api } from './api';
import { tokenStorage, userStorage } from './storage';

import type { LoginCredentials, LoginResponse, MeResponse, User } from '@/types/auth';

/**
 * Login
 */
export async function login(credentials: LoginCredentials): Promise<User> {
  const response = await api.post<LoginResponse>('/login', credentials);

  const { user, token } = response.data.data;

  tokenStorage.set(token);
  userStorage.set(user);

  return user;
}

/**
 * Get authenticated user
 */
export async function getCurrentUser(): Promise<User> {
  const response = await api.get<MeResponse>('/me');

  const user = response.data.data.user;

  userStorage.set(user);

  return user;
}

/**
 * Logout
 */
export async function logout(): Promise<void> {
  try {
    await api.post('/logout');
  } finally {
    tokenStorage.remove();
    userStorage.remove();
  }
}

/**
 * Check whether authentication token exists.
 */
export function isAuthenticated(): boolean {
  return tokenStorage.get() !== null;
}

/**
 * Get cached authenticated user.
 */
export function getStoredUser(): User | null {
  return userStorage.get<User>();
}

/**
 * Get stored authentication token.
 */
export function getToken(): string | null {
  return tokenStorage.get();
}
