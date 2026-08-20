import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { SpecLabel } from './SpecLabel';

const workflowSteps = [
  'Riset & Perencanaan',
  'Desain Sistem',
  'Pengembangan',
  'Rilis & Dukungan',
] as const;

export function Hero() {
  return (
    <section className='grid-paper border-b border-line'>
      <div className='mx-auto grid max-w-6xl gap-10 px-6 py-20 md:grid-cols-[1.15fr_1fr] md:items-center md:py-28'>
        {/* Content */}
        <div>
          <SpecLabel index='00'>Studio Digital</SpecLabel>

          <h1 className='mt-5 font-display text-4xl font-semibold leading-[1.08] tracking-tight md:text-5xl'>
            Produk digital yang dirancang seperti gambar teknik —
            <span className='text-blue'> presisi, terukur, siap dibangun.</span>
          </h1>

          <p className='mt-6 max-w-md text-[15px] leading-relaxed text-ink-soft'>
            ProFolio membantu bisnis menerjemahkan ide menjadi web, aplikasi, dan identitas brand
            yang jelas arahnya sejak sketsa pertama.
          </p>

          {/* CTA */}
          <div className='mt-8 flex flex-wrap items-center gap-4'>
            <Button asChild>
              <Link href='/portfolio'>
                Lihat Portfolio
                <ArrowUpRight size={14} strokeWidth={1.8} aria-hidden='true' />
              </Link>
            </Button>

            <Link
              href='/contact'
              className='font-mono text-[13px] uppercase tracking-wider text-ink-soft underline decoration-line underline-offset-4 transition-colors hover:text-ink'
            >
              Diskusikan Project
            </Link>
          </div>
        </div>

        {/* Workflow */}
        <div className='relative aspect-4/3 border border-ink bg-paper-raised p-6'>
          {/* Corner markers */}
          <div
            aria-hidden='true'
            className='absolute -left-px -top-px h-3 w-3 border-l-2 border-t-2 border-redline'
          />

          <div
            aria-hidden='true'
            className='absolute -right-px -top-px h-3 w-3 border-r-2 border-t-2 border-redline'
          />

          <div
            aria-hidden='true'
            className='absolute -bottom-px -left-px h-3 w-3 border-b-2 border-l-2 border-redline'
          />

          <div
            aria-hidden='true'
            className='absolute -bottom-px -right-px h-3 w-3 border-b-2 border-r-2 border-redline'
          />

          <div className='flex h-full flex-col justify-between'>
            <span className='font-mono text-[11px] uppercase tracking-wider text-ink-soft'>
              Fig. 01 — Alur Kerja
            </span>

            <ul className='space-y-3'>
              {workflowSteps.map((step, index) => (
                <li key={step} className='flex items-center gap-3 text-sm'>
                  <span className='font-mono text-xs text-redline'>
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <span aria-hidden='true' className='h-px flex-1 bg-line' />

                  <span className='text-ink-soft'>{step}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
