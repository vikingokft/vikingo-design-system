import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import * as React from 'react'
import { cn } from '../../utils/cn'

function RadioGroup({
  className,
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> & {
  ref?: React.Ref<React.ComponentRef<typeof RadioGroupPrimitive.Root>>
}) {
  return <RadioGroupPrimitive.Root className={cn('grid gap-2', className)} {...props} ref={ref} />
}

function RadioGroupItem({
  className,
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> & {
  ref?: React.Ref<React.ComponentRef<typeof RadioGroupPrimitive.Item>>
}) {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        'aspect-square h-5 w-5 rounded-full shrink-0 cursor-pointer',
        'border-2 border-[var(--color-border-strong)]',
        'bg-transparent',
        'transition-colors duration-[var(--transition-fast)]',
        'hover:border-[var(--color-accent)] hover:bg-[var(--color-accent-muted)]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-[var(--color-border-strong)] disabled:hover:bg-transparent',
        'data-[state=checked]:border-[var(--color-accent)]',
        className,
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-accent)] block" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
}

// ── RadioButton — convenience wrapper with label + description ───────────────

export interface RadioButtonProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> {
  label?: string
  description?: string
}

function RadioButton({
  label,
  description,
  className,
  id,
  ref,
  ...props
}: RadioButtonProps & { ref?: React.Ref<React.ComponentRef<typeof RadioGroupPrimitive.Item>> }) {
  const generatedId = React.useId()
  const itemId = id ?? generatedId
  return (
    <label htmlFor={itemId} className="flex items-center gap-3 cursor-pointer group">
      <RadioGroupItem ref={ref} id={itemId} className={className} {...props} />
      {(label || description) && (
        <div className="flex flex-col gap-0.5 min-w-0">
          {label && (
            <span className="text-sm font-medium text-[var(--color-text)] leading-tight">
              {label}
            </span>
          )}
          {description && (
            <span className="text-xs text-[var(--color-text-muted)]">{description}</span>
          )}
        </div>
      )}
    </label>
  )
}

export { RadioGroup, RadioGroupItem, RadioButton }
