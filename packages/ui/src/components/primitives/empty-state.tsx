import type * as React from 'react'
import { cn } from '../../utils/cn'

export interface EmptyStateProps {
  icon?: React.ReactNode
  title: string
  description?: string
  action?: React.ReactNode
  variant?: 'default' | 'compact'
  className?: string
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  variant = 'default',
  className,
}: EmptyStateProps) {
  if (variant === 'compact') {
    return (
      <div
        className={cn(
          'flex items-center gap-3 py-4 px-2 text-[var(--color-text-muted)]',
          className,
        )}
      >
        {icon && <span className="shrink-0 opacity-50">{icon}</span>}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-[var(--color-text-subtle)]">{title}</p>
          {description && <p className="text-xs mt-0.5">{description}</p>}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
    )
  }

  return (
    <div
      className={cn('flex flex-col items-center justify-center text-center py-12 px-6', className)}
    >
      {icon && (
        <div className="mb-4 rounded-full bg-[var(--color-bg)] border border-[var(--color-border)] p-4 text-[var(--color-text-muted)]">
          {icon}
        </div>
      )}
      <h3 className="font-display font-semibold text-base text-[var(--color-text)] mb-1">
        {title}
      </h3>
      {description && (
        <p className="text-sm text-[var(--color-text-muted)] max-w-xs">{description}</p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  )
}
