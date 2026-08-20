'use client';

import { useState } from 'react';

import type { TeamMember, TeamMemberPayload } from '@/types/team-member';

import { Field } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export function TeamMemberForm({
  initial,
  onSubmit,
  submitLabel = 'Simpan',
}: {
  initial?: Partial<TeamMember>;
  onSubmit: (data: TeamMemberPayload) => Promise<void>;
  submitLabel?: string;
}) {
  const [name, setName] = useState(initial?.name ?? '');
  const [position, setPosition] = useState(initial?.position ?? '');
  const [bio, setBio] = useState(initial?.bio ?? '');
  const [photo, setPhoto] = useState(initial?.photo ?? '');

  const [linkedin, setLinkedin] = useState(initial?.social_links?.linkedin ?? '');

  const [github, setGithub] = useState(initial?.social_links?.github ?? '');

  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);

    try {
      const data: TeamMemberPayload = {
        name,
        position,
        bio: bio || null,
        photo: photo || null,
        social_links: {
          linkedin: linkedin || null,
          github: github || null,
        },
      };

      await onSubmit(data);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className='max-w-xl space-y-5'>
      <Field label='Nama'>
        <Input
          required
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder='Contoh: Asep Saepudin'
        />
      </Field>

      <Field label='Jabatan'>
        <Input
          required
          value={position}
          onChange={(event) => setPosition(event.target.value)}
          placeholder='Contoh: Full Stack Developer'
        />
      </Field>

      <Field label='Bio Singkat'>
        <Textarea
          rows={4}
          value={bio}
          onChange={(event) => setBio(event.target.value)}
          placeholder='Tuliskan deskripsi singkat anggota tim...'
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

      <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
        <Field label='LinkedIn'>
          <Input
            type='url'
            value={linkedin}
            onChange={(event) => setLinkedin(event.target.value)}
            placeholder='https://linkedin.com/in/...'
          />
        </Field>

        <Field label='GitHub'>
          <Input
            type='url'
            value={github}
            onChange={(event) => setGithub(event.target.value)}
            placeholder='https://github.com/...'
          />
        </Field>
      </div>

      <Button type='submit' disabled={loading}>
        {loading ? 'Menyimpan...' : submitLabel}
      </Button>
    </form>
  );
}
