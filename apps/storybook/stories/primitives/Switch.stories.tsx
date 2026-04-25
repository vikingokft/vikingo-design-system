import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Switch } from '@vikingo/ui'

const meta: Meta = {
  title: 'Forms/Switch',
  parameters: { layout: 'centered', docs: { source: { type: 'code' } } },
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj

export const States: Story = {
  name: 'States · Állapotok',
  render: () => (
    <div className="flex flex-col gap-4 p-4 bg-[var(--color-bg)]">
      <div className="flex items-center gap-2">
        <Switch defaultChecked={false} />
        <span className="text-sm text-[var(--color-text)]">Ki</span>
      </div>
      <div className="flex items-center gap-2">
        <Switch defaultChecked={true} />
        <span className="text-sm text-[var(--color-text)]">Be</span>
      </div>
      <div className="flex items-center gap-2 opacity-50">
        <Switch disabled />
        <span className="text-sm text-[var(--color-text)]">Letiltott</span>
      </div>
      <div className="flex items-center gap-2 opacity-50">
        <Switch disabled defaultChecked />
        <span className="text-sm text-[var(--color-text)]">Letiltott (be)</span>
      </div>
    </div>
  ),
}

export const SettingsList: Story = {
  name: 'Settings List · Beállítási lista',
  render: () => {
    const [settings, setSettings] = useState({
      email: true,
      push: false,
      weekly: true,
      marketing: false,
    })

    const toggle = (key: keyof typeof settings) =>
      setSettings((prev) => ({ ...prev, [key]: !prev[key] }))

    const items = [
      { key: 'email' as const, label: 'E-mail értesítések', desc: 'Kampány teljesítményről' },
      { key: 'push' as const, label: 'Push értesítések', desc: 'Böngésző push üzenetek' },
      { key: 'weekly' as const, label: 'Heti összefoglaló', desc: 'Minden hétfőn reggel' },
      { key: 'marketing' as const, label: 'Marketing levelek', desc: 'Termékhírek és tippek' },
    ]

    return (
      <div className="w-80 p-4 bg-[var(--color-bg)]">
        <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] overflow-hidden bg-[var(--color-surface)]">
          {items.map((item, i) => (
            <div
              key={item.key}
              className={[
                'flex items-center justify-between px-4 py-3',
                i < items.length - 1 && 'border-b border-[var(--color-border)]',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              <div>
                <p className="text-sm font-medium text-[var(--color-text)]">{item.label}</p>
                <p className="text-xs text-[var(--color-text-muted)]">{item.desc}</p>
              </div>
              <Switch checked={settings[item.key]} onCheckedChange={() => toggle(item.key)} />
            </div>
          ))}
        </div>
      </div>
    )
  },
}
