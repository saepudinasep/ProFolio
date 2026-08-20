'use client';

import { useState } from 'react';

import { Field } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const initialForm: ContactFormData = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
};

export function ContactForm() {
  const [form, setForm] = useState<ContactFormData>(initialForm);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  function updateField(field: keyof ContactFormData, value: string) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);

    try {
      // Untuk sementara simulasi pengiriman.
      // Nanti diganti dengan API contact_messages Laravel.
      await new Promise((resolve) => setTimeout(resolve, 500));

      setSent(true);
      setForm(initialForm);
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <div className='border border-ink bg-paper-raised p-6'>
        <p className='font-mono text-[11px] uppercase tracking-widest text-redline'>
          Pesan Terkirim
        </p>

        <p className='mt-3 text-sm text-ink-soft'>
          Terima kasih sudah menghubungi kami. Tim ProFolio akan membalas ke emailmu dalam 1–2 hari
          kerja.
        </p>

        <Button type='button' variant='outline' className='mt-5' onClick={() => setSent(false)}>
          Kirim Pesan Lagi
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-5'>
      <Field label='Nama'>
        <Input
          id='name'
          name='name'
          type='text'
          required
          value={form.name}
          onChange={(event) => updateField('name', event.target.value)}
          placeholder='Nama lengkap'
        />
      </Field>

      <Field label='Email'>
        <Input
          id='email'
          name='email'
          type='email'
          required
          value={form.email}
          onChange={(event) => updateField('email', event.target.value)}
          placeholder='nama@email.com'
        />
      </Field>

      <Field label='Nomor Telepon'>
        <Input
          id='phone'
          name='phone'
          type='tel'
          value={form.phone}
          onChange={(event) => updateField('phone', event.target.value)}
          placeholder='08xxxxxxxxxx'
        />
      </Field>

      <Field label='Subjek'>
        <Input
          id='subject'
          name='subject'
          type='text'
          value={form.subject}
          onChange={(event) => updateField('subject', event.target.value)}
          placeholder='Topik pesanmu'
        />
      </Field>

      <Field label='Pesan'>
        <Textarea
          id='message'
          name='message'
          required
          rows={5}
          value={form.message}
          onChange={(event) => updateField('message', event.target.value)}
          placeholder='Ceritakan project yang ingin kamu bangun...'
        />
      </Field>

      <Button type='submit' disabled={loading} className='px-6 py-3'>
        {loading ? 'Mengirim...' : 'Kirim Pesan'}
      </Button>
    </form>
  );
}
