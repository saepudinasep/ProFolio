'use client';

import axios from 'axios';
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';

import {
  getCurrentUser,
  getStoredUser,
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

  const refreshUser = useCallback(async (): Promise<void> => {
    if (!isAuthenticated()) {
      setUser(null);
      return;
    }

    const cachedUser = getStoredUser();

    if (cachedUser) {
      setUser(cachedUser);
    }

    try {
      const currentUser = await getCurrentUser();

      setUser(currentUser);
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        setUser(null);
        return;
      }

      /*
       * Jika bukan 401, anggap error sementara
       * dan pertahankan user yang tersimpan.
       */
      if (cachedUser) {
        setUser(cachedUser);
      }
    }
  }, []);

  const login = useCallback(async (credentials: LoginCredentials): Promise<User> => {
    const currentUser = await loginRequest(credentials);

    setUser(currentUser);

    return currentUser;
  }, []);

  const logout = useCallback(async (): Promise<void> => {
    try {
      await logoutRequest();
    } finally {
      setUser(null);
    }
  }, []);

  useEffect(() => {
    void (async () => {
      try {
        await refreshUser();
      } finally {
        setLoading(false);
      }
    })();
  }, [refreshUser]);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: user !== null,
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
