import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react'
import * as React from 'react'
import { cn } from '../../lib/utils'
import { buttonVariants } from './button'

const Pagination = ({ className, ...props }: React.ComponentProps<'nav'>) => (
  <nav
    aria-label="pagination"
    className={cn('mx-auto flex w-full justify-center', className)}
    {...props}
  />
)
Pagination.displayName = 'Pagination'

function PaginationContent({
  className,
  ref,
  ...props
}: React.ComponentProps<'ul'> & { ref?: React.Ref<HTMLUListElement> }) {
  return <ul ref={ref} className={cn('flex flex-row items-center gap-1', className)} {...props} />
}

function PaginationItem({
  className,
  ref,
  ...props
}: React.ComponentProps<'li'> & { ref?: React.Ref<HTMLLIElement> }) {
  return <li ref={ref} className={cn('', className)} {...props} />
}

type PaginationLinkProps = {
  isActive?: boolean
} & React.ComponentProps<'a'>

const PaginationLink = ({ className, isActive, ...props }: PaginationLinkProps) => (
  <a
    aria-current={isActive ? 'page' : undefined}
    className={cn(
      buttonVariants({ variant: isActive ? 'primary' : 'secondary', size: 'icon-sm' }),
      'cursor-pointer',
      className,
    )}
    {...props}
  />
)
PaginationLink.displayName = 'PaginationLink'

const PaginationPrevious = ({ className, ...props }: React.ComponentProps<'a'>) => (
  <a
    aria-label="Go to previous page"
    className={cn(
      buttonVariants({ variant: 'ghost', size: 'sm' }),
      'gap-1 cursor-pointer whitespace-nowrap',
      className,
    )}
    {...props}
  >
    <ChevronLeft className="h-4 w-4 shrink-0" />
    <span className="hidden sm:inline">Előző</span>
  </a>
)
PaginationPrevious.displayName = 'PaginationPrevious'

const PaginationNext = ({ className, ...props }: React.ComponentProps<'a'>) => (
  <a
    aria-label="Go to next page"
    className={cn(
      buttonVariants({ variant: 'ghost', size: 'sm' }),
      'gap-1 cursor-pointer whitespace-nowrap',
      className,
    )}
    {...props}
  >
    <span className="hidden sm:inline">Következő</span>
    <ChevronRight className="h-4 w-4 shrink-0" />
  </a>
)
PaginationNext.displayName = 'PaginationNext'

const PaginationEllipsis = ({ className, ...props }: React.ComponentProps<'span'>) => (
  <span
    aria-hidden
    className={cn(
      'flex h-8 w-8 items-center justify-center text-[var(--color-text-muted)]',
      className,
    )}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
)
PaginationEllipsis.displayName = 'PaginationEllipsis'

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
}
