import type { LucideIcon } from 'lucide-react';

import {
  BriefcaseBusiness,
  FileText,
  LayoutDashboard,
  MessageSquareQuote,
  Users,
  Wrench,
} from 'lucide-react';

export type UserRole = 'admin' | 'editor';

export type PublicNavLink = {
  href: string;
  label: string;
};

export const publicNavLinks: PublicNavLink[] = [
  {
    href: '/',
    label: 'Beranda',
  },
  {
    href: '/about',
    label: 'Tentang',
  },
  {
    href: '/services',
    label: 'Layanan',
  },
  {
    href: '/portfolio',
    label: 'Portfolio',
  },
  {
    href: '/testimonials',
    label: 'Testimoni',
  },
  {
    href: '/contact',
    label: 'Kontak',
  },
];

export type DashboardNavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  roles: UserRole[];
};

export type DashboardNavGroup = {
  title: string | null;
  items: DashboardNavItem[];
};

export const dashboardNavGroups: DashboardNavGroup[] = [
  {
    title: null,
    items: [
      {
        href: '/dashboard',
        label: 'Dashboard',
        icon: LayoutDashboard,
        roles: ['admin', 'editor'],
      },
    ],
  },
  {
    title: 'Konten',
    items: [
      {
        href: '/dashboard/pages',
        label: 'Halaman',
        icon: FileText,
        roles: ['admin', 'editor'],
      },
      {
        href: '/dashboard/services',
        label: 'Layanan',
        icon: Wrench,
        roles: ['admin', 'editor'],
      },
      {
        href: '/dashboard/portfolio-projects',
        label: 'Portfolio',
        icon: BriefcaseBusiness,
        roles: ['admin', 'editor'],
      },
      {
        href: '/dashboard/team-members',
        label: 'Tim Kami',
        icon: Users,
        roles: ['admin', 'editor'],
      },
      {
        href: '/dashboard/testimonials',
        label: 'Testimoni',
        icon: MessageSquareQuote,
        roles: ['admin', 'editor'],
      },
    ],
  },
];
