import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

interface SpecLabelProps {
  index?: string;
  children: ReactNode;
  dark?: boolean;
}

export function SpecLabel({ index, children, dark = false }: SpecLabelProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider',
        dark ? 'text-redline' : 'text-redline',
      )}
    >
      <span className='flex items-center gap-1'>
        <span aria-hidden='true' className='text-[13px] leading-none'>
          [
        </span>

        {index && <span>{index}</span>}

        <span>{children}</span>

        <span aria-hidden='true' className='text-[13px] leading-none'>
          ]
        </span>
      </span>
    </div>
  );
}
