import type { Metadata } from 'next';

import { AuthGuard } from '@/components/dashboard/AuthGuard';
import { Sidebar } from '@/components/dashboard/Sidebar';

export const metadata: Metadata = {
  title: 'Dashboard — ProFolio',
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthGuard>
      <div className='flex min-h-screen bg-paper'>
        <Sidebar />

        <main className='min-w-0 flex-1 px-6 py-6 md:px-8 md:py-8'>{children}</main>
      </div>
    </AuthGuard>
  );
}
