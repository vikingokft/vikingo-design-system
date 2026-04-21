import type { Meta, StoryObj } from '@storybook/react'
import { Avatar, AvatarImage, AvatarFallback } from '@vikingo/ui'

const meta: Meta = {
  title: 'Display/Avatar',
  parameters: { layout: 'centered', docs: { source: { type: 'code' } } },
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj

export const Sizes: Story = {
  name: 'Sizes · Méretek',
  render: () => (
    <div className="flex items-end gap-4 p-4 bg-[var(--color-bg)]">
      <div className="flex flex-col items-center gap-2">
        <Avatar size="sm">
          <AvatarFallback>NB</AvatarFallback>
        </Avatar>
        <span className="text-xs text-[var(--color-text-muted)] font-mono">sm</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Avatar size="md">
          <AvatarFallback>NB</AvatarFallback>
        </Avatar>
        <span className="text-xs text-[var(--color-text-muted)] font-mono">md</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Avatar size="lg">
          <AvatarFallback>NB</AvatarFallback>
        </Avatar>
        <span className="text-xs text-[var(--color-text-muted)] font-mono">lg</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Avatar size="xl">
          <AvatarFallback>NB</AvatarFallback>
        </Avatar>
        <span className="text-xs text-[var(--color-text-muted)] font-mono">xl</span>
      </div>
    </div>
  ),
}

export const WithImage: Story = {
  name: 'With Image · Képpel',
  render: () => (
    <div className="flex items-center gap-4 p-4 bg-[var(--color-bg)]">
      <div className="flex flex-col items-center gap-2">
        <Avatar size="lg">
          <AvatarImage src="https://i.pravatar.cc/100?img=1" alt="Felhasználó" />
          <AvatarFallback>AB</AvatarFallback>
        </Avatar>
        <span className="text-xs text-[var(--color-text-muted)]">képpel</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Avatar size="lg">
          <AvatarImage src="https://invalid-url.xyz/404.jpg" alt="Fallback" />
          <AvatarFallback>NB</AvatarFallback>
        </Avatar>
        <span className="text-xs text-[var(--color-text-muted)]">fallback</span>
      </div>
    </div>
  ),
}

export const AvatarGroup: Story = {
  name: 'Avatar Group · Avatar-csoport',
  render: () => (
    <div className="flex items-center p-4 bg-[var(--color-bg)]">
      <Avatar size="md" className="-ml-0">
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
      <Avatar size="md" className="-ml-3 ring-2 ring-[var(--color-bg)]">
        <AvatarFallback>CD</AvatarFallback>
      </Avatar>
      <Avatar size="md" className="-ml-3 ring-2 ring-[var(--color-bg)]">
        <AvatarFallback>EF</AvatarFallback>
      </Avatar>
      <Avatar size="md" className="-ml-3 ring-2 ring-[var(--color-bg)]">
        <AvatarFallback>+5</AvatarFallback>
      </Avatar>
    </div>
  ),
}
