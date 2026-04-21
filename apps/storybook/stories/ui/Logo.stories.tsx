import type { Meta, StoryObj } from '@storybook/react'
import { Logo } from '@vikingo/ui'

const meta: Meta<typeof Logo> = {
  title: 'Display/Logo',
  component: Logo,
  parameters: { docs: { source: { type: 'code' } } },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'radio', options: ['white', 'dark'] },
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
    iconOnly: { control: 'boolean' },
    name: { control: 'text' },
  },
}
export default meta
type Story = StoryObj<typeof Logo>

export const OnDarkBackground: Story = {
  name: 'On Dark Background · Sötét háttéren',
  render: () => (
    <div
      className="flex flex-col gap-6 p-8 rounded-[var(--radius-lg)]"
      style={{ background: '#3E2E45' }}
    >
      <Logo variant="white" name="Vikingo" size="lg" />
      <Logo variant="white" name="Vikingo" size="md" />
      <Logo variant="white" name="Vikingo" size="sm" />
      <div className="flex items-center gap-4 pt-2">
        <Logo variant="white" iconOnly size="lg" />
        <Logo variant="white" iconOnly size="md" />
        <Logo variant="white" iconOnly size="sm" />
      </div>
    </div>
  ),
}

export const OnLightBackground: Story = {
  name: 'On Light Background · Világos háttéren',
  render: () => (
    <div className="flex flex-col gap-6 p-8 bg-[var(--color-bg)] rounded-[var(--radius-lg)]">
      <Logo variant="dark" name="Vikingo" size="lg" />
      <Logo variant="dark" name="Vikingo" size="md" />
      <Logo variant="dark" name="Vikingo" size="sm" />
      <div className="flex items-center gap-4 pt-2">
        <Logo variant="dark" iconOnly size="lg" />
        <Logo variant="dark" iconOnly size="md" />
        <Logo variant="dark" iconOnly size="sm" />
      </div>
    </div>
  ),
}

export const CustomName: Story = {
  name: 'Custom Name · Egyedi név',
  render: () => (
    <div className="flex flex-col gap-4 p-8 bg-[var(--color-bg)]">
      <div className="p-4 rounded-[var(--radius-lg)]" style={{ background: '#3E2E45' }}>
        <Logo variant="white" name="Fegyvertár" size="md" />
      </div>
      <div className="p-4 rounded-[var(--radius-lg)] bg-[var(--color-surface)] border border-[var(--color-border)]">
        <Logo variant="dark" name="Fegyvertár" size="md" />
      </div>
    </div>
  ),
}

export const Playground: Story = {
  name: 'Playground · Játszótér',
  args: {
    variant: 'white',
    name: 'Vikingo',
    size: 'md',
    iconOnly: false,
  },
  render: (args) => (
    <div
      className="p-8 rounded-[var(--radius-lg)]"
      style={{ background: args.variant === 'white' ? '#3E2E45' : 'var(--color-bg)' }}
    >
      <Logo {...args} />
    </div>
  ),
}
