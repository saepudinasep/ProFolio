'use client';

import { useRouter } from 'next/navigation';

import { Topbar } from '@/components/dashboard/Topbar';
import { TestimonialForm } from '@/components/forms/TestimonialForm';

import { useApi } from '@/hooks/useApi';
import type { TestimonialPayload } from '@/types/testimonial';

export default function CreateTestimonialPage() {
  const router = useRouter();

  const { create } = useApi('admin/testimonials');

  async function handleSubmit(data: TestimonialPayload): Promise<void> {
    await create(data);

    router.push('/dashboard/testimonials');
  }

  return (
    <div>
      <Topbar title='Tambah Testimoni' />

      <div className='mt-6'>
        <TestimonialForm submitLabel='Simpan Testimoni' onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
