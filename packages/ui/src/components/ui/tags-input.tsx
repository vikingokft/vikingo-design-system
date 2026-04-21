import { X } from 'lucide-react'
import * as React from 'react'
import { cn } from '../../lib/utils'

export interface TagsInputProps {
  value?: string[]
  defaultValue?: string[]
  onChange?: (tags: string[]) => void
  /** Input placeholder shown when empty */
  placeholder?: string
  label?: string
  hint?: string
  error?: boolean
  disabled?: boolean
  /** Maximum number of tags allowed */
  max?: number
  /** Allow duplicate tag values (default: false) */
  allowDuplicates?: boolean
  /** aria-label for each tag's remove button */
  removeTagLabel?: string
  className?: string
  id?: string
}

function TagsInput({
  value,
  defaultValue,
  onChange,
  placeholder = 'Tag hozzáadása…',
  label,
  hint,
  error = false,
  disabled = false,
  max,
  allowDuplicates = false,
  removeTagLabel = 'Tag eltávolítása',
  className,
  id,
  ref,
}: TagsInputProps & { ref?: React.Ref<HTMLInputElement> }) {
  const generatedId = React.useId()
  const inputId = id || generatedId
  const inputRef = React.useRef<HTMLInputElement>(null)

  // Merge external and internal refs
  React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement)

  const isControlled = value !== undefined
  const [internalTags, setInternalTags] = React.useState<string[]>(defaultValue ?? [])
  const tags = isControlled ? value : internalTags

  const [inputValue, setInputValue] = React.useState('')

  function addTag(raw: string) {
    const tag = raw.trim()
    if (!tag) return
    if (!allowDuplicates && tags.includes(tag)) {
      setInputValue('')
      return
    }
    if (max !== undefined && tags.length >= max) return
    const next = [...tags, tag]
    if (!isControlled) setInternalTags(next)
    onChange?.(next)
    setInputValue('')
  }

  function removeTag(index: number) {
    const next = tags.filter((_, i) => i !== index)
    if (!isControlled) setInternalTags(next)
    onChange?.(next)
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      addTag(inputValue)
    } else if (e.key === 'Backspace' && inputValue === '' && tags.length > 0) {
      removeTag(tags.length - 1)
    }
  }

  function handleBlur() {
    if (inputValue.trim()) addTag(inputValue)
  }

  const atMax = max !== undefined && tags.length >= max

  return (
    <div className={cn('flex flex-col gap-1.5 w-full', className)}>
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-[var(--color-text)]">
          {label}
        </label>
      )}
      {/* Tag container */}
      <div
        onClick={() => !disabled && inputRef.current?.focus()}
        className={cn(
          'flex flex-wrap gap-1.5 min-h-10 w-full px-3 py-2',
          'rounded-[var(--radius-md)] border bg-[var(--color-surface)]',
          'transition-all duration-[var(--transition-fast)] cursor-text',
          error
            ? 'border-[var(--color-error)] focus-within:ring-2 focus-within:ring-[var(--color-error-muted)] focus-within:border-[var(--color-error)]'
            : 'border-[var(--color-border)] focus-within:border-[var(--color-border-focus)] focus-within:ring-2 focus-within:ring-[var(--color-accent-muted)] hover:border-[var(--color-border-strong)]',
          disabled && 'opacity-50 cursor-not-allowed bg-[var(--color-bg)]',
        )}
      >
        {/* Rendered tags */}
        {tags.map((tag, i) => (
          <span
            key={i}
            className={cn(
              'inline-flex items-center gap-1 px-2 py-0.5',
              'rounded-[var(--radius-sm)] text-xs font-medium',
              'bg-[var(--color-accent-muted)] text-[var(--color-accent)]',
              'border border-[var(--color-accent)]/20',
            )}
          >
            {tag}
            {!disabled && (
              <button
                type="button"
                aria-label={removeTagLabel}
                onClick={(e) => {
                  e.stopPropagation()
                  removeTag(i)
                }}
                className="ml-0.5 rounded-full text-[var(--color-accent)]/70 hover:text-[var(--color-accent)] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-border-focus)]"
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </span>
        ))}

        {/* Text input */}
        {!atMax && (
          <input
            ref={inputRef}
            id={inputId}
            type="text"
            value={inputValue}
            placeholder={tags.length === 0 ? placeholder : undefined}
            disabled={disabled}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            className={cn(
              'flex-1 min-w-[120px] bg-transparent outline-none',
              'text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-subtle)]',
              'disabled:cursor-not-allowed',
            )}
          />
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

export { TagsInput }
