import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { PeriodFilter } from '@vikingo/ui'

const meta: Meta<typeof PeriodFilter> = {
  title: 'Data/Period Filter',
  component: PeriodFilter,
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

type Story = StoryObj<typeof PeriodFilter>

const defaultOptions = [
  { label: 'Ez a hónap', value: 'this-month' },
  { label: 'Előző hónap', value: 'last-month' },
  { label: '30 nap', value: '30d' },
  { label: '90 nap', value: '90d' },
  { label: 'Teljes időszak', value: 'all' },
]

export const Default: Story = {
  name: 'Default · Alapértelmezett',
  render: () => {
    const [value, setValue] = useState('30d')
    return <PeriodFilter options={defaultOptions} value={value} onChange={setValue} />
  },
}

export const FullOptions: Story = {
  name: 'Full Options · Teljes opciók',
  render: () => {
    const [value, setValue] = useState('30d')
    return (
      <PeriodFilter
        options={[
          { label: 'Ez a hónap', value: 'this-month' },
          { label: 'Előző hónap', value: 'last-month' },
          { label: '2026', value: '2026' },
          { label: '30 nap', value: '30d' },
          { label: '90 nap', value: '90d' },
          { label: 'Teljes időszak', value: 'all' },
        ]}
        value={value}
        onChange={setValue}
      />
    )
  },
}

export const ShortOptions: Story = {
  name: 'Short Options · Rövid opciók',
  render: () => {
    const [value, setValue] = useState('7d')
    return (
      <PeriodFilter
        options={[
          { label: '7 nap', value: '7d' },
          { label: '30 nap', value: '30d' },
          { label: '90 nap', value: '90d' },
        ]}
        value={value}
        onChange={setValue}
      />
    )
  },
}
