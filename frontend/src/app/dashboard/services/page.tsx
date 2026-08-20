'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { Plus, Search } from 'lucide-react';

import { Topbar } from '@/components/dashboard/Topbar';
import { DataTable, type Column } from '@/components/dashboard/DataTable';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { useApi } from '@/hooks/useApi';
import type { Service } from '@/types/service';

export default function ServicesListPage() {
  const { items, loading, error, remove } = useApi<Service>('admin/services');

  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return items;
    }

    return items.filter((service) =>
      [service.title, service.description, service.icon ?? ''].some((value) =>
        value.toLowerCase().includes(normalizedQuery),
      ),
    );
  }, [items, query]);

  const columns: Column<Service>[] = [
    {
      key: 'order',
      header: 'Urutan',
      align: 'right',
      render: (service) => (
        <span className='font-mono text-xs text-ink-soft'>
          {String(service.order).padStart(2, '0')}
        </span>
      ),
    },

    {
      key: 'title',
      header: 'Nama Layanan',
      render: (service) => (
        <div>
          <span className='font-medium'>{service.title}</span>

          {service.icon && (
            <span className='mt-0.5 block font-mono text-[10px] text-ink-soft'>{service.icon}</span>
          )}
        </div>
      ),
    },

    {
      key: 'description',
      header: 'Deskripsi',
      render: (service) => (
        <span className='line-clamp-1 text-ink-soft'>{service.description}</span>
      ),
    },
  ];

  return (
    <div>
      <Topbar title='Layanan' />

      <div className='mt-6'>
        <span className='font-mono text-[11px] uppercase tracking-wider text-redline'>
          List Layanan — CRUD
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
              placeholder='Cari layanan...'
              aria-label='Cari layanan'
              className='pl-9'
            />
          </div>

          <Button asChild>
            <Link href='/dashboard/services/create'>
              <Plus size={15} aria-hidden='true' />
              Tambah Layanan
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
                Gagal memuat layanan
              </p>

              <p className='mt-2 text-sm text-ink-soft'>{error}</p>
            </div>
          )}

          {!loading && !error && (
            <DataTable
              items={filtered}
              columns={columns}
              editHrefBase='/dashboard/services'
              onDelete={remove}
              emptyMessage='Belum ada layanan.'
            />
          )}
        </div>
      </div>
    </div>
  );
}
