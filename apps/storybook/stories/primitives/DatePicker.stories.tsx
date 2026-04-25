import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { DatePicker, DateRangePicker, type DateRange } from '@vikingo/ui'

const meta: Meta = {
  title: 'Forms/Date Picker',
  parameters: { layout: 'centered', docs: { source: { type: 'code' } } },
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj

export const Default: Story = {
  name: 'Default · Alapértelmezett',
  render: () => {
    const [date, setDate] = useState<Date | null>(null)
    return (
      <div className="w-72 p-6 bg-[var(--color-bg)]">
        <DatePicker
          label="Kampány kezdése"
          hint="Válassza ki a kampány indulási dátumát"
          value={date}
          onChange={setDate}
        />
        {date && (
          <p className="mt-3 text-xs font-mono text-[var(--color-text-muted)]">
            Kiválasztva: {date.toISOString().slice(0, 10)}
          </p>
        )}
      </div>
    )
  },
}

export const States: Story = {
  name: 'States · Állapotok',
  render: () => (
    <div className="flex flex-col gap-4 w-72 p-6 bg-[var(--color-bg)]">
      <DatePicker label="Alapértelmezett" placeholder="Válassz dátumot" />
      <DatePicker label="Kitöltve" value={new Date('2025-06-15')} />
      <DatePicker
        label="Hiba állapot"
        error="Ez a dátum a múltban van"
        value={new Date('2024-01-01')}
      />
      <DatePicker label="Letiltott" placeholder="Nem elérhető" disabled />
    </div>
  ),
}

export const WithMinMax: Story = {
  name: 'With Min/Max · Min/Max értékkel',
  render: () => {
    const [date, setDate] = useState<Date | null>(null)
    const today = new Date()
    const maxDate = new Date(today)
    maxDate.setDate(today.getDate() + 30)

    return (
      <div className="w-72 p-6 bg-[var(--color-bg)]">
        <DatePicker
          label="Kampány befejezése"
          hint="Csak a következő 30 napban"
          value={date}
          onChange={setDate}
          min={today}
          max={maxDate}
        />
      </div>
    )
  },
}

export const DateRangeExample: Story = {
  name: 'Date Range · Időszak-választó',
  render: () => {
    const [range, setRange] = useState<DateRange>({ from: null, to: null })
    return (
      <div className="w-80 p-6 bg-[var(--color-bg)]">
        <DateRangePicker label="Kampány időszak" value={range} onChange={setRange} />
        {(range.from || range.to) && (
          <p className="mt-3 text-xs font-mono text-[var(--color-text-muted)]">
            {range.from?.toISOString().slice(0, 10) ?? '?'} →{' '}
            {range.to?.toISOString().slice(0, 10) ?? 'folyamatban...'}
          </p>
        )}
      </div>
    )
  },
}

export const CampaignForm: Story = {
  name: 'Campaign Form · Kampányűrlap',
  render: () => {
    const [start, setStart] = useState<Date | null>(null)
    const [end, setEnd] = useState<Date | null>(null)
    return (
      <div className="w-80 p-6 bg-[var(--color-bg)]">
        <h3 className="font-display font-semibold text-sm text-[var(--color-text)] mb-4">
          Időbeosztás
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <DatePicker label="Kezdés" placeholder="Indulás" value={start} onChange={setStart} />
          <DatePicker
            label="Befejezés"
            placeholder="Vége"
            value={end}
            onChange={setEnd}
            min={start ?? undefined}
          />
        </div>
        {start && end && (
          <div className="mt-4 p-3 rounded-[var(--radius-md)] bg-[var(--color-accent-muted)] border border-[var(--color-accent)]/20">
            <p className="text-xs font-mono text-[var(--color-accent)]">
              Időszak: {Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))} nap
            </p>
          </div>
        )}
      </div>
    )
  },
}
