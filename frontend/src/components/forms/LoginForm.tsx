'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Field } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

import { useAuth } from '@/hooks/useAuth';
import { getApiErrorMessage } from '@/lib/utils';

export function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState('admin@profolio.id');
  const [password, setPassword] = useState('');

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError(null);
    setLoading(true);

    try {
      await login({
        email: email.trim(),
        password,
      });

      router.replace('/dashboard');
    } catch (error: unknown) {
      setError(getApiErrorMessage(error, 'Email atau password salah.'));
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className='w-full max-w-sm space-y-5'>
      <Field label='Email'>
        <Input
          id='email'
          name='email'
          type='email'
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder='admin@profolio.id'
          autoComplete='email'
          required
          disabled={loading}
        />
      </Field>

      <Field label='Password'>
        <Input
          id='password'
          name='password'
          type='password'
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder='Masukkan password'
          autoComplete='current-password'
          required
          disabled={loading}
        />
      </Field>

      {error && (
        <p
          role='alert'
          className='border border-redline bg-redline-soft px-3 py-2 text-xs text-redline'
        >
          {error}
        </p>
      )}

      <Button type='submit' disabled={loading} className='w-full justify-center'>
        {loading ? 'Memproses...' : 'Masuk'}
      </Button>
    </form>
  );
}
