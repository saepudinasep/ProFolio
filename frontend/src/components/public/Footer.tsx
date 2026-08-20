import Link from 'next/link';

type FooterLink = {
  label: string;
  href: string;
  external?: boolean;
};

type FooterColumn = {
  title: string;
  links: FooterLink[];
};

const columns: FooterColumn[] = [
  {
    title: 'Studio',
    links: [
      {
        label: 'Tentang Kami',
        href: '/about',
      },
      {
        label: 'Portfolio',
        href: '/portfolio',
      },
      {
        label: 'Kontak',
        href: '/contact',
      },
    ],
  },
  {
    title: 'Layanan',
    links: [
      {
        label: 'Pengembangan Web',
        href: '/portfolio?kategori=Web+App',
      },
      {
        label: 'Aplikasi Mobile',
        href: '/portfolio?kategori=Mobile',
      },
      {
        label: 'Brand & Identitas',
        href: '/portfolio?kategori=Branding',
      },
    ],
  },
  {
    title: 'Terhubung',
    links: [
      {
        label: 'Instagram',
        href: '#',
        external: true,
      },
      {
        label: 'LinkedIn',
        href: '#',
        external: true,
      },
      {
        label: 'hello@profolio.id',
        href: 'mailto:hello@profolio.id',
        external: true,
      },
    ],
  },
];

export function Footer() {
  return (
    <footer className='border-t border-line'>
      <div className='mx-auto max-w-6xl px-6 py-14'>
        <div className='grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]'>
          {/* Brand */}
          <div>
            <Link href='/' className='font-display text-xl font-semibold tracking-tight'>
              ProFolio
            </Link>

            <p className='mt-3 max-w-xs text-sm leading-relaxed text-ink-soft'>
              Studio pengembangan produk digital — web, mobile, dan identitas brand yang dirancang
              untuk bertahan lama.
            </p>
          </div>

          {/* Navigation */}
          {columns.map((column) => (
            <div key={column.title}>
              <p className='font-mono text-[11px] uppercase tracking-wider text-ink-soft'>
                {column.title}
              </p>

              <ul className='mt-4 space-y-2.5'>
                {column.links.map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a
                        href={link.href}
                        className='text-sm text-ink transition-colors hover:text-blue'
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className='text-sm text-ink transition-colors hover:text-blue'
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Footer bottom */}
        <div className='mt-14 flex flex-col gap-2 border-t border-line pt-6 font-mono text-[11px] uppercase tracking-widest text-ink-soft md:flex-row md:items-center md:justify-between'>
          <span>&copy; {new Date().getFullYear()} ProFolio Studio</span>

          <span>Dibangun dengan Next.js</span>
        </div>
      </div>
    </footer>
  );
}
