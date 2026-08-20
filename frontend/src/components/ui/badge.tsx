import * as React from 'react';

import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden border px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-[0.08em] whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 [&>svg]:pointer-events-none [&>svg]:size-3!',
  {
    variants: {
      variant: {
        neutral: 'border-line text-ink-soft',

        active: 'border-blue text-blue',

        draft: 'border-line text-ink-soft',

        default: 'border-ink bg-ink text-paper',

        secondary: 'border-line bg-muted text-ink-soft',

        destructive: 'border-redline bg-transparent text-redline',

        outline: 'border-line text-ink hover:border-ink',

        ghost: 'border-transparent text-ink-soft hover:text-ink',

        link: 'border-transparent text-ink underline-offset-4 hover:underline',
      },
    },

    defaultVariants: {
      variant: 'neutral',
    },
  },
);

function Badge({
  className,
  variant = 'neutral',
  asChild = false,
  ...props
}: React.ComponentProps<'span'> &
  VariantProps<typeof badgeVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : 'span';

  return (
    <Comp
      data-slot='badge'
      data-variant={variant}
      className={cn(
        badgeVariants({
          variant,
        }),
        className,
      )}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
