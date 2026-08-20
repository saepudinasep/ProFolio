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

  return {
    items: data ?? [],
    loading: isLoading,
    error: error?.message ?? null,
    refetch: async () => {
      await mutate();
    },
  };
}

export function useApiItem<T>(endpoint: string, identifier?: string): UseApiItemResult<T> {
  const key = identifier ? `${endpoint}/${encodeURIComponent(identifier)}` : null;

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
