import * as DialogPrimitive from '@radix-ui/react-dialog'
import { Search, X } from 'lucide-react'
import * as React from 'react'
import { cn } from '../../utils/cn'

// ── Context ──────────────────────────────────────────────────────────────────

interface CommandPaletteContextValue {
  query: string
  setQuery: (q: string) => void
  close: () => void
}

const CommandPaletteContext = React.createContext<CommandPaletteContextValue>(
  {} as CommandPaletteContextValue,
)

// ── CommandPalette (root) ────────────────────────────────────────────────────

export interface CommandPaletteProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  /** The trigger element that opens the palette (e.g. `<CommandPaletteTrigger />`) */
  trigger?: React.ReactNode
  children: React.ReactNode
  /** Placeholder text in the search input */
  placeholder?: string
}

function CommandPalette({
  open,
  onOpenChange,
  trigger,
  children,
  placeholder = 'Keresés…',
}: CommandPaletteProps) {
  const [query, setQuery] = React.useState('')

  function handleOpenChange(next: boolean) {
    if (!next) setQuery('')
    onOpenChange?.(next)
  }

  return (
    <CommandPaletteContext.Provider
      value={{ query, setQuery, close: () => handleOpenChange(false) }}
    >
      <DialogPrimitive.Root open={open} onOpenChange={handleOpenChange}>
        {trigger}
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay
            className={cn(
              'fixed inset-0 z-50 bg-black/50 backdrop-blur-sm',
              'data-[state=open]:animate-in data-[state=closed]:animate-out',
              'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
            )}
          />
          <DialogPrimitive.Content
            aria-label="Keresés"
            className={cn(
              'fixed left-1/2 top-[15%] z-50 -translate-x-1/2',
              'w-[calc(100%-2rem)] max-w-xl',
              'rounded-[var(--radius-xl)] border border-[var(--color-border)]',
              'bg-[var(--color-surface)] shadow-[var(--shadow-xl)]',
              'data-[state=open]:animate-in data-[state=closed]:animate-out',
              'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
              'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
              'data-[state=closed]:slide-out-to-top-4 data-[state=open]:slide-in-from-top-4',
              'duration-200',
            )}
          >
            {/* Search input */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-[var(--color-border)]">
              <Search
                className="h-4 w-4 text-[var(--color-text-muted)] shrink-0"
                aria-hidden="true"
              />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={placeholder}
                className={cn(
                  'flex-1 bg-transparent text-sm text-[var(--color-text)]',
                  'placeholder:text-[var(--color-text-subtle)]',
                  'outline-none',
                )}
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
                  aria-label="Keresés törlése"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
              <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded border border-[var(--color-border)] bg-[var(--color-bg)] px-1.5 py-0.5 text-[10px] font-mono text-[var(--color-text-muted)]">
                Esc
              </kbd>
            </div>

            {/* Content */}
            <div className="max-h-[60vh] overflow-y-auto p-2">{children}</div>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    </CommandPaletteContext.Provider>
  )
}

// ── useCommandPalette ─────────────────────────────────────────────────────────

function useCommandPalette() {
  return React.useContext(CommandPaletteContext)
}

// ── CommandGroup ─────────────────────────────────────────────────────────────

export interface CommandGroupProps {
  label?: string
  children: React.ReactNode
  className?: string
}

function CommandGroup({ label, children, className }: CommandGroupProps) {
  return (
    <div className={cn('mb-1', className)}>
      {label && (
        <p className="px-3 py-1.5 text-[10px] font-mono font-semibold uppercase tracking-wider text-[var(--color-text-subtle)]">
          {label}
        </p>
      )}
      {children}
    </div>
  )
}

// ── CommandItem ──────────────────────────────────────────────────────────────

export interface CommandItemProps {
  /** The text used for filtering */
  value: string
  /** Called when the item is selected */
  onSelect?: () => void
  /** Left icon */
  icon?: React.ReactNode
  /** Right hint / shortcut */
  hint?: string
  children?: React.ReactNode
  className?: string
  disabled?: boolean
}

function CommandItem({
  value,
  onSelect,
  icon,
  hint,
  children,
  className,
  disabled,
}: CommandItemProps) {
  const { query, close } = useCommandPalette()

  const matches = !query || value.toLowerCase().includes(query.toLowerCase())
  if (!matches) return null

  function handleSelect() {
    if (disabled) return
    onSelect?.()
    close()
  }

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={handleSelect}
      className={cn(
        'flex items-center gap-3 w-full px-3 py-2.5 rounded-[var(--radius-md)]',
        'text-sm text-[var(--color-text)] text-left',
        'transition-colors duration-[var(--transition-fast)]',
        'hover:bg-[var(--color-bg)] focus-visible:outline-none focus-visible:bg-[var(--color-bg)]',
        'disabled:opacity-50 disabled:pointer-events-none',
        className,
      )}
    >
      {icon && (
        <span className="h-4 w-4 text-[var(--color-text-muted)] shrink-0 flex items-center justify-center">
          {icon}
        </span>
      )}
      <span className="flex-1 min-w-0 truncate">{children ?? value}</span>
      {hint && (
        <kbd className="shrink-0 text-[10px] font-mono text-[var(--color-text-subtle)] bg-[var(--color-bg)] border border-[var(--color-border)] rounded px-1.5 py-0.5">
          {hint}
        </kbd>
      )}
    </button>
  )
}

// ── CommandSeparator ─────────────────────────────────────────────────────────

function CommandSeparator({ className }: { className?: string }) {
  return <div className={cn('my-1 border-t border-[var(--color-border)]', className)} />
}

// ── CommandEmpty ─────────────────────────────────────────────────────────────

export interface CommandEmptyProps {
  children?: React.ReactNode
}

function CommandEmpty({ children = 'Nincs találat.' }: CommandEmptyProps) {
  const { query } = useCommandPalette()
  if (!query) return null
  return <p className="px-3 py-6 text-sm text-center text-[var(--color-text-muted)]">{children}</p>
}

// ── CommandPaletteTrigger ────────────────────────────────────────────────────

function CommandPaletteTrigger({
  children,
  className,
}: {
  children?: React.ReactNode
  className?: string
}) {
  return (
    <DialogPrimitive.Trigger asChild>
      {children ?? (
        <button
          type="button"
          className={cn(
            'flex items-center gap-2 px-3 py-1.5 rounded-[var(--radius-md)]',
            'border border-[var(--color-border)] bg-[var(--color-surface)]',
            'text-sm text-[var(--color-text-muted)]',
            'hover:border-[var(--color-border-strong)] hover:text-[var(--color-text)]',
            'transition-all duration-[var(--transition-fast)]',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)]',
            className,
          )}
        >
          <Search className="h-3.5 w-3.5" />
          <span>Keresés…</span>
          <kbd className="hidden sm:inline-flex items-center gap-0.5 ml-2 rounded border border-[var(--color-border)] bg-[var(--color-bg)] px-1 py-0.5 text-[10px] font-mono">
            ⌘K
          </kbd>
        </button>
      )}
    </DialogPrimitive.Trigger>
  )
}

export {
  CommandPalette,
  CommandPaletteTrigger,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandEmpty,
  useCommandPalette,
}
