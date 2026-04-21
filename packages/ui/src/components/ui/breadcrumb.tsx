import { ChevronRight, MoreHorizontal } from 'lucide-react'
import * as React from 'react'
import { cn } from '../../lib/utils'

function Breadcrumb({
  ref,
  ...props
}: React.ComponentPropsWithoutRef<'nav'> & {
  separator?: React.ReactNode
  ref?: React.Ref<HTMLElement>
}) {
  return <nav ref={ref} aria-label="breadcrumb" {...props} />
}

function BreadcrumbList({
  className,
  ref,
  ...props
}: React.ComponentPropsWithoutRef<'ol'> & { ref?: React.Ref<HTMLOListElement> }) {
  return (
    <ol
      ref={ref}
      className={cn(
        'flex flex-wrap items-center gap-1 text-xs sm:text-sm text-[var(--color-text-muted)] font-body',
        className,
      )}
      {...props}
    />
  )
}

function BreadcrumbItem({
  className,
  ref,
  ...props
}: React.ComponentPropsWithoutRef<'li'> & { ref?: React.Ref<HTMLLIElement> }) {
  return <li ref={ref} className={cn('inline-flex items-center gap-1', className)} {...props} />
}

function BreadcrumbLink({
  className,
  ref,
  ...props
}: React.ComponentPropsWithoutRef<'a'> & {
  asChild?: boolean
  ref?: React.Ref<HTMLAnchorElement>
}) {
  return (
    <a
      ref={ref}
      className={cn(
        'hover:text-[var(--color-text)] transition-colors duration-[var(--transition-fast)]',
        'cursor-pointer',
        className,
      )}
      {...props}
    />
  )
}

function BreadcrumbPage({
  className,
  ref,
  ...props
}: React.ComponentPropsWithoutRef<'span'> & { ref?: React.Ref<HTMLSpanElement> }) {
  return (
    <span
      ref={ref}
      aria-current="page"
      className={cn('font-medium text-[var(--color-text)]', className)}
      {...props}
    />
  )
}

function BreadcrumbSeparator({ children, className, ...props }: React.ComponentProps<'li'>) {
  return (
    <li
      role="presentation"
      aria-hidden="true"
      className={cn('text-[var(--color-text-subtle)]', className)}
      {...props}
    >
      {children ?? <ChevronRight className="h-4 w-4" />}
    </li>
  )
}

function BreadcrumbEllipsis({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      role="presentation"
      aria-hidden="true"
      className={cn('flex h-9 w-9 items-center justify-center', className)}
      {...props}
    >
      <MoreHorizontal className="h-4 w-4" />
      <span className="sr-only">More</span>
    </span>
  )
}

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
}
