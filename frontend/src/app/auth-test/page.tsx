'use client';

import { useAuth } from '@/hooks/useAuth';

export default function AuthTestPage() {
  const { user, loading, isAuthenticated, logout } = useAuth();

  if (loading) {
    return <div className='p-10'>Loading authentication...</div>;
  }

  return (
    <main className='p-10'>
      <h1 className='text-2xl font-bold'>Authentication Test</h1>

      <div className='mt-6'>
        <p>Authenticated: {isAuthenticated ? 'Yes' : 'No'}</p>

        {user && (
          <div className='mt-4'>
            <p>Name: {user.name}</p>

            <p>Email: {user.email}</p>

            <p>Role: {user.role}</p>
          </div>
        )}

        {isAuthenticated && (
          <button onClick={logout} className='mt-6 rounded bg-black px-4 py-2 text-white'>
            Logout
          </button>
        )}
      </div>
    </main>
  );
}
