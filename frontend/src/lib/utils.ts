import axios from 'axios';

interface ApiErrorResponse {
  success?: boolean;
  message?: string;
  errors?: Record<string, string[]>;
}

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
