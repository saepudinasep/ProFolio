'use client';

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';

import {
  getCurrentUser,
  isAuthenticated,
  login as loginRequest,
  logout as logoutRequest,
} from '@/lib/auth';

import type { LoginCredentials, User } from '@/types/auth';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;

  login: (credentials: LoginCredentials) => Promise<User>;

  logout: () => Promise<void>;

  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  /**
   * Check whether user is authenticated
   * and retrieve current user from Laravel API.
   */
  const refreshUser = useCallback(async (): Promise<void> => {
    if (!isAuthenticated()) {
      setUser(null);
      return;
    }

    try {
      const currentUser = await getCurrentUser();

      setUser(currentUser);
    } catch {
      /**
       * Token may be expired, revoked,
       * or no longer valid.
       */
      setUser(null);
    }
  }, []);

  /**
   * Login user.
   */
  const login = useCallback(async (credentials: LoginCredentials): Promise<User> => {
    const currentUser = await loginRequest(credentials);

    setUser(currentUser);

    return currentUser;
  }, []);

  /**
   * Logout current user.
   */
  const logout = useCallback(async (): Promise<void> => {
    try {
      await logoutRequest();
    } finally {
      /**
       * Always clear local authentication state,
       * even if Laravel logout request fails.
       */
      setUser(null);
    }
  }, []);

  /**
   * Initialize authentication state.
   */
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        await refreshUser();
      } finally {
        setLoading(false);
      }
    };

    void initializeAuth();
  }, [refreshUser]);

  const authenticated = user !== null;

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: authenticated,
        login,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
}
