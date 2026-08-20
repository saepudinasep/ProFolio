'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { publicNavLinks } from '@/config/navigation';

export function Navbar() {
  const [open, setOpen] = useState(false);

  function closeMenu() {
    setOpen(false);
  }

  return (
    <header className='sticky top-0 z-50 border-b border-line bg-paper/90 backdrop-blur'>
      <div className='mx-auto flex max-w-6xl items-center justify-between px-6 py-4'>
        {/* Brand */}
        <Link href='/' className='flex items-center gap-2' onClick={closeMenu}>
          <span
            aria-hidden='true'
            className='flex h-8 w-8 items-center justify-center border border-ink font-mono text-xs font-medium'
          >
            P.
          </span>

          <span className='font-display text-lg font-semibold tracking-tight'>ProFolio</span>
        </Link>

        {/* Desktop Navigation */}
        <nav aria-label='Navigasi utama' className='hidden items-center gap-7 md:flex'>
          {publicNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className='font-mono text-[13px] uppercase tracking-widest text-ink-soft transition-colors hover:text-ink'
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className='hidden md:block'>
          <Button asChild>
            <Link href='/contact'>
              Mulai Project
              <ArrowUpRight size={14} strokeWidth={1.8} aria-hidden='true' />
            </Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          type='button'
          aria-label={open ? 'Tutup menu' : 'Buka menu'}
          aria-expanded={open}
          aria-controls='mobile-navigation'
          onClick={() => setOpen((current) => !current)}
          className='flex h-9 w-9 items-center justify-center border border-transparent text-ink transition-colors hover:border-line md:hidden'
        >
          {open ? (
            <X size={22} strokeWidth={1.8} aria-hidden='true' />
          ) : (
            <Menu size={22} strokeWidth={1.8} aria-hidden='true' />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {open && (
        <div id='mobile-navigation' className='border-t border-line px-6 py-5 md:hidden'>
          <nav aria-label='Navigasi mobile' className='flex flex-col gap-4'>
            {publicNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className='font-mono text-sm uppercase tracking-widest text-ink-soft transition-colors hover:text-ink'
              >
                {link.label}
              </Link>
            ))}

            <Button asChild className='mt-1 w-fit'>
              <Link href='/contact' onClick={closeMenu}>
                Mulai Project
                <ArrowUpRight size={14} strokeWidth={1.8} aria-hidden='true' />
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
