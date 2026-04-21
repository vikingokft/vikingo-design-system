import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Megaphone } from 'lucide-react'
import { PageHeader, PeriodFilter, Button } from '@vikingo/ui'

const meta: Meta = {
  title: 'Layout/Page Header',
  parameters: { layout: 'padded', docs: { source: { type: 'code' } } },
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj

const periodOptions = [
  { label: 'Ez a hónap', value: 'this-month' },
  { label: 'Előző hónap', value: 'last-month' },
  { label: '30 nap', value: '30d' },
  { label: '90 nap', value: '90d' },
  { label: 'Teljes időszak', value: 'all' },
]

export const Default: Story = {
  name: 'Default · Alapértelmezett',
  render: () => {
    const [period, setPeriod] = useState('30d')
    return (
      <div className="bg-[var(--color-bg)] p-6">
        <PageHeader
          title="Összesítő"
          description="Összes forrás · 30 nap"
          periodFilter={
            <PeriodFilter options={periodOptions} value={period} onChange={setPeriod} />
          }
          lastUpdated="12:36:14"
        />
      </div>
    )
  },
}

export const WithIconAndActions: Story = {
  name: 'With Icon & Actions · Ikonnal és akciókkal',
  render: () => {
    const [period, setPeriod] = useState('30d')
    return (
      <div className="bg-[var(--color-bg)] p-6">
        <PageHeader
          title="Facebook Ads"
          description="Meta Marketing API · 30 nap"
          icon={
            <div className="h-10 w-10 rounded-[var(--radius-lg)] bg-[#1877F2] flex items-center justify-center">
              <Megaphone className="h-5 w-5 text-white" />
            </div>
          }
          periodFilter={
            <PeriodFilter options={periodOptions} value={period} onChange={setPeriod} />
          }
          lastUpdated="12:36:14"
          actions={<Button size="sm">Exportálás</Button>}
        />
      </div>
    )
  },
}

export const Simple: Story = {
  name: 'Simple · Egyszerű',
  render: () => (
    <div className="bg-[var(--color-bg)] p-6">
      <PageHeader title="Beállítások" description="Fiók és értesítési preferenciák" />
    </div>
  ),
}
