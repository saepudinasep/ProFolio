const TOKEN_KEY = 'profolio_token';
const USER_KEY = 'profolio_user';

export const tokenStorage = {
  get(): string | null {
    if (typeof window === 'undefined') {
      return null;
    }

    return localStorage.getItem(TOKEN_KEY);
  },

  set(token: string): void {
    if (typeof window === 'undefined') {
      return;
    }

    localStorage.setItem(TOKEN_KEY, token);
  },

  remove(): void {
    if (typeof window === 'undefined') {
      return;
    }

    localStorage.removeItem(TOKEN_KEY);
  },
};

export const userStorage = {
  get<T>(): T | null {
    if (typeof window === 'undefined') {
      return null;
    }

    const value = localStorage.getItem(USER_KEY);

    if (!value) {
      return null;
    }

    try {
      return JSON.parse(value) as T;
    } catch {
      localStorage.removeItem(USER_KEY);
      return null;
    }
  },

  set<T>(user: T): void {
    if (typeof window === 'undefined') {
      return;
    }

    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  remove(): void {
    if (typeof window === 'undefined') {
      return;
    }

    localStorage.removeItem(USER_KEY);
  },
};
