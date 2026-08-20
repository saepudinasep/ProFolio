import axios from 'axios';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind CSS classes.
 * Digunakan oleh shadcn/ui.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Standard Laravel API error response.
 */
interface ApiErrorResponse {
  success?: boolean;
  message?: string;
  errors?: Record<string, string[]>;
}

/**
 * Get readable error message from API request.
 */
export function getApiErrorMessage(error: unknown, fallback = 'Terjadi kesalahan.'): string {
  if (axios.isAxiosError<ApiErrorResponse>(error)) {
    const response = error.response?.data;

    if (response?.message) {
      return response.message;
    }

    if (response?.errors) {
      const firstError = Object.values(response.errors)[0]?.[0];

      if (firstError) {
        return firstError;
      }
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return fallback;
}
