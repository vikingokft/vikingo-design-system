import type { Meta, StoryObj } from '@storybook/react'
import { StatCard, formatFt, formatSzam } from '@vikingo/ui'

const meta: Meta<typeof StatCard> = {
  title: 'Data/Stat Card',
  component: StatCard,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof StatCard>

const hu = formatSzam
const huf = formatFt

export const MRR: Story = {
  name: 'MRR · Havi bevétel',
  args: {
    label: 'MRR',
    value: huf(5827289),
    sublabel: `ARPU: ${huf(3386)}`,
    trend: 0.3,
    trendLabel: '30 nap',
    tooltip: 'Havi ismétlődő bevétel (Monthly Recurring Revenue)',
  },
}

export const ActiveSubscribers: Story = {
  name: 'Active Subscribers · Aktív előfizetők',
  args: {
    label: 'Aktív előfizetők',
    value: hu(1721),
    sublabel: `${hu(1608)} havi · 113 éves`,
    trend: -1.1,
    trendLabel: '30 nap',
    tooltip: 'Aktív fizetős felhasználók száma',
  },
}

export const CAC: Story = {
  name: 'CAC · Ügyfélszerzési költség',
  args: {
    label: 'CAC',
    value: huf(20515),
    sublabel: '133 új vásárló · 30 nap',
    tooltip: 'Ügyfélszerzési költség (Customer Acquisition Cost) = Ad Spend ÷ Konverziók',
  },
}

export const Neutral: Story = {
  name: 'Neutral · Semleges',
  args: {
    label: 'ROAS',
    value: '0,17x',
    sublabel: 'Churn: 7,90%',
    trend: 0,
    trendLabel: 'változatlan',
    tooltip: 'Hirdetési megtérülés (Return on Ad Spend)',
  },
}

export const Loading: Story = {
  name: 'Loading · Betöltés',
  args: {
    label: 'Betöltés...',
    value: 0,
    loading: true,
  },
}

export const KPIGrid: Story = {
  name: 'KPI Grid · KPI-rács',
  render: () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 p-6 bg-[var(--color-bg)] w-full max-w-[900px]">
      <StatCard
        label="MRR"
        value={huf(5827289)}
        sublabel={`ARPU: ${huf(3386)}`}
        trend={0.3}
        trendLabel="30 nap"
        tooltip="Havi ismétlődő bevétel"
      />
      <StatCard
        label="Aktív előfizetők"
        value={hu(1721)}
        sublabel={`${hu(1608)} havi · 113 éves`}
        trend={-1.1}
        trendLabel="30 nap"
        tooltip="Aktív fizetős felhasználók"
      />
      <StatCard
        label="Összes Ad Spend"
        value={huf(2728506)}
        sublabel={`FB: ${huf(2662120)}`}
        tooltip="Összes hirdetési kiadás"
      />
      <StatCard
        label="CAC"
        value={huf(20515)}
        sublabel="133 új vásárló"
        tooltip="Ügyfélszerzési költség"
      />
      <StatCard label="ROAS" value="0,17x" sublabel="Churn: 7,90%" tooltip="Hirdetési megtérülés" />
    </div>
  ),
}
