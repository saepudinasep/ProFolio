import axios from 'axios';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind CSS classes.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ApiErrorResponse {
  success?: boolean;
  message?: string;
  errors?: Record<string, string[]>;
}

/**
 * Apakah detail error teknis boleh ditampilkan.
 */
function shouldShowErrorDetails(): boolean {
  return process.env.NEXT_PUBLIC_SHOW_ERROR_DETAILS === 'true';
}

/**
 * Pesan berdasarkan HTTP status.
 *
 * Pesan ini ditujukan untuk UI,
 * bukan pesan mentah dari backend.
 */
function getHttpErrorMessage(status: number): string {
  switch (status) {
    case 400:
      return 'Permintaan tidak valid.';

    case 401:
      return 'Sesi login tidak valid. Silakan login kembali.';

    case 403:
      return 'Anda tidak memiliki izin untuk mengakses resource ini.';

    case 404:
      return 'Data atau resource yang diminta tidak ditemukan.';

    case 409:
      return 'Data sudah digunakan atau terjadi konflik.';

    case 422:
      return 'Data yang dikirim tidak valid.';

    case 429:
      return 'Terlalu banyak permintaan. Silakan coba lagi nanti.';

    case 500:
      return 'Terjadi kesalahan pada server.';

    case 502:
    case 503:
    case 504:
      return 'Server sedang tidak dapat melayani permintaan.';

    default:
      return 'Terjadi kesalahan. Silakan coba lagi.';
  }
}

/**
 * Get readable API error message.
 *
 * Development:
 * - tetap dapat menampilkan detail teknis.
 *
 * Production:
 * - hanya menampilkan pesan yang aman untuk pengguna.
 */
export function getApiErrorMessage(
  error: unknown,
  fallback = 'Terjadi kesalahan. Silakan coba lagi.',
): string {
  const showDetails = shouldShowErrorDetails();

  if (!axios.isAxiosError<ApiErrorResponse>(error)) {
    if (showDetails && error instanceof Error) {
      return error.message;
    }

    return fallback;
  }

  const response = error.response;
  const status = response?.status;
  const data = response?.data;

  /*
   * Development:
   * tampilkan detail validation dari Laravel.
   */
  if (showDetails && data?.errors) {
    const firstError = Object.values(data.errors)[0]?.[0];

    if (firstError) {
      return firstError;
    }
  }

  /*
   * HTTP response tersedia.
   */
  if (status) {
    const statusMessage = getHttpErrorMessage(status);

    /*
     * Untuk development, tambahkan informasi
     * teknis HTTP tanpa menampilkan pesan backend
     * seperti "Endpoint atau resource tidak ditemukan."
     */
    if (showDetails) {
      return `${statusMessage} (HTTP ${status}).`;
    }

    return statusMessage;
  }

  /*
   * Request tidak mendapatkan response.
   * Contoh:
   * - Laravel mati
   * - CORS
   * - network error
   * - connection refused
   */
  if (axios.isAxiosError(error)) {
    if (showDetails) {
      return error.message;
    }

    return 'Tidak dapat terhubung ke server. Silakan coba lagi.';
  }

  return fallback;
}

/**
 * Create URL-friendly slug.
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

/**
 * Format Laravel timestamp.
 */
export function formatDate(value: string | null | undefined): string {
  if (!value) {
    return '-';
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return '-';
  }

  return new Intl.DateTimeFormat('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date);
}

/**
 * Convert Laravel storage path
 * into a usable frontend URL.
 */
export function getStorageUrl(path: string | null | undefined): string | null {
  if (!path) {
    return null;
  }

  const value = path.trim();

  if (!value) {
    return null;
  }

  if (value.startsWith('http://') || value.startsWith('https://')) {
    return value;
  }

  if (value.startsWith('/')) {
    return value;
  }

  const apiUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/api\/?$/, '');

  if (!apiUrl) {
    return `/${value}`;
  }

  return `${apiUrl}/storage/${value.replace(/^\/+/, '')}`;
}
