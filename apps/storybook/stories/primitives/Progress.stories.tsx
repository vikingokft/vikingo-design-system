import type { Meta, StoryObj } from '@storybook/react'
import { Progress } from '@vikingo/ui'

const meta: Meta = {
  title: 'Display/Progress',
  parameters: { layout: 'centered', docs: { source: { type: 'code' } } },
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj

export const Variants: Story = {
  name: 'Variants · Variánsok',
  render: () => (
    <div className="flex flex-col gap-5 w-72 p-6 bg-[var(--color-bg)]">
      {(
        [
          { variant: 'accent', label: 'Accent', value: 65 },
          { variant: 'success', label: 'Success', value: 82 },
          { variant: 'warning', label: 'Warning', value: 48 },
          { variant: 'error', label: 'Error', value: 23 },
          { variant: 'default', label: 'Default', value: 70 },
        ] as const
      ).map(({ variant, label, value }) => (
        <div key={variant} className="flex flex-col gap-1.5">
          <div className="flex justify-between">
            <span className="text-xs text-[var(--color-text-muted)]">{label}</span>
            <span className="text-xs font-mono text-[var(--color-text-muted)]">{value}%</span>
          </div>
          <Progress variant={variant} value={value} />
        </div>
      ))}
    </div>
  ),
}

export const BudgetTracking: Story = {
  name: 'Budget Tracking · Büdzsé-követés',
  render: () => {
    const campaigns = [
      { name: 'Facebook Ads', spent: 284500, budget: 400000 },
      { name: 'Google Ads', spent: 156200, budget: 200000 },
      { name: 'TikTok Ads', spent: 92300, budget: 100000 },
      { name: 'Instagram Ads', spent: 78400, budget: 150000 },
    ]

    return (
      <div className="flex flex-col gap-4 w-80 p-6 bg-[var(--color-bg)]">
        <h3 className="font-display font-semibold text-sm text-[var(--color-text)]">
          Büdzsé felhasználás
        </h3>
        {campaigns.map((c) => {
          const pct = Math.round((c.spent / c.budget) * 100)
          const variant = pct >= 90 ? 'error' : pct >= 70 ? 'warning' : 'accent'
          return (
            <div key={c.name} className="flex flex-col gap-1.5">
              <div className="flex justify-between items-baseline">
                <span className="text-sm text-[var(--color-text)]">{c.name}</span>
                <span className="text-xs font-mono text-[var(--color-text-muted)]">{pct}%</span>
              </div>
              <Progress variant={variant} value={pct} />
              <p className="text-[10px] font-mono text-[var(--color-text-subtle)]">
                {c.spent.toLocaleString('hu-HU')} / {c.budget.toLocaleString('hu-HU')} Ft
              </p>
            </div>
          )
        })}
      </div>
    )
  },
}
