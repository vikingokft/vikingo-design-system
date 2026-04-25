import * as React from 'react'
import { cn } from '../../utils/cn'

type DivProps = React.HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> }
type HeadingProps = React.HTMLAttributes<HTMLHeadingElement> & {
  ref?: React.Ref<HTMLHeadingElement>
}
type ParagraphProps = React.HTMLAttributes<HTMLParagraphElement> & {
  ref?: React.Ref<HTMLParagraphElement>
}

function Card({ className, hover, ref, ...props }: DivProps & { hover?: boolean }) {
  return (
    <div
      ref={ref}
      className={cn(
        'bg-[var(--color-surface)] rounded-[var(--radius-lg)]',
        'border border-[var(--color-border)]',
        'shadow-[var(--shadow-sm)]',
        'transition-all duration-[var(--transition-base)]',
        // Subtle hover for all cards
        'hover:border-[var(--color-border-strong)] hover:shadow-[var(--shadow-md)]',
        // Extra lift for interactive cards
        hover &&
          'cursor-pointer hover:-translate-y-0.5 hover:shadow-[var(--shadow-lg)] active:translate-y-0 active:shadow-[var(--shadow-md)]',
        className,
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ref, ...props }: DivProps) {
  return (
    <div ref={ref} className={cn('flex flex-col space-y-1.5 p-4 sm:p-6', className)} {...props} />
  )
}

function CardTitle({ className, ref, ...props }: HeadingProps) {
  return (
    <h3
      ref={ref}
      className={cn(
        'font-display font-semibold text-lg leading-snug text-[var(--color-text)] tracking-tight',
        className,
      )}
      {...props}
    />
  )
}

function CardDescription({ className, ref, ...props }: ParagraphProps) {
  return (
    <p ref={ref} className={cn('text-sm text-[var(--color-text-muted)]', className)} {...props} />
  )
}

function CardContent({ className, ref, ...props }: DivProps) {
  return <div ref={ref} className={cn('p-4 sm:p-6 pt-0', className)} {...props} />
}

function CardFooter({ className, ref, ...props }: DivProps) {
  return (
    <div
      ref={ref}
      className={cn('flex flex-wrap items-center gap-2 p-4 sm:p-6 pt-0', className)}
      {...props}
    />
  )
}

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter }
