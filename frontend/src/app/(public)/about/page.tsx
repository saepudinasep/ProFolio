'use client';

import { Navbar } from '@/components/public/Navbar';
import { Footer } from '@/components/public/Footer';
import { SpecLabel } from '@/components/public/SpecLabel';

import { useApi } from '@/hooks/useApi';
import type { Page } from '@/types/page';

export default function AboutPage() {
  const { items, loading, error } = useApi<Page>('pages');

  const about = items.find((page) => page.slug === 'about');

  return (
    <>
      <Navbar />

      <main>
        <section className='border-b border-line'>
          <div className='mx-auto max-w-3xl px-6 py-16 md:py-20'>
            <SpecLabel>Tentang Kami</SpecLabel>

            {/* Loading */}
            {loading && (
              <p className='mt-6 font-mono text-xs uppercase tracking-widest text-ink-soft'>
                Memuat konten...
              </p>
            )}

            {/* Error */}
            {!loading && error && (
              <div className='mt-6 border border-redline bg-redline-soft p-5'>
                <p className='font-mono text-xs uppercase tracking-widest text-redline'>
                  Gagal memuat halaman
                </p>

                <p className='mt-2 text-sm text-ink-soft'>{error}</p>
              </div>
            )}

            {/* Page not found */}
            {!loading && !error && !about && (
              <div className='mt-6 border border-line bg-paper-raised p-6'>
                <h1 className='font-display text-2xl font-semibold tracking-tight'>
                  Tentang ProFolio
                </h1>

                <p className='mt-3 text-sm leading-relaxed text-ink-soft'>
                  Konten halaman Tentang Kami belum tersedia.
                </p>
              </div>
            )}

            {/* Content */}
            {!loading && !error && about && (
              <>
                <h1 className='mt-4 font-display text-4xl font-semibold tracking-tight'>
                  {about.title}
                </h1>

                <div
                  className='prose prose-neutral mt-6 max-w-none text-[15px] leading-relaxed text-ink-soft'
                  dangerouslySetInnerHTML={{
                    __html: about.content,
                  }}
                />
              </>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
