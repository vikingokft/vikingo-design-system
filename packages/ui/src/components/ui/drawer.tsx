import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import type * as React from 'react'
import { cn } from '../../lib/utils'

const Drawer = DialogPrimitive.Root
const DrawerTrigger = DialogPrimitive.Trigger
const DrawerPortal = DialogPrimitive.Portal
const DrawerClose = DialogPrimitive.Close

// ── Overlay ──────────────────────────────────────────────────────────────────

function DrawerOverlay({
  className,
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay> & {
  ref?: React.Ref<React.ComponentRef<typeof DialogPrimitive.Overlay>>
}) {
  return (
    <DialogPrimitive.Overlay
      ref={ref}
      className={cn(
        'fixed inset-0 z-50 bg-black/50 backdrop-blur-sm',
        'data-[state=open]:animate-in data-[state=closed]:animate-out',
        'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
        className,
      )}
      {...props}
    />
  )
}

// ── Content ──────────────────────────────────────────────────────────────────

const sideStyles = {
  right: cn(
    'right-0 top-0 h-full',
    'data-[state=open]:slide-in-from-right-full data-[state=closed]:slide-out-to-right-full',
  ),
  left: cn(
    'left-0 top-0 h-full',
    'data-[state=open]:slide-in-from-left-full data-[state=closed]:slide-out-to-left-full',
  ),
  bottom: cn(
    'bottom-0 left-0 right-0 w-full',
    'data-[state=open]:slide-in-from-bottom-full data-[state=closed]:slide-out-to-bottom-full',
  ),
}

const sizeStyles = {
  sm: 'max-w-xs',
  md: 'max-w-md',
  lg: 'max-w-xl',
  full: 'max-w-full',
}

export interface DrawerContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  side?: 'right' | 'left' | 'bottom'
  size?: 'sm' | 'md' | 'lg' | 'full'
  hideClose?: boolean
}

function DrawerContent({
  className,
  children,
  side = 'right',
  size = 'md',
  hideClose,
  ref,
  ...props
}: DrawerContentProps & {
  ref?: React.Ref<React.ComponentRef<typeof DialogPrimitive.Content>>
}) {
  return (
    <DrawerPortal>
      <DrawerOverlay />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          'fixed z-50 flex flex-col',
          'bg-[var(--color-surface)] border-[var(--color-border)]',
          'shadow-[var(--shadow-xl)]',
          'data-[state=open]:animate-in data-[state=closed]:animate-out',
          'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
          'duration-[var(--duration-slow)]',
          // Side-specific
          sideStyles[side],
          side !== 'bottom' && 'border-l data-[side=left]:border-l-0 data-[side=left]:border-r',
          side === 'left' ? 'border-r' : side === 'right' ? 'border-l' : 'border-t',
          // Width (only for left/right)
          side !== 'bottom' && sizeStyles[size],
          side !== 'bottom' && 'w-full',
          // Height for bottom
          side === 'bottom' && 'max-h-[85vh]',
          className,
        )}
        {...props}
      >
        {children}
        {!hideClose && (
          <DialogPrimitive.Close
            className={cn(
              'absolute right-4 top-4 rounded-[var(--radius-sm)] p-1',
              'text-[var(--color-text-muted)] hover:text-[var(--color-text)]',
              'hover:bg-[var(--color-bg)] transition-colors',
              'focus:outline-none focus:ring-2 focus:ring-[var(--color-border-focus)]',
            )}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Bezárás</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DrawerPortal>
  )
}

// ── Header / Title / Footer ──────────────────────────────────────────────────

function DrawerHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'flex flex-col gap-1 px-4 sm:px-6 py-4 sm:py-5 border-b border-[var(--color-border)] shrink-0',
        className,
      )}
      {...props}
    />
  )
}

function DrawerTitle({
  className,
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title> & {
  ref?: React.Ref<React.ComponentRef<typeof DialogPrimitive.Title>>
}) {
  return (
    <DialogPrimitive.Title
      ref={ref}
      className={cn(
        'font-display font-semibold text-lg text-[var(--color-text)] tracking-tight pr-6',
        className,
      )}
      {...props}
    />
  )
}

function DrawerDescription({
  className,
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description> & {
  ref?: React.Ref<React.ComponentRef<typeof DialogPrimitive.Description>>
}) {
  return (
    <DialogPrimitive.Description
      ref={ref}
      className={cn('text-sm text-[var(--color-text-muted)]', className)}
      {...props}
    />
  )
}

function DrawerBody({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('flex-1 overflow-y-auto px-4 sm:px-6 py-4 sm:py-5', className)} {...props} />
  )
}

function DrawerFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'flex flex-col-reverse sm:flex-row items-center justify-end gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 border-t border-[var(--color-border)] shrink-0',
        className,
      )}
      {...props}
    />
  )
}

export {
  Drawer,
  DrawerTrigger,
  DrawerPortal,
  DrawerOverlay,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerBody,
  DrawerFooter,
}
