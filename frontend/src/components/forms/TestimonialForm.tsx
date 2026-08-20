'use client';

import { useState } from 'react';

import type { Testimonial, TestimonialPayload } from '@/types/testimonial';

import { Field } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function TestimonialForm({
  initial,
  onSubmit,
  submitLabel = 'Simpan',
}: {
  initial?: Partial<Testimonial>;
  onSubmit: (data: TestimonialPayload) => Promise<void>;
  submitLabel?: string;
}) {
  const [clientName, setClientName] = useState(initial?.client_name ?? '');

  const [clientPosition, setClientPosition] = useState(initial?.client_position ?? '');

  const [company, setCompany] = useState(initial?.company ?? '');

  const [photo, setPhoto] = useState(initial?.photo ?? '');

  const [message, setMessage] = useState(initial?.message ?? '');

  const [rating, setRating] = useState(initial?.rating?.toString() ?? '');

  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);

    try {
      const data: TestimonialPayload = {
        client_name: clientName,
        client_position: clientPosition || null,
        company: company || null,
        photo: photo || null,
        message,
        rating: rating ? Number(rating) : null,
      };

      await onSubmit(data);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className='max-w-xl space-y-5'>
      <Field label='Nama Client'>
        <Input
          required
          value={clientName}
          onChange={(event) => setClientName(event.target.value)}
          placeholder='Contoh: Budi Santoso'
        />
      </Field>

      <Field label='Jabatan'>
        <Input
          value={clientPosition}
          onChange={(event) => setClientPosition(event.target.value)}
          placeholder='Contoh: CEO'
        />
      </Field>

      <Field label='Perusahaan'>
        <Input
          value={company}
          onChange={(event) => setCompany(event.target.value)}
          placeholder='Contoh: PT Maju Bersama'
        />
      </Field>

      <Field label='Foto'>
        <Input
          type='text'
          value={photo}
          onChange={(event) => setPhoto(event.target.value)}
          placeholder='URL atau path foto'
        />
      </Field>

      <Field label='Rating'>
        <Select value={rating} onValueChange={setRating}>
          <SelectTrigger className='w-full'>
            <SelectValue placeholder='Pilih rating' />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value='1'>1 / 5</SelectItem>
            <SelectItem value='2'>2 / 5</SelectItem>
            <SelectItem value='3'>3 / 5</SelectItem>
            <SelectItem value='4'>4 / 5</SelectItem>
            <SelectItem value='5'>5 / 5</SelectItem>
          </SelectContent>
        </Select>
      </Field>

      <Field label='Testimoni'>
        <Textarea
          rows={5}
          required
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder='Tuliskan testimoni client...'
        />
      </Field>

      <Button type='submit' disabled={loading}>
        {loading ? 'Menyimpan...' : submitLabel}
      </Button>
    </form>
  );
}
