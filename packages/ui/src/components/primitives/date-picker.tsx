import * as PopoverPrimitive from '@radix-ui/react-popover'
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react'
import { useId, useState } from 'react'
import { cn } from '../../utils/cn'

// ── Helpers ─────────────────────────────────────────────────────────────────

const MONTHS = [
  'Január',
  'Február',
  'Március',
  'Április',
  'Május',
  'Június',
  'Július',
  'Augusztus',
  'Szeptember',
  'Október',
  'November',
  'December',
]

const DAYS = ['H', 'K', 'Sz', 'Cs', 'P', 'Sz', 'V']

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year: number, month: number) {
  // Monday=0 ... Sunday=6
  const day = new Date(year, month, 1).getDay()
  return (day + 6) % 7
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

function formatDate(date: Date | null): string {
  if (!date) return ''
  return date.toLocaleDateString('hu-HU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function formatISO(date: Date | null): string {
  if (!date) return ''
  return date.toISOString().slice(0, 10)
}

// ── Calendar Grid ───────────────────────────────────────────────────────────

interface CalendarGridProps {
  selected: Date | null
  onSelect: (date: Date) => void
  min?: Date
  max?: Date
}

function CalendarGrid({ selected, onSelect, min, max }: CalendarGridProps) {
  const today = new Date()
  const [viewYear, setViewYear] = useState(selected?.getFullYear() ?? today.getFullYear())
  const [viewMonth, setViewMonth] = useState(selected?.getMonth() ?? today.getMonth())

  const daysInMonth = getDaysInMonth(viewYear, viewMonth)
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth)

  function prevMonth() {
    if (viewMonth === 0) {
      setViewYear((y) => y - 1)
      setViewMonth(11)
    } else setViewMonth((m) => m - 1)
  }

  function nextMonth() {
    if (viewMonth === 11) {
      setViewYear((y) => y + 1)
      setViewMonth(0)
    } else setViewMonth((m) => m + 1)
  }

  function isDisabled(day: number) {
    const d = new Date(viewYear, viewMonth, day)
    if (min && d < min) return true
    if (max && d > max) return true
    return false
  }

  // Build cell array: nulls for leading empty cells, then day numbers
  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ]

  return (
    <div className="p-3 w-[280px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <button
          type="button"
          onClick={prevMonth}
          className="h-7 w-7 rounded-[var(--radius-md)] flex items-center justify-center text-[var(--color-text-muted)] hover:bg-[var(--color-bg)] hover:text-[var(--color-text)] transition-colors"
          aria-label="Előző hónap"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <span className="text-sm font-semibold text-[var(--color-text)] font-display">
          {viewYear}. {MONTHS[viewMonth]}
        </span>
        <button
          type="button"
          onClick={nextMonth}
          className="h-7 w-7 rounded-[var(--radius-md)] flex items-center justify-center text-[var(--color-text-muted)] hover:bg-[var(--color-bg)] hover:text-[var(--color-text)] transition-colors"
          aria-label="Következő hónap"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 mb-1">
        {DAYS.map((d, i) => (
          <div
            key={i}
            className="h-8 flex items-center justify-center text-xs font-medium text-[var(--color-text-muted)]"
          >
            {d}
          </div>
        ))}
      </div>

      {/* Day cells */}
      <div className="grid grid-cols-7 gap-y-0.5">
        {cells.map((day, i) => {
          if (day === null) return <div key={`empty-${i}`} />
          const date = new Date(viewYear, viewMonth, day)
          const isToday = isSameDay(date, today)
          const isSelected = !!selected && isSameDay(date, selected)
          const disabled = isDisabled(day)

          return (
            <button
              key={day}
              type="button"
              disabled={disabled}
              onClick={() => !disabled && onSelect(date)}
              className={cn(
                'h-8 w-full rounded-[var(--radius-md)] text-sm transition-colors',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]/40',
                isSelected
                  ? 'bg-[var(--color-accent)] text-white font-semibold'
                  : isToday
                    ? 'bg-[var(--color-accent-muted)] text-[var(--color-accent)] font-semibold'
                    : 'text-[var(--color-text)] hover:bg-[var(--color-bg)]',
                disabled && 'text-[var(--color-text-subtle)] pointer-events-none',
              )}
            >
              {day}
            </button>
          )
        })}
      </div>

      {/* Today shortcut */}
      <div className="mt-3 pt-3 border-t border-[var(--color-border)]">
        <button
          type="button"
          onClick={() => onSelect(today)}
          className="w-full text-xs text-center text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors"
        >
          Ma
        </button>
      </div>
    </div>
  )
}

// ── DatePicker ──────────────────────────────────────────────────────────────

export interface DatePickerProps {
  value?: Date | null
  onChange?: (date: Date | null) => void
  placeholder?: string
  label?: string
  hint?: string
  error?: string
  disabled?: boolean
  min?: Date
  max?: Date
  className?: string
}

export function DatePicker({
  value,
  onChange,
  placeholder = 'Válassz dátumot',
  label,
  hint,
  error,
  disabled = false,
  min,
  max,
  className,
}: DatePickerProps) {
  const id = useId()
  const [open, setOpen] = useState(false)
  const [internalValue, setInternalValue] = useState<Date | null>(null)

  const selected = value !== undefined ? value : internalValue

  function handleSelect(date: Date) {
    if (value === undefined) setInternalValue(date)
    onChange?.(date)
    setOpen(false)
  }

  return (
    <div className={cn('flex flex-col gap-1', className)}>
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-[var(--color-text)]">
          {label}
        </label>
      )}

      <PopoverPrimitive.Root open={open} onOpenChange={disabled ? undefined : setOpen}>
        <PopoverPrimitive.Trigger asChild>
          <button
            id={id}
            type="button"
            disabled={disabled}
            aria-haspopup="dialog"
            aria-expanded={open}
            className={cn(
              'flex items-center justify-between w-full px-3 py-2 rounded-[var(--radius-md)]',
              'border text-sm text-left transition-all',
              'focus-visible:outline-none focus-visible:ring-2',
              error
                ? 'border-[var(--color-error)] focus-visible:ring-[var(--color-error)]/20'
                : 'border-[var(--color-border)] focus-visible:ring-[var(--color-accent)]/20 focus-visible:border-[var(--color-accent)]',
              selected
                ? 'bg-[var(--color-surface)] text-[var(--color-text)]'
                : 'bg-[var(--color-surface)] text-[var(--color-text-subtle)]',
              disabled && 'opacity-50 cursor-not-allowed bg-[var(--color-bg)]',
            )}
          >
            <span>{selected ? formatDate(selected) : placeholder}</span>
            <Calendar className="h-4 w-4 text-[var(--color-text-muted)] shrink-0" />
          </button>
        </PopoverPrimitive.Trigger>

        <PopoverPrimitive.Portal>
          <PopoverPrimitive.Content
            align="start"
            sideOffset={6}
            className={cn(
              'z-50 rounded-[var(--radius-lg)] border border-[var(--color-border)]',
              'bg-[var(--color-surface)] shadow-[var(--shadow-lg)]',
              'data-[state=open]:animate-in data-[state=closed]:animate-out',
              'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
              'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
              'data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2',
            )}
          >
            <CalendarGrid selected={selected} onSelect={handleSelect} min={min} max={max} />
          </PopoverPrimitive.Content>
        </PopoverPrimitive.Portal>
      </PopoverPrimitive.Root>

      {(hint || error) && (
        <p
          className={cn(
            'text-xs',
            error ? 'text-[var(--color-error)]' : 'text-[var(--color-text-muted)]',
          )}
        >
          {error ?? hint}
        </p>
      )}
    </div>
  )
}

// ── DateRangePicker ─────────────────────────────────────────────────────────

export interface DateRange {
  from: Date | null
  to: Date | null
}

export interface DateRangePickerProps {
  value?: DateRange
  onChange?: (range: DateRange) => void
  label?: string
  disabled?: boolean
  className?: string
}

export function DateRangePicker({
  value,
  onChange,
  label,
  disabled = false,
  className,
}: DateRangePickerProps) {
  const [open, setOpen] = useState(false)
  const [internal, setInternal] = useState<DateRange>({ from: null, to: null })

  const range = value ?? internal

  function handleSelect(date: Date) {
    let next: DateRange
    if (!range.from || (range.from && range.to)) {
      next = { from: date, to: null }
    } else {
      next = date < range.from ? { from: date, to: range.from } : { from: range.from, to: date }
      setOpen(false)
    }
    if (value === undefined) setInternal(next)
    onChange?.(next)
  }

  const displayText = range.from
    ? range.to
      ? `${formatISO(range.from)} – ${formatISO(range.to)}`
      : `${formatISO(range.from)} –`
    : 'Válassz időszakot'

  return (
    <div className={cn('flex flex-col gap-1', className)}>
      {label && <label className="text-sm font-medium text-[var(--color-text)]">{label}</label>}
      <PopoverPrimitive.Root open={open} onOpenChange={disabled ? undefined : setOpen}>
        <PopoverPrimitive.Trigger asChild>
          <button
            type="button"
            disabled={disabled}
            className={cn(
              'flex items-center justify-between w-full px-3 py-2 rounded-[var(--radius-md)]',
              'border border-[var(--color-border)] text-sm text-left transition-all',
              'bg-[var(--color-surface)] focus-visible:outline-none focus-visible:ring-2',
              'focus-visible:ring-[var(--color-accent)]/20 focus-visible:border-[var(--color-accent)]',
              range.from ? 'text-[var(--color-text)]' : 'text-[var(--color-text-subtle)]',
              disabled && 'opacity-50 cursor-not-allowed',
            )}
          >
            <span className="font-mono text-xs">{displayText}</span>
            <Calendar className="h-4 w-4 text-[var(--color-text-muted)] shrink-0" />
          </button>
        </PopoverPrimitive.Trigger>
        <PopoverPrimitive.Portal>
          <PopoverPrimitive.Content
            align="start"
            sideOffset={6}
            className={cn(
              'z-50 rounded-[var(--radius-lg)] border border-[var(--color-border)]',
              'bg-[var(--color-surface)] shadow-[var(--shadow-lg)]',
              'data-[state=open]:animate-in data-[state=closed]:animate-out',
              'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
              'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
            )}
          >
            <RangeCalendarGrid range={range} onSelect={handleSelect} />
          </PopoverPrimitive.Content>
        </PopoverPrimitive.Portal>
      </PopoverPrimitive.Root>
    </div>
  )
}

// ── RangeCalendarGrid ───────────────────────────────────────────────────────

function RangeCalendarGrid({
  range,
  onSelect,
}: {
  range: DateRange
  onSelect: (date: Date) => void
}) {
  const today = new Date()
  const [viewYear, setViewYear] = useState(today.getFullYear())
  const [viewMonth, setViewMonth] = useState(today.getMonth())
  const [hovered, setHovered] = useState<Date | null>(null)

  const daysInMonth = getDaysInMonth(viewYear, viewMonth)
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth)

  function prevMonth() {
    if (viewMonth === 0) {
      setViewYear((y) => y - 1)
      setViewMonth(11)
    } else setViewMonth((m) => m - 1)
  }

  function nextMonth() {
    if (viewMonth === 11) {
      setViewYear((y) => y + 1)
      setViewMonth(0)
    } else setViewMonth((m) => m + 1)
  }

  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ]

  function isInRange(day: number) {
    const d = new Date(viewYear, viewMonth, day)
    if (!range.from) return false
    const end = range.to ?? hovered
    if (!end) return false
    const [s, e] = end < range.from ? [end, range.from] : [range.from, end]
    return d > s && d < e
  }

  return (
    <div className="p-3 w-[280px]">
      <div className="flex items-center justify-between mb-3">
        <button
          type="button"
          onClick={prevMonth}
          className="h-7 w-7 rounded-[var(--radius-md)] flex items-center justify-center text-[var(--color-text-muted)] hover:bg-[var(--color-bg)] transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <span className="text-sm font-semibold text-[var(--color-text)] font-display">
          {viewYear}. {MONTHS[viewMonth]}
        </span>
        <button
          type="button"
          onClick={nextMonth}
          className="h-7 w-7 rounded-[var(--radius-md)] flex items-center justify-center text-[var(--color-text-muted)] hover:bg-[var(--color-bg)] transition-colors"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      <div className="grid grid-cols-7 mb-1">
        {DAYS.map((d, i) => (
          <div
            key={i}
            className="h-8 flex items-center justify-center text-xs font-medium text-[var(--color-text-muted)]"
          >
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-y-0.5">
        {cells.map((day, i) => {
          if (day === null) return <div key={`e-${i}`} />
          const date = new Date(viewYear, viewMonth, day)
          const isFrom = !!range.from && isSameDay(date, range.from)
          const isTo = !!range.to && isSameDay(date, range.to)
          const inRange = isInRange(day)
          const isToday = isSameDay(date, today)
          return (
            <button
              key={day}
              type="button"
              onClick={() => onSelect(date)}
              onMouseEnter={() => range.from && !range.to && setHovered(date)}
              onMouseLeave={() => setHovered(null)}
              className={cn(
                'h-8 w-full text-sm transition-colors',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]/40',
                isFrom || isTo
                  ? 'rounded-[var(--radius-md)] bg-[var(--color-accent)] text-white font-semibold'
                  : inRange
                    ? 'bg-[var(--color-accent-muted)] text-[var(--color-accent)] rounded-none'
                    : isToday
                      ? 'rounded-[var(--radius-md)] bg-[var(--color-accent-muted)] text-[var(--color-accent)] font-semibold'
                      : 'rounded-[var(--radius-md)] text-[var(--color-text)] hover:bg-[var(--color-bg)]',
              )}
            >
              {day}
            </button>
          )
        })}
      </div>
    </div>
  )
}
