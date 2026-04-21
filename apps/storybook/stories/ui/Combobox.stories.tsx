import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Globe, Megaphone, BarChart2 } from 'lucide-react'
import { Combobox, type ComboboxOption } from '@vikingo/ui'

const meta: Meta = {
  title: 'Forms/Combobox',
  parameters: { layout: 'centered', docs: { source: { type: 'code' } } },
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj

const PLATFORMS: ComboboxOption[] = [
  { value: 'meta', label: 'Meta Ads', icon: <Megaphone className="h-4 w-4" /> },
  { value: 'google', label: 'Google Ads', icon: <Globe className="h-4 w-4" /> },
  { value: 'tiktok', label: 'TikTok Ads', icon: <Megaphone className="h-4 w-4" /> },
  { value: 'linkedin', label: 'LinkedIn Ads', icon: <Globe className="h-4 w-4" /> },
  { value: 'twitter', label: 'X (Twitter) Ads', icon: <Globe className="h-4 w-4" /> },
  { value: 'programmatic', label: 'Programmatic', disabled: true },
]

const COUNTRIES: ComboboxOption[] = Array.from({ length: 20 }, (_, i) => ({
  value: `country-${i}`,
  label: [
    'Magyarország',
    'Németország',
    'Ausztria',
    'Románia',
    'Csehország',
    'Szlovákia',
    'Lengyelország',
    'Horvátország',
    'Szerbia',
    'Bulgária',
    'Franciaország',
    'Olaszország',
    'Spanyolország',
    'Hollandia',
    'Belgium',
    'Svájc',
    'Svédország',
    'Dánia',
    'Finnország',
    'Norvégia',
  ][i],
}))

export const Single: Story = {
  name: 'Single Select · Egyedi',
  render: () => {
    const [value, setValue] = useState<string | string[]>('')
    return (
      <div className="w-72 p-6 bg-[var(--color-bg)] flex flex-col gap-4">
        <Combobox
          options={PLATFORMS}
          value={value as string}
          onChange={setValue}
          placeholder="Platform kiválasztása"
        />
        {value && (
          <p className="text-xs text-[var(--color-text-muted)]">Kiválasztva: {value as string}</p>
        )}
      </div>
    )
  },
}

export const Multi: Story = {
  name: 'Multi Select · Többes',
  render: () => {
    const [value, setValue] = useState<string | string[]>([])
    return (
      <div className="w-72 p-6 bg-[var(--color-bg)] flex flex-col gap-4">
        <Combobox
          multiple
          options={PLATFORMS}
          value={value}
          onChange={setValue}
          placeholder="Platformok kiválasztása"
        />
        {(value as string[]).length > 0 && (
          <p className="text-xs text-[var(--color-text-muted)]">
            Kiválasztva: {(value as string[]).join(', ')}
          </p>
        )}
      </div>
    )
  },
}

export const LongList: Story = {
  name: 'Long List · Hosszú lista',
  render: () => {
    const [value, setValue] = useState<string | string[]>('')
    return (
      <div className="w-72 p-6 bg-[var(--color-bg)]">
        <Combobox
          options={COUNTRIES}
          value={value as string}
          onChange={setValue}
          placeholder="Ország kiválasztása"
          searchPlaceholder="Ország keresése..."
          emptyText="Nem található ilyen ország"
        />
      </div>
    )
  },
}

export const Sizes: Story = {
  name: 'Sizes · Méretek',
  render: () => (
    <div className="w-72 p-6 bg-[var(--color-bg)] flex flex-col gap-4">
      <Combobox options={PLATFORMS} placeholder="Small (sm)" size="sm" />
      <Combobox options={PLATFORMS} placeholder="Medium (md)" size="md" />
      <Combobox options={PLATFORMS} placeholder="Large (lg)" size="lg" />
    </div>
  ),
}
