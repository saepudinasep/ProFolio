import type { Metadata } from 'next';

import { AuthProvider } from '@/hooks/useAuth';

import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'ProFolio — Studio Pengembangan Produk Digital',
    template: '%s | ProFolio',
  },
  description:
    'ProFolio membangun web, aplikasi mobile, dan identitas brand untuk bisnis yang ingin tumbuh lewat produk digital.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='id'>
      <body className='antialiased'>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
