'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import { useApi } from '@/hooks/useApi';
import type { PortfolioProject } from '@/types/portfolio';

import { ProjectCard } from './ProjectCard';
import { SpecLabel } from './SpecLabel';

export function FeaturedWork() {
  const { items, loading, error } = useApi<PortfolioProject>('portfolio-projects');

  // Ambil maksimal 3 project terbaru dari API
  const featured = items.slice(0, 3);

  return (
    <section className='border-b border-line'>
      <div className='mx-auto max-w-6xl px-6 py-20'>
        {/* Header */}
        <div className='flex flex-wrap items-end justify-between gap-4'>
          <div>
            <SpecLabel index='02'>Portfolio Unggulan</SpecLabel>

            <h2 className='mt-4 font-display text-3xl font-semibold tracking-tight'>
              Beberapa project terbaru.
            </h2>
          </div>

          <Link
            href='/portfolio'
            className='inline-flex items-center gap-1.5 font-mono text-[13px] uppercase tracking-wider text-ink-soft underline decoration-line underline-offset-4 transition-colors hover:text-ink'
          >
            Semua Project
            <ArrowUpRight size={14} strokeWidth={1.8} aria-hidden='true' />
          </Link>
        </div>

        {/* Loading */}
        {loading && (
          <div className='mt-10'>
            <p className='font-mono text-xs uppercase tracking-widest text-ink-soft'>
              Memuat project...
            </p>
          </div>
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

        {/* Empty */}
        {!loading && !error && featured.length === 0 && (
          <div className='mt-10 border border-line bg-paper-raised p-8 text-center'>
            <p className='font-mono text-xs uppercase tracking-widest text-ink-soft'>
              Belum ada project
            </p>
          </div>
        )}

        {/* Portfolio */}
        {!loading && !error && featured.length > 0 && (
          <div className='mt-10 grid gap-6 md:grid-cols-3'>
            {featured.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
