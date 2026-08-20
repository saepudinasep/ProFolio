'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { useParams } from 'next/navigation';

import { Navbar } from '@/components/public/Navbar';
import { Footer } from '@/components/public/Footer';
import { SpecLabel } from '@/components/public/SpecLabel';
import { useApiItem } from '@/hooks/useApi';
import type { PortfolioProject } from '@/types/portfolio';

export default function PortfolioDetailPage() {
  const params = useParams<{ slug: string }>();

  const {
    item: project,
    loading,
    error,
  } = useApiItem<PortfolioProject>('portfolio-projects', params.slug);

  return (
    <>
      <Navbar />

      <main>
        <div className='mx-auto max-w-4xl px-6 py-10'>
          {/* Back */}
          <Link
            href='/portfolio'
            className='inline-flex items-center gap-1.5 font-mono text-[13px] uppercase tracking-wider text-ink-soft transition-colors hover:text-ink'
          >
            <ArrowLeft size={14} strokeWidth={1.8} aria-hidden='true' />
            Kembali ke Portfolio
          </Link>

          {/* Loading */}
          {loading && (
            <p className='mt-10 font-mono text-xs uppercase tracking-widest text-ink-soft'>
              Memuat project...
            </p>
          )}

          {/* Error */}
          {!loading && error && (
            <div className='mt-10 border border-redline bg-redline-soft p-5'>
              <p className='font-mono text-xs uppercase tracking-widest text-redline'>
                Gagal memuat project
              </p>

              <p className='mt-2 text-sm text-ink-soft'>{error}</p>
            </div>
          )}

          {/* Not found */}
          {!loading && !error && !project && (
            <div className='mt-10'>
              <SpecLabel>Tidak Ditemukan</SpecLabel>

              <p className='mt-3 text-sm text-ink-soft'>
                Project yang kamu cari tidak tersedia atau sudah dihapus.
              </p>
            </div>
          )}

          {/* Project */}
          {!loading && !error && project && (
            <article className='mt-8'>
              {/* Thumbnail */}
              <div className='relative aspect-16/7 overflow-hidden border border-line bg-paper-raised'>
                {project.thumbnail ? (
                  <Image
                    src={project.thumbnail}
                    alt={project.title}
                    fill
                    priority
                    sizes='(max-width: 1024px) 100vw, 900px'
                    className='object-cover'
                  />
                ) : (
                  <div className='flex h-full items-end bg-ink-panel p-6'>
                    <span className='font-mono text-xs uppercase tracking-wider text-paper/60'>
                      {project.category}
                    </span>
                  </div>
                )}
              </div>

              {/* Header */}
              <div className='mt-6 flex flex-wrap items-start justify-between gap-6 border-b border-line pb-6'>
                <div>
                  <SpecLabel>{project.category}</SpecLabel>

                  <h1 className='mt-3 font-display text-3xl font-semibold tracking-tight md:text-4xl'>
                    {project.title}
                  </h1>

                  {project.client && (
                    <p className='mt-2 text-sm text-ink-soft'>Client: {project.client}</p>
                  )}
                </div>

                {project.project_url && (
                  <Link
                    href={project.project_url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='inline-flex items-center gap-1.5 border border-line px-4 py-2 font-mono text-xs uppercase tracking-wider text-ink-soft transition-colors hover:border-ink hover:text-ink'
                  >
                    Lihat Project
                    <ExternalLink size={14} strokeWidth={1.8} aria-hidden='true' />
                  </Link>
                )}
              </div>

              {/* Description */}
              <div className='mt-8 max-w-2xl'>
                <h2 className='font-mono text-[11px] uppercase tracking-wider text-ink-soft'>
                  Deskripsi
                </h2>

                <p className='mt-3 text-[15px] leading-relaxed text-ink'>{project.description}</p>
              </div>
            </article>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
