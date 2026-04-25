import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Slider } from '@vikingo/ui'

const meta: Meta = {
  title: 'Forms/Slider',
  parameters: { layout: 'centered', docs: { source: { type: 'code' } } },
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj

export const Default: Story = {
  name: 'Default · Alapértelmezett',
  render: () => {
    const [value, setValue] = useState([60])
    return (
      <div className="w-72 p-6 bg-[var(--color-bg)]">
        <div className="flex justify-between mb-2">
          <span className="text-sm text-[var(--color-text)]">Érték</span>
          <span className="text-sm font-mono text-[var(--color-accent)]">{value[0]}%</span>
        </div>
        <Slider value={value} onValueChange={setValue} min={0} max={100} step={1} />
      </div>
    )
  },
}

export const Variants: Story = {
  name: 'Variants · Variánsok',
  render: () => (
    <div className="flex flex-col gap-6 w-72 p-6 bg-[var(--color-bg)]">
      {(
        [
          { variant: 'accent', label: 'Accent', value: [65] as number[] },
          { variant: 'success', label: 'Success', value: [80] as number[] },
          { variant: 'default', label: 'Default', value: [45] as number[] },
        ] as const
      ).map(({ variant, label, value }) => (
        <div key={variant}>
          <div className="flex justify-between mb-2">
            <span className="text-sm text-[var(--color-text)]">{label}</span>
            <span className="text-sm font-mono text-[var(--color-text-muted)]">{value[0]}%</span>
          </div>
          <Slider variant={variant} defaultValue={value} min={0} max={100} />
        </div>
      ))}
    </div>
  ),
}

export const BudgetSettings: Story = {
  name: 'Budget Settings · Büdzsé-beállítás',
  render: () => {
    const [budget, setBudget] = useState([50000])
    const [freq, setFreq] = useState([3])

    return (
      <div className="flex flex-col gap-6 w-80 p-6 bg-[var(--color-bg)]">
        <h3 className="font-display font-semibold text-sm text-[var(--color-text)]">
          Kampány beállítások
        </h3>

        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-[var(--color-text)]">Napi büdzsé</span>
            <span className="text-sm font-mono text-[var(--color-accent)]">
              {budget[0].toLocaleString('hu-HU')} Ft
            </span>
          </div>
          <Slider value={budget} onValueChange={setBudget} min={1000} max={200000} step={1000} />
          <div className="flex justify-between mt-1">
            <span className="text-xs text-[var(--color-text-subtle)] font-mono">1 000 Ft</span>
            <span className="text-xs text-[var(--color-text-subtle)] font-mono">200 000 Ft</span>
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-[var(--color-text)]">
              Heti frekvencia limit
            </span>
            <span className="text-sm font-mono text-[var(--color-accent)]">{freq[0]}x</span>
          </div>
          <Slider value={freq} onValueChange={setFreq} min={1} max={7} step={1} />
          <div className="flex justify-between mt-1">
            <span className="text-xs text-[var(--color-text-subtle)] font-mono">1x</span>
            <span className="text-xs text-[var(--color-text-subtle)] font-mono">7x</span>
          </div>
        </div>
      </div>
    )
  },
}

export const RangeSelector: Story = {
  name: 'Range Selector · Tartomány-választó',
  render: () => {
    const [range, setRange] = useState([20, 60])

    return (
      <div className="w-72 p-6 bg-[var(--color-bg)]">
        <div className="flex justify-between mb-2">
          <span className="text-sm text-[var(--color-text)]">Kor szerinti célzás</span>
          <span className="text-sm font-mono text-[var(--color-accent)]">
            {range[0]}–{range[1]} év
          </span>
        </div>
        <Slider value={range} onValueChange={setRange} min={13} max={65} step={1} />
        <div className="flex justify-between mt-1">
          <span className="text-xs text-[var(--color-text-subtle)] font-mono">13 év</span>
          <span className="text-xs text-[var(--color-text-subtle)] font-mono">65+ év</span>
        </div>
      </div>
    )
  },
}
