'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { Pencil, Trash2 } from 'lucide-react';

export type Column<T> = {
  key: string;
  header: string;
  align?: 'left' | 'right';
  render: (item: T) => ReactNode;
};

interface DataTableProps<T extends { id: string | number }> {
  items: T[];
  columns: Column<T>[];
  editHrefBase: string;
  onDelete: (id: T['id']) => void;
  emptyMessage?: string;
}

export function DataTable<T extends { id: string | number }>({
  items,
  columns,
  editHrefBase,
  onDelete,
  emptyMessage = 'Belum ada data.',
}: DataTableProps<T>) {
  return (
    <div className='overflow-x-auto border border-line bg-paper-raised'>
      <table className='w-full text-sm'>
        <thead>
          <tr className='border-b border-ink'>
            {columns.map((column) => (
              <th
                key={column.key}
                className={`px-4 py-3 font-mono text-[11px] uppercase tracking-wider text-ink-soft ${
                  column.align === 'right' ? 'text-right' : 'text-left'
                }`}
              >
                {column.header}
              </th>
            ))}

            <th className='px-4 py-3 text-right font-mono text-[11px] uppercase tracking-wider text-ink-soft'>
              Aksi
            </th>
          </tr>
        </thead>

        <tbody>
          {items.map((item) => (
            <tr key={item.id} className='border-b border-line last:border-0'>
              {columns.map((column) => (
                <td
                  key={column.key}
                  className={`px-4 py-3 ${column.align === 'right' ? 'text-right' : 'text-left'}`}
                >
                  {column.render(item)}
                </td>
              ))}

              <td className='px-4 py-3'>
                <div className='flex justify-end gap-2'>
                  <Link
                    href={`${editHrefBase}/${item.id}/edit`}
                    aria-label={`Edit ${item.id}`}
                    className='flex h-8 w-8 items-center justify-center border border-line text-ink transition-colors hover:border-ink hover:bg-paper'
                  >
                    <Pencil size={14} aria-hidden='true' />
                  </Link>

                  <button
                    type='button'
                    onClick={() => onDelete(item.id)}
                    aria-label={`Hapus ${item.id}`}
                    className='flex h-8 w-8 items-center justify-center border border-line text-redline transition-colors hover:border-redline hover:bg-redline/5'
                  >
                    <Trash2 size={14} aria-hidden='true' />
                  </button>
                </div>
              </td>
            </tr>
          ))}

          {items.length === 0 && (
            <tr>
              <td
                colSpan={columns.length + 1}
                className='px-4 py-10 text-center font-mono text-xs uppercase tracking-wider text-ink-soft'
              >
                {emptyMessage}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
