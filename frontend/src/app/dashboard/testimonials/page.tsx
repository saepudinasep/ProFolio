'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { Plus, Search } from 'lucide-react';

import { Topbar } from '@/components/dashboard/Topbar';
import { DataTable, type Column } from '@/components/dashboard/DataTable';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { useApi } from '@/hooks/useApi';
import type { Testimonial } from '@/types/testimonial';

export default function TestimonialsListPage() {
  const { items, loading, error, remove } = useApi<Testimonial>('admin/testimonials');

  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return items;
    }

    return items.filter((testimonial) =>
      [
        testimonial.client_name,
        testimonial.client_position ?? '',
        testimonial.company ?? '',
        testimonial.message,
      ].some((value) => value.toLowerCase().includes(normalizedQuery)),
    );
  }, [items, query]);

  const columns: Column<Testimonial>[] = [
    {
      key: 'client_name',
      header: 'Nama',
      render: (testimonial) => (
        <div>
          <span className='font-medium'>{testimonial.client_name}</span>

          {testimonial.company && (
            <span className='mt-0.5 block text-xs text-ink-soft'>{testimonial.company}</span>
          )}
        </div>
      ),
    },

    {
      key: 'client_position',
      header: 'Jabatan',
      render: (testimonial) => (
        <span className='text-ink-soft'>{testimonial.client_position ?? '-'}</span>
      ),
    },

    {
      key: 'message',
      header: 'Testimoni',
      render: (testimonial) => (
        <span className='line-clamp-1 text-ink-soft'>{testimonial.message}</span>
      ),
    },

    {
      key: 'rating',
      header: 'Rating',
      align: 'right',
      render: (testimonial) => (testimonial.rating !== null ? `${testimonial.rating}/5` : '-'),
    },
  ];

  return (
    <div>
      <Topbar title='Testimoni' />

      <div className='mt-6'>
        <span className='font-mono text-[11px] uppercase tracking-wider text-redline'>
          List Testimoni — CRUD
        </span>

        <div className='mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
          <div className='relative w-full sm:max-w-xs'>
            <Search
              size={15}
              strokeWidth={1.8}
              aria-hidden='true'
              className='pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-soft'
            />

            <Input
              type='search'
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder='Cari testimoni...'
              aria-label='Cari testimoni'
              className='pl-9'
            />
          </div>

          <Button asChild>
            <Link href='/dashboard/testimonials/create'>
              <Plus size={15} aria-hidden='true' />
              Tambah Testimoni
            </Link>
          </Button>
        </div>

        <div className='mt-5'>
          {loading && (
            <p className='py-10 text-center font-mono text-xs uppercase tracking-wider text-ink-soft'>
              Memuat...
            </p>
          )}

          {!loading && error && (
            <div className='border border-redline bg-redline-soft p-5'>
              <p className='font-mono text-xs uppercase tracking-wider text-redline'>
                Gagal memuat testimoni
              </p>

              <p className='mt-2 text-sm text-ink-soft'>{error}</p>
            </div>
          )}

          {!loading && !error && (
            <DataTable
              items={filtered}
              columns={columns}
              editHrefBase='/dashboard/testimonials'
              onDelete={remove}
              emptyMessage='Belum ada testimoni.'
            />
          )}
        </div>
      </div>
    </div>
  );
}
