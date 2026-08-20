'use client';

import { useApi } from '@/hooks/useApi';
import type { Testimonial } from '@/types/testimonial';

import { SpecLabel } from './SpecLabel';
import Image from 'next/image';

export function Testimonials() {
  const { items, loading, error } = useApi<Testimonial>('testimonials');

  return (
    <section className='border-b border-line'>
      <div className='mx-auto max-w-6xl px-6 py-20'>
        <SpecLabel index='03'>Testimoni</SpecLabel>

        <h2 className='mt-4 max-w-lg font-display text-3xl font-semibold tracking-tight'>
          Kata klien yang sudah bekerja sama.
        </h2>

        {/* Loading */}
        {loading && (
          <p className='mt-10 font-mono text-xs uppercase tracking-widest text-ink-soft'>
            Memuat testimoni...
          </p>
        )}

        {/* Error */}
        {!loading && error && (
          <div className='mt-10 border border-redline bg-redline-soft p-5'>
            <p className='font-mono text-xs uppercase tracking-widest text-redline'>
              Gagal memuat testimoni
            </p>

            <p className='mt-2 text-sm text-ink-soft'>{error}</p>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && items.length === 0 && (
          <div className='mt-10 border border-line bg-paper-raised p-8 text-center'>
            <p className='font-mono text-xs uppercase tracking-widest text-ink-soft'>
              Belum ada testimoni
            </p>
          </div>
        )}

        {/* Testimonials */}
        {!loading && !error && items.length > 0 && (
          <div className='mt-12 grid gap-6 md:grid-cols-3'>
            {items.map((testimonial) => (
              <figure
                key={testimonial.id}
                className='flex flex-col justify-between border border-line bg-paper-raised p-6'
              >
                <div>
                  <blockquote className='text-[15px] leading-relaxed text-ink'>
                    &ldquo;{testimonial.message}&rdquo;
                  </blockquote>

                  {testimonial.rating !== null && (
                    <div
                      className='mt-4 font-mono text-xs tracking-wider text-redline'
                      aria-label={`Rating ${testimonial.rating} dari 5`}
                    >
                      {'★'.repeat(testimonial.rating)}
                      <span className='ml-1 text-ink-soft'>/ 5</span>
                    </div>
                  )}
                </div>

                <figcaption className='mt-6 flex items-center gap-3'>
                  {testimonial.photo ? (
                    <Image
                      src={testimonial.photo}
                      alt={testimonial.client_name}
                      width={36}
                      height={36}
                      className='h-9 w-9 rounded-full border border-line object-cover'
                    />
                  ) : (
                    <span
                      aria-hidden='true'
                      className='flex h-9 w-9 items-center justify-center rounded-full border border-ink font-mono text-xs'
                    >
                      {testimonial.client_name.charAt(0).toUpperCase()}
                    </span>
                  )}

                  <span>
                    <span className='block text-sm font-medium'>{testimonial.client_name}</span>

                    {(testimonial.client_position || testimonial.company) && (
                      <span className='block text-xs text-ink-soft'>
                        {[testimonial.client_position, testimonial.company]
                          .filter(Boolean)
                          .join(' · ')}
                      </span>
                    )}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
