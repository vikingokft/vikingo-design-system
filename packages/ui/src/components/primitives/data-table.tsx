import { ChevronLeft, ChevronRight, ChevronsUpDown, MoveDown, MoveUp } from 'lucide-react'
import * as React from 'react'
import { cn } from '../../utils/cn'
import { Input } from './input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './table'

// ── Types ─────────────────────────────────────────────────────────────────────

export interface ColumnDef<TData> {
  /** Key of the data object or a unique string for computed columns */
  key: string
  /** Column header text */
  header: string
  /** Enable click-to-sort on this column */
  sortable?: boolean
  /** Custom cell renderer. Receives the full row and the raw cell value. */
  cell?: (row: TData, value: unknown) => React.ReactNode
  /** Additional className for both `<th>` and `<td>` */
  className?: string
}

export interface DataTableProps<TData extends Record<string, unknown>> {
  /** Array of row data objects */
  data: TData[]
  /** Column definitions */
  columns: ColumnDef<TData>[]
  /** Show a search input above the table for client-side filtering */
  searchable?: boolean
  /** Placeholder for the search input (default: 'Keresés...') */
  searchPlaceholder?: string
  /** Number of rows per page. Omit to show all rows (no pagination). */
  pageSize?: number
  /** Text shown when no rows match the current query */
  emptyText?: string
  /** Shows a skeleton-style loading state */
  loading?: boolean
  className?: string
}

type SortDir = 'asc' | 'desc'

// ── Helpers ───────────────────────────────────────────────────────────────────

function getValue<T extends Record<string, unknown>>(row: T, key: string): unknown {
  return key.split('.').reduce<unknown>((acc, k) => {
    if (acc !== null && typeof acc === 'object') return (acc as Record<string, unknown>)[k]
    return undefined
  }, row)
}

function sortRows<T extends Record<string, unknown>>(rows: T[], key: string, dir: SortDir): T[] {
  return [...rows].sort((a, b) => {
    const av = getValue(a, key)
    const bv = getValue(b, key)
    const aStr = String(av ?? '')
    const bStr = String(bv ?? '')
    const aNum = Number(av)
    const bNum = Number(bv)
    const numericSort = !Number.isNaN(aNum) && !Number.isNaN(bNum)
    const cmp = numericSort
      ? aNum - bNum
      : aStr.localeCompare(bStr, undefined, { sensitivity: 'base' })
    return dir === 'asc' ? cmp : -cmp
  })
}

function filterRows<T extends Record<string, unknown>>(rows: T[], query: string): T[] {
  if (!query.trim()) return rows
  const q = query.toLowerCase()
  return rows.filter((row) =>
    Object.values(row).some((v) =>
      String(v ?? '')
        .toLowerCase()
        .includes(q),
    ),
  )
}

// ── Component ─────────────────────────────────────────────────────────────────

/**
 * High-level data grid built on the base `Table` primitives.
 * Adds client-side **sorting**, **search/filter**, and **pagination** with zero external dependencies.
 *
 * @example
 * <DataTable
 *   data={users}
 *   columns={[
 *     { key: 'name', header: 'Név', sortable: true },
 *     { key: 'email', header: 'Email' },
 *     { key: 'status', header: 'Státusz', cell: (row) => <Badge>{row.status}</Badge> },
 *   ]}
 *   searchable
 *   pageSize={20}
 * />
 */
export function DataTable<TData extends Record<string, unknown>>({
  data,
  columns,
  searchable = false,
  searchPlaceholder = 'Keresés...',
  pageSize,
  emptyText = 'Nincs megjeleníthető adat.',
  loading = false,
  className,
}: DataTableProps<TData>) {
  const [query, setQuery] = React.useState('')
  const [sortKey, setSortKey] = React.useState<string | null>(null)
  const [sortDir, setSortDir] = React.useState<SortDir>('asc')
  const [page, setPage] = React.useState(1)

  function handleSearch(q: string) {
    setQuery(q)
    setPage(1)
  }

  const filtered = React.useMemo(() => filterRows(data, query), [data, query])

  const sorted = React.useMemo(
    () => (sortKey ? sortRows(filtered, sortKey, sortDir) : filtered),
    [filtered, sortKey, sortDir],
  )

  const paginated = React.useMemo(() => {
    if (!pageSize) return sorted
    const start = (page - 1) * pageSize
    return sorted.slice(start, start + pageSize)
  }, [sorted, page, pageSize])

  const totalPages = pageSize ? Math.max(1, Math.ceil(sorted.length / pageSize)) : 1

  function handleSort(key: string) {
    if (sortKey === key) {
      if (sortDir === 'asc') {
        setSortDir('desc')
      } else {
        setSortKey(null)
      }
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
    setPage(1)
  }

  const SortIcon = ({ colKey }: { colKey: string }) => {
    if (sortKey !== colKey) return <ChevronsUpDown className="h-3.5 w-3.5 opacity-40" />
    return sortDir === 'asc' ? (
      <MoveUp className="h-3.5 w-3.5 text-[var(--color-accent)]" />
    ) : (
      <MoveDown className="h-3.5 w-3.5 text-[var(--color-accent)]" />
    )
  }

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      {/* Search */}
      {searchable && (
        <div className="w-full max-w-xs">
          <Input
            placeholder={searchPlaceholder}
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      )}

      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((col) => (
              <TableHead
                key={col.key}
                className={cn(col.sortable && 'cursor-pointer select-none', col.className)}
                onClick={col.sortable ? () => handleSort(col.key) : undefined}
              >
                {col.sortable ? (
                  <span className="inline-flex items-center gap-1">
                    {col.header}
                    <SortIcon colKey={col.key} />
                  </span>
                ) : (
                  col.header
                )}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {loading ? (
            // Loading skeleton rows
            Array.from({ length: pageSize ?? 5 }).map((_, i) => (
              <TableRow key={i}>
                {columns.map((col) => (
                  <TableCell key={col.key} className={col.className}>
                    <div className="h-4 rounded-[var(--radius-sm)] bg-[var(--color-border)] animate-pulse w-3/4" />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : paginated.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="py-10 text-center text-[var(--color-text-muted)]"
              >
                {emptyText}
              </TableCell>
            </TableRow>
          ) : (
            paginated.map((row, rowIdx) => (
              <TableRow key={rowIdx}>
                {columns.map((col) => {
                  const cellValue = getValue(row, col.key)
                  return (
                    <TableCell key={col.key} className={col.className}>
                      {col.cell ? col.cell(row, cellValue) : String(cellValue ?? '')}
                    </TableCell>
                  )
                })}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {/* Pagination */}
      {pageSize && totalPages > 1 && (
        <div className="flex items-center justify-between text-sm text-[var(--color-text-muted)]">
          <span>
            {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, sorted.length)} / {sorted.length}{' '}
            sor
          </span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className={cn(
                'flex items-center justify-center h-8 w-8 rounded-[var(--radius-sm)]',
                'border border-[var(--color-border)] bg-[var(--color-surface)]',
                'transition-colors hover:bg-[var(--color-bg)] hover:border-[var(--color-border-strong)]',
                'disabled:opacity-40 disabled:pointer-events-none',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)]',
              )}
              aria-label="Előző oldal"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <span className="px-3 py-1 font-medium text-[var(--color-text)]">
              {page} / {totalPages}
            </span>

            <button
              type="button"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className={cn(
                'flex items-center justify-center h-8 w-8 rounded-[var(--radius-sm)]',
                'border border-[var(--color-border)] bg-[var(--color-surface)]',
                'transition-colors hover:bg-[var(--color-bg)] hover:border-[var(--color-border-strong)]',
                'disabled:opacity-40 disabled:pointer-events-none',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)]',
              )}
              aria-label="Következő oldal"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
