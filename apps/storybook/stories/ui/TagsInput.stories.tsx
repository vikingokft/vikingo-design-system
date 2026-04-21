import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { TagsInput } from '@vikingo/ui'

const meta: Meta<typeof TagsInput> = {
  title: 'Forms/TagsInput',
  component: TagsInput,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof TagsInput>

export const Default: Story = {
  name: 'Default · Alapértelmezett',
  args: {
    label: 'Cimkék',
    placeholder: 'Írj és nyomj Entert…',
    defaultValue: [],
  },
}

export const WithValues: Story = {
  name: 'With Values · Feltöltve',
  args: {
    label: 'Kampány témák',
    defaultValue: ['nyár', 'akció', '2025'],
    placeholder: 'Újabb téma…',
  },
}

export const WithHint: Story = {
  name: 'With Hint · Tippel',
  args: {
    label: 'Email címek',
    placeholder: 'nev@domain.hu',
    hint: 'Enter vagy vessző lenyomásával add hozzá.',
  },
}

export const ErrorState: Story = {
  name: 'Error State · Hiba állapot',
  args: {
    label: 'Kulcsszavak',
    defaultValue: ['hiba'],
    error: true,
    hint: 'Legalább 3 kulcsszó szükséges.',
  },
}

export const WithMax: Story = {
  name: 'Max Tags · Max. limit',
  args: {
    label: 'Célközönség (max. 3)',
    defaultValue: ['fiatalok', 'sportolók'],
    max: 3,
    hint: 'Maximum 3 cimke adható meg.',
  },
}

export const Disabled: Story = {
  name: 'Disabled · Letiltott',
  args: {
    label: 'Cimkék',
    value: ['olvasható', 'csak'],
    disabled: true,
  },
}

export const Controlled: Story = {
  name: 'Controlled · Kontrollált',
  render: () => {
    const [tags, setTags] = useState(['design', 'system'])
    return (
      <div className="flex flex-col gap-3 w-80">
        <TagsInput
          label="Kontrollált cimkék"
          value={tags}
          onChange={setTags}
          placeholder="Új cimke…"
          hint="Enter vagy vesszővel adj hozzá."
        />
        <p className="text-xs text-[var(--color-text-muted)]">Cimkék: {tags.join(', ') || '–'}</p>
      </div>
    )
  },
}

export const AllStates: Story = {
  name: 'All States · Összes állapot',
  render: () => (
    <div className="flex flex-col gap-4 w-80 p-6 bg-[var(--color-bg)]">
      <TagsInput label="Alapértelmezett" placeholder="Cimke hozzáadása…" />
      <TagsInput label="Feltöltve" defaultValue={['vue', 'react', 'svelte']} />
      <TagsInput label="Hiba állapot" defaultValue={['hibás']} error hint="Javítás szükséges." />
      <TagsInput label="Letiltott" value={['nem', 'szerkeszthető']} disabled />
    </div>
  ),
}
