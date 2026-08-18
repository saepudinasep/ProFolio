import type { Metadata } from 'next';
import './globals.css';

import { AuthProvider } from '@/hooks/useAuth';

export const metadata: Metadata = {
  title: 'ProFolio',
  description: 'Professional Portfolio Platform',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='id'>
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
