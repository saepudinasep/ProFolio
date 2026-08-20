'use client';

import useSWR from 'swr';

import { api } from '@/lib/api';
import { getApiErrorMessage } from '@/lib/utils';

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

export function useApi<T>(endpoint: string): UseApiResult<T> {
  const { data, error, isLoading, mutate } = useSWR<T[], Error>(
    endpoint,
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
    try {
      await api.post(endpoint, payload);

      await mutate();
    } catch (error: unknown) {
      throw new Error(getApiErrorMessage(error, 'Gagal membuat data.'));
    }
  }

  async function update<TPayload>(id: string | number, payload: TPayload): Promise<void> {
    try {
      await api.put(`${endpoint}/${encodeURIComponent(String(id))}`, payload);

      await mutate();
    } catch (error: unknown) {
      throw new Error(getApiErrorMessage(error, 'Gagal memperbarui data.'));
    }
  }

  async function remove(id: string | number): Promise<void> {
    try {
      await api.delete(`${endpoint}/${encodeURIComponent(String(id))}`);

      await mutate();
    } catch (error: unknown) {
      throw new Error(getApiErrorMessage(error, 'Gagal menghapus data.'));
    }
  }

  return {
    items: data ?? [],
    loading: isLoading,
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
  const key =
    identifier !== undefined && identifier !== null
      ? `${endpoint}/${encodeURIComponent(String(identifier))}`
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
    loading: isLoading,
    error: error?.message ?? null,

    refetch: async () => {
      await mutate();
    },
  };
}
