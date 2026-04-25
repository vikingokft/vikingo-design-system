import type { Meta, StoryObj } from '@storybook/react'
import { CopyButton } from '@vikingo/ui'

const meta: Meta<typeof CopyButton> = {
  title: 'Forms/CopyButton',
  component: CopyButton,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof CopyButton>

export const Default: Story = {
  name: 'Default · Alapértelmezett',
  args: { value: 'npm install @vikingo/ui' },
}

export const IconOnly: Story = {
  name: 'Icon Only · Csak ikon',
  args: { value: 'https://vikingo-storybook.vercel.app', iconOnly: true },
}

export const CustomLabels: Story = {
  name: 'Custom Labels · Egyéni feliratok',
  args: {
    value: 'secret-api-key-12345',
    label: 'API kulcs másolása',
    copiedLabel: 'Másolva!',
  },
}

export const Disabled: Story = {
  name: 'Disabled · Letiltott',
  args: { value: 'valami', disabled: true },
}

export const InContext: Story = {
  name: 'In Context · Kontextusban',
  render: () => (
    <div className="flex items-center gap-2 px-3 py-2 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] w-80">
      <code className="flex-1 text-sm font-mono text-[var(--color-text-muted)] truncate">
        pnpm add github:Vitaio/vikingo-design-system
      </code>
      <CopyButton value="pnpm add github:Vitaio/vikingo-design-system" iconOnly />
    </div>
  ),
}

export const AllVariants: Story = {
  name: 'All Variants · Összes változat',
  render: () => (
    <div className="flex flex-col gap-4 p-6 bg-[var(--color-bg)]">
      <div className="flex items-center gap-3">
        <CopyButton value="szöveg" />
        <span className="text-sm text-[var(--color-text-muted)]">Szöveges gomb</span>
      </div>
      <div className="flex items-center gap-3">
        <CopyButton value="szöveg" iconOnly />
        <span className="text-sm text-[var(--color-text-muted)]">Csak ikon</span>
      </div>
      <div className="flex items-center gap-3">
        <CopyButton value="szöveg" disabled />
        <span className="text-sm text-[var(--color-text-muted)]">Letiltott</span>
      </div>
    </div>
  ),
}
