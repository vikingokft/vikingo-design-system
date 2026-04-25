import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { NumberInput } from '@vikingo/ui'

const meta: Meta<typeof NumberInput> = {
  title: 'Forms/NumberInput',
  component: NumberInput,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof NumberInput>

export const Default: Story = {
  name: 'Default · Alapértelmezett',
  args: { label: 'Mennyiség', defaultValue: 1 },
}

export const WithMinMax: Story = {
  name: 'Min / Max · Korlátokkal',
  args: {
    label: 'Vendégek száma',
    defaultValue: 2,
    min: 1,
    max: 10,
    hint: '1–10 fő lehetséges.',
  },
}

export const WithStep: Story = {
  name: 'Custom Step · Egyéni lépés',
  args: {
    label: 'Összeg (HUF)',
    defaultValue: 1000,
    step: 500,
    min: 0,
    hint: '500 Ft-os lépésekben.',
  },
}

export const ErrorState: Story = {
  name: 'Error State · Hiba állapot',
  args: {
    label: 'Darabszám',
    defaultValue: 0,
    min: 1,
    error: true,
    hint: 'Legalább 1 darab szükséges.',
  },
}

export const Disabled: Story = {
  name: 'Disabled · Letiltott',
  args: {
    label: 'Készlet',
    value: 5,
    disabled: true,
    hint: 'Csak olvasható.',
  },
}

export const Controlled: Story = {
  name: 'Controlled · Kontrollált',
  render: () => {
    const [val, setVal] = useState(3)
    return (
      <div className="flex flex-col gap-3 w-64">
        <NumberInput label="Kontrollált érték" value={val} onChange={setVal} min={0} max={20} />
        <p className="text-sm text-[var(--color-text-muted)]">Jelenlegi érték: {val}</p>
      </div>
    )
  },
}

export const AllStates: Story = {
  name: 'All States · Összes állapot',
  render: () => (
    <div className="flex flex-col gap-4 w-72 p-6 bg-[var(--color-bg)]">
      <NumberInput label="Alapértelmezett" defaultValue={1} />
      <NumberInput label="Korlátokkal (1–10)" defaultValue={5} min={1} max={10} />
      <NumberInput label="Hiba állapot" defaultValue={0} min={1} error hint="Kötelező mező." />
      <NumberInput label="Letiltott" value={3} disabled />
    </div>
  ),
}
