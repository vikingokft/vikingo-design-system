import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'

const spinnerVariants = cva(
  'inline-block animate-spin rounded-full border-2 border-solid border-current border-r-transparent',
  {
    variants: {
      size: {
        xs: 'h-3 w-3 border-[1.5px]',
        sm: 'h-4 w-4',
        md: 'h-6 w-6',
        lg: 'h-8 w-8 border-[3px]',
        xl: 'h-12 w-12 border-4',
      },
      variant: {
        accent: 'text-[var(--color-accent)]',
        muted: 'text-[var(--color-text-muted)]',
        white: 'text-white',
        success: 'text-[var(--color-success)]',
        warning: 'text-[var(--color-warning)]',
        error: 'text-[var(--color-error)]',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'accent',
    },
  },
)

export interface SpinnerProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof spinnerVariants> {
  label?: string
  ariaLabel?: string
}

import type React from 'react'

export function Spinner({
  size,
  variant,
  label,
  ariaLabel = 'Betöltés...',
  className,
  ...props
}: SpinnerProps) {
  return (
    <span
      role="status"
      aria-label={label ?? ariaLabel}
      className={cn('inline-flex items-center gap-2', className)}
      {...props}
    >
      <span className={spinnerVariants({ size, variant })} aria-hidden="true" />
      {label && <span className="text-sm text-[var(--color-text-muted)]">{label}</span>}
    </span>
  )
}
