import * as PopoverPrimitive from '@radix-ui/react-popover'
import { Check, ChevronsUpDown, Search } from 'lucide-react'
import * as React from 'react'
import { cn } from '../../utils/cn'

// ── Types ────────────────────────────────────────────────────────────────────

export interface ComboboxOption {
  value: string
  label: string
  icon?: React.ReactNode
  disabled?: boolean
}

/**
 * Searchable single or multi-select dropdown built on Radix Popover.
 * Supports keyboard navigation, option icons, and disabled options.
 *
 * @example
 * // Single select
 * <Combobox options={platforms} value={val} onChange={setVal} placeholder="Válassz platformot" />
 *
 * // Multi select
 * <Combobox multiple options={countries} value={vals} onChange={setVals} />
 */
export interface ComboboxProps {
  /** List of selectable options */
  options: ComboboxOption[]
  /** Controlled selected value(s). String for single, string[] for `multiple`. */
  value?: string | string[]
  /** Called with the new value(s) on each selection change */
  onChange?: (value: string | string[]) => void
  /** Trigger button label when nothing is selected (default: 'Válassz...') */
  placeholder?: string
  /** Placeholder inside the search input (default: 'Keresés...') */
  searchPlaceholder?: string
  /** Text shown when the search query returns no results (default: 'Nincs találat') */
  emptyText?: string
  /** Returns the trigger label when multiple items are selected, e.g. (n) => `${n} selected` */
  selectedCountLabel?: (count: number) => string
  /** Enables multi-select mode — `value` and `onChange` use `string[]` */
  multiple?: boolean
  disabled?: boolean
  className?: string
  /** Size of the trigger button: `sm` · `md` (default) · `lg` */
  size?: 'sm' | 'md' | 'lg'
}

const sizeClasses = {
  sm: 'h-8 text-xs px-3',
  md: 'h-10 text-sm px-4',
  lg: 'h-12 text-base px-4',
}

// ── Component ────────────────────────────────────────────────────────────────

export function Combobox({
  options,
  value,
  onChange,
  placeholder = 'Válassz...',
  searchPlaceholder = 'Keresés...',
  emptyText = 'Nincs találat',
  selectedCountLabel = (count) => `${count} kiválasztva`,
  multiple = false,
  disabled = false,
  className,
  size = 'md',
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState('')
  const searchRef = React.useRef<HTMLInputElement>(null)

  const selected: string[] = Array.isArray(value) ? value : value !== undefined ? [value] : []

  const filtered = React.useMemo(() => {
    if (!query.trim()) return options
    const q = query.toLowerCase()
    return options.filter((o) => o.label.toLowerCase().includes(q))
  }, [options, query])

  function toggle(optValue: string) {
    if (multiple) {
      const next = selected.includes(optValue)
        ? selected.filter((v) => v !== optValue)
        : [...selected, optValue]
      onChange?.(next)
    } else {
      onChange?.(optValue)
      setOpen(false)
      setQuery('')
    }
  }

  // Display label
  const displayLabel = React.useMemo(() => {
    if (selected.length === 0) return null
    if (selected.length === 1) {
      return options.find((o) => o.value === selected[0])?.label
    }
    return selectedCountLabel(selected.length)
  }, [selected, options, selectedCountLabel])

  return (
    <PopoverPrimitive.Root
      open={open}
      onOpenChange={(v) => {
        setOpen(v)
        if (!v) setQuery('')
      }}
    >
      <PopoverPrimitive.Trigger asChild>
        <button
          type="button"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className={cn(
            'flex items-center justify-between w-full gap-2',
            'bg-[var(--color-surface)] border border-[var(--color-border)]',
            'rounded-[var(--radius-md)] text-left',
            'transition-all outline-none',
            'focus-visible:border-[var(--color-accent)] focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]/20',
            'hover:border-[var(--color-border-strong)]',
            'disabled:opacity-50 disabled:pointer-events-none',
            sizeClasses[size],
            className,
          )}
        >
          <span
            className={cn('truncate flex-1', !displayLabel && 'text-[var(--color-text-subtle)]')}
          >
            {displayLabel ?? placeholder}
          </span>
          <ChevronsUpDown className="h-4 w-4 shrink-0 text-[var(--color-text-muted)]" />
        </button>
      </PopoverPrimitive.Trigger>

      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          align="start"
          sideOffset={4}
          className={cn(
            'z-50 w-[var(--radix-popover-trigger-width)] min-w-[200px]',
            'rounded-[var(--radius-lg)] border border-[var(--color-border)]',
            'bg-[var(--color-surface)] shadow-[var(--shadow-lg)]',
            'overflow-hidden',
            'data-[state=open]:animate-in data-[state=closed]:animate-out',
            'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
            'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
          )}
          onOpenAutoFocus={(e) => {
            e.preventDefault()
            searchRef.current?.focus()
          }}
        >
          {/* Search input */}
          <div className="flex items-center gap-2 px-3 py-2 border-b border-[var(--color-border)]">
            <Search className="h-3.5 w-3.5 shrink-0 text-[var(--color-text-muted)]" />
            <input
              ref={searchRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={searchPlaceholder}
              className={cn(
                'flex-1 text-sm bg-transparent outline-none',
                'text-[var(--color-text)] placeholder:text-[var(--color-text-subtle)]',
              )}
            />
          </div>

          {/* Options list */}
          <div className="max-h-60 overflow-y-auto py-1" role="listbox">
            {filtered.length === 0 ? (
              <div className="px-3 py-4 text-center text-sm text-[var(--color-text-subtle)]">
                {emptyText}
              </div>
            ) : (
              filtered.map((option) => {
                const isSelected = selected.includes(option.value)
                return (
                  <button
                    key={option.value}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    disabled={option.disabled}
                    onClick={() => toggle(option.value)}
                    className={cn(
                      'w-full flex items-center gap-2.5 px-3 py-2 text-sm text-left',
                      'transition-colors focus-visible:outline-none',
                      'disabled:opacity-40 disabled:pointer-events-none',
                      isSelected
                        ? 'bg-[var(--color-accent-muted)] text-[var(--color-accent)]'
                        : 'text-[var(--color-text)] hover:bg-[var(--color-bg)]',
                    )}
                  >
                    {multiple && (
                      <span
                        className={cn(
                          'flex h-4 w-4 shrink-0 items-center justify-center rounded-[var(--radius-sm)] border',
                          isSelected
                            ? 'border-[var(--color-accent)] bg-[var(--color-accent)]'
                            : 'border-[var(--color-border-strong)]',
                        )}
                      >
                        {isSelected && <Check className="h-2.5 w-2.5 text-white" />}
                      </span>
                    )}
                    {option.icon && <span className="shrink-0">{option.icon}</span>}
                    <span className="flex-1 truncate">{option.label}</span>
                    {!multiple && isSelected && <Check className="h-3.5 w-3.5 shrink-0" />}
                  </button>
                )
              })
            )}
          </div>
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  )
}
