'use client';

import { useRouter } from 'next/navigation';

import { Topbar } from '@/components/dashboard/Topbar';
import { TeamMemberForm } from '@/components/forms/TeamMemberForm';

import { useApi } from '@/hooks/useApi';
import type { TeamMemberPayload } from '@/types/team-member';

export default function CreateTeamMemberPage() {
  const router = useRouter();

  const { create } = useApi('admin/team-members');

  async function handleSubmit(data: TeamMemberPayload): Promise<void> {
    await create(data);

    router.push('/dashboard/team-members');
  }

  return (
    <div>
      <Topbar title='Tambah Anggota Tim' />

      <div className='mt-6'>
        <TeamMemberForm submitLabel='Simpan Anggota' onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
