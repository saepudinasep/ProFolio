'use client';

import { useParams, useRouter } from 'next/navigation';

import { Topbar } from '@/components/dashboard/Topbar';
import { ServiceForm } from '@/components/forms/ServiceForm';

import { useApi, useApiItem } from '@/hooks/useApi';

import type { Service, ServicePayload } from '@/types/service';

export default function EditServicePage() {
  const params = useParams<{
    id: string;
  }>();

  const router = useRouter();

  const { item, loading, error } = useApiItem<Service>('admin/services', params.id);

  const { update } = useApi('admin/services');

  async function handleSubmit(data: ServicePayload): Promise<void> {
    await update(params.id, data);

    router.push('/dashboard/services');
  }

  return (
    <div>
      <Topbar title='Edit Layanan' />

      <div className='mt-6'>
        {loading && (
          <p className='font-mono text-xs uppercase tracking-wider text-ink-soft'>Memuat data...</p>
        )}

        {!loading && error && (
          <div className='border border-redline bg-redline-soft p-5'>
            <p className='font-mono text-xs uppercase tracking-wider text-redline'>
              Gagal memuat layanan
            </p>

            <p className='mt-2 text-sm text-ink-soft'>{error}</p>
          </div>
        )}

        {!loading && !error && !item && (
          <p className='text-sm text-ink-soft'>Data tidak ditemukan.</p>
        )}

        {!loading && !error && item && (
          <ServiceForm initial={item} submitLabel='Perbarui Layanan' onSubmit={handleSubmit} />
        )}
      </div>
    </div>
  );
}
