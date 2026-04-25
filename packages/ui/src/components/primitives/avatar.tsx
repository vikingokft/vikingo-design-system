import * as AvatarPrimitive from '@radix-ui/react-avatar'
import type * as React from 'react'
import { cn } from '../../utils/cn'

function Avatar({
  className,
  size = 'md',
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> & {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  ref?: React.Ref<React.ComponentRef<typeof AvatarPrimitive.Root>>
}) {
  return (
    <AvatarPrimitive.Root
      ref={ref}
      className={cn(
        'relative flex shrink-0 overflow-hidden rounded-full',
        size === 'sm' && 'h-7 w-7',
        size === 'md' && 'h-9 w-9',
        size === 'lg' && 'h-11 w-11',
        size === 'xl' && 'h-14 w-14',
        className,
      )}
      {...props}
    />
  )
}

function AvatarImage({
  className,
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image> & {
  ref?: React.Ref<React.ComponentRef<typeof AvatarPrimitive.Image>>
}) {
  return (
    <AvatarPrimitive.Image
      ref={ref}
      className={cn('aspect-square h-full w-full object-cover', className)}
      {...props}
    />
  )
}

function AvatarFallback({
  className,
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback> & {
  ref?: React.Ref<React.ComponentRef<typeof AvatarPrimitive.Fallback>>
}) {
  return (
    <AvatarPrimitive.Fallback
      ref={ref}
      className={cn(
        'flex h-full w-full items-center justify-center rounded-full',
        'bg-[var(--color-accent-muted)] text-[var(--color-accent)]',
        'text-xs font-mono font-medium uppercase',
        className,
      )}
      {...props}
    />
  )
}

export { Avatar, AvatarImage, AvatarFallback }
