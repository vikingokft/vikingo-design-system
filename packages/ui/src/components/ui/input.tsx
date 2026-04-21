import * as React from 'react'
import { cn } from '../../lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Icon rendered inside the left edge of the field (pointer-events disabled) */
  leftIcon?: React.ReactNode
  /** Icon rendered inside the right edge of the field. Use for interactive icons (e.g. password toggle) via `pointer-events-auto` on the icon itself. */
  rightIcon?: React.ReactNode
  /** Applies error styling (red border + red hint text) */
  error?: boolean
  /** Helper text below the field. Rendered red when `error` is true. */
  hint?: string
  /** Label above the field. Linked to the input via `htmlFor`. */
  label?: string
}

/**
 * Single-line text input with optional label, hint, left/right icons, and error state.
 * Fully controlled or uncontrolled via React's standard `value`/`defaultValue` props.
 *
 * @example
 * <Input label="Email" type="email" placeholder="you@example.com" hint="Not shared publicly" />
 * <Input label="Password" type="password" error hint="Must be at least 8 characters." />
 */
function Input({
  className,
  type,
  leftIcon,
  rightIcon,
  error,
  hint,
  label,
  id,
  ref,
  ...props
}: InputProps & { ref?: React.Ref<HTMLInputElement> }) {
  const generatedId = React.useId()
  const inputId = id || generatedId

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-[var(--color-text)]">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {leftIcon && (
          <span className="absolute left-3 text-[var(--color-text-muted)] flex items-center pointer-events-none">
            {leftIcon}
          </span>
        )}
        <input
          id={inputId}
          type={type}
          className={cn(
            'flex h-10 w-full rounded-[var(--radius-md)]',
            'border border-[var(--color-border)]',
            'bg-[var(--color-surface)] text-[var(--color-text)]',
            'px-3 py-2 text-sm font-body',
            'placeholder:text-[var(--color-text-subtle)]',
            'transition-all duration-[var(--transition-fast)]',
            'hover:border-[var(--color-border-strong)]',
            'focus:outline-none focus:border-[var(--color-border-focus)] focus:ring-2 focus:ring-[var(--color-accent-muted)] focus:hover:border-[var(--color-border-focus)]',
            'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[var(--color-bg)] disabled:hover:border-[var(--color-border)]',
            error &&
              'border-[var(--color-error)] focus:border-[var(--color-error)] focus:ring-[var(--color-error-muted)]',
            leftIcon && 'pl-10',
            rightIcon && 'pr-10',
            className,
          )}
          ref={ref}
          {...props}
        />
        {rightIcon && (
          <span className="absolute right-3 text-[var(--color-text-muted)] flex items-center pointer-events-none">
            {rightIcon}
          </span>
        )}
      </div>
      {hint && (
        <p
          className={cn(
            'text-xs',
            error ? 'text-[var(--color-error)]' : 'text-[var(--color-text-muted)]',
          )}
        >
          {hint}
        </p>
      )}
    </div>
  )
}

export { Input }
