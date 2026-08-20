'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { dashboardNavGroups } from '@/config/navigation';
import { hasRole } from '@/lib/authorization';
import { useAuth } from '@/hooks/useAuth';

function isActiveRoute(pathname: string, href: string): boolean {
  if (href === '/dashboard') {
    return pathname === href;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Sidebar() {
  const pathname = usePathname();
  const { user } = useAuth();

  return (
    <aside className='hidden w-60 shrink-0 border-r border-ink-panel-line bg-ink-panel text-paper md:block'>
      {/* Brand */}
      <div className='border-b border-ink-panel-line px-5 py-5'>
        <Link href='/dashboard' className='flex items-center gap-2'>
          <span className='flex h-7 w-7 items-center justify-center border border-paper/40 font-mono text-xs'>
            P.
          </span>

          <span className='font-display text-sm font-semibold tracking-tight'>ProFolio Admin</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav aria-label='Dashboard navigation' className='py-3'>
        {dashboardNavGroups.map((group, groupIndex) => {
          const visibleItems = group.items.filter((item) => hasRole(user?.role, item.roles));

          if (visibleItems.length === 0) {
            return null;
          }

          return (
            <div
              key={group.title ?? `navigation-group-${groupIndex}`}
              className={groupIndex > 0 ? 'mt-2' : undefined}
            >
              {group.title && (
                <p className='px-5 pb-1.5 pt-3 font-mono text-[9.5px] uppercase tracking-[0.14em] text-paper/35'>
                  {group.title}
                </p>
              )}

              <div>
                {visibleItems.map((item) => {
                  const active = isActiveRoute(pathname, item.href);

                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      aria-current={active ? 'page' : undefined}
                      className={[
                        'flex items-center gap-3 border-l-2 px-5 py-2.5 text-[13px] transition-colors',
                        active
                          ? 'border-redline bg-white/5 font-medium text-white'
                          : 'border-transparent text-paper/60 hover:border-white/20 hover:text-paper',
                      ].join(' ')}
                    >
                      <Icon size={15} strokeWidth={active ? 2 : 1.7} aria-hidden='true' />

                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
