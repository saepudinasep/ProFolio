'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

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

  const authenticated = user !== null;

  /**
   * Load authenticated user
   */
  const refreshUser = async () => {
    try {
      if (!isAuthenticated()) {
        setUser(null);
        return;
      }

      const currentUser = await getCurrentUser();

      setUser(currentUser);
    } catch {
      setUser(null);
    }
  };

  /**
   * Login
   */
  const login = async (credentials: LoginCredentials) => {
    const currentUser = await loginRequest(credentials);

    setUser(currentUser);

    return currentUser;
  };

  /**
   * Logout
   */
  const logout = async () => {
    await logoutRequest();

    setUser(null);
  };

  /**
   * Initial authentication check
   */
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        await refreshUser();
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

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

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
}
