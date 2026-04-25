import type { Meta, StoryObj } from '@storybook/react'
import { MetricRow, Card, CardContent, formatFt, formatSzam } from '@vikingo/ui'

const meta: Meta = {
  title: 'Data/Metric Row',
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div className="p-6 bg-[var(--color-bg)]">
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj

const hu = formatSzam
const huf = formatFt

export const Default: Story = {
  name: 'Default · Alapértelmezett',
  render: () => (
    <Card className="w-96">
      <CardContent className="pt-6">
        <h3 className="font-display font-semibold text-base text-[var(--color-text)] mb-1">
          Összefoglaló – 30 nap
        </h3>
        <MetricRow
          color="var(--color-accent)"
          label="Új előfizetők"
          sublabel="Trial → Aktív: 49"
          value={133}
        />
        <MetricRow
          color="var(--color-error)"
          label="Lemondások"
          sublabel="Churn rate: 7,90%"
          value={275}
        />
        <MetricRow
          color="#5B21B6"
          label="FB konverziók"
          sublabel={`Spend: ${huf(2662120)} · CAC: ${huf(35028)}`}
          value={76}
        />
        <MetricRow
          color="var(--color-warning)"
          label="TikTok konverziók"
          sublabel={`Spend: ${huf(66386)} · CAC: ${huf(221)}`}
          value={300}
        />
        <MetricRow
          color="var(--color-success)"
          label="Circle.so tagok"
          sublabel="Új tagok / 30 nap: +366"
          value={hu(1980)}
        />
      </CardContent>
    </Card>
  ),
}

export const SingleRow: Story = {
  name: 'Single Row · Egyedi sor',
  render: () => (
    <div className="w-80 border border-[var(--color-border)] rounded-[var(--radius-lg)]">
      <MetricRow
        color="var(--color-accent)"
        label="Havi ismétlődő bevétel (MRR)"
        sublabel={`ARPU: ${huf(3386)}`}
        value={huf(5827289)}
      />
    </div>
  ),
}
