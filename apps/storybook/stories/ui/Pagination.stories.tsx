import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from '@vikingo/ui'

const meta: Meta = {
  title: 'Navigation/Pagination',
  parameters: { layout: 'centered', docs: { source: { type: 'code' } } },
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj

export const Default: Story = {
  name: 'Default · Alapértelmezett',
  render: () => {
    const [page, setPage] = useState(3)
    const total = 8

    return (
      <div className="p-6 bg-[var(--color-bg)]">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className={page <= 1 ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>
            {Array.from({ length: total }, (_, i) => i + 1).map((p) => (
              <PaginationItem key={p}>
                <PaginationLink isActive={p === page} onClick={() => setPage(p)}>
                  {p}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={() => setPage((p) => Math.min(total, p + 1))}
                className={page >= total ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
        <p className="text-center text-xs text-[var(--color-text-muted)] font-mono mt-3">
          {page}. oldal / {total} összesen
        </p>
      </div>
    )
  },
}

export const WithEllipsis: Story = {
  name: 'With Ellipsis · Ellipsissel',
  render: () => {
    const [page, setPage] = useState(6)

    return (
      <div className="p-6 bg-[var(--color-bg)]">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious onClick={() => setPage((p) => Math.max(1, p - 1))} />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink isActive={page === 1} onClick={() => setPage(1)}>
                1
              </PaginationLink>
            </PaginationItem>
            {page > 3 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            {[page - 1, page, page + 1]
              .filter((p) => p > 1 && p < 20)
              .map((p) => (
                <PaginationItem key={p}>
                  <PaginationLink isActive={p === page} onClick={() => setPage(p)}>
                    {p}
                  </PaginationLink>
                </PaginationItem>
              ))}
            {page < 18 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationLink isActive={page === 20} onClick={() => setPage(20)}>
                20
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext onClick={() => setPage((p) => Math.min(20, p + 1))} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
        <p className="text-center text-xs text-[var(--color-text-muted)] font-mono mt-3">
          {page}. oldal / 20 összesen
        </p>
      </div>
    )
  },
}

export const IconOnly: Story = {
  name: 'Icon Only · Csak nyilak',
  render: () => {
    const [page, setPage] = useState(3)
    const total = 8

    return (
      <div className="p-6 bg-[var(--color-bg)]">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationLink
                aria-label="Előző oldal"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className={page <= 1 ? 'pointer-events-none opacity-50' : ''}
              >
                <ChevronLeft className="h-4 w-4" />
              </PaginationLink>
            </PaginationItem>
            {Array.from({ length: total }, (_, i) => i + 1).map((p) => (
              <PaginationItem key={p}>
                <PaginationLink isActive={p === page} onClick={() => setPage(p)}>
                  {p}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationLink
                aria-label="Következő oldal"
                onClick={() => setPage((p) => Math.min(total, p + 1))}
                className={page >= total ? 'pointer-events-none opacity-50' : ''}
              >
                <ChevronRight className="h-4 w-4" />
              </PaginationLink>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
        <p className="text-center text-xs text-[var(--color-text-muted)] font-mono mt-3">
          {page}. oldal / {total} összesen
        </p>
      </div>
    )
  },
}
