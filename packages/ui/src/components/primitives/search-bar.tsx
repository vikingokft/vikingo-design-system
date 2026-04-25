import { Loader2, Search as SearchIcon, X } from 'lucide-react'
import type React from 'react'
import { useId, useRef, useState } from 'react'
import { cn } from '../../utils/cn'

// ── SearchResult type ───────────────────────────────────────────────────────

export interface SearchResult {
  id: string
  label: string
  description?: string
  icon?: React.ReactNode
  category?: string
}

// ── Highlight helper ─────────────────────────────────────────────────────────

function HighlightText({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <>{text}</>
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
  const parts = text.split(regex)
  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark
            key={i}
            className="bg-[var(--color-accent-muted)] text-[var(--color-accent)] rounded-[2px] font-semibold not-italic"
          >
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  )
}

// ── SearchBar ───────────────────────────────────────────────────────────────

export interface SearchBarProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'onChange' | 'value' | 'size' | 'results'
  > {
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  onClear?: () => void
  /** Text shown when results is empty and there is a query */
  emptyText?: string
  /** Loading state (e.g. while searching) */
  loading?: boolean
  /** Search results for dropdown */
  results?: SearchResult[]
  /** Called when a result is selected */
  onResultSelect?: (result: SearchResult) => void
  /** Placeholder text */
  placeholder?: string
  /** aria-label for the clear button */
  clearLabel?: string
  /** Visual size */
  size?: 'sm' | 'md' | 'lg'
  /** Show as a full bar (rounded-full) or standard field */
  variant?: 'bar' | 'field'
}

export function SearchBar({
  value,
  defaultValue,
  onChange,
  onClear,
  loading = false,
  results,
  onResultSelect,
  placeholder = 'Keresés...',
  clearLabel = 'Keresés törlése',
  emptyText = 'Nincs találat',
  size = 'md',
  variant = 'field',
  className,
  onFocus,
  onBlur,
  ...props
}: SearchBarProps) {
  const id = useId()
  const [internalValue, setInternalValue] = useState(defaultValue ?? '')
  const [focused, setFocused] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)

  const controlled = value !== undefined
  const currentValue = controlled ? value : internalValue

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!controlled) setInternalValue(e.target.value)
    onChange?.(e.target.value)
    setActiveIndex(-1)
  }

  function handleClear() {
    if (!controlled) setInternalValue('')
    onChange?.('')
    onClear?.()
    inputRef.current?.focus()
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!results?.length) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex((i) => Math.min(i + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex((i) => Math.max(i - 1, 0))
    } else if (e.key === 'Enter' && activeIndex >= 0) {
      e.preventDefault()
      onResultSelect?.(results[activeIndex])
      setFocused(false)
    } else if (e.key === 'Escape') {
      setFocused(false)
    }
  }

  // Show dropdown if focused, results prop is provided, and there's a query
  const hasQuery = currentValue.length > 0
  const showDropdown = focused && results !== undefined && hasQuery && !loading

  const sizeClasses = {
    sm: 'h-8 text-xs px-3',
    md: 'h-10 text-sm px-4',
    lg: 'h-12 text-base px-5',
  }

  const iconSizes = {
    sm: 'h-3.5 w-3.5',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
  }

  const iconOffsets = {
    sm: 'left-2.5',
    md: 'left-3',
    lg: 'left-4',
  }

  const paddingLeft = {
    sm: 'pl-8',
    md: 'pl-10',
    lg: 'pl-12',
  }

  const paddingRight = {
    sm: currentValue ? 'pr-8' : 'pr-3',
    md: currentValue ? 'pr-10' : 'pr-4',
    lg: currentValue ? 'pr-12' : 'pr-5',
  }

  return (
    <div className={cn('relative', className)}>
      {/* Search icon / spinner */}
      <span
        className={cn(
          'absolute top-1/2 -translate-y-1/2 pointer-events-none text-[var(--color-text-muted)]',
          iconOffsets[size],
        )}
      >
        {loading ? (
          <Loader2 className={cn(iconSizes[size], 'animate-spin text-[var(--color-accent)]')} />
        ) : (
          <SearchIcon className={iconSizes[size]} />
        )}
      </span>

      <input
        ref={inputRef}
        id={id}
        type="search"
        role="combobox"
        aria-autocomplete="list"
        aria-expanded={showDropdown}
        autoComplete="off"
        value={currentValue}
        placeholder={placeholder}
        onChange={handleChange}
        onFocus={(e) => {
          setFocused(true)
          onFocus?.(e)
        }}
        onBlur={(e) => {
          setTimeout(() => setFocused(false), 150)
          onBlur?.(e)
        }}
        onKeyDown={handleKeyDown}
        className={cn(
          'w-full bg-[var(--color-surface)] border border-[var(--color-border)]',
          'text-[var(--color-text)] placeholder:text-[var(--color-text-subtle)]',
          'transition-all outline-none',
          'focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20',
          sizeClasses[size],
          paddingLeft[size],
          paddingRight[size],
          variant === 'bar' ? 'rounded-full' : 'rounded-[var(--radius-md)]',
          // Hide native clear button in webkit
          '[&::-webkit-search-cancel-button]:appearance-none',
        )}
        {...props}
      />

      {/* Clear button */}
      {currentValue && !loading && (
        <button
          type="button"
          onClick={handleClear}
          aria-label={clearLabel}
          className={cn(
            'absolute top-1/2 -translate-y-1/2 right-3 text-[var(--color-text-muted)]',
            'hover:text-[var(--color-text)] transition-colors rounded-full p-0.5',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]/40',
          )}
        >
          <X className={iconSizes[size]} />
        </button>
      )}

      {/* Dropdown results */}
      {showDropdown && (
        <div
          role="listbox"
          className={cn(
            'absolute z-50 left-0 right-0 top-full mt-1',
            'rounded-[var(--radius-lg)] border border-[var(--color-border)]',
            'bg-[var(--color-surface)] shadow-[var(--shadow-lg)]',
            'overflow-hidden',
          )}
        >
          {results?.length === 0 ? (
            <div className="px-3 py-4 text-center text-sm text-[var(--color-text-subtle)]">
              {emptyText}
            </div>
          ) : (
            (() => {
              const grouped = results?.reduce<Record<string, SearchResult[]>>((acc, r) => {
                const cat = r.category ?? ''
                acc[cat] ??= []
                acc[cat].push(r)
                return acc
              }, {})

              let globalIndex = 0

              return Object.entries(grouped).map(([cat, items]) => (
                <div key={cat}>
                  {cat && (
                    <div className="px-3 pt-2 pb-1 text-[10px] font-mono uppercase tracking-widest text-[var(--color-text-subtle)]">
                      {cat}
                    </div>
                  )}
                  {items.map((result) => {
                    const idx = globalIndex++
                    const isActive = idx === activeIndex
                    return (
                      <button
                        key={result.id}
                        type="button"
                        role="option"
                        aria-selected={isActive}
                        onMouseDown={(e) => {
                          e.preventDefault()
                          onResultSelect?.(result)
                          setFocused(false)
                        }}
                        className={cn(
                          'w-full flex items-center gap-3 px-3 py-2 text-left transition-colors',
                          'focus-visible:outline-none',
                          isActive
                            ? 'bg-[var(--color-accent-muted)] text-[var(--color-accent)]'
                            : 'hover:bg-[var(--color-bg)] text-[var(--color-text)]',
                        )}
                      >
                        {result.icon && (
                          <span className="shrink-0 text-[var(--color-text-muted)]">
                            {result.icon}
                          </span>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">
                            <HighlightText text={result.label} query={currentValue} />
                          </p>
                          {result.description && (
                            <p className="text-xs text-[var(--color-text-muted)] truncate">
                              {result.description}
                            </p>
                          )}
                        </div>
                      </button>
                    )
                  })}
                </div>
              ))
            })()
          )}
        </div>
      )}
    </div>
  )
}
