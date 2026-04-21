import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Checkbox } from '@vikingo/ui'

const meta: Meta = {
  title: 'Forms/Checkbox',
  parameters: { layout: 'centered', docs: { source: { type: 'code' } } },
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj

export const States: Story = {
  name: 'States · Állapotok',
  render: () => (
    <div className="flex flex-col gap-4 p-4 bg-[var(--color-bg)]">
      <label className="flex items-center gap-2 cursor-pointer">
        <Checkbox defaultChecked={false} />
        <span className="text-sm text-[var(--color-text)]">Nem jelölt</span>
      </label>
      <label className="flex items-center gap-2 cursor-pointer">
        <Checkbox defaultChecked={true} />
        <span className="text-sm text-[var(--color-text)]">Jelölt</span>
      </label>
      <label className="flex items-center gap-2 cursor-pointer">
        <Checkbox indeterminate />
        <span className="text-sm text-[var(--color-text)]">Részlegesen jelölt</span>
      </label>
      <label className="flex items-center gap-2 cursor-not-allowed opacity-50">
        <Checkbox disabled />
        <span className="text-sm text-[var(--color-text)]">Letiltott</span>
      </label>
    </div>
  ),
}

export const TableHeader: Story = {
  name: 'Table Header · Táblázat fejléc',
  render: () => {
    const [selected, setSelected] = useState<string[]>([])
    const rows = ['Facebook Ads', 'Google Ads', 'TikTok Ads', 'Instagram Ads']
    const allChecked = selected.length === rows.length
    const someChecked = selected.length > 0 && !allChecked

    function toggleAll() {
      setSelected(allChecked ? [] : rows)
    }

    function toggleRow(name: string) {
      setSelected((prev) =>
        prev.includes(name) ? prev.filter((r) => r !== name) : [...prev, name],
      )
    }

    return (
      <div className="w-72 p-4 bg-[var(--color-bg)]">
        <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] overflow-hidden bg-[var(--color-surface)]">
          <div className="flex items-center gap-3 px-4 py-3 border-b border-[var(--color-border)] bg-[var(--color-bg)]">
            <Checkbox
              checked={allChecked}
              indeterminate={someChecked}
              onCheckedChange={toggleAll}
            />
            <span className="text-xs font-mono font-medium text-[var(--color-text-muted)] uppercase tracking-wider">
              Kampány neve
            </span>
          </div>
          {rows.map((row) => (
            <label
              key={row}
              className="flex items-center gap-3 px-4 py-3 border-b last:border-0 border-[var(--color-border)] cursor-pointer hover:bg-[var(--color-bg)]/50 transition-colors"
            >
              <Checkbox checked={selected.includes(row)} onCheckedChange={() => toggleRow(row)} />
              <span className="text-sm text-[var(--color-text)]">{row}</span>
            </label>
          ))}
        </div>
        {selected.length > 0 && (
          <p className="mt-2 text-xs text-[var(--color-text-muted)] font-mono">
            {selected.length} kijelölve
          </p>
        )}
      </div>
    )
  },
}
