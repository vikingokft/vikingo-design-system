import type { Meta, StoryObj } from '@storybook/react'
import { Bell, Search, Plus } from 'lucide-react'
import { Topbar, Button, Avatar, AvatarFallback, Badge, Logo } from '@vikingo/ui'

const meta: Meta<typeof Topbar> = {
  title: 'Layout/Topbar',
  component: Topbar,
  parameters: {
    layout: 'fullscreen',
    docs: { source: { type: 'code' } },
  },
  decorators: [
    (Story) => (
      <div className="bg-[var(--color-bg)] min-h-32">
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof Topbar>

export const Default: Story = {
  name: 'Default · Alapértelmezett',
  render: () => (
    <Topbar
      left={
        <h1 className="font-display font-semibold text-lg text-[var(--color-text)]">Dashboard</h1>
      }
      right={
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="icon-sm">
            <Bell className="h-4 w-4" />
          </Button>
          <Button size="sm">Új kampány</Button>
        </div>
      }
    />
  ),
}

export const WithAvatar: Story = {
  name: 'With Avatar · Avatarral',
  render: () => (
    <Topbar
      left={
        <h1 className="font-display font-semibold text-lg text-[var(--color-text)]">Kampányok</h1>
      }
      right={
        <div className="flex items-center gap-2">
          <div className="relative">
            <Button variant="secondary" size="icon-sm">
              <Bell className="h-4 w-4" />
            </Button>
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-[var(--color-accent)] text-white text-[10px] font-mono font-semibold flex items-center justify-center">
              5
            </span>
          </div>
          <Avatar size="sm">
            <AvatarFallback>NB</AvatarFallback>
          </Avatar>
        </div>
      }
    />
  ),
}

export const WithLogo: Story = {
  name: 'With Logo · Logóval',
  render: () => (
    <Topbar
      left={<Logo variant="dark" name="Vikingo" size="sm" />}
      right={
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon-sm">
            <Search className="h-4 w-4" />
          </Button>
          <Button variant="secondary" size="icon-sm">
            <Bell className="h-4 w-4" />
          </Button>
          <Button size="sm" leftIcon={<Plus className="h-4 w-4" />}>
            Új
          </Button>
        </div>
      }
    />
  ),
}

export const WithBadges: Story = {
  name: 'With Badges · Badge-dzsel',
  render: () => (
    <Topbar
      left={
        <div className="flex items-center gap-3">
          <h1 className="font-display font-semibold text-lg text-[var(--color-text)]">Összesítő</h1>
          <Badge variant="success" dot>
            Élő
          </Badge>
        </div>
      }
      right={
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm">
            Exportálás
          </Button>
          <Button size="sm" leftIcon={<Plus className="h-4 w-4" />}>
            Új kampány
          </Button>
        </div>
      }
    />
  ),
}

export const Minimal: Story = {
  name: 'Minimal · Minimális',
  render: () => (
    <Topbar
      right={
        <Avatar size="sm">
          <AvatarFallback>NB</AvatarFallback>
        </Avatar>
      }
    />
  ),
}
