import type { Meta, StoryObj } from '@storybook/react'
import { Spinner } from '@vikingo/ui'
import { Button } from '@vikingo/ui'

const meta: Meta = {
  title: 'Display/Spinner',
  parameters: { layout: 'centered', docs: { source: { type: 'code' } } },
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj

export const Sizes: Story = {
  name: 'Sizes · Méretek',
  render: () => (
    <div className="flex items-center gap-6 p-6 bg-[var(--color-bg)]">
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <div key={size} className="flex flex-col items-center gap-2">
          <Spinner size={size} />
          <span className="text-xs font-mono text-[var(--color-text-muted)]">{size}</span>
        </div>
      ))}
    </div>
  ),
}

export const Variants: Story = {
  name: 'Variants · Variánsok',
  render: () => (
    <div className="flex flex-wrap items-center gap-4 p-6 bg-[var(--color-bg)]">
      <div className="flex flex-col items-center gap-2">
        <Spinner variant="accent" size="lg" />
        <span className="text-xs font-mono text-[var(--color-text-muted)]">accent</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner variant="muted" size="lg" />
        <span className="text-xs font-mono text-[var(--color-text-muted)]">muted</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner variant="success" size="lg" />
        <span className="text-xs font-mono text-[var(--color-text-muted)]">success</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner variant="warning" size="lg" />
        <span className="text-xs font-mono text-[var(--color-text-muted)]">warning</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner variant="error" size="lg" />
        <span className="text-xs font-mono text-[var(--color-text-muted)]">error</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <div className="rounded-[var(--radius-lg)] bg-[var(--sidebar-bg)] p-3">
          <Spinner variant="white" size="lg" />
        </div>
        <span className="text-xs font-mono text-[var(--color-text-muted)]">white</span>
      </div>
    </div>
  ),
}

export const WithLabel: Story = {
  name: 'With Label · Felirattal',
  render: () => (
    <div className="flex flex-col gap-4 p-6 bg-[var(--color-bg)]">
      <Spinner size="md" label="Adatok betöltése..." />
      <Spinner size="md" label="Kampány mentése..." variant="success" />
      <Spinner size="md" label="Szinkronizálás..." variant="muted" />
    </div>
  ),
}

export const InButtons: Story = {
  name: 'In Buttons · Gombokban',
  render: () => (
    <div className="flex flex-wrap gap-3 p-6 bg-[var(--color-bg)]">
      <Button disabled>
        <Spinner size="sm" variant="white" />
        Mentés...
      </Button>
      <Button variant="secondary" disabled>
        <Spinner size="sm" variant="accent" />
        Szinkronizálás...
      </Button>
      <Button variant="ghost" disabled>
        <Spinner size="sm" variant="muted" />
        Betöltés
      </Button>
    </div>
  ),
}

export const FullPageLoading: Story = {
  name: 'Full Page Loading · Teljes oldalas betöltés',
  render: () => (
    <div className="w-[480px] h-48 flex flex-col items-center justify-center gap-3 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)]">
      <Spinner size="xl" variant="accent" />
      <p className="text-sm text-[var(--color-text-muted)]">Kampány adatok betöltése...</p>
      <p className="text-xs font-mono text-[var(--color-text-subtle)]">Meta API kapcsolódás</p>
    </div>
  ),
}
