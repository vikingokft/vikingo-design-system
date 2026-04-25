import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { Check, Minus } from 'lucide-react'
import type * as React from 'react'
import { cn } from '../../utils/cn'

function Checkbox({
  className,
  indeterminate,
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> & {
  indeterminate?: boolean
  ref?: React.Ref<React.ComponentRef<typeof CheckboxPrimitive.Root>>
}) {
  return (
    <CheckboxPrimitive.Root
      ref={ref}
      className={cn(
        'peer h-4 w-4 shrink-0 rounded-[var(--radius-sm)]',
        'border border-[var(--color-border-strong)]',
        'bg-[var(--color-surface)]',
        'transition-colors duration-[var(--transition-fast)]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'data-[state=checked]:bg-[var(--color-accent)] data-[state=checked]:border-[var(--color-accent)]',
        className,
      )}
      checked={indeterminate ? 'indeterminate' : props.checked}
      {...props}
    >
      <CheckboxPrimitive.Indicator className="flex items-center justify-center text-white">
        {indeterminate ? <Minus className="h-3 w-3" /> : <Check className="h-3 w-3" />}
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
