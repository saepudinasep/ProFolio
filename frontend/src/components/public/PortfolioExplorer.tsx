'use client';

import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';

import { useApi } from '@/hooks/useApi';
import type { PortfolioProject } from '@/types/portfolio';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { ProjectCard } from './ProjectCard';

const ALL_CATEGORY = 'Semua';

export function PortfolioExplorer() {
  const { items, loading, error } = useApi<PortfolioProject>('portfolio-projects');

  const [activeCategory, setActiveCategory] = useState(ALL_CATEGORY);

  const [query, setQuery] = useState('');
  const [visible, setVisible] = useState(6);

  /**
   * Generate category options from portfolio_projects API.
   */
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(
        items
          .map((project) => project.category?.trim())
          .filter((category): category is string => Boolean(category)),
      ),
    ).sort((a, b) => a.localeCompare(b));

    return [ALL_CATEGORY, ...uniqueCategories];
  }, [items]);

  /**
   * Filter portfolio.
   */
  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return items.filter((project) => {
      const matchCategory = activeCategory === ALL_CATEGORY || project.category === activeCategory;

      const matchQuery =
        normalizedQuery === '' ||
        project.title.toLowerCase().includes(normalizedQuery) ||
        (project.client ?? '').toLowerCase().includes(normalizedQuery) ||
        project.category.toLowerCase().includes(normalizedQuery);

      return matchCategory && matchQuery;
    });
  }, [items, activeCategory, query]);

  const shown = filtered.slice(0, visible);

  function handleCategoryChange(category: string) {
    setActiveCategory(category);
    setVisible(6);
  }

  function handleSearch(value: string) {
    setQuery(value);
    setVisible(6);
  }

  if (loading) {
    return (
      <p className='py-16 text-center font-mono text-xs uppercase tracking-widest text-ink-soft'>
        Memuat project...
      </p>
    );
  }

  if (error) {
    return (
      <div className='border border-redline bg-redline-soft p-5'>
        <p className='font-mono text-xs uppercase tracking-widest text-redline'>
          Gagal memuat portfolio
        </p>

        <p className='mt-2 text-sm text-ink-soft'>{error}</p>
      </div>
    );
  }

  return (
    <div>
      {/* Filter + Search */}
      <div className='flex flex-col gap-4 md:flex-row md:items-center'>
        {/* Categories */}
        <div className='flex flex-wrap gap-2'>
          {categories.map((category) => {
            const active = activeCategory === category;

            return (
              <Button
                key={category}
                type='button'
                variant={active ? 'primary' : 'outline'}
                size='sm'
                onClick={() => handleCategoryChange(category)}
              >
                {category}
              </Button>
            );
          })}
        </div>

        {/* Search */}
        <div className='relative flex-1 md:ml-auto md:max-w-xs'>
          <Search
            size={15}
            strokeWidth={1.8}
            aria-hidden='true'
            className='pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-soft'
          />

          <Input
            value={query}
            onChange={(event) => handleSearch(event.target.value)}
            type='search'
            placeholder='Cari project atau client...'
            className='pl-9'
            aria-label='Cari project atau client'
          />
        </div>
      </div>

      {/* Empty */}
      {shown.length === 0 ? (
        <p className='mt-16 text-center font-mono text-xs uppercase tracking-wider text-ink-soft'>
          Belum ada project yang cocok dengan pencarianmu.
        </p>
      ) : (
        <div className='mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4'>
          {shown.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}

      {/* Load More */}
      {visible < filtered.length && (
        <div className='mt-10 text-center'>
          <Button
            type='button'
            variant='outline'
            onClick={() => setVisible((current) => current + 6)}
          >
            Muat Lebih
          </Button>
        </div>
      )}
    </div>
  );
}
