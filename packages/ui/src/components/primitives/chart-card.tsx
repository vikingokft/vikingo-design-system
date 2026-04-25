import type * as React from 'react'
import { cn } from '../../utils/cn'

export interface ChartCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description?: string
  /** Kiemelő érték a kártya jobb felső sarkában (pl. "5 827 289 Ft") */
  value?: string
  /** Minimális belső magasság a chart területnek */
  chartMinHeight?: number
  loading?: boolean
}

function ChartCard({
  title,
  description,
  value,
  chartMinHeight = 220,
  loading,
  children,
  className,
  ...props
}: ChartCardProps) {
  return (
    <div
      className={cn(
        'bg-[var(--color-surface)] rounded-[var(--radius-lg)]',
        'border border-[var(--color-border)] shadow-[var(--shadow-sm)]',
        'transition-all duration-[var(--transition-base)]',
        'hover:border-[var(--color-border-strong)] hover:shadow-[var(--shadow-md)]',
        'overflow-hidden',
        className,
      )}
      {...props}
    >
      {/* Fejléc */}
      <div className="flex items-start justify-between gap-4 p-5 pb-3">
        <div className="min-w-0">
          <h3 className="font-display font-semibold text-base text-[var(--color-text)] tracking-tight truncate">
            {title}
          </h3>
          {description && (
            <p className="mt-0.5 text-xs text-[var(--color-text-muted)]">{description}</p>
          )}
        </div>
        {value && (
          <span className="font-body font-bold text-xl text-[var(--color-accent)] shrink-0 tabular-nums">
            {value}
          </span>
        )}
      </div>

      {/* Chart terület */}
      <div
        className={cn('px-4 pb-4', loading && 'flex items-center justify-center')}
        style={{ minHeight: chartMinHeight }}
      >
        {loading ? (
          <div className="flex flex-col items-center gap-3">
            <div className="h-32 w-full rounded-[var(--radius-md)] bg-[var(--color-border)] animate-pulse" />
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  )
}

export { ChartCard }
