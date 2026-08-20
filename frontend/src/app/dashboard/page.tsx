'use client';

import Link from 'next/link';

import { useApi } from '@/hooks/useApi';

import { Button } from '@/components/ui/button';
import { StatCard } from '@/components/dashboard/StatCard';
import { Topbar } from '@/components/dashboard/Topbar';

import type { PortfolioProject } from '@/types/portfolio';
import type { Service } from '@/types/service';
import type { Testimonial } from '@/types/testimonial';
import type { TeamMember } from '@/types/team-member';
import Image from 'next/image';

export default function DashboardOverviewPage() {
  const {
    items: projects,
    loading: loadingProjects,
    error: projectsError,
  } = useApi<PortfolioProject>('portfolio-projects');

  const {
    items: services,
    loading: loadingServices,
    error: servicesError,
  } = useApi<Service>('services');

  const {
    items: testimonials,
    loading: loadingTestimonials,
    error: testimonialsError,
  } = useApi<Testimonial>('testimonials');

  const {
    items: team,
    loading: loadingTeam,
    error: teamError,
  } = useApi<TeamMember>('team-members');

  const loading = loadingProjects || loadingServices || loadingTestimonials || loadingTeam;

  const errors = [projectsError, servicesError, testimonialsError, teamError].filter(Boolean);

  const stats = [
    {
      label: 'Portfolio',
      value: String(projects.length),
    },
    {
      label: 'Layanan',
      value: String(services.length),
    },
    {
      label: 'Testimoni',
      value: String(testimonials.length),
    },
    {
      label: 'Anggota Tim',
      value: String(team.length),
    },
  ];

  const recentProjects = projects.slice(0, 5);

  return (
    <div>
      <Topbar title='Dashboard' />

      {/* Summary */}
      <section className='mt-6'>
        <p className='font-mono text-[11px] uppercase tracking-wider text-redline'>Ringkasan</p>

        <div className='mt-4 grid grid-cols-2 gap-4 lg:grid-cols-4'>
          {stats.map((stat) => (
            <StatCard key={stat.label} label={stat.label} value={loading ? '…' : stat.value} />
          ))}
        </div>
      </section>

      {/* API Error */}
      {!loading && errors.length > 0 && (
        <div className='mt-6 border border-redline bg-redline-soft p-5'>
          <p className='font-mono text-xs uppercase tracking-wider text-redline'>
            Sebagian data gagal dimuat
          </p>

          <p className='mt-2 text-sm text-ink-soft'>
            Periksa koneksi ke Laravel API atau endpoint yang digunakan.
          </p>
        </div>
      )}

      {/* Recent Portfolio */}
      <section className='mt-8 border border-line bg-paper-raised'>
        <div className='flex items-center justify-between border-b border-line px-5 py-3.5'>
          <span className='font-mono text-[11px] uppercase tracking-wider text-ink-soft'>
            Portfolio Terbaru
          </span>

          <Button asChild variant='ghost' size='sm'>
            <Link href='/dashboard/portfolio-projects'>Kelola</Link>
          </Button>
        </div>

        <div className='overflow-x-auto'>
          <table className='w-full text-sm'>
            <thead>
              <tr className='border-b border-line'>
                <th className='px-5 py-3 text-left font-mono text-[11px] uppercase tracking-wider text-ink-soft'>
                  Preview
                </th>

                <th className='px-5 py-3 text-left font-mono text-[11px] uppercase tracking-wider text-ink-soft'>
                  Project
                </th>

                <th className='px-5 py-3 text-left font-mono text-[11px] uppercase tracking-wider text-ink-soft'>
                  Kategori
                </th>

                <th className='px-5 py-3 text-right font-mono text-[11px] uppercase tracking-wider text-ink-soft'>
                  Aksi
                </th>
              </tr>
            </thead>

            <tbody>
              {recentProjects.map((project) => (
                <tr key={project.id} className='border-b border-line last:border-0'>
                  <td className='px-5 py-3'>
                    <div className='relative h-10 w-14 overflow-hidden border border-line bg-ink-panel'>
                      {project.thumbnail ? (
                        <Image
                          src={project.thumbnail}
                          alt={project.title}
                          fill
                          sizes='56px'
                          className='object-cover'
                        />
                      ) : (
                        <div className='flex h-full items-center justify-center font-mono text-[8px] uppercase tracking-wider text-paper/50'>
                          No Image
                        </div>
                      )}
                    </div>
                  </td>

                  <td className='px-5 py-3'>
                    <p className='font-medium'>{project.title}</p>

                    {project.client && (
                      <p className='mt-0.5 text-xs text-ink-soft'>{project.client}</p>
                    )}
                  </td>

                  <td className='px-5 py-3 text-ink-soft'>{project.category}</td>

                  <td className='px-5 py-3 text-right'>
                    <Button asChild variant='outline' size='sm'>
                      <Link href={`/dashboard/portfolio-projects/${project.id}/edit`}>Edit</Link>
                    </Button>
                  </td>
                </tr>
              ))}

              {!loading && recentProjects.length === 0 && (
                <tr>
                  <td
                    className='px-5 py-10 text-center font-mono text-xs uppercase tracking-wider text-ink-soft'
                    colSpan={4}
                  >
                    Belum ada portfolio.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
