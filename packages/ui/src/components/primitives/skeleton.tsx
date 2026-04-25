import type * as React from 'react'
import { cn } from '../../utils/cn'

// ── Base Skeleton ────────────────────────────────────────────────────────────

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse rounded-[var(--radius-md)] bg-[var(--color-border)]', className)}
      {...props}
    />
  )
}

// ── SkeletonText ─────────────────────────────────────────────────────────────

export interface SkeletonTextProps {
  lines?: number
  className?: string
  /** Last line width as a fraction (e.g. 0.6 = 60%) */
  lastLineWidth?: number
}

function SkeletonText({ lines = 3, lastLineWidth = 0.6, className }: SkeletonTextProps) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className="h-4"
          style={i === lines - 1 ? { width: `${lastLineWidth * 100}%` } : undefined}
        />
      ))}
    </div>
  )
}

// ── SkeletonCircle ───────────────────────────────────────────────────────────

const circleSizes = {
  sm: 'h-7 w-7',
  md: 'h-9 w-9',
  lg: 'h-11 w-11',
  xl: 'h-14 w-14',
} as const

export interface SkeletonCircleProps {
  size?: keyof typeof circleSizes
  className?: string
}

function SkeletonCircle({ size = 'md', className }: SkeletonCircleProps) {
  return <Skeleton className={cn('rounded-full shrink-0', circleSizes[size], className)} />
}

// ── SkeletonCard ─────────────────────────────────────────────────────────────

export interface SkeletonCardProps {
  /** Show image placeholder at the top */
  image?: boolean
  className?: string
}

function SkeletonCard({ image = true, className }: SkeletonCardProps) {
  return (
    <div
      className={cn(
        'rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden',
        className,
      )}
    >
      {image && <Skeleton className="h-40 w-full rounded-none" />}
      <div className="p-4 flex flex-col gap-3">
        <Skeleton className="h-5 w-3/4" />
        <SkeletonText lines={2} lastLineWidth={0.5} />
      </div>
    </div>
  )
}

// ── SkeletonButton ───────────────────────────────────────────────────────────

const buttonSizes = {
  sm: 'h-8 w-20',
  md: 'h-10 w-28',
  lg: 'h-12 w-32',
} as const

export interface SkeletonButtonProps {
  size?: keyof typeof buttonSizes
  className?: string
}

function SkeletonButton({ size = 'md', className }: SkeletonButtonProps) {
  return <Skeleton className={cn('rounded-[var(--radius-md)]', buttonSizes[size], className)} />
}

export { Skeleton, SkeletonText, SkeletonCircle, SkeletonCard, SkeletonButton }
