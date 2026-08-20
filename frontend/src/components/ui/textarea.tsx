'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot='textarea'
      className={cn(
        'flex min-h-24 w-full resize-none rounded-lg border border-line bg-paper-raised px-3.5 py-2.5 text-sm text-ink shadow-none transition-colors outline-none',
        'placeholder:text-ink-soft/70',
        'focus:border-ink focus:ring-0',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'aria-invalid:border-redline aria-invalid:ring-1 aria-invalid:ring-redline/20',
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
