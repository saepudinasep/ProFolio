'use client';

import dynamic from 'next/dynamic';

export const LocationMap = dynamic(
  () => import('./LocationMap').then((module) => module.LocationMap),
  {
    ssr: false,
    loading: () => (
      <div className='flex h-full w-full items-center justify-center bg-paper-raised'>
        <span className='font-mono text-[11px] uppercase tracking-wider text-ink-soft'>
          Memuat peta...
        </span>
      </div>
    ),
  },
);
