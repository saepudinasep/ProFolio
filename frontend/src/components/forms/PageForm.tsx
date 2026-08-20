'use client';

import { useState, type FormEvent } from 'react';

import type { Page, PagePayload } from '@/types/page';

import { Field } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

import { slugify } from '@/lib/utils';

interface PageFormProps {
  initial?: Partial<Page>;
  onSubmit: (data: PagePayload) => Promise<void>;
  submitLabel?: string;
}

export function PageForm({ initial, onSubmit, submitLabel = 'Simpan' }: PageFormProps) {
  const [title, setTitle] = useState(initial?.title ?? '');
  const [slug, setSlug] = useState(initial?.slug ?? '');
  const [content, setContent] = useState(initial?.content ?? '');
  const [metaTitle, setMetaTitle] = useState(initial?.meta_title ?? '');
  const [metaDescription, setMetaDescription] = useState(initial?.meta_description ?? '');

  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);

    try {
      await onSubmit({
        title: title.trim(),
        slug: slugify(slug || title),
        content,
        meta_title: metaTitle.trim() || null,
        meta_description: metaDescription.trim() || null,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className='max-w-2xl space-y-5'>
      <Field label='Judul Halaman'>
        <Input
          id='title'
          name='title'
          type='text'
          value={title}
          onChange={(event) => {
            const value = event.target.value;

            setTitle(value);

            if (!initial?.slug) {
              setSlug(slugify(value));
            }
          }}
          placeholder='Contoh: Tentang Kami'
          required
          disabled={loading}
        />
      </Field>

      <Field label='Slug'>
        <Input
          id='slug'
          name='slug'
          type='text'
          value={slug}
          onChange={(event) => setSlug(event.target.value)}
          placeholder='tentang-kami'
          required
          disabled={loading}
        />
      </Field>

      <Field label='Konten'>
        <Textarea
          id='content'
          name='content'
          rows={10}
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder='Tulis konten halaman...'
          required
          disabled={loading}
        />
      </Field>

      <Field label='Meta Title'>
        <Input
          id='meta_title'
          name='meta_title'
          type='text'
          value={metaTitle}
          onChange={(event) => setMetaTitle(event.target.value)}
          placeholder='Judul SEO halaman'
          disabled={loading}
        />
      </Field>

      <Field label='Meta Description'>
        <Textarea
          id='meta_description'
          name='meta_description'
          rows={4}
          value={metaDescription}
          onChange={(event) => setMetaDescription(event.target.value)}
          placeholder='Deskripsi SEO halaman'
          disabled={loading}
        />
      </Field>

      <Button type='submit' disabled={loading}>
        {loading ? 'Menyimpan...' : submitLabel}
      </Button>
    </form>
  );
}
