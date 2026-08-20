'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { Plus, Search } from 'lucide-react';

import { Topbar } from '@/components/dashboard/Topbar';
import { DataTable, type Column } from '@/components/dashboard/DataTable';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { useApi } from '@/hooks/useApi';
import type { TeamMember } from '@/types/team-member';

export default function TeamMembersListPage() {
  const { items, loading, error, remove } = useApi<TeamMember>('admin/team-members');

  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return items;
    }

    return items.filter((member) =>
      [member.name, member.position, member.bio ?? ''].some((value) =>
        value.toLowerCase().includes(normalizedQuery),
      ),
    );
  }, [items, query]);

  const columns: Column<TeamMember>[] = [
    {
      key: 'name',
      header: 'Nama',
      render: (member) => (
        <div>
          <span className='font-medium'>{member.name}</span>

          {member.bio && (
            <span className='mt-0.5 block line-clamp-1 text-xs text-ink-soft'>{member.bio}</span>
          )}
        </div>
      ),
    },

    {
      key: 'position',
      header: 'Jabatan',
      render: (member) => <span className='text-ink-soft'>{member.position}</span>,
    },

    {
      key: 'social_links',
      header: 'Sosial',
      render: (member) => {
        const links = Object.values(member.social_links ?? {}).filter(Boolean);

        return (
          <span className='font-mono text-xs text-ink-soft'>
            {links.length} link
            {links.length !== 1 ? 's' : ''}
          </span>
        );
      },
    },
  ];

  return (
    <div>
      <Topbar title='Tim Kami' />

      <div className='mt-6'>
        <span className='font-mono text-[11px] uppercase tracking-wider text-redline'>
          List Anggota Tim — CRUD
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
              placeholder='Cari anggota tim...'
              aria-label='Cari anggota tim'
              className='pl-9'
            />
          </div>

          <Button asChild>
            <Link href='/dashboard/team-members/create'>
              <Plus size={15} aria-hidden='true' />
              Tambah Anggota
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
                Gagal memuat anggota tim
              </p>

              <p className='mt-2 text-sm text-ink-soft'>{error}</p>
            </div>
          )}

          {!loading && !error && (
            <DataTable
              items={filtered}
              columns={columns}
              editHrefBase='/dashboard/team-members'
              onDelete={remove}
              emptyMessage='Belum ada anggota tim.'
            />
          )}
        </div>
      </div>
    </div>
  );
}
