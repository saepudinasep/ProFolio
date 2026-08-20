'use client';

import { useState, type FormEvent } from 'react';

import type { Service, ServicePayload } from '@/types/service';

import { Field } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

interface ServiceFormProps {
  initial?: Partial<Service>;
  onSubmit: (data: ServicePayload) => Promise<void>;
  submitLabel?: string;
}

export function ServiceForm({ initial, onSubmit, submitLabel = 'Simpan' }: ServiceFormProps) {
  const [title, setTitle] = useState(initial?.title ?? '');

  const [description, setDescription] = useState(initial?.description ?? '');

  const [icon, setIcon] = useState(initial?.icon ?? '');

  const [order, setOrder] = useState(initial?.order?.toString() ?? '0');

  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);

    try {
      await onSubmit({
        title: title.trim(),
        description: description.trim(),
        icon: icon.trim() || null,
        order: Number(order),
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className='max-w-2xl space-y-5'>
      <Field label='Nama Layanan'>
        <Input
          id='title'
          name='title'
          type='text'
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder='Contoh: Web Development'
          required
          disabled={loading}
        />
      </Field>

      <Field label='Deskripsi'>
        <Textarea
          id='description'
          name='description'
          rows={6}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder='Jelaskan layanan yang ditawarkan...'
          required
          disabled={loading}
        />
      </Field>

      <Field label='Icon'>
        <Input
          id='icon'
          name='icon'
          type='text'
          value={icon}
          onChange={(event) => setIcon(event.target.value)}
          placeholder='Code2'
          disabled={loading}
        />
      </Field>

      <Field label='Urutan Tampil'>
        <Input
          id='order'
          name='order'
          type='number'
          min={0}
          value={order}
          onChange={(event) => setOrder(event.target.value)}
          required
          disabled={loading}
        />
      </Field>

      <Button type='submit' disabled={loading}>
        {loading ? 'Menyimpan...' : submitLabel}
      </Button>
    </form>
  );
}
