import type { Metadata } from 'next';

import { Footer } from '@/components/public/Footer';
import { Navbar } from '@/components/public/Navbar';
import { Services } from '@/components/public/Services';
import { SpecLabel } from '@/components/public/SpecLabel';

export const metadata: Metadata = {
  title: 'Layanan — ProFolio',
  description:
    'Layanan pengembangan produk digital ProFolio untuk web, aplikasi, dan kebutuhan digital lainnya.',
};

export default function ServicesPage() {
  return (
    <>
      <Navbar />

      <main>
        <section className='border-b border-line'>
          <div className='mx-auto max-w-6xl px-6 py-16'>
            <SpecLabel>Layanan</SpecLabel>

            <h1 className='mt-4 font-display text-4xl font-semibold tracking-tight'>
              Apa yang bisa kami bantu.
            </h1>

            <p className='mt-3 max-w-md text-sm leading-relaxed text-ink-soft'>
              Tiga disiplin utama yang kami tawarkan untuk membangun produk digitalmu dari nol.
            </p>
          </div>
        </section>

        <Services />
      </main>

      <Footer />
    </>
  );
}
