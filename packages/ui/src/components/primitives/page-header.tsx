import { Clock } from 'lucide-react'
import type * as React from 'react'
import { cn } from '../../utils/cn'

export interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description?: string
  /** Platform ikon vagy logó a cím mellett */
  icon?: React.ReactNode
  /** Pl. <PeriodFilter /> */
  periodFilter?: React.ReactNode
  /** Utolsó frissítés időpontja, pl. "12:36:14" */
  lastUpdated?: string
  /** Extra akciógombok jobb oldalon */
  actions?: React.ReactNode
}

function PageHeader({
  title,
  description,
  icon,
  periodFilter,
  lastUpdated,
  actions,
  className,
  ...props
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between',
        'pb-6 mb-6 border-b border-[var(--color-border)]',
        className,
      )}
      {...props}
    >
      {/* Bal: ikon + cím + alcím */}
      <div className="flex items-start gap-3 min-w-0">
        {icon && (
          <div className="shrink-0 flex items-center justify-center h-10 w-10 rounded-[var(--radius-lg)] overflow-hidden">
            {icon}
          </div>
        )}
        <div className="min-w-0">
          <h1 className="font-display font-semibold text-xl sm:text-2xl text-[var(--color-text)] tracking-tight truncate">
            {title}
          </h1>
          {description && (
            <p className="mt-0.5 text-sm text-[var(--color-text-muted)]">{description}</p>
          )}
        </div>
      </div>

      {/* Jobb: időszak-szűrő + utolsó frissítés + akciók */}
      <div className="flex flex-col items-start sm:items-end gap-2 shrink-0">
        <div className="flex items-center gap-3 flex-wrap">
          {periodFilter}
          {actions}
        </div>
        {lastUpdated && (
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-[var(--color-text-subtle)]">
            <Clock className="h-3 w-3" />
            <span>Utoljára frissítve: {lastUpdated}</span>
          </div>
        )}
      </div>
    </div>
  )
}

export { PageHeader }
