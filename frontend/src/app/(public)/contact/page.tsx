import type { Metadata } from 'next';
import Link from 'next/link';
import { Mail, MapPin, Phone, type LucideIcon } from 'lucide-react';

import { Navbar } from '@/components/public/Navbar';
import { Footer } from '@/components/public/Footer';
import { SpecLabel } from '@/components/public/SpecLabel';
import { ContactForm } from '@/components/public/ContactForm';

export const metadata: Metadata = {
  title: 'Kontak — ProFolio',
  description: 'Hubungi ProFolio untuk mendiskusikan kebutuhan web, aplikasi, dan produk digital.',
};

interface ContactInfo {
  icon: LucideIcon;
  label: string;
  value: string;
  href?: string;
}

const infoItems: ContactInfo[] = [
  {
    icon: MapPin,
    label: 'Alamat',
    value: 'Jl. Melati No. 12, Jakarta Selatan',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'hello@profolio.id',
    href: 'mailto:hello@profolio.id',
  },
  {
    icon: Phone,
    label: 'Telepon',
    value: '+62 812 3456 7890',
    href: 'tel:+6281234567890',
  },
];

export default function ContactPage() {
  return (
    <>
      <Navbar />

      <main>
        {/* Header */}
        <section className='border-b border-line'>
          <div className='mx-auto max-w-6xl px-6 py-16'>
            <SpecLabel>Kontak</SpecLabel>

            <h1 className='mt-4 font-display text-4xl font-semibold tracking-tight'>
              Ceritakan project-mu ke kami.
            </h1>

            <p className='mt-3 max-w-md text-sm leading-relaxed text-ink-soft'>
              Isi form di bawah dan tim kami akan menghubungimu untuk diskusi lebih lanjut.
            </p>
          </div>
        </section>

        {/* Contact */}
        <section>
          <div className='mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-[1.4fr_1fr]'>
            {/* Form */}
            <ContactForm />

            {/* Contact information */}
            <div>
              <div className='grid-paper flex aspect-4/3 items-center justify-center border border-line'>
                <span className='font-mono text-[11px] uppercase tracking-wider text-ink-soft'>
                  Peta Lokasi
                </span>
              </div>

              <ul className='mt-6 space-y-5'>
                {infoItems.map((item) => {
                  const Icon = item.icon;

                  return (
                    <li key={item.label} className='flex items-start gap-3'>
                      <Icon
                        size={16}
                        strokeWidth={1.8}
                        aria-hidden='true'
                        className='mt-0.5 shrink-0 text-redline'
                      />

                      <div>
                        <p className='font-mono text-[11px] uppercase tracking-wider text-ink-soft'>
                          {item.label}
                        </p>

                        {item.href ? (
                          <Link
                            href={item.href}
                            className='mt-0.5 block text-sm transition-colors hover:text-blue'
                          >
                            {item.value}
                          </Link>
                        ) : (
                          <p className='mt-0.5 text-sm'>{item.value}</p>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
