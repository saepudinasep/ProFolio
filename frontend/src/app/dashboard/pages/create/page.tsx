'use client';

import { useRouter } from 'next/navigation';

import { Topbar } from '@/components/dashboard/Topbar';
import { PageForm } from '@/components/forms/PageForm';

import { useApi } from '@/hooks/useApi';
import type { PagePayload } from '@/types/page';

export default function CreatePagePage() {
  const router = useRouter();

  const { create } = useApi('admin/pages');

  async function handleSubmit(data: PagePayload) {
    await create(data);

    router.push('/dashboard/pages');
  }

  return (
    <div>
      <Topbar title='Tambah Halaman' />

      <div className='mt-6'>
        <PageForm submitLabel='Simpan Halaman' onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
