import type { Meta, StoryObj } from '@storybook/react'
import { Search, Mail, Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { Input } from '@vikingo/ui'

const meta: Meta<typeof Input> = {
  title: 'Forms/Input',
  component: Input,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof Input>

export const Default: Story = {
  name: 'Default · Alapértelmezett',
  args: { label: 'Kampány neve', placeholder: 'pl. Nyári akció 2025' },
}

export const WithHint: Story = {
  name: 'With Hint · Tippel',
  args: {
    label: 'Email cím',
    placeholder: 'nev@vallalat.hu',
    hint: 'A visszaigazolót erre a címre küldjük.',
    leftIcon: <Mail className="h-4 w-4" />,
  },
}

export const ErrorState: Story = {
  name: 'Error State · Hiba állapot',
  args: {
    label: 'Email cím',
    placeholder: 'nev@vallalat.hu',
    value: 'nem-valid-email',
    error: true,
    hint: 'Érvénytelen email cím.',
    leftIcon: <Mail className="h-4 w-4" />,
  },
}

export const Disabled: Story = {
  name: 'Disabled · Letiltott',
  args: {
    label: 'Felhasználónév',
    value: 'nagybence',
    disabled: true,
    hint: 'A felhasználónév nem módosítható.',
  },
}

export const SearchInput: Story = {
  name: 'Search · Keresőmező',
  args: {
    placeholder: 'Kampányok keresése…',
    leftIcon: <Search className="h-4 w-4" />,
    type: 'search',
  },
}

export const PasswordToggle: Story = {
  name: 'Password Toggle · Jelszóváltó',
  render: () => {
    const [show, setShow] = useState(false)
    return (
      <Input
        label="Jelszó"
        type={show ? 'text' : 'password'}
        placeholder="••••••••"
        rightIcon={
          <button
            type="button"
            onClick={() => setShow((v) => !v)}
            className="pointer-events-auto text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
          >
            {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        }
      />
    )
  },
}

export const AllStates: Story = {
  name: 'All States · Összes állapot',
  render: () => (
    <div className="flex flex-col gap-4 w-80 p-6 bg-[var(--color-bg)]">
      <Input label="Alapértelmezett" placeholder="Szöveg beírása…" />
      <Input label="Bal ikonnal" placeholder="Keresés…" leftIcon={<Search className="h-4 w-4" />} />
      <Input label="Hiba állapot" value="hibás érték" error hint="Kötelező mező." />
      <Input label="Letiltott" value="nem szerkeszthető" disabled />
    </div>
  ),
}
