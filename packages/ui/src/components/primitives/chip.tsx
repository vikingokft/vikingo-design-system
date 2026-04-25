import { cva, type VariantProps } from 'class-variance-authority'
import { Check, X } from 'lucide-react'
import type React from 'react'
import { cn } from '../../utils/cn'

// ── Base chip variants ──────────────────────────────────────────────────────

const chipVariants = cva(
  [
    'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium',
    'border transition-all duration-[var(--transition-fast)] select-none',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]/40',
  ].join(' '),
  {
    variants: {
      variant: {
        // Assist chip: triggers an action related to primary content
        assist: [
          'bg-[var(--color-surface)] border-[var(--color-border)]',
          'text-[var(--color-text)] hover:bg-[var(--color-bg)]',
          'hover:border-[var(--color-border-strong)] hover:shadow-[var(--shadow-sm)]',
          'cursor-pointer active:scale-95',
        ].join(' '),

        // Filter chip: toggleable, shows checkmark when selected
        filter: [
          'bg-[var(--color-surface)] border-[var(--color-border)]',
          'text-[var(--color-text-muted)] hover:bg-[var(--color-bg)]',
          'hover:border-[var(--color-border-strong)]',
          'cursor-pointer active:scale-95',
        ].join(' '),

        // Input chip: represents a complex piece of information, can be removed
        input: [
          'bg-[var(--color-accent-muted)] border-[var(--color-accent)]/30',
          'text-[var(--color-accent)]',
        ].join(' '),

        // Suggestion chip: read-only predictive text
        suggestion: [
          'bg-[var(--color-surface)] border-[var(--color-border)]',
          'text-[var(--color-text)] hover:bg-[var(--color-bg)]',
          'hover:border-[var(--color-accent)] cursor-pointer active:scale-95',
        ].join(' '),
      },
      selected: {
        true: '',
        false: '',
      },
      disabled: {
        true: 'opacity-40 pointer-events-none',
        false: '',
      },
    },
    compoundVariants: [
      {
        variant: 'filter',
        selected: true,
        className: [
          'bg-[var(--color-accent-muted)] border-[var(--color-accent)]/50',
          'text-[var(--color-accent)]',
        ].join(' '),
      },
    ],
    defaultVariants: {
      variant: 'assist',
      selected: false,
      disabled: false,
    },
  },
)

// ── Chip ────────────────────────────────────────────────────────────────────

export interface ChipProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'disabled'>,
    VariantProps<typeof chipVariants> {
  icon?: React.ReactNode
  onRemove?: () => void
}

export function Chip({
  variant = 'assist',
  selected = false,
  disabled = false,
  icon,
  onRemove,
  children,
  className,
  onClick,
  ...props
}: ChipProps) {
  const isInteractive = variant !== 'input' || !!onClick
  const Tag = isInteractive ? 'button' : 'span'

  return (
    <Tag
      type={Tag === 'button' ? 'button' : undefined}
      disabled={disabled ?? undefined}
      onClick={onClick}
      className={cn(
        chipVariants({ variant, selected: selected ?? false, disabled: disabled ?? false }),
        className,
      )}
      {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {/* Show checkmark for selected filter chips */}
      {variant === 'filter' && selected && (
        <Check className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
      )}

      {/* Leading icon for assist/suggestion chips */}
      {icon && variant !== 'filter' && (
        <span className="shrink-0 text-[var(--color-text-muted)] [.text-\\[var\\(--color-accent\\)\\]_&]:text-current">
          {icon}
        </span>
      )}

      <span>{children}</span>

      {/* Remove button for input chips */}
      {variant === 'input' && onRemove && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onRemove()
          }}
          className={cn(
            'ml-0.5 -mr-1 shrink-0 rounded-full p-0.5',
            'hover:bg-[var(--color-accent)]/20 transition-colors',
            'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-accent)]',
          )}
          aria-label="Eltávolítás"
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </Tag>
  )
}

// ── ChipGroup ───────────────────────────────────────────────────────────────

export interface ChipGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  wrap?: boolean
}

export function ChipGroup({ wrap = true, className, children, ...props }: ChipGroupProps) {
  return (
    <div
      className={cn(
        'flex gap-2',
        wrap ? 'flex-wrap' : 'flex-nowrap overflow-x-auto scrollbar-none',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
