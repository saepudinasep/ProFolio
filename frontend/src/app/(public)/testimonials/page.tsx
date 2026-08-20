import type { Metadata } from 'next';

import { Footer } from '@/components/public/Footer';
import { Navbar } from '@/components/public/Navbar';
import { SpecLabel } from '@/components/public/SpecLabel';
import { Testimonials } from '@/components/public/Testimonials';

export const metadata: Metadata = {
  title: 'Testimoni — ProFolio',
  description: 'Testimoni dari klien yang telah bekerja sama dengan ProFolio.',
};

export default function TestimonialsPage() {
  return (
    <>
      <Navbar />

      <main>
        <section className='border-b border-line'>
          <div className='mx-auto max-w-6xl px-6 py-16'>
            <SpecLabel>Testimoni</SpecLabel>

            <h1 className='mt-4 font-display text-4xl font-semibold tracking-tight'>
              Kata mereka yang sudah bekerja sama.
            </h1>

            <p className='mt-3 max-w-md text-sm leading-relaxed text-ink-soft'>
              Pengalaman dan pendapat klien setelah bekerja sama dengan tim ProFolio.
            </p>
          </div>
        </section>

        <Testimonials />
      </main>

      <Footer />
    </>
  );
}
