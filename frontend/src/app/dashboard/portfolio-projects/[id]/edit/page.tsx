'use client';

import { useParams, useRouter } from 'next/navigation';

import { Topbar } from '@/components/dashboard/Topbar';
import { PortfolioProjectForm } from '@/components/forms/PortfolioProjectForm';

import { useApi, useApiItem } from '@/hooks/useApi';

import type { PortfolioProject, PortfolioProjectPayload } from '@/types/portfolio';

export default function EditPortfolioProjectPage() {
  const params = useParams<{
    id: string;
  }>();

  const router = useRouter();

  const { item, loading, error } = useApiItem<PortfolioProject>(
    'admin/portfolio-projects',
    params.id,
  );

  const { update } = useApi('admin/portfolio-projects');

  async function handleSubmit(data: PortfolioProjectPayload): Promise<void> {
    await update(params.id, data);

    router.push('/dashboard/portfolio-projects');
  }

  return (
    <div>
      <Topbar title='Edit Portfolio Project' />

      <div className='mt-6'>
        {loading && (
          <p className='font-mono text-xs uppercase tracking-wider text-ink-soft'>Memuat data...</p>
        )}

        {!loading && error && (
          <div className='border border-redline bg-redline-soft p-5'>
            <p className='font-mono text-xs uppercase tracking-wider text-redline'>
              Gagal memuat project
            </p>

            <p className='mt-2 text-sm text-ink-soft'>{error}</p>
          </div>
        )}

        {!loading && !error && !item && (
          <p className='text-sm text-ink-soft'>Data tidak ditemukan.</p>
        )}

        {!loading && !error && item && (
          <PortfolioProjectForm
            initial={item}
            submitLabel='Perbarui Project'
            onSubmit={handleSubmit}
          />
        )}
      </div>
    </div>
  );
}
