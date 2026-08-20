'use client';

import Link from 'next/link';

import { useAuth } from '@/hooks/useAuth';

import { Button } from '@/components/ui/button';

export default function AuthTestPage() {
  const { user, loading, isAuthenticated, logout } = useAuth();

  async function handleLogout() {
    try {
      await logout();
    } catch (error) {
      console.error('Logout gagal:', error);
    }
  }

  return (
    <main className='mx-auto max-w-lg px-6 py-16'>
      <span className='font-mono text-[11px] uppercase tracking-wider text-redline'>
        [ Auth Debug ]
      </span>

      <h1 className='mt-3 font-display text-2xl font-semibold tracking-tight'>
        Status Autentikasi
      </h1>

      <p className='mt-2 text-sm leading-relaxed text-ink-soft'>
        Halaman ini digunakan untuk menguji authentication, Bearer Token, dan role user.
      </p>

      {/* Authentication Status */}
      <div className='mt-6 border border-line bg-paper-raised p-5 font-mono text-xs'>
        <div className='flex items-center justify-between'>
          <span>Status</span>

          <span
            className={
              loading ? 'text-ink-soft' : isAuthenticated ? 'text-green-600' : 'text-redline'
            }
          >
            {loading ? 'CHECKING' : isAuthenticated ? 'AUTHENTICATED' : 'UNAUTHENTICATED'}
          </span>
        </div>

        <div className='mt-4 border-t border-line pt-4'>
          <p>loading: {String(loading)}</p>

          <p className='mt-2'>isAuthenticated: {String(isAuthenticated)}</p>
        </div>
      </div>

      {/* User */}
      <div className='mt-4 border border-line bg-paper-raised p-5'>
        <p className='font-mono text-[11px] uppercase tracking-wider text-ink-soft'>User</p>

        {loading ? (
          <p className='mt-3 text-sm text-ink-soft'>Memeriksa sesi...</p>
        ) : user ? (
          <div className='mt-3 space-y-2 text-sm'>
            <div className='flex justify-between gap-4'>
              <span className='text-ink-soft'>ID</span>

              <span>{user.id}</span>
            </div>

            <div className='flex justify-between gap-4'>
              <span className='text-ink-soft'>Nama</span>

              <span>{user.name}</span>
            </div>

            <div className='flex justify-between gap-4'>
              <span className='text-ink-soft'>Email</span>

              <span>{user.email}</span>
            </div>

            <div className='flex justify-between gap-4'>
              <span className='text-ink-soft'>Role</span>

              <span className='font-medium uppercase'>{user.role}</span>
            </div>
          </div>
        ) : (
          <p className='mt-3 text-sm text-ink-soft'>Tidak ada user yang sedang login.</p>
        )}
      </div>

      {/* Raw response */}
      {user && (
        <details className='mt-4 border border-line bg-paper-raised'>
          <summary className='cursor-pointer px-5 py-3 font-mono text-[11px] uppercase tracking-wider text-ink-soft'>
            Raw User Data
          </summary>

          <pre className='overflow-x-auto border-t border-line p-5 font-mono text-xs text-ink-soft'>
            {JSON.stringify(user, null, 2)}
          </pre>
        </details>
      )}

      {/* Actions */}
      <div className='mt-6 flex flex-wrap gap-3'>
        {user ? (
          <Button type='button' variant='outline' onClick={handleLogout}>
            Logout
          </Button>
        ) : (
          <Button asChild>
            <Link href='/login'>Ke Halaman Login</Link>
          </Button>
        )}

        <Button asChild variant='outline'>
          <Link href='/dashboard'>Ke Dashboard</Link>
        </Button>

        <Button asChild variant='ghost'>
          <Link href='/'>Ke Homepage</Link>
        </Button>
      </div>
    </main>
  );
}
