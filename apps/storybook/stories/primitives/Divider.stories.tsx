import type { Meta, StoryObj } from '@storybook/react'
import { Separator } from '@vikingo/ui'

const meta: Meta = {
  title: 'Display/Divider',
  parameters: { layout: 'padded', docs: { source: { type: 'code' } } },
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj

export const Horizontal: Story = {
  name: 'Horizontal · Vízszintes',
  render: () => (
    <div className="w-[480px] p-6 bg-[var(--color-bg)]">
      <div className="flex flex-col gap-4">
        <div>
          <p className="text-sm font-medium text-[var(--color-text)]">Kampány neve</p>
          <p className="text-sm text-[var(--color-text-muted)] mt-0.5">Nyári akció 2025</p>
        </div>
        <Separator />
        <div>
          <p className="text-sm font-medium text-[var(--color-text)]">Platform</p>
          <p className="text-sm text-[var(--color-text-muted)] mt-0.5">
            Facebook Ads + Instagram Ads
          </p>
        </div>
        <Separator />
        <div>
          <p className="text-sm font-medium text-[var(--color-text)]">Napi büdzsé</p>
          <p className="text-sm font-mono text-[var(--color-text-muted)] mt-0.5">50 000 Ft</p>
        </div>
        <Separator />
        <div>
          <p className="text-sm font-medium text-[var(--color-text)]">Státusz</p>
          <p className="text-sm text-[var(--color-success)] mt-0.5">Aktív</p>
        </div>
      </div>
    </div>
  ),
}

export const Vertical: Story = {
  name: 'Vertical · Függőleges',
  render: () => (
    <div className="p-6 bg-[var(--color-bg)]">
      <div className="flex items-center gap-4 h-8">
        <span className="text-sm font-mono text-[var(--color-text-muted)]">
          Impressziók: 48 291
        </span>
        <Separator orientation="vertical" />
        <span className="text-sm font-mono text-[var(--color-text-muted)]">Kattintások: 1 842</span>
        <Separator orientation="vertical" />
        <span className="text-sm font-mono text-[var(--color-text-muted)]">CTR: 3.8%</span>
        <Separator orientation="vertical" />
        <span className="text-sm font-mono text-[var(--color-accent)]">ROAS: 4.2x</span>
      </div>
    </div>
  ),
}

export const WithLabel: Story = {
  name: 'With Label · Felirattal',
  render: () => (
    <div className="w-[480px] p-6 bg-[var(--color-bg)]">
      <div className="flex flex-col gap-6">
        {/* Section divider with label */}
        <div className="flex items-center gap-3">
          <Separator className="flex-1" />
          <span className="text-xs font-mono uppercase tracking-widest text-[var(--color-text-muted)] shrink-0">
            Részletek
          </span>
          <Separator className="flex-1" />
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex justify-between">
            <span className="text-sm text-[var(--color-text-muted)]">Kampány típus</span>
            <span className="text-sm font-medium text-[var(--color-text)]">Remarketing</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-[var(--color-text-muted)]">Célközönség</span>
            <span className="text-sm font-medium text-[var(--color-text)]">90 napos látogatók</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Separator className="flex-1" />
          <span className="text-xs font-mono uppercase tracking-widest text-[var(--color-text-muted)] shrink-0">
            Teljesítmény
          </span>
          <Separator className="flex-1" />
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex justify-between">
            <span className="text-sm text-[var(--color-text-muted)]">Konverziók</span>
            <span className="text-sm font-mono text-[var(--color-text)]">142</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-[var(--color-text-muted)]">Bevétel</span>
            <span className="text-sm font-mono text-[var(--color-success)]">1 194 840 Ft</span>
          </div>
        </div>
      </div>
    </div>
  ),
}

export const InCard: Story = {
  name: 'In Card · Kártyán belül',
  render: () => (
    <div className="w-[320px] rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden">
      <div className="px-5 py-4">
        <p className="text-xs font-mono uppercase tracking-widest text-[var(--color-text-muted)]">
          Facebook Ads
        </p>
        <p className="mt-1 text-2xl font-display font-semibold text-[var(--color-text)]">
          2 662 120 Ft
        </p>
      </div>
      <Separator />
      <div className="px-5 py-3 grid grid-cols-3 gap-4">
        {[
          { label: 'CTR', value: '3.8%' },
          { label: 'CPC', value: '312 Ft' },
          { label: 'ROAS', value: '4.2x' },
        ].map((stat, i) => (
          <div key={i} className="text-center">
            <p className="text-sm font-mono font-semibold text-[var(--color-text)]">{stat.value}</p>
            <p className="text-[10px] font-mono text-[var(--color-text-muted)] mt-0.5">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
      <Separator />
      <div className="px-5 py-3">
        <p className="text-xs text-[var(--color-text-subtle)]">Utolsó szinkron: ma, 02:14</p>
      </div>
    </div>
  ),
}

export const Inset: Story = {
  name: 'Inset · Behúzott',
  render: () => (
    <div className="w-[320px] rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden">
      {[
        { platform: 'Facebook Ads', spend: '2 662 120 Ft', roas: '4.2x' },
        { platform: 'Google Ads', spend: '156 200 Ft', roas: '6.1x' },
        { platform: 'TikTok Ads', spend: '66 386 Ft', roas: '3.5x' },
        { platform: 'Instagram Ads', spend: '78 400 Ft', roas: '2.8x' },
      ].map((item, i, arr) => (
        <div key={item.platform}>
          <div className="flex items-center justify-between px-4 py-3">
            <span className="text-sm font-medium text-[var(--color-text)]">{item.platform}</span>
            <div className="text-right">
              <p className="text-xs font-mono text-[var(--color-text)]">{item.spend}</p>
              <p className="text-xs font-mono text-[var(--color-accent)]">{item.roas}</p>
            </div>
          </div>
          {i < arr.length - 1 && <Separator className="ml-4" />}
        </div>
      ))}
    </div>
  ),
}
