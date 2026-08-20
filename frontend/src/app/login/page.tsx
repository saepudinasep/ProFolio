import type { Metadata } from 'next';

import { LoginForm } from '@/components/forms/LoginForm';

export const metadata: Metadata = {
  title: 'Masuk — ProFolio Admin',
  description: 'Masuk ke dashboard ProFolio untuk mengelola konten website.',
};

export default function LoginPage() {
  return (
    <main className='flex min-h-screen items-center justify-center bg-paper px-6'>
      <div className='w-full max-w-sm'>
        {/* Brand */}
        <div className='mb-8 text-center'>
          <span
            aria-hidden='true'
            className='mx-auto flex h-10 w-10 items-center justify-center border border-ink font-mono text-sm'
          >
            P.
          </span>

          <h1 className='mt-4 font-display text-2xl font-semibold tracking-tight'>
            Masuk ke ProFolio
          </h1>

          <p className='mt-1 text-sm leading-relaxed text-ink-soft'>
            Kelola konten website dari sini.
          </p>
        </div>

        {/* Login */}
        <LoginForm />
      </div>
    </main>
  );
}
