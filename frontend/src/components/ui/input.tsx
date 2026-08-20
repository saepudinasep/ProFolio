'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot='input'
      className={cn(
        'h-10 w-full min-w-0 rounded-lg border border-line bg-paper-raised px-3.5 py-2.5 text-sm text-ink shadow-none transition-colors outline-none',
        'placeholder:text-ink-soft/70',
        'focus:border-ink focus:ring-0',
        'file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground',
        'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
        'aria-invalid:border-redline aria-invalid:ring-1 aria-invalid:ring-redline/20',
        className,
      )}
      {...props}
    />
  );
}

export { Input };
