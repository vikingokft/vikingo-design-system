import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta = {
  title: 'Tokens/Spacing & Shadows',
  parameters: {
    layout: 'fullscreen',
    docs: { source: { type: 'code' } },
  },
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj

const spacingTokens = [
  { name: '--spacing-xs', value: '4px', label: 'xs' },
  { name: '--spacing-sm', value: '8px', label: 'sm' },
  { name: '--spacing-md', value: '16px', label: 'md' },
  { name: '--spacing-lg', value: '24px', label: 'lg' },
  { name: '--spacing-xl', value: '32px', label: 'xl' },
  { name: '--spacing-2xl', value: '48px', label: '2xl' },
  { name: '--spacing-3xl', value: '64px', label: '3xl' },
]

const radiusTokens = [
  { name: '--radius-sm', value: '4px', label: 'sm' },
  { name: '--radius-md', value: '8px', label: 'md' },
  { name: '--radius-lg', value: '12px', label: 'lg' },
  { name: '--radius-xl', value: '16px', label: 'xl' },
  { name: '--radius-full', value: '9999px', label: 'full' },
]

const shadowTokens = [
  { name: '--shadow-sm', label: 'sm', desc: 'Cards, buttons' },
  { name: '--shadow-md', label: 'md', desc: 'Hover states, dropdowns' },
  { name: '--shadow-lg', label: 'lg', desc: 'Modals, popovers' },
  { name: '--shadow-xl', label: 'xl', desc: 'Elevated elements' },
]

export const SpacingAndRadius: Story = {
  name: 'Spacing & Radius · Térköz és lekerekítés',
  render: () => (
    <div className="min-h-screen bg-[var(--color-bg)] p-6">
      <h1 className="font-display font-semibold text-2xl text-[var(--color-text)] mb-1">
        Spacing & Radius
      </h1>
      <p className="text-sm text-[var(--color-text-muted)] mb-8">
        CSS custom properties for consistent spacing and border radius.
      </p>

      <section className="mb-10">
        <h2 className="font-display font-semibold text-base text-[var(--color-text)] mb-4">
          Spacing
        </h2>
        <div className="flex flex-col gap-3">
          {spacingTokens.map((t) => (
            <div key={t.name} className="flex items-center gap-4">
              <div
                className="bg-[var(--color-accent)] rounded-[var(--radius-sm)] shrink-0"
                style={{ width: t.value, height: '24px' }}
              />
              <div className="flex items-baseline gap-3">
                <span className="text-sm font-mono font-medium text-[var(--color-text)] w-10">
                  {t.label}
                </span>
                <span className="text-xs font-mono text-[var(--color-text-muted)]">{t.name}</span>
                <span className="text-xs font-mono text-[var(--color-text-subtle)]">{t.value}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="font-display font-semibold text-base text-[var(--color-text)] mb-4">
          Border Radius
        </h2>
        <div className="flex flex-wrap gap-4">
          {radiusTokens.map((t) => (
            <div key={t.name} className="flex flex-col items-center gap-2">
              <div
                className="w-16 h-16 bg-[var(--color-accent-muted)] border-2 border-[var(--color-accent)]/40"
                style={{ borderRadius: t.value }}
              />
              <span className="text-xs font-mono text-[var(--color-text-muted)]">{t.label}</span>
              <span className="text-[10px] font-mono text-[var(--color-text-subtle)]">
                {t.value}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-display font-semibold text-base text-[var(--color-text)] mb-4">
          Shadows
        </h2>
        <div className="flex flex-wrap gap-6">
          {shadowTokens.map((t) => (
            <div key={t.name} className="flex flex-col items-center gap-3">
              <div
                className="w-24 h-16 bg-[var(--color-surface)] rounded-[var(--radius-lg)]"
                style={{ boxShadow: `var(${t.name})` }}
              />
              <div className="text-center">
                <p className="text-xs font-mono font-medium text-[var(--color-text)]">{t.label}</p>
                <p className="text-[10px] text-[var(--color-text-muted)]">{t.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  ),
}

export const Transitions: Story = {
  name: 'Transitions · Átmenetek',
  render: () => (
    <div className="min-h-screen bg-[var(--color-bg)] p-6">
      <h1 className="font-display font-semibold text-2xl text-[var(--color-text)] mb-1">
        Transitions · Átmenetek
      </h1>
      <p className="text-sm text-[var(--color-text-muted)] mb-8">
        Hover over the boxes to preview transition speed.
      </p>

      <div className="flex gap-6">
        {[
          { name: '--duration-fast', value: '120ms', label: 'fast', use: 'Hover, focus states' },
          { name: '--duration-base', value: '200ms', label: 'base', use: 'General interactions' },
          { name: '--duration-slow', value: '320ms', label: 'slow', use: 'Progress, skeleton' },
        ].map((t) => (
          <div
            key={t.name}
            className="group w-32 h-20 rounded-[var(--radius-lg)] bg-[var(--color-surface)] border border-[var(--color-border)] flex flex-col items-center justify-center cursor-pointer"
            style={{
              transition: `transform var(${t.name}), box-shadow var(${t.name})`,
            }}
            onMouseEnter={(e) => {
              ;(e.currentTarget as HTMLElement).style.transform = 'scale(1.05)'
              ;(e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-md)'
            }}
            onMouseLeave={(e) => {
              ;(e.currentTarget as HTMLElement).style.transform = 'scale(1)'
              ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
            }}
          >
            <span className="text-sm font-mono font-medium text-[var(--color-text)]">
              {t.label}
            </span>
            <span className="text-xs font-mono text-[var(--color-accent)]">{t.value}</span>
            <span className="text-[10px] text-[var(--color-text-subtle)] mt-1 text-center px-2">
              {t.use}
            </span>
          </div>
        ))}
      </div>
    </div>
  ),
}
