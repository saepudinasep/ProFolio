'use client';

import { useApi } from '@/hooks/useApi';
import type { Service } from '@/types/service';

import { SpecLabel } from './SpecLabel';

export function Services() {
  const { items, loading, error } = useApi<Service>('services');

  return (
    <section className='border-b border-line'>
      <div className='mx-auto max-w-6xl px-6 py-20'>
        <SpecLabel index='01'>Layanan</SpecLabel>

        <h2 className='mt-4 max-w-lg font-display text-3xl font-semibold tracking-tight'>
          Tiga disiplin, satu tim.
        </h2>

        {/* Loading */}
        {loading && (
          <p className='mt-10 font-mono text-xs uppercase tracking-widest text-ink-soft'>
            Memuat layanan...
          </p>
        )}

        {/* Error */}
        {!loading && error && (
          <div className='mt-10 border border-redline bg-redline-soft p-5'>
            <p className='font-mono text-xs uppercase tracking-widest text-redline'>
              Gagal memuat layanan
            </p>

            <p className='mt-2 text-sm text-ink-soft'>{error}</p>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && items.length === 0 && (
          <div className='mt-10 border border-line bg-paper-raised p-8 text-center'>
            <p className='font-mono text-xs uppercase tracking-widest text-ink-soft'>
              Belum ada layanan
            </p>
          </div>
        )}

        {/* Services */}
        {!loading && !error && items.length > 0 && (
          <div className='mt-12 grid gap-px overflow-hidden border border-line bg-line md:grid-cols-3'>
            {items.map((service) => (
              <div key={service.id} className='bg-paper p-8'>
                <div className='flex items-center justify-between'>
                  <span className='font-mono text-xs text-redline'>
                    {String(service.order).padStart(2, '0')}
                  </span>

                  {service.icon && (
                    <span className='font-mono text-[10px] uppercase tracking-wider text-ink-soft'>
                      {service.icon}
                    </span>
                  )}
                </div>

                <h3 className='mt-4 font-display text-xl font-semibold tracking-tight'>
                  {service.title}
                </h3>

                <p className='mt-3 text-sm leading-relaxed text-ink-soft'>{service.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
