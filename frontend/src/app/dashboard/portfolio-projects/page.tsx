'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { Plus, Search } from 'lucide-react';

import { Topbar } from '@/components/dashboard/Topbar';
import { DataTable, type Column } from '@/components/dashboard/DataTable';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { useApi } from '@/hooks/useApi';
import type { PortfolioProject } from '@/types/portfolio';

export default function PortfolioProjectsListPage() {
  const { items, loading, error, remove } = useApi<PortfolioProject>('admin/portfolio-projects');

  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return items;
    }

    return items.filter((project) => {
      const client = project.client ?? '';

      return (
        project.title.toLowerCase().includes(normalizedQuery) ||
        client.toLowerCase().includes(normalizedQuery) ||
        project.category.toLowerCase().includes(normalizedQuery)
      );
    });
  }, [items, query]);

  const columns: Column<PortfolioProject>[] = [
    {
      key: 'title',
      header: 'Judul',
      render: (project) => (
        <div>
          <span className='font-medium'>{project.title}</span>

          <span className='mt-0.5 block font-mono text-[10px] text-ink-soft'>/{project.slug}</span>
        </div>
      ),
    },

    {
      key: 'client',
      header: 'Client',
      render: (project) => project.client ?? '-',
    },

    {
      key: 'category',
      header: 'Kategori',
      render: (project) => <Badge variant='outline'>{project.category}</Badge>,
    },

    {
      key: 'project_url',
      header: 'Project',
      align: 'right',
      render: (project) =>
        project.project_url ? (
          <a
            href={project.project_url}
            target='_blank'
            rel='noopener noreferrer'
            className='text-xs text-blue hover:underline'
          >
            Lihat
          </a>
        ) : (
          <span className='text-xs text-ink-soft'>-</span>
        ),
    },
  ];

  return (
    <div>
      <Topbar title='Portfolio Projects' />

      <div className='mt-6'>
        <span className='font-mono text-[11px] uppercase tracking-wider text-redline'>
          List Portfolio — CRUD
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
              placeholder='Cari project...'
              aria-label='Cari project'
              className='pl-9'
            />
          </div>

          <Button asChild>
            <Link href='/dashboard/portfolio-projects/create'>
              <Plus size={15} aria-hidden='true' />
              Tambah Project
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
                Gagal memuat portfolio
              </p>

              <p className='mt-2 text-sm text-ink-soft'>{error}</p>
            </div>
          )}

          {!loading && !error && (
            <DataTable
              items={filtered}
              columns={columns}
              editHrefBase='/dashboard/portfolio-projects'
              onDelete={remove}
              emptyMessage='Belum ada portfolio project.'
            />
          )}
        </div>
      </div>
    </div>
  );
}
