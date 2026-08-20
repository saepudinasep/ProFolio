'use client';

import { useState, type FormEvent } from 'react';

import type { PortfolioProject, PortfolioProjectPayload } from '@/types/portfolio';

import { Field } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { Button } from '@/components/ui/button';

import { slugify } from '@/lib/utils';
import { useApi } from '@/hooks/useApi';

interface PortfolioProjectFormProps {
  initial?: Partial<PortfolioProject>;
  onSubmit: (data: PortfolioProjectPayload) => Promise<void>;
  submitLabel?: string;
}

export function PortfolioProjectForm({
  initial,
  onSubmit,
  submitLabel = 'Simpan',
}: PortfolioProjectFormProps) {
  const [title, setTitle] = useState(initial?.title ?? '');
  const [slug, setSlug] = useState(initial?.slug ?? '');
  const [category, setCategory] = useState(initial?.category ?? '');
  const [client, setClient] = useState(initial?.client ?? '');
  const [description, setDescription] = useState(initial?.description ?? '');
  const [thumbnail, setThumbnail] = useState(initial?.thumbnail ?? '');
  const [projectUrl, setProjectUrl] = useState(initial?.project_url ?? '');

  const [loading, setLoading] = useState(false);

  /**
   * Ambil portfolio dari API.
   *
   * Endpoint ini mengambil data dari:
   * portfolio_projects
   */
  const {
    items: projects,
    loading: categoriesLoading,
    error: categoriesError,
  } = useApi<PortfolioProject>('portfolio-projects');

  /**
   * Ambil category dari database.
   *
   * Contoh:
   *
   * Web App
   * Mobile App
   * Website
   * Web App
   * Branding
   *
   * menjadi:
   *
   * Web App
   * Mobile App
   * Website
   * Branding
   */
  const categoryOptions = Array.from(
    new Set(
      projects
        .map((project) => project.category?.trim())
        .filter((category): category is string => Boolean(category)),
    ),
  ).sort((a, b) => a.localeCompare(b));

  /**
   * Jika sedang edit dan category lama
   * belum ada di hasil API, tetap tampilkan.
   */
  const availableCategories = Array.from(
    new Set([...categoryOptions, ...(initial?.category ? [initial.category] : [])]),
  ).sort((a, b) => a.localeCompare(b));

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!category) {
      return;
    }

    setLoading(true);

    try {
      await onSubmit({
        title: title.trim(),
        slug: slugify(slug || title),
        category,
        client: client.trim() || null,
        description: description.trim(),
        thumbnail: thumbnail.trim() || null,
        project_url: projectUrl.trim() || null,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className='max-w-2xl space-y-5'>
      {/* Judul */}
      <Field label='Judul Project'>
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
          placeholder='Contoh: Sistem Informasi Akademik'
          required
          disabled={loading}
        />
      </Field>

      {/* Slug */}
      <Field label='Slug'>
        <Input
          id='slug'
          name='slug'
          type='text'
          value={slug}
          onChange={(event) => setSlug(event.target.value)}
          placeholder='sistem-informasi-akademik'
          required
          disabled={loading}
        />
      </Field>

      {/* Category + Client */}
      <div className='grid grid-cols-1 gap-5 md:grid-cols-2'>
        <Field label='Kategori'>
          <Select
            value={category}
            onValueChange={setCategory}
            disabled={loading || categoriesLoading}
          >
            <SelectTrigger className='w-full'>
              <SelectValue
                placeholder={categoriesLoading ? 'Memuat kategori...' : 'Pilih kategori'}
              />
            </SelectTrigger>

            <SelectContent>
              {availableCategories.length > 0 ? (
                availableCategories.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))
              ) : (
                <SelectItem value='__empty' disabled>
                  Belum ada kategori
                </SelectItem>
              )}
            </SelectContent>
          </Select>

          {categoriesError && <p className='mt-1.5 text-xs text-redline'>Gagal memuat kategori.</p>}

          {!categoriesLoading && !categoriesError && availableCategories.length === 0 && (
            <p className='mt-1.5 text-xs text-ink-soft'>Belum ada kategori dari project.</p>
          )}
        </Field>

        <Field label='Client'>
          <Input
            id='client'
            name='client'
            type='text'
            value={client}
            onChange={(event) => setClient(event.target.value)}
            placeholder='Nama client'
            disabled={loading}
          />
        </Field>
      </div>

      {/* Deskripsi */}
      <Field label='Deskripsi'>
        <Textarea
          id='description'
          name='description'
          rows={8}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder='Jelaskan project ini...'
          required
          disabled={loading}
        />
      </Field>

      {/* Thumbnail */}
      <Field label='Thumbnail'>
        <Input
          id='thumbnail'
          name='thumbnail'
          type='text'
          value={thumbnail}
          onChange={(event) => setThumbnail(event.target.value)}
          placeholder='portfolio/project-1.jpg'
          disabled={loading}
        />
      </Field>

      {/* URL */}
      <Field label='URL Project'>
        <Input
          id='project_url'
          name='project_url'
          type='url'
          value={projectUrl}
          onChange={(event) => setProjectUrl(event.target.value)}
          placeholder='https://example.com'
          disabled={loading}
        />
      </Field>

      {/* Submit */}
      <Button type='submit' disabled={loading || categoriesLoading || !category}>
        {loading ? 'Menyimpan...' : submitLabel}
      </Button>
    </form>
  );
}
