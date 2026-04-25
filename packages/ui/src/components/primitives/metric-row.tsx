import type * as React from 'react'
import { cn } from '../../utils/cn'

export interface MetricRowProps extends React.HTMLAttributes<HTMLDivElement> {
  /** CSS szín, pl. "var(--color-success)" vagy "#FF544D" */
  color: string
  label: string
  sublabel?: string
  value: string | number
}

function MetricRow({ color, label, sublabel, value, className, ...props }: MetricRowProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-3 py-3.5',
        'border-b border-[var(--color-border)] last:border-0',
        className,
      )}
      {...props}
    >
      {/* Szín-jelző */}
      <div
        className="shrink-0 w-1 h-8 rounded-[var(--radius-full)]"
        style={{ backgroundColor: color }}
        aria-hidden="true"
      />

      {/* Label + sublabel */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-[var(--color-text)] truncate">{label}</p>
        {sublabel && (
          <p className="text-xs text-[var(--color-text-muted)] truncate mt-0.5">{sublabel}</p>
        )}
      </div>

      {/* Érték */}
      <span className="font-body font-bold text-xl text-[var(--color-text)] tabular-nums shrink-0">
        {value}
      </span>
    </div>
  )
}

export { MetricRow }
