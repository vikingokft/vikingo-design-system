import type { Meta, StoryObj } from '@storybook/react'
import { Skeleton, SkeletonText, SkeletonCircle, SkeletonCard, SkeletonButton } from '@vikingo/ui'

const meta: Meta = {
  title: 'Display/Skeleton',
  parameters: { layout: 'padded', docs: { source: { type: 'code' } } },
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj

export const Variants: Story = {
  name: 'Variants · Variánsok',
  render: () => (
    <div className="flex flex-col gap-8 p-6 bg-[var(--color-bg)] w-96">
      <div>
        <p className="text-xs font-mono uppercase tracking-widest text-[var(--color-text-muted)] mb-3">
          SkeletonText
        </p>
        <SkeletonText lines={3} />
      </div>
      <div className="flex items-center gap-4">
        <div>
          <p className="text-xs font-mono uppercase tracking-widest text-[var(--color-text-muted)] mb-3">
            SkeletonCircle
          </p>
          <div className="flex items-end gap-3">
            <SkeletonCircle size="sm" />
            <SkeletonCircle size="md" />
            <SkeletonCircle size="lg" />
            <SkeletonCircle size="xl" />
          </div>
        </div>
      </div>
      <div>
        <p className="text-xs font-mono uppercase tracking-widest text-[var(--color-text-muted)] mb-3">
          SkeletonCard
        </p>
        <SkeletonCard />
      </div>
      <div>
        <p className="text-xs font-mono uppercase tracking-widest text-[var(--color-text-muted)] mb-3">
          SkeletonButton
        </p>
        <div className="flex items-center gap-3">
          <SkeletonButton size="sm" />
          <SkeletonButton size="md" />
          <SkeletonButton size="lg" />
        </div>
      </div>
    </div>
  ),
}

export const CardSkeleton: Story = {
  name: 'Card Skeleton · Kártyaskeleton',
  render: () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 bg-[var(--color-bg)]">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden"
        >
          <Skeleton className="aspect-[4/3] rounded-none" />
          <div className="p-3 flex flex-col gap-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
            <div className="flex gap-1 pt-1">
              <Skeleton className="h-5 w-12 rounded-full" />
              <Skeleton className="h-5 w-16 rounded-full" />
            </div>
          </div>
        </div>
      ))}
    </div>
  ),
}

export const TableSkeleton: Story = {
  name: 'Table Skeleton · Táblázatskeleton',
  render: () => (
    <div className="p-4 bg-[var(--color-bg)]">
      <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] overflow-hidden bg-[var(--color-surface)]">
        <div className="flex items-center gap-4 px-4 py-3 border-b border-[var(--color-border)] bg-[var(--color-bg)]">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-16 ml-auto" />
          <Skeleton className="h-4 w-20" />
        </div>
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-4 px-4 py-3 border-b last:border-0 border-[var(--color-border)]"
          >
            <Skeleton className="h-7 w-7 rounded-full shrink-0" />
            <div className="flex flex-col gap-1.5 flex-1">
              <Skeleton className="h-3.5 w-40" />
              <Skeleton className="h-3 w-24" />
            </div>
            <Skeleton className="h-5 w-16 rounded-full" />
            <Skeleton className="h-3.5 w-24 font-mono" />
            <Skeleton className="h-3.5 w-16" />
          </div>
        ))}
      </div>
    </div>
  ),
}

export const KPISkeleton: Story = {
  name: 'KPI Skeleton · KPI-skeleton',
  render: () => (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-[var(--color-bg)]">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4 flex flex-col gap-3"
        >
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-7 w-28" />
          <Skeleton className="h-3 w-24" />
        </div>
      ))}
    </div>
  ),
}

export const ProfileSkeleton: Story = {
  name: 'Profile Skeleton · Profilskeleton',
  render: () => (
    <div className="flex items-center gap-4 p-6 bg-[var(--color-bg)]">
      <Skeleton className="h-14 w-14 rounded-full shrink-0" />
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-3 w-48" />
        <Skeleton className="h-3 w-24" />
      </div>
    </div>
  ),
}
