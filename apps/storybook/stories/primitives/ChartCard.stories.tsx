import type { Meta, StoryObj } from '@storybook/react'
import {
  ChartCard,
  AreaChart,
  MultiBarChart,
  MultiLineChart,
  formatFt,
  formatSzam,
} from '@vikingo/ui'

const meta: Meta<typeof ChartCard> = {
  title: 'Data/Chart Card',
  component: ChartCard,
  parameters: { layout: 'centered', docs: { source: { type: 'code' } } },
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof ChartCard>

function generateDates(days: number, endDateStr = '2026-03-06'): string[] {
  const end = new Date(endDateStr)
  return Array.from({ length: days }, (_, i) => {
    const d = new Date(end)
    d.setDate(d.getDate() - (days - 1 - i))
    return d.toISOString().slice(0, 10)
  })
}

const mrrDates = generateDates(30)
const mrrData = mrrDates.map((x, i) => ({
  x,
  y: 5_800_000 + Math.round(Math.sin(i * 0.3) * 80_000 + (i < 15 ? -20_000 : 20_000)),
}))

const adDates = generateDates(30)
const adSpendData = adDates.map((x, i) => ({
  x,
  facebook: Math.max(
    0,
    Math.round(
      80_000 +
        (i >= 10 && i <= 20 ? (i - 10) * 16_000 : i > 20 ? (30 - i) * 11_000 : 0) +
        (i % 3) * 15_000,
    ),
  ),
  tiktok: Math.max(0, Math.round(3_000 + (i % 5) * 2_000)),
}))

const mrrSubDates = generateDates(30)
const mrrSubData = mrrSubDates.map((x, i) => ({
  x,
  mrr: 5_700_000 + Math.round(Math.sin(i * 0.4) * 70_000 + i * 2_000),
  elofizetok: 1_650 + Math.round(Math.sin(i * 0.2) * 30 + i * 2.4),
}))

const acqDates = generateDates(30)
const acqData = acqDates.map((x, i) => ({
  x,
  koltes: Math.max(
    0,
    Math.round(
      (i < 10
        ? 5_000 + i * 2_000
        : i < 20
          ? 20_000 + (i - 10) * 22_000
          : 240_000 - (i - 20) * 25_000) +
        (i % 3) * 8_000,
    ),
  ),
  ujElofizeto: Math.max(0, Math.round((i > 12 ? 4 : 0) + (i % 4) * 3)),
  ujTrial: Math.max(0, Math.round((i > 15 ? 8 : 0) + (i % 5) * 4)),
}))

export const MrrTrend: Story = {
  name: 'MRR Trend · MRR-trend (területes vonaldiagram)',
  render: () => (
    <div className="w-[560px]">
      <ChartCard
        title="MRR trend – 30 nap"
        description="Havi ismétlődő bevétel"
        value={formatFt(5_827_289)}
        chartMinHeight={240}
      >
        <AreaChart
          data={mrrData}
          color="#FF544D"
          valueFormatter={formatFt}
          seriesLabel="MRR"
          height={220}
        />
      </ChartCard>
    </div>
  ),
}

export const AdSpend: Story = {
  name: 'Ad Spend · Napi hirdetési költés (oszlopdiagram)',
  render: () => (
    <div className="w-[560px]">
      <ChartCard
        title="Napi hirdetési költés"
        description="Facebook vs TikTok (HUF)"
        value={formatFt(2_730_764)}
        chartMinHeight={260}
      >
        <MultiBarChart
          data={adSpendData}
          xAxisKey="x"
          bars={[
            { dataKey: 'facebook', color: '#7C3AED', label: 'Facebook' },
            { dataKey: 'tiktok', color: '#FF544D', label: 'TikTok' },
          ]}
          valueFormatter={formatFt}
          height={240}
        />
      </ChartCard>
    </div>
  ),
}

export const MrrAndSubscribers: Story = {
  name: 'MRR & Subscribers · MRR és előfizetők (kétvonalú)',
  render: () => (
    <div className="w-[560px]">
      <ChartCard
        title="MRR és előfizetők – 30 nap"
        description="Bevétel + aktív felhasználók"
        chartMinHeight={260}
      >
        <MultiLineChart
          data={mrrSubData}
          xAxisKey="x"
          lines={[
            { dataKey: 'mrr', color: '#FF544D', label: 'MRR', yAxisId: 'left' },
            { dataKey: 'elofizetok', color: '#7C3AED', label: 'Előfizetők', yAxisId: 'right' },
          ]}
          leftValueFormatter={formatFt}
          rightValueFormatter={formatSzam}
          height={240}
        />
      </ChartCard>
    </div>
  ),
}

export const AdSpendVsAcquisition: Story = {
  name: 'Ad Spend vs Acquisition · Hirdetési költés vs. akvizíció',
  render: () => (
    <div className="w-[700px]">
      <ChartCard
        title="Hirdetési költés vs. Akvizíció"
        description="Napi ad spend és új előfizetők / trialosok"
        chartMinHeight={280}
      >
        <MultiLineChart
          data={acqData}
          xAxisKey="x"
          lines={[
            { dataKey: 'koltes', color: '#7C3AED', label: 'Költés', yAxisId: 'left' },
            {
              dataKey: 'ujElofizeto',
              color: '#FF544D',
              label: 'Új előfizető',
              dashed: true,
              yAxisId: 'right',
            },
            {
              dataKey: 'ujTrial',
              color: '#F59E0B',
              label: 'Új trial',
              dotted: true,
              yAxisId: 'right',
            },
          ]}
          leftValueFormatter={formatFt}
          rightValueFormatter={formatSzam}
          height={260}
        />
      </ChartCard>
    </div>
  ),
}

export const Loading: Story = {
  name: 'Loading · Betöltés állapot',
  args: {
    title: 'Adat betöltése...',
    description: 'Stripe API · 30 nap',
    loading: true,
  },
  render: (args) => (
    <div className="w-[560px]">
      <ChartCard {...args} />
    </div>
  ),
}

export const TwoCharts: Story = {
  name: 'Two Charts Side by Side · Két grafikon egymás mellett',
  render: () => (
    <div className="grid grid-cols-2 gap-4 w-[960px] bg-[var(--color-bg)] p-6 rounded-[var(--radius-lg)]">
      <ChartCard
        title="MRR trend – 30 nap"
        description="Havi ismétlődő bevétel"
        value={formatFt(5_827_289)}
        chartMinHeight={240}
      >
        <AreaChart
          data={mrrData}
          color="#FF544D"
          valueFormatter={formatFt}
          seriesLabel="MRR"
          height={220}
        />
      </ChartCard>
      <ChartCard
        title="Napi hirdetési költés"
        description="Facebook vs TikTok"
        value={formatFt(2_730_764)}
        chartMinHeight={240}
      >
        <MultiBarChart
          data={adSpendData}
          xAxisKey="x"
          bars={[
            { dataKey: 'facebook', color: '#7C3AED', label: 'Facebook' },
            { dataKey: 'tiktok', color: '#FF544D', label: 'TikTok' },
          ]}
          valueFormatter={formatFt}
          height={220}
        />
      </ChartCard>
    </div>
  ),
}
