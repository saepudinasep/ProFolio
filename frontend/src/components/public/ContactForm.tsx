'use client';

import { useState, type FormEvent } from 'react';

import { Field } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

import { createContactMessage } from '@/lib/contact';
import { getApiErrorMessage } from '@/lib/utils';

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
  const [error, setError] = useState<string | null>(null);

  function updateField(field: keyof ContactFormData, value: string) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError(null);
    setLoading(true);

    try {
      await createContactMessage({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim() || null,
        subject: form.subject.trim() || null,
        message: form.message.trim(),
      });

      setForm(initialForm);
      setSent(true);
    } catch (error: unknown) {
      setError(getApiErrorMessage(error, 'Pesan gagal dikirim. Silakan coba lagi.'));
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

        <Button
          type='button'
          variant='outline'
          className='mt-5'
          onClick={() => {
            setSent(false);
            setError(null);
          }}
        >
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
          disabled={loading}
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
          autoComplete='email'
          disabled={loading}
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
          autoComplete='tel'
          disabled={loading}
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
          disabled={loading}
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
          disabled={loading}
        />
      </Field>

      {error && (
        <div
          role='alert'
          className='border border-redline bg-redline-soft px-3 py-2 text-xs text-redline'
        >
          {error}
        </div>
      )}

      <Button type='submit' disabled={loading} className='px-6 py-3'>
        {loading ? 'Mengirim...' : 'Kirim Pesan'}
      </Button>
    </form>
  );
}
