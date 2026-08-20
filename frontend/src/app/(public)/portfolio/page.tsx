import type { Metadata } from 'next';

import { Navbar } from '@/components/public/Navbar';
import { Footer } from '@/components/public/Footer';
import { PortfolioExplorer } from '@/components/public/PortfolioExplorer';
import { SpecLabel } from '@/components/public/SpecLabel';

export const metadata: Metadata = {
  title: 'Portfolio — ProFolio',
  description: 'Kumpulan project ProFolio yang telah dibangun bersama klien.',
};

export default function PortfolioPage() {
  return (
    <>
      <Navbar />

      <main>
        <section className='border-b border-line'>
          <div className='mx-auto max-w-6xl px-6 py-16'>
            <SpecLabel>Portfolio</SpecLabel>

            <h1 className='mt-4 font-display text-4xl font-semibold tracking-tight'>
              Semua project.
            </h1>

            <p className='mt-3 max-w-md text-sm leading-relaxed text-ink-soft'>
              Kumpulan produk yang sudah kami bangun bersama klien, dari aplikasi web sampai
              identitas brand.
            </p>
          </div>
        </section>

        <section>
          <div className='mx-auto max-w-6xl px-6 py-14'>
            <PortfolioExplorer />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
