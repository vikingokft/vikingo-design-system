import { Check, Copy } from 'lucide-react'
import * as React from 'react'
import { cn } from '../../lib/utils'

export interface CopyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Text that will be written to the clipboard on click */
  value: string
  /** Button label in idle state (default: 'Másolás') */
  label?: string
  /** Button label after successful copy (default: 'Másolva!') */
  copiedLabel?: string
  /** How long (ms) to show the copied state before resetting (default: 2000) */
  timeout?: number
  /** Renders as a square icon-only button (h-8 w-8) without text */
  iconOnly?: boolean
}

/**
 * Button that copies a string to the clipboard via `navigator.clipboard`.
 * Shows a check icon for `timeout` ms after a successful copy, then resets.
 * Silently ignores clipboard permission errors.
 *
 * @example
 * <CopyButton value="npm install @vikingo/ui" />
 * <CopyButton value={apiKey} iconOnly />
 */
function CopyButton({
  value,
  label = 'Másolás',
  copiedLabel = 'Másolva!',
  timeout = 2000,
  iconOnly = false,
  className,
  disabled,
  ref,
  ...props
}: CopyButtonProps & { ref?: React.Ref<HTMLButtonElement> }) {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = async () => {
    if (copied) return
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), timeout)
    } catch {
      // clipboard access denied – silently fail
    }
  }

  return (
    <button
      ref={ref}
      type="button"
      aria-label={copied ? copiedLabel : label}
      onClick={handleCopy}
      disabled={disabled || copied}
      className={cn(
        'inline-flex items-center justify-center gap-1.5',
        'font-body font-medium text-sm rounded-[var(--radius-md)]',
        'transition-all duration-[var(--transition-fast)]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-2',
        'disabled:pointer-events-none',
        iconOnly ? 'h-8 w-8' : 'h-8 px-3',
        copied
          ? 'bg-[var(--color-success-muted)] text-[var(--color-success)] border border-[var(--color-success)]/30'
          : [
              'bg-[var(--color-surface)] text-[var(--color-text-muted)]',
              'border border-[var(--color-border)]',
              'hover:bg-[var(--color-bg)] hover:text-[var(--color-text)] hover:border-[var(--color-border-strong)]',
            ].join(' '),
        className,
      )}
      {...props}
    >
      {copied ? (
        <Check className="h-3.5 w-3.5 shrink-0" />
      ) : (
        <Copy className="h-3.5 w-3.5 shrink-0" />
      )}
      {!iconOnly && <span>{copied ? copiedLabel : label}</span>}
    </button>
  )
}

export { CopyButton }
