import type { Meta, StoryObj } from '@storybook/react'

const ColorSwatch = ({
  name,
  value,
  textColor = 'white',
}: {
  name: string
  value: string
  textColor?: string
}) => (
  <div className="flex flex-col gap-1.5">
    <div
      className="h-16 w-full rounded-lg border border-black/10 shadow-sm"
      style={{ backgroundColor: value }}
    />
    <div>
      <p className="text-xs font-mono font-medium text-[var(--color-text)]">{name}</p>
      <p className="text-[10px] font-mono text-[var(--color-text-muted)] uppercase">{value}</p>
    </div>
  </div>
)

const ColorsShowcase = () => (
  <div className="p-8 bg-[var(--color-bg)] min-h-screen min-w-[800px]">
    <h1 className="font-display font-semibold text-2xl text-[var(--color-text)] mb-8">
      Color Tokens · Színtokenek
    </h1>

    <section className="mb-8">
      <h2 className="font-body font-semibold text-sm text-[var(--color-text-muted)] uppercase tracking-widest mb-4">
        Brand
      </h2>
      <div className="grid grid-cols-4 gap-4">
        <ColorSwatch name="accent" value="#FF544D" />
        <ColorSwatch name="accent-hover" value="#E83D36" />
        <ColorSwatch name="sidebar / text" value="#3E2E45" />
        <ColorSwatch name="bg (light)" value="#F6EFE8" textColor="#3E2E45" />
      </div>
    </section>

    <section className="mb-8">
      <h2 className="font-body font-semibold text-sm text-[var(--color-text-muted)] uppercase tracking-widest mb-4">
        Semantic (current mode)
      </h2>
      <div className="grid grid-cols-4 gap-4">
        <ColorSwatch name="--color-bg" value="var(--color-bg)" />
        <ColorSwatch name="--color-surface" value="var(--color-surface)" />
        <ColorSwatch name="--color-text" value="var(--color-text)" />
        <ColorSwatch name="--color-border" value="var(--color-border)" />
      </div>
    </section>

    <section className="mb-8">
      <h2 className="font-body font-semibold text-sm text-[var(--color-text-muted)] uppercase tracking-widest mb-4">
        Status
      </h2>
      <div className="grid grid-cols-4 gap-4">
        <ColorSwatch name="success" value="#22C55E" />
        <ColorSwatch name="warning" value="#F59E0B" />
        <ColorSwatch name="error" value="#EF4444" />
        <ColorSwatch name="info" value="#3B82F6" />
      </div>
    </section>
  </div>
)

const meta: Meta = {
  title: 'Tokens/Colors',
  component: ColorsShowcase,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj
export const Default: Story = {
  name: 'Color Tokens · Színtokenek',
}
