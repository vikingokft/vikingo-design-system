import type { Meta, StoryObj } from '@storybook/react'
import { Download, Plus, Trash2 } from 'lucide-react'
import { Button } from '@vikingo/ui'

const meta: Meta<typeof Button> = {
  title: 'Forms/Button',
  component: Button,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'destructive', 'outline', 'link'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'icon', 'icon-sm'],
    },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
}
export default meta

type Story = StoryObj<typeof Button>

export const Primary: Story = {
  name: 'Primary · Elsődleges',
  args: { children: 'Mentés', variant: 'primary' },
}

export const Secondary: Story = {
  name: 'Secondary · Másodlagos',
  args: { children: 'Mégse', variant: 'secondary' },
}

export const Ghost: Story = {
  name: 'Ghost · Áttetsző',
  args: { children: 'Szerkesztés', variant: 'ghost' },
}

export const Destructive: Story = {
  name: 'Destructive · Veszélyes',
  args: { children: 'Törlés', variant: 'destructive' },
}

export const Loading: Story = {
  name: 'Loading · Betöltés',
  args: { children: 'Mentés folyamatban', loading: true },
}

export const WithLeftIcon: Story = {
  name: 'With Left Icon · Bal ikonnal',
  args: {
    children: 'Letöltés',
    leftIcon: <Download className="h-4 w-4" />,
  },
}

export const WithRightIcon: Story = {
  name: 'With Right Icon · Jobb ikonnal',
  args: {
    children: 'Új elem',
    rightIcon: <Plus className="h-4 w-4" />,
  },
}

export const AllVariants: Story = {
  name: 'All Variants · Összes variáns',
  render: () => (
    <div className="flex flex-wrap items-center gap-3 p-4 bg-[var(--color-bg)]">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="destructive" leftIcon={<Trash2 className="h-4 w-4" />}>
        Destructive
      </Button>
      <Button variant="link">Link</Button>
    </div>
  ),
}

export const AllSizes: Story = {
  name: 'All Sizes · Összes méret',
  render: () => (
    <div className="flex flex-wrap items-end gap-3 p-4 bg-[var(--color-bg)]">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">XLarge</Button>
    </div>
  ),
}
