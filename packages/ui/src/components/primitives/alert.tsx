import { cva, type VariantProps } from 'class-variance-authority'
import { AlertCircle, CheckCircle2, Info, TriangleAlert, X } from 'lucide-react'
import * as React from 'react'
import { cn } from '../../utils/cn'

const alertVariants = cva(
  ['relative flex gap-3 rounded-[var(--radius-lg)] border p-4', 'text-sm font-body'].join(' '),
  {
    variants: {
      variant: {
        info: [
          'bg-[var(--color-accent-muted)] border-[var(--color-accent)]/30',
          'text-[var(--color-text)]',
          '[&_[data-alert-icon]]:text-[var(--color-accent)]',
        ].join(' '),
        success: [
          'bg-[var(--color-success)]/8 border-[var(--color-success)]/30',
          'text-[var(--color-text)]',
          '[&_[data-alert-icon]]:text-[var(--color-success)]',
        ].join(' '),
        warning: [
          'bg-[var(--color-warning)]/8 border-[var(--color-warning)]/30',
          'text-[var(--color-text)]',
          '[&_[data-alert-icon]]:text-[var(--color-warning)]',
        ].join(' '),
        error: [
          'bg-[var(--color-error)]/8 border-[var(--color-error)]/30',
          'text-[var(--color-text)]',
          '[&_[data-alert-icon]]:text-[var(--color-error)]',
        ].join(' '),
      },
    },
    defaultVariants: {
      variant: 'info',
    },
  },
)

const iconMap = {
  info: Info,
  success: CheckCircle2,
  warning: TriangleAlert,
  error: AlertCircle,
}

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  /** Semantic color: `info` (default) · `success` · `warning` · `error` */
  variant?: 'info' | 'success' | 'warning' | 'error'
  /** Optional bold heading rendered above the body */
  title?: string
  /** When provided, renders an × close button. Called when clicked. */
  onClose?: () => void
  /** aria-label for the close button (default: 'Bezárás') */
  closeLabel?: string
}

/**
 * Inline feedback message with an icon, optional title, and optional close button.
 * Use for form-level errors, success confirmations, or informational notices.
 *
 * @example
 * <Alert variant="success" title="Mentés sikeres!">Az adatok elmentve.</Alert>
 * <Alert variant="error" onClose={() => setError(null)}>{error}</Alert>
 */
function Alert({
  className,
  variant = 'info',
  title,
  children,
  onClose,
  closeLabel = 'Bezárás',
  ...props
}: AlertProps) {
  const Icon = iconMap[variant ?? 'info']
  return (
    <div className={cn(alertVariants({ variant }), className)} role="alert" {...props}>
      <Icon className="h-4 w-4 mt-0.5 shrink-0" data-alert-icon="" />
      <div className="flex-1 min-w-0">
        {title && <p className="font-semibold mb-0.5">{title}</p>}
        {children && <div className="text-[var(--color-text-muted)]">{children}</div>}
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="shrink-0 text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
          aria-label={closeLabel}
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}

function AlertTitle({
  className,
  ref,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement> & { ref?: React.Ref<HTMLHeadingElement> }) {
  return (
    <h5
      ref={ref}
      className={cn('font-semibold leading-none tracking-tight', className)}
      {...props}
    />
  )
}

function AlertDescription({
  className,
  ref,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement> & { ref?: React.Ref<HTMLDivElement> }) {
  return (
    <div ref={ref} className={cn('text-sm text-[var(--color-text-muted)]', className)} {...props} />
  )
}

export { Alert, AlertTitle, AlertDescription }
