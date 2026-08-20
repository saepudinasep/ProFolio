import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding font-mono text-[13px] font-medium uppercase tracking-[0.06em] whitespace-nowrap transition-colors outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-40 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        primary: 'border-ink bg-ink text-paper hover:bg-transparent hover:text-ink',

        outline: 'border-line bg-transparent text-ink hover:border-ink hover:bg-transparent',

        ghost: 'border-transparent bg-transparent text-ink-soft hover:text-ink',

        danger: 'border-redline bg-transparent text-redline hover:bg-redline hover:text-paper',

        default: 'border-ink bg-ink text-paper hover:bg-transparent hover:text-ink',

        destructive: 'border-redline bg-redline text-paper hover:bg-redline/90',

        secondary: 'border-line bg-muted text-ink hover:border-ink',

        link: 'border-transparent bg-transparent text-ink underline-offset-4 hover:underline',
      },

      size: {
        default: 'h-9 gap-1.5 px-4',
        xs: 'h-6 gap-1 rounded-lg px-2 text-xs',
        sm: 'h-8 gap-1 rounded-lg px-3 text-xs',
        lg: 'h-10 gap-1.5 px-5',
        icon: 'size-9',
        'icon-xs': 'size-6',
        'icon-sm': 'size-8',
        'icon-lg': 'size-10',
      },
    },

    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  },
);

function Button({
  className,
  variant = 'primary',
  size = 'default',
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : 'button';

  return (
    <Comp
      data-slot='button'
      data-variant={variant}
      data-size={size}
      className={cn(
        buttonVariants({
          variant,
          size,
          className,
        }),
      )}
      {...props}
    />
  );
}

export { Button, buttonVariants };
