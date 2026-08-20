'use client';

import { useParams, useRouter } from 'next/navigation';

import { Topbar } from '@/components/dashboard/Topbar';
import { PageForm } from '@/components/forms/PageForm';

import { useApi, useApiItem } from '@/hooks/useApi';

import type { Page, PagePayload } from '@/types/page';

export default function EditPagePage() {
  const params = useParams<{
    id: string;
  }>();

  const router = useRouter();

  const { item, loading, error } = useApiItem<Page>('admin/pages', params.id);

  const { update } = useApi<Page>('admin/pages');

  async function handleSubmit(data: PagePayload): Promise<void> {
    await update(params.id, data);

    router.push('/dashboard/pages');
  }

  return (
    <div>
      <Topbar title='Edit Halaman' />

      <div className='mt-6'>
        {loading && (
          <p className='font-mono text-xs uppercase tracking-wider text-ink-soft'>Memuat data...</p>
        )}

        {!loading && error && (
          <div className='border border-redline bg-redline-soft p-5'>
            <p className='font-mono text-xs uppercase tracking-wider text-redline'>
              Gagal memuat halaman
            </p>

            <p className='mt-2 text-sm text-ink-soft'>{error}</p>
          </div>
        )}

        {!loading && !error && !item && (
          <p className='text-sm text-ink-soft'>Data tidak ditemukan.</p>
        )}

        {!loading && !error && item && (
          <PageForm initial={item} submitLabel='Perbarui Halaman' onSubmit={handleSubmit} />
        )}
      </div>
    </div>
  );
}
