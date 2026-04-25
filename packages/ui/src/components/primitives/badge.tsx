import { cva, type VariantProps } from 'class-variance-authority'
import type * as React from 'react'
import { cn } from '../../utils/cn'

const badgeVariants = cva(
  [
    'inline-flex items-center gap-1.5 rounded-[var(--radius-full)]',
    'font-mono text-xs font-medium leading-none',
    'transition-colors',
  ].join(' '),
  {
    variants: {
      variant: {
        default:
          'bg-[var(--color-surface)] text-[var(--color-text)] border border-[var(--color-border)]',
        accent: 'bg-[var(--color-accent-muted)] text-[var(--color-accent)]',
        success: 'bg-[var(--color-success-muted)] text-[var(--color-success)]',
        warning: 'bg-[var(--color-warning-muted)] text-[var(--color-warning)]',
        error: 'bg-[var(--color-error-muted)] text-[var(--color-error)]',
        info: 'bg-[var(--color-info-muted)] text-[var(--color-info)]',
        solid: 'bg-[var(--color-accent)] text-white',
        dark: 'bg-[var(--sidebar-bg)] text-[var(--sidebar-text)]',
      },
      size: {
        sm: 'px-2 py-0.5 text-[10px]',
        md: 'px-2.5 py-1',
        lg: 'px-3 py-1.5 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  },
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  /**
   * Visual color variant.
   * - `default` — neutral bordered surface
   * - `accent` / `solid` — brand color (muted bg vs filled)
   * - `success` / `warning` / `error` / `info` — semantic status colors
   * - `dark` — sidebar-themed dark badge
   */
  variant?: 'default' | 'accent' | 'success' | 'warning' | 'error' | 'info' | 'solid' | 'dark'
  /** Size of the badge: `sm` · `md` (default) · `lg` */
  size?: 'sm' | 'md' | 'lg'
  /** Renders a small colored dot before the label — useful for status indicators */
  dot?: boolean
}

/**
 * Inline label for status, category, or count.
 * Uses monospace font; supports 8 color variants and an optional leading dot.
 *
 * @example
 * <Badge variant="success" dot>Aktív</Badge>
 * <Badge variant="error">Lejárt</Badge>
 */
function Badge({ className, variant, size, dot, children, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant, size, className }))} {...props}>
      {dot && <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />}
      {children}
    </span>
  )
}

export { Badge, badgeVariants }
