'use client';

import { useRouter } from 'next/navigation';

import { Topbar } from '@/components/dashboard/Topbar';
import { PortfolioProjectForm } from '@/components/forms/PortfolioProjectForm';

import { useApi } from '@/hooks/useApi';
import type { PortfolioProjectPayload } from '@/types/portfolio';

export default function CreatePortfolioProjectPage() {
  const router = useRouter();

  const { create } = useApi('admin/portfolio-projects');

  async function handleSubmit(data: PortfolioProjectPayload): Promise<void> {
    await create(data);

    router.push('/dashboard/portfolio-projects');
  }

  return (
    <div>
      <Topbar title='Tambah Portfolio Project' />

      <div className='mt-6'>
        <PortfolioProjectForm submitLabel='Simpan Project' onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
