import * as React from 'react'
import { cn } from '../../utils/cn'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  hint?: string
  error?: string
}

function Textarea({
  className,
  label,
  hint,
  error,
  id,
  ref,
  ...props
}: TextareaProps & { ref?: React.Ref<HTMLTextAreaElement> }) {
  const generatedId = React.useId()
  const inputId = id ?? generatedId
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium font-body text-[var(--color-text)]">
          {label}
        </label>
      )}
      <textarea
        id={inputId}
        ref={ref}
        className={cn(
          'flex min-h-[96px] w-full resize-y',
          'rounded-[var(--radius-md)] border px-3 py-2',
          'text-sm font-body text-[var(--color-text)]',
          'bg-[var(--color-surface)]',
          'placeholder:text-[var(--color-text-subtle)]',
          'transition-colors duration-[var(--transition-fast)]',
          'focus:outline-none focus:ring-2 focus:ring-offset-0',
          error
            ? 'border-[var(--color-error)] focus:border-[var(--color-error)] focus:ring-[var(--color-error)]/20'
            : 'border-[var(--color-border)] focus:border-[var(--color-border-focus)] focus:ring-[var(--color-accent-muted)]',
          'disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
        {...props}
      />
      {error && (
        <p id={`${inputId}-error`} className="text-xs text-[var(--color-error)]">
          {error}
        </p>
      )}
      {!error && hint && (
        <p id={`${inputId}-hint`} className="text-xs text-[var(--color-text-muted)]">
          {hint}
        </p>
      )}
    </div>
  )
}

export { Textarea }
