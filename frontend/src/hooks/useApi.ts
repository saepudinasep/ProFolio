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

  update: <TPayload>(
    id: string | number,
    payload: TPayload,
  ) => Promise<void>;

  remove: (id: string | number) => Promise<void>;
}

export interface UseApiItemResult<T> {
  item: T | null;
  loading: boolean;
  error: string | null;

  refetch: () => Promise<void>;
}

/**
 * ============================================================
 * SWR CONFIGURATION
 * ============================================================
 *
 * Data CMS tidak realtime.
 *
 * Request dilakukan:
 * - ketika halaman pertama kali membutuhkan data
 * - setelah create
 * - setelah update
 * - setelah delete
 * - ketika refetch() dipanggil manual
 *
 * Tidak dilakukan:
 * - polling
 * - refresh ketika pindah tab
 * - refresh ketika koneksi kembali
 * - retry otomatis ketika API error
 */
const swrConfig = {
  /**
   * Jangan request ulang ketika browser/window
   * mendapatkan focus kembali.
   */
  revalidateOnFocus: false,

  /**
   * Jangan request ulang ketika koneksi internet
   * kembali tersedia.
   */
  revalidateOnReconnect: false,

  /**
   * Tidak melakukan polling.
   */
  refreshInterval: 0,

  /**
   * Jika request dengan key yang sama terjadi
   * dalam 5 detik, SWR menggunakan request/cache
   * yang sama.
   */
  dedupingInterval: 5000,

  /**
   * Jangan retry request berkali-kali ketika
   * Laravel API sedang error.
   */
  shouldRetryOnError: false,
};

/**
 * ============================================================
 * ENDPOINT ROLE
 * ============================================================
 *
 * Input:
 *
 * services
 * admin/services
 * editor/services
 * /admin/services
 * /editor/services
 *
 * semuanya dinormalisasi menjadi:
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
 * Buat endpoint API berdasarkan role user.
 *
 * Admin:
 *
 * services
 * ↓
 * admin/services
 *
 * Editor:
 *
 * services
 * ↓
 * editor/services
 */
function buildEndpoint(
  endpoint: string,
  role: string | undefined,
): string | null {
  const prefix = getRolePrefix(role);

  if (!prefix) {
    return null;
  }

  const normalized = normalizeEndpoint(endpoint);

  return `${prefix}/${normalized}`;
}

/**
 * ============================================================
 * COLLECTION API
 * ============================================================
 */
export function useApi<T>(endpoint: string): UseApiResult<T> {
  const {
    user,
    loading: authLoading,
  } = useAuth();

  /**
   * Endpoint otomatis berdasarkan role.
   *
   * Admin:
   * /admin/services
   *
   * Editor:
   * /editor/services
   */
  const apiEndpoint = buildEndpoint(
    endpoint,
    user?.role,
  );

  const {
    data,
    error,
    isLoading,
    mutate,
  } = useSWR<T[], Error>(
    /**
     * Jangan request sebelum user selesai
     * diverifikasi.
     *
     * Kalau null, SWR tidak melakukan request.
     */
    !authLoading && user && apiEndpoint
      ? apiEndpoint
      : null,

    async (url: string): Promise<T[]> => {
      try {
        const response =
          await api.get<ApiCollectionResponse<T>>(url);

        return response.data.data;
      } catch (error: unknown) {
        throw new Error(
          getApiErrorMessage(
            error,
            'Gagal memuat data.',
          ),
        );
      }
    },

    swrConfig,
  );

  /**
   * ==========================================================
   * CREATE
   * ==========================================================
   */
  async function create<TPayload>(
    payload: TPayload,
  ): Promise<void> {
    if (!apiEndpoint) {
      throw new Error(
        'Role pengguna tidak valid.',
      );
    }

    try {
      await api.post(
        apiEndpoint,
        payload,
      );

      /**
       * Refresh hanya setelah CREATE berhasil.
       */
      await mutate();
    } catch (error: unknown) {
      throw new Error(
        getApiErrorMessage(
          error,
          'Gagal membuat data.',
        ),
      );
    }
  }

  /**
   * ==========================================================
   * UPDATE
   * ==========================================================
   */
  async function update<TPayload>(
    id: string | number,
    payload: TPayload,
  ): Promise<void> {
    if (!apiEndpoint) {
      throw new Error(
        'Role pengguna tidak valid.',
      );
    }

    const url =
      `${apiEndpoint}/` +
      encodeURIComponent(String(id));

    try {
      await api.put(
        url,
        payload,
      );

      /**
       * Refresh hanya setelah UPDATE berhasil.
       */
      await mutate();
    } catch (error: unknown) {
      throw new Error(
        getApiErrorMessage(
          error,
          'Gagal memperbarui data.',
        ),
      );
    }
  }

  /**
   * ==========================================================
   * DELETE
   * ==========================================================
   */
  async function remove(
    id: string | number,
  ): Promise<void> {
    if (!apiEndpoint) {
      throw new Error(
        'Role pengguna tidak valid.',
      );
    }

    const url =
      `${apiEndpoint}/` +
      encodeURIComponent(String(id));

    try {
      await api.delete(url);

      /**
       * Refresh hanya setelah DELETE berhasil.
       */
      await mutate();
    } catch (error: unknown) {
      throw new Error(
        getApiErrorMessage(
          error,
          'Gagal menghapus data.',
        ),
      );
    }
  }

  /**
   * ==========================================================
   * MANUAL REFETCH
   * ==========================================================
   */
  async function refetch(): Promise<void> {
    await mutate();
  }

  return {
    items: data ?? [],

    /**
     * Loading ketika:
     *
     * 1. Auth masih diperiksa
     * 2. User sudah tersedia dan API sedang loading
     */
    loading:
      authLoading ||
      (!!user && !!apiEndpoint && isLoading),

    error:
      error?.message ?? null,

    refetch,

    create,
    update,
    remove,
  };
}

/**
 * ============================================================
 * SINGLE ITEM API
 * ============================================================
 */
export function useApiItem<T>(
  endpoint: string,
  identifier?: string | number,
): UseApiItemResult<T> {
  const {
    user,
    loading: authLoading,
  } = useAuth();

  /**
   * Endpoint berdasarkan role.
   */
  const apiEndpoint = buildEndpoint(
    endpoint,
    user?.role,
  );

  /**
   * Contoh admin:
   *
   * admin/portfolio-projects/1
   *
   * Contoh editor:
   *
   * editor/portfolio-projects/1
   */
  const key =
    !authLoading &&
    user &&
    apiEndpoint &&
    identifier !== undefined &&
    identifier !== null
      ? `${apiEndpoint}/${encodeURIComponent(
          String(identifier),
        )}`
      : null;

  const {
    data,
    error,
    isLoading,
    mutate,
  } = useSWR<T, Error>(
    key,

    async (url: string): Promise<T> => {
      try {
        const response =
          await api.get<ApiItemResponse<T>>(url);

        return response.data.data;
      } catch (error: unknown) {
        throw new Error(
          getApiErrorMessage(
            error,
            'Gagal memuat data.',
          ),
        );
      }
    },

    swrConfig,
  );

  /**
   * Manual refetch item.
   */
  async function refetch(): Promise<void> {
    await mutate();
  }

  return {
    item: data ?? null,

    loading:
      authLoading ||
      (!!user && !!key && isLoading),

    error:
      error?.message ?? null,

    refetch,
  };
}