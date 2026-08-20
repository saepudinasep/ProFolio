'use client';

import { useRouter } from 'next/navigation';

import { Topbar } from '@/components/dashboard/Topbar';
import { ServiceForm } from '@/components/forms/ServiceForm';

import { useApi } from '@/hooks/useApi';
import type { ServicePayload } from '@/types/service';

export default function CreateServicePage() {
  const router = useRouter();

  const { create } = useApi('admin/services');

  async function handleSubmit(data: ServicePayload): Promise<void> {
    await create(data);

    router.push('/dashboard/services');
  }

  return (
    <div>
      <Topbar title='Tambah Layanan' />

      <div className='mt-6'>
        <ServiceForm submitLabel='Simpan Layanan' onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
