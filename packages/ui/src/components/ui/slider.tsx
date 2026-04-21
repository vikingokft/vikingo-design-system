import * as SliderPrimitive from '@radix-ui/react-slider'
import type * as React from 'react'
import { cn } from '../../lib/utils'

function Slider({
  className,
  variant = 'accent',
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & {
  variant?: 'default' | 'accent' | 'success'
  ref?: React.Ref<React.ComponentRef<typeof SliderPrimitive.Root>>
}) {
  return (
    <SliderPrimitive.Root
      ref={ref}
      className={cn('relative flex w-full touch-none select-none items-center', className)}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-[var(--color-border)]">
        <SliderPrimitive.Range
          className={cn(
            'absolute h-full',
            variant === 'accent' && 'bg-[var(--color-accent)]',
            variant === 'success' && 'bg-[var(--color-success)]',
            variant === 'default' && 'bg-[var(--color-text)]',
          )}
        />
      </SliderPrimitive.Track>
      {(props.value ?? props.defaultValue ?? [0]).map((_, i) => (
        <SliderPrimitive.Thumb
          key={i}
          className={cn(
            'block h-5 w-5 rounded-full border-2 border-white bg-[var(--color-accent)] shadow-[var(--shadow-sm)]',
            'transition-all duration-[var(--transition-fast)]',
            'hover:shadow-[var(--shadow-md)] hover:scale-110',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-2',
            'disabled:pointer-events-none disabled:opacity-50',
            variant === 'success' && 'bg-[var(--color-success)]',
            variant === 'default' && 'bg-[var(--color-text)]',
          )}
        />
      ))}
    </SliderPrimitive.Root>
  )
}

export { Slider }
