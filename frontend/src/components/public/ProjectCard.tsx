import Image from 'next/image';
import Link from 'next/link';

import type { PortfolioProject } from '@/types/portfolio';
import { getStorageUrl } from '@/lib/utils';

interface ProjectCardProps {
  project: PortfolioProject;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const thumbnailUrl = getStorageUrl(project.thumbnail);

  return (
    <Link
      href={`/portfolio/${project.slug}`}
      className='group relative block overflow-hidden border border-line bg-paper-raised transition-colors hover:border-ink'
    >
      {/* Corner markers */}
      <div
        aria-hidden='true'
        className='absolute left-2 top-2 z-10 h-2.5 w-2.5 border-l-2 border-t-2 border-redline opacity-0 transition-opacity group-hover:opacity-100'
      />

      <div
        aria-hidden='true'
        className='absolute right-2 top-2 z-10 h-2.5 w-2.5 border-r-2 border-t-2 border-redline opacity-0 transition-opacity group-hover:opacity-100'
      />

      {/* Thumbnail */}
      <div className='relative aspect-[4/3] overflow-hidden bg-paper'>
        {thumbnailUrl ? (
          <Image
            src={thumbnailUrl}
            alt={project.title}
            fill
            sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw'
            className='object-cover transition-transform duration-500 group-hover:scale-105'
          />
        ) : (
          <div className='flex h-full items-center justify-center bg-ink-panel'>
            <span className='font-mono text-[11px] uppercase tracking-wider text-paper/50'>
              {project.category}
            </span>
          </div>
        )}

        <div
          aria-hidden='true'
          className='absolute inset-0 bg-ink/0 transition-colors duration-300 group-hover:bg-ink/10'
        />

        <div className='absolute bottom-3 left-3'>
          <span className='border border-white/30 bg-ink/60 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-white backdrop-blur-sm'>
            {project.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className='p-4'>
        <h3 className='font-display text-[15px] font-semibold leading-snug tracking-tight'>
          {project.title}
        </h3>

        {project.client && <p className='mt-1 text-xs text-ink-soft'>{project.client}</p>}
      </div>
    </Link>
  );
}
