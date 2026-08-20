'use client';

import { useParams, useRouter } from 'next/navigation';

import { Topbar } from '@/components/dashboard/Topbar';
import { TestimonialForm } from '@/components/forms/TestimonialForm';

import { useApi, useApiItem } from '@/hooks/useApi';

import type { Testimonial, TestimonialPayload } from '@/types/testimonial';

export default function EditTestimonialPage() {
  const params = useParams<{
    id: string;
  }>();

  const router = useRouter();

  const { item, loading, error } = useApiItem<Testimonial>('admin/testimonials', params.id);

  const { update } = useApi('admin/testimonials');

  async function handleSubmit(data: TestimonialPayload): Promise<void> {
    await update(params.id, data);

    router.push('/dashboard/testimonials');
  }

  return (
    <div>
      <Topbar title='Edit Testimoni' />

      <div className='mt-6'>
        {loading && (
          <p className='font-mono text-xs uppercase tracking-wider text-ink-soft'>Memuat data...</p>
        )}

        {!loading && error && (
          <div className='border border-redline bg-redline-soft p-5'>
            <p className='font-mono text-xs uppercase tracking-wider text-redline'>
              Gagal memuat testimoni
            </p>

            <p className='mt-2 text-sm text-ink-soft'>{error}</p>
          </div>
        )}

        {!loading && !error && !item && (
          <p className='text-sm text-ink-soft'>Data tidak ditemukan.</p>
        )}

        {!loading && !error && item && (
          <TestimonialForm
            initial={item}
            submitLabel='Perbarui Testimoni'
            onSubmit={handleSubmit}
          />
        )}
      </div>
    </div>
  );
}
