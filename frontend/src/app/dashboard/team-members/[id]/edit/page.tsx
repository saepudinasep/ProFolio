'use client';

import { useParams, useRouter } from 'next/navigation';

import { Topbar } from '@/components/dashboard/Topbar';
import { TeamMemberForm } from '@/components/forms/TeamMemberForm';

import { useApi, useApiItem } from '@/hooks/useApi';

import type { TeamMember, TeamMemberPayload } from '@/types/team-member';

export default function EditTeamMemberPage() {
  const params = useParams<{
    id: string;
  }>();

  const router = useRouter();

  const { item, loading, error } = useApiItem<TeamMember>('admin/team-members', params.id);

  const { update } = useApi('admin/team-members');

  async function handleSubmit(data: TeamMemberPayload): Promise<void> {
    await update(params.id, data);

    router.push('/dashboard/team-members');
  }

  return (
    <div>
      <Topbar title='Edit Anggota Tim' />

      <div className='mt-6'>
        {loading && (
          <p className='font-mono text-xs uppercase tracking-wider text-ink-soft'>Memuat data...</p>
        )}

        {!loading && error && (
          <div className='border border-redline bg-redline-soft p-5'>
            <p className='font-mono text-xs uppercase tracking-wider text-redline'>
              Gagal memuat anggota tim
            </p>

            <p className='mt-2 text-sm text-ink-soft'>{error}</p>
          </div>
        )}

        {!loading && !error && !item && (
          <p className='text-sm text-ink-soft'>Data tidak ditemukan.</p>
        )}

        {!loading && !error && item && (
          <TeamMemberForm initial={item} submitLabel='Perbarui Anggota' onSubmit={handleSubmit} />
        )}
      </div>
    </div>
  );
}
