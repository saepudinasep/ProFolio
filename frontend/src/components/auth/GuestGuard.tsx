'use client';

import { useEffect, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';

import { useAuth } from '@/hooks/useAuth';

interface GuestGuardProps {
  children: ReactNode;
}

export function GuestGuard({ children }: GuestGuardProps) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.replace('/dashboard');
    }
  }, [loading, user, router]);

  /**
   * Masih mengecek session.
   */
  if (loading) {
    return (
      <div className='flex min-h-screen items-center justify-center bg-paper'>
        <div className='text-center'>
          <p className='font-mono text-[13px] uppercase tracking-widest text-ink-soft'>
            Memuat sesi...
          </p>
        </div>
      </div>
    );
  }

  /**
   * User sudah login.
   *
   * Jangan render halaman login.
   */
  if (user) {
    return null;
  }

  return <>{children}</>;
}
