'use client';

import useSWR from 'swr';

import { api } from '@/lib/api';
import { getApiErrorMessage } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';

export interface ApiCollectionResponse<T> {
  success: boolean;
  message: string;
  data: T[];
}

export interface ApiItemResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface UseApiResult<T> {
  items: T[];
  loading: boolean;
  error: string | null;

  refetch: () => Promise<void>;

  create: <TPayload>(payload: TPayload) => Promise<void>;

  update: <TPayload>(id: string | number, payload: TPayload) => Promise<void>;

  remove: (id: string | number) => Promise<void>;
}

export interface UseApiItemResult<T> {
  item: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

/**
 * Normalisasi endpoint.
 *
 * Contoh:
 *
 * services
 * admin/services
 * editor/services
 * /admin/services
 * /editor/services
 *
 * semuanya akan menjadi:
 *
 * services
 */
function normalizeEndpoint(endpoint: string): string {
  return endpoint
    .replace(/^\/+/, '')
    .replace(/^admin\//, '')
    .replace(/^editor\//, '');
}

/**
 * Tentukan prefix berdasarkan role user.
 */
function getRolePrefix(role: string | undefined): string | null {
  if (role === 'admin') {
    return 'admin';
  }

  if (role === 'editor') {
    return 'editor';
  }

  return null;
}

/**
 * Buat endpoint API berdasarkan role.
 */
function buildEndpoint(endpoint: string, role: string | undefined): string | null {
  const prefix = getRolePrefix(role);

  if (!prefix) {
    return null;
  }

  const normalized = normalizeEndpoint(endpoint);

  return `${prefix}/${normalized}`;
}

export function useApi<T>(endpoint: string): UseApiResult<T> {
  const { user, loading: authLoading } = useAuth();

  const apiEndpoint = buildEndpoint(endpoint, user?.role);

  const { data, error, isLoading, mutate } = useSWR<T[], Error>(
    apiEndpoint,
    async (url: string): Promise<T[]> => {
      try {
        const response = await api.get<ApiCollectionResponse<T>>(url);

        return response.data.data;
      } catch (error: unknown) {
        throw new Error(getApiErrorMessage(error, 'Gagal memuat data.'));
      }
    },
  );

  async function create<TPayload>(payload: TPayload): Promise<void> {
    if (!apiEndpoint) {
      throw new Error('Role pengguna tidak valid.');
    }

    try {
      await api.post(apiEndpoint, payload);

      await mutate();
    } catch (error: unknown) {
      throw new Error(getApiErrorMessage(error, 'Gagal membuat data.'));
    }
  }

  async function update<TPayload>(id: string | number, payload: TPayload): Promise<void> {
    if (!apiEndpoint) {
      throw new Error('Role pengguna tidak valid.');
    }

    const url = `${apiEndpoint}/` + encodeURIComponent(String(id));

    try {
      await api.put(url, payload);

      await mutate();
    } catch (error: unknown) {
      throw new Error(getApiErrorMessage(error, 'Gagal memperbarui data.'));
    }
  }

  async function remove(id: string | number): Promise<void> {
    if (!apiEndpoint) {
      throw new Error('Role pengguna tidak valid.');
    }

    const url = `${apiEndpoint}/` + encodeURIComponent(String(id));

    try {
      await api.delete(url);

      await mutate();
    } catch (error: unknown) {
      throw new Error(getApiErrorMessage(error, 'Gagal menghapus data.'));
    }
  }

  return {
    items: data ?? [],

    loading: authLoading || (!!user && !!apiEndpoint && isLoading),

    error: error?.message ?? null,

    refetch: async () => {
      await mutate();
    },

    create,
    update,
    remove,
  };
}

export function useApiItem<T>(endpoint: string, identifier?: string | number): UseApiItemResult<T> {
  const { user, loading: authLoading } = useAuth();

  const apiEndpoint = buildEndpoint(endpoint, user?.role);

  const key =
    apiEndpoint && identifier !== undefined && identifier !== null
      ? `${apiEndpoint}/${encodeURIComponent(String(identifier))}`
      : null;

  const { data, error, isLoading, mutate } = useSWR<T, Error>(
    key,
    async (url: string): Promise<T> => {
      try {
        const response = await api.get<ApiItemResponse<T>>(url);

        return response.data.data;
      } catch (error: unknown) {
        throw new Error(getApiErrorMessage(error, 'Gagal memuat data.'));
      }
    },
  );

  return {
    item: data ?? null,

    loading: authLoading || (!!user && !!key && isLoading),

    error: error?.message ?? null,

    refetch: async () => {
      await mutate();
    },
  };
}
