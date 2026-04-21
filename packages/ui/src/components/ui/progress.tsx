import * as ProgressPrimitive from '@radix-ui/react-progress'
import type * as React from 'react'
import { cn } from '../../lib/utils'

function Progress({
  className,
  value,
  variant = 'accent',
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
  variant?: 'default' | 'accent' | 'success' | 'warning' | 'error'
  ref?: React.Ref<React.ComponentRef<typeof ProgressPrimitive.Root>>
}) {
  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        'relative h-2 w-full overflow-hidden rounded-full bg-[var(--color-border)]',
        className,
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={cn(
          'h-full flex-1 transition-all duration-[var(--transition-slow)]',
          variant === 'accent' && 'bg-[var(--color-accent)]',
          variant === 'success' && 'bg-[var(--color-success)]',
          variant === 'warning' && 'bg-[var(--color-warning)]',
          variant === 'error' && 'bg-[var(--color-error)]',
          variant === 'default' && 'bg-[var(--color-text)]',
        )}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  )
}

export { Progress }
