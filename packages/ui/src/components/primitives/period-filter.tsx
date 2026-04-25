import { cn } from '../../utils/cn'

export interface PeriodOption {
  label: string
  value: string
}

export interface PeriodFilterProps {
  options: PeriodOption[]
  value: string
  onChange: (value: string) => void
  className?: string
}

function PeriodFilter({ options, value, onChange, className }: PeriodFilterProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-0.5',
        'bg-[var(--color-bg)] rounded-[var(--radius-full)]',
        'border border-[var(--color-border)]',
        'p-0.5',
        'overflow-x-auto scrollbar-none max-w-full',
        className,
      )}
      role="group"
    >
      {options.map((option) => {
        const active = option.value === value
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={cn(
              'px-3 py-1.5 rounded-[var(--radius-full)]',
              'text-xs font-mono font-medium',
              'transition-all duration-[var(--transition-fast)]',
              'cursor-pointer select-none whitespace-nowrap',
              active
                ? 'bg-[var(--color-accent)] text-white shadow-[var(--shadow-sm)]'
                : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface)]',
            )}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}

export { PeriodFilter }
