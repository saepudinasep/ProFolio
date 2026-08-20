'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { Plus, Search } from 'lucide-react';

import { Topbar } from '@/components/dashboard/Topbar';
import { DataTable, type Column } from '@/components/dashboard/DataTable';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { useApi } from '@/hooks/useApi';
import type { Page } from '@/types/page';
import { formatDate } from '@/lib/utils';

export default function PagesListPage() {
  const { items, loading, error, remove } = useApi<Page>('admin/pages');

  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return items;
    }

    return items.filter((page) =>
      [page.title, page.slug].some((value) => value.toLowerCase().includes(normalizedQuery)),
    );
  }, [items, query]);

  const columns: Column<Page>[] = [
    {
      key: 'title',
      header: 'Judul',
      render: (page) => <span className='font-medium'>{page.title}</span>,
    },

    {
      key: 'slug',
      header: 'Slug',
      render: (page) => <span className='font-mono text-xs'>/{page.slug}</span>,
    },

    {
      key: 'updated_at',
      header: 'Diperbarui',
      render: (page) => <span className='text-ink-soft'>{formatDate(page.updated_at)}</span>,
    },
  ];

  return (
    <div>
      <Topbar title='Halaman' />

      <div className='mt-6'>
        <span className='font-mono text-[11px] uppercase tracking-wider text-redline'>
          List Halaman — CRUD
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
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              type='search'
              placeholder='Cari halaman...'
              className='pl-9'
              aria-label='Cari halaman'
            />
          </div>

          <Button asChild>
            <Link href='/dashboard/pages/create'>
              <Plus size={15} aria-hidden='true' />
              Tambah Halaman
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
                Gagal memuat halaman
              </p>

              <p className='mt-2 text-sm text-ink-soft'>{error}</p>
            </div>
          )}

          {!loading && !error && (
            <DataTable
              items={filtered}
              columns={columns}
              editHrefBase='/dashboard/pages'
              onDelete={remove}
              emptyMessage='Belum ada halaman.'
            />
          )}
        </div>
      </div>
    </div>
  );
}
