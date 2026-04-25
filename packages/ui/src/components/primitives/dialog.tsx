import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import type * as React from 'react'
import { cn } from '../../utils/cn'

const Dialog = DialogPrimitive.Root
const DialogTrigger = DialogPrimitive.Trigger
const DialogPortal = DialogPrimitive.Portal
const DialogClose = DialogPrimitive.Close

function DialogOverlay({
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
        'fixed inset-0 z-50 bg-black/60 backdrop-blur-sm',
        'data-[state=open]:animate-in data-[state=closed]:animate-out',
        'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
        className,
      )}
      {...props}
    />
  )
}

function DialogContent({
  className,
  children,
  size = 'md',
  hideClose,
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  hideClose?: boolean
  ref?: React.Ref<React.ComponentRef<typeof DialogPrimitive.Content>>
}) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          'fixed left-[50%] top-[50%] z-50 translate-x-[-50%] translate-y-[-50%]',
          'bg-[var(--color-surface)] rounded-[var(--radius-xl)]',
          'border border-[var(--color-border)] shadow-[var(--shadow-xl)]',
          'p-4 sm:p-6 w-[calc(100%-2rem)] sm:w-full',
          'data-[state=open]:animate-in data-[state=closed]:animate-out',
          'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
          'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
          'data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]',
          'data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]',
          size === 'sm' && 'max-w-sm',
          size === 'md' && 'max-w-lg',
          size === 'lg' && 'max-w-2xl',
          size === 'xl' && 'max-w-4xl',
          size === 'full' && 'max-w-[calc(100vw-2rem)] max-h-[calc(100vh-2rem)]',
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
              'hover:bg-[var(--color-bg)]',
              'transition-colors duration-[var(--transition-fast)]',
              'focus:outline-none focus:ring-2 focus:ring-[var(--color-border-focus)]',
              'disabled:pointer-events-none',
            )}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  )
}

function DialogHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('flex flex-col gap-1.5 mb-4', className)} {...props} />
}

function DialogFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'flex flex-col-reverse sm:flex-row items-center justify-end gap-2 sm:gap-3 mt-4 sm:mt-6',
        className,
      )}
      {...props}
    />
  )
}

function DialogTitle({
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
        'font-display font-semibold text-lg sm:text-xl text-[var(--color-text)] tracking-tight',
        className,
      )}
      {...props}
    />
  )
}

function DialogDescription({
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

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}
