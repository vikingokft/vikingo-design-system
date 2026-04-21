import * as React from 'react'
import { cn } from '../../lib/utils'

function Table({
  className,
  ref,
  ...props
}: React.HTMLAttributes<HTMLTableElement> & { ref?: React.Ref<HTMLTableElement> }) {
  return (
    <div className="relative w-full overflow-auto">
      <table
        ref={ref}
        className={cn('w-full caption-bottom text-sm font-body', className)}
        {...props}
      />
    </div>
  )
}

function TableHeader({
  className,
  ref,
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement> & {
  ref?: React.Ref<HTMLTableSectionElement>
}) {
  return (
    <thead
      ref={ref}
      className={cn('[&_tr]:border-b [&_tr]:border-[var(--color-border)]', className)}
      {...props}
    />
  )
}

function TableBody({
  className,
  ref,
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement> & {
  ref?: React.Ref<HTMLTableSectionElement>
}) {
  return <tbody ref={ref} className={cn('[&_tr:last-child]:border-0', className)} {...props} />
}

function TableFooter({
  className,
  ref,
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement> & {
  ref?: React.Ref<HTMLTableSectionElement>
}) {
  return (
    <tfoot
      ref={ref}
      className={cn(
        'border-t border-[var(--color-border)]',
        'bg-[var(--color-bg)]/50',
        'font-medium [&>tr]:last:border-b-0',
        className,
      )}
      {...props}
    />
  )
}

function TableRow({
  className,
  ref,
  ...props
}: React.HTMLAttributes<HTMLTableRowElement> & { ref?: React.Ref<HTMLTableRowElement> }) {
  return (
    <tr
      ref={ref}
      className={cn(
        'border-b border-[var(--color-border)]',
        'transition-colors duration-[var(--transition-fast)]',
        'hover:bg-[var(--color-border)]/30',
        'data-[state=selected]:bg-[var(--color-accent-muted)]',
        className,
      )}
      {...props}
    />
  )
}

function TableHead({
  className,
  sortable,
  sorted,
  children,
  onClick,
  ref,
  ...props
}: React.ThHTMLAttributes<HTMLTableCellElement> & {
  sortable?: boolean
  sorted?: 'asc' | 'desc' | false
  ref?: React.Ref<HTMLTableCellElement>
}) {
  return (
    <th
      ref={ref}
      className={cn(
        'h-10 sm:h-11 px-3 sm:px-4 text-left align-middle',
        'text-xs font-mono font-medium text-[var(--color-text-muted)] uppercase tracking-wider',
        'whitespace-nowrap',
        sortable && 'cursor-pointer select-none hover:text-[var(--color-text)]',
        '[&:has([role=checkbox])]:pr-0',
        className,
      )}
      onClick={sortable ? onClick : undefined}
      {...props}
    >
      {sortable ? (
        <span className="flex items-center gap-1">
          {children}
          <span className="text-[var(--color-text-subtle)]">
            {sorted === 'asc' ? '↑' : sorted === 'desc' ? '↓' : '↕'}
          </span>
        </span>
      ) : (
        children
      )}
    </th>
  )
}

function TableCell({
  className,
  ref,
  ...props
}: React.TdHTMLAttributes<HTMLTableCellElement> & {
  ref?: React.Ref<HTMLTableCellElement>
}) {
  return (
    <td
      ref={ref}
      className={cn(
        'px-3 sm:px-4 py-2 sm:py-3 align-middle text-[var(--color-text)]',
        '[&:has([role=checkbox])]:pr-0',
        className,
      )}
      {...props}
    />
  )
}

function TableCaption({
  className,
  ref,
  ...props
}: React.HTMLAttributes<HTMLTableCaptionElement> & {
  ref?: React.Ref<HTMLTableCaptionElement>
}) {
  return (
    <caption
      ref={ref}
      className={cn('mt-4 text-sm text-[var(--color-text-muted)]', className)}
      {...props}
    />
  )
}

export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption }
