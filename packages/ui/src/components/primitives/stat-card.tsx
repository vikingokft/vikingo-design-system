import { Info, Minus, TrendingDown, TrendingUp } from 'lucide-react'
import type * as React from 'react'
import { cn } from '../../utils/cn'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './tooltip'

export interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string
  value: string | number
  /** Másodlagos érték a fő szám alatt, pl. "ARPU: 3.386 Ft" */
  sublabel?: string
  /** Tooltipben megjelenő magyarázó szöveg az ⓘ ikon mellett */
  tooltip?: string
  trend?: number
  trendLabel?: string
  period?: string
  icon?: React.ReactNode
  prefix?: string
  suffix?: string
  loading?: boolean
}

function StatCard({
  label,
  value,
  sublabel,
  tooltip,
  trend,
  trendLabel,
  period,
  icon,
  prefix,
  suffix,
  loading,
  className,
  ...props
}: StatCardProps) {
  const trendPositive = trend !== undefined && trend > 0
  const trendNegative = trend !== undefined && trend < 0
  const trendNeutral = trend !== undefined && trend === 0

  return (
    <div
      className={cn(
        'bg-[var(--color-surface)] rounded-[var(--radius-lg)]',
        'border border-[var(--color-border)] shadow-[var(--shadow-sm)]',
        'p-5 flex flex-col gap-3',
        'transition-all duration-[var(--transition-base)]',
        'hover:border-[var(--color-border-strong)] hover:shadow-[var(--shadow-md)]',
        className,
      )}
      {...props}
    >
      {/* Fejléc: label + tooltip ikon + jobb sarok ikon */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="text-sm font-body text-[var(--color-text-muted)] truncate">{label}</span>
          {tooltip && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    className="shrink-0 text-[var(--color-text-subtle)] hover:text-[var(--color-text-muted)] transition-colors cursor-help"
                    aria-label={`Információ: ${label}`}
                  >
                    <Info className="h-3.5 w-3.5" />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-xs">
                  <p>{tooltip}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        {icon && (
          <span className="shrink-0 text-[var(--color-text-subtle)] flex items-center">{icon}</span>
        )}
      </div>

      {loading ? (
        <div className="flex flex-col gap-2">
          <div className="h-8 w-32 rounded-[var(--radius-sm)] bg-[var(--color-border)] animate-pulse" />
          <div className="h-4 w-20 rounded-[var(--radius-sm)] bg-[var(--color-border)] animate-pulse" />
        </div>
      ) : (
        <>
          {/* Fő érték – DM Sans 700, nem Clash Display */}
          <div className="flex items-baseline gap-1 min-w-0">
            {prefix && (
              <span className="text-sm text-[var(--color-text-muted)] font-mono shrink-0">
                {prefix}
              </span>
            )}
            <span className="font-body font-bold text-xl sm:text-2xl text-[var(--color-text)] tracking-tight tabular-nums truncate">
              {value}
            </span>
            {suffix && (
              <span className="text-sm text-[var(--color-text-muted)] font-mono shrink-0">
                {suffix}
              </span>
            )}
          </div>

          {/* Másodlagos érték */}
          {sublabel && (
            <p className="text-xs text-[var(--color-text-muted)] font-mono -mt-1 truncate">
              {sublabel}
            </p>
          )}

          {/* Trend badge */}
          {trend !== undefined && (
            <div className="flex items-center gap-1.5 flex-wrap">
              <span
                className={cn(
                  'inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-[var(--radius-sm)]',
                  'text-xs font-mono font-medium shrink-0',
                  trendPositive && 'bg-[var(--color-success-muted)] text-[var(--color-success)]',
                  trendNegative && 'bg-[var(--color-error-muted)] text-[var(--color-error)]',
                  trendNeutral && 'bg-[var(--color-border)] text-[var(--color-text-muted)]',
                )}
              >
                {trendPositive && <TrendingUp className="h-3 w-3" />}
                {trendNegative && <TrendingDown className="h-3 w-3" />}
                {trendNeutral && <Minus className="h-3 w-3" />}
                {trendPositive && '+'}
                {String(trend).replace('.', ',')}%
              </span>
              {(trendLabel || period) && (
                <span className="text-xs text-[var(--color-text-subtle)]">
                  {trendLabel || period}
                </span>
              )}
            </div>
          )}
        </>
      )}
    </div>
  )
}

export { StatCard }
