'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

import { useAuth } from '@/hooks/useAuth';
import { getApiErrorMessage } from '@/lib/utils';

export default function LoginPage() {
  const router = useRouter();

  const { login, loading: authLoading } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError('');
    setLoading(true);

    try {
      const user = await login({
        email,
        password,
      });

      console.log('Login berhasil:', user);

      router.push('/dashboard');
    } catch (error: unknown) {
      console.error(error);

      const message = getApiErrorMessage(error, 'Email atau password salah.');

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className='flex min-h-screen items-center justify-center bg-gray-100 px-6'>
      <div className='w-full max-w-md rounded-xl bg-white p-8 shadow'>
        <h1 className='text-2xl font-bold'>Login</h1>

        <p className='mt-2 text-sm text-gray-600'>Masuk ke dashboard ProFolio</p>

        {error && <div className='mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-600'>{error}</div>}

        <form onSubmit={handleSubmit} className='mt-6 space-y-4'>
          <div>
            <label htmlFor='email' className='block text-sm font-medium'>
              Email
            </label>

            <input
              id='email'
              type='email'
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              className='mt-1 w-full rounded-lg border px-3 py-2 outline-none focus:ring-2'
              placeholder='admin@example.com'
            />
          </div>

          <div>
            <label htmlFor='password' className='block text-sm font-medium'>
              Password
            </label>

            <input
              id='password'
              type='password'
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              className='mt-1 w-full rounded-lg border px-3 py-2 outline-none focus:ring-2'
              placeholder='••••••••'
            />
          </div>

          <button
            type='submit'
            disabled={loading || authLoading}
            className='w-full rounded-lg bg-black px-4 py-2 font-medium text-white disabled:cursor-not-allowed disabled:opacity-50'
          >
            {loading ? 'Memproses...' : 'Login'}
          </button>
        </form>
      </div>
    </main>
  );
}
