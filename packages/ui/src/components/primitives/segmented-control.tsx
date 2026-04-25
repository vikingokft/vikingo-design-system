import * as React from 'react'
import { cn } from '../../utils/cn'

// ── Types ─────────────────────────────────────────────────────────────────────

export interface SegmentedOption {
  value: string
  /** Text label — optional if `icon` is provided */
  label?: string
  /** Icon rendered before the label */
  icon?: React.ReactNode
  disabled?: boolean
}

export interface SegmentedControlProps {
  /** List of options to display as segments */
  options: SegmentedOption[]
  /** Controlled selected value */
  value?: string
  /** Initial value for uncontrolled usage */
  defaultValue?: string
  /** Called with the new value on selection change */
  onChange?: (value: string) => void
  /** Size of each segment: `sm` · `md` (default) · `lg` */
  size?: 'sm' | 'md' | 'lg'
  /** Disables all segments */
  disabled?: boolean
  className?: string
}

const sizeClasses = {
  sm: 'h-8 px-3 text-xs gap-1',
  md: 'h-10 px-3.5 text-sm gap-1.5',
  lg: 'h-12 px-4 text-base gap-2',
}

const iconSizes = {
  sm: 'h-3.5 w-3.5',
  md: 'h-4 w-4',
  lg: 'h-5 w-5',
}

/**
 * Toggle group of mutually exclusive options displayed as connected segments.
 * Useful for switching views, selecting sizes, or toggling modes.
 * Supports icons, labels, or icon+label combinations.
 *
 * @example
 * <SegmentedControl
 *   options={[{ value: 'list', icon: <List />, label: 'Lista' }, { value: 'grid', icon: <Grid />, label: 'Rács' }]}
 *   value={view}
 *   onChange={setView}
 * />
 */
export function SegmentedControl({
  options,
  value,
  defaultValue,
  onChange,
  size = 'md',
  disabled = false,
  className,
  ref,
}: SegmentedControlProps & { ref?: React.Ref<HTMLDivElement> }) {
  const isControlled = value !== undefined
  const [internalValue, setInternalValue] = React.useState<string>(
    defaultValue ?? options[0]?.value ?? '',
  )
  const current = isControlled ? value : internalValue

  function select(val: string) {
    if (!isControlled) setInternalValue(val)
    onChange?.(val)
  }

  return (
    <div
      ref={ref}
      role="group"
      className={cn(
        'inline-flex items-center p-1 gap-1',
        'rounded-[var(--radius-md)] border border-[var(--color-border)]',
        'bg-[var(--color-bg)]',
        disabled && 'opacity-50 pointer-events-none',
        className,
      )}
    >
      {options.map((opt) => {
        const isActive = current === opt.value
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={isActive}
            disabled={disabled || opt.disabled}
            onClick={() => select(opt.value)}
            className={cn(
              'inline-flex items-center justify-center font-medium font-body',
              'rounded-[var(--radius-sm)] whitespace-nowrap',
              'transition-all duration-[var(--transition-fast)]',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)]',
              'disabled:pointer-events-none disabled:opacity-40',
              sizeClasses[size],
              isActive
                ? 'bg-[var(--color-surface)] text-[var(--color-text)] shadow-[var(--shadow-sm)]'
                : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface)]/50',
            )}
          >
            {opt.icon && <span className={cn('shrink-0', iconSizes[size])}>{opt.icon}</span>}
            {opt.label && <span>{opt.label}</span>}
          </button>
        )
      })}
    </div>
  )
}
