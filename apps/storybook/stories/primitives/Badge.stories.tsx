import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from '@vikingo/ui'

const meta: Meta<typeof Badge> = {
  title: 'Display/Badge',
  component: Badge,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof Badge>

export const Default: Story = {
  name: 'Default · Alapértelmezett',
  args: { children: 'Badge', variant: 'default' },
}
export const Accent: Story = {
  name: 'Accent · Kiemelő',
  args: { children: 'Aktív', variant: 'accent' },
}
export const Success: Story = {
  name: 'Success · Sikeres',
  args: { children: 'Sikeres', variant: 'success' },
}
export const Warning: Story = {
  name: 'Warning · Figyelmeztetés',
  args: { children: 'Figyelmeztetés', variant: 'warning' },
}
export const ErrorVariant: Story = {
  name: 'Error · Hiba',
  args: { children: 'Hiba', variant: 'error' },
}

export const AllVariants: Story = {
  name: 'All Variants · Összes variáns',
  render: () => (
    <div className="flex flex-wrap items-center gap-3 p-4 bg-[var(--color-bg)]">
      <Badge variant="default">Default</Badge>
      <Badge variant="accent" dot>
        Accent
      </Badge>
      <Badge variant="success" dot>
        Success
      </Badge>
      <Badge variant="warning" dot>
        Warning
      </Badge>
      <Badge variant="error" dot>
        Error
      </Badge>
      <Badge variant="info" dot>
        Info
      </Badge>
      <Badge variant="solid">Solid</Badge>
      <Badge variant="dark">Dark</Badge>
    </div>
  ),
}
