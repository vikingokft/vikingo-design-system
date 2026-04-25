import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import {
  LayoutDashboard,
  Megaphone,
  BarChart2,
  Settings,
  HelpCircle,
  Plus,
  Edit,
  Trash2,
  Bell,
  Users,
  Search,
} from 'lucide-react'
import {
  CommandPalette,
  CommandPaletteTrigger,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandEmpty,
  Button,
} from '@vikingo/ui'

const meta: Meta = {
  title: 'Overlays/Command Palette',
  parameters: {
    layout: 'centered',
    docs: { source: { type: 'code' } },
  },
  decorators: [
    (Story) => (
      <div className="p-8 bg-[var(--color-bg)]">
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj

export const Default: Story = {
  name: 'Default · Alapértelmezett',
  render: () => {
    const [open, setOpen] = useState(false)

    return (
      <CommandPalette trigger={<CommandPaletteTrigger />} open={open} onOpenChange={setOpen}>
        <CommandGroup label="Navigáció">
          <CommandItem value="Dashboard" icon={<LayoutDashboard className="h-4 w-4" />} hint="⌘1">
            Dashboard
          </CommandItem>
          <CommandItem value="Kampányok" icon={<Megaphone className="h-4 w-4" />} hint="⌘2">
            Kampányok
          </CommandItem>
          <CommandItem value="Analitika" icon={<BarChart2 className="h-4 w-4" />} hint="⌘3">
            Analitika
          </CommandItem>
          <CommandItem value="Felhasználók" icon={<Users className="h-4 w-4" />}>
            Felhasználók
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup label="Műveletek">
          <CommandItem value="Új kampány létrehozása" icon={<Plus className="h-4 w-4" />} hint="⌘N">
            Új kampány létrehozása
          </CommandItem>
          <CommandItem value="Kampány szerkesztése" icon={<Edit className="h-4 w-4" />}>
            Kampány szerkesztése
          </CommandItem>
          <CommandItem value="Kampány törlése" icon={<Trash2 className="h-4 w-4" />}>
            Kampány törlése
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup label="Beállítások">
          <CommandItem value="Értesítések beállítása" icon={<Bell className="h-4 w-4" />}>
            Értesítések beállítása
          </CommandItem>
          <CommandItem
            value="Beállítások megnyitása"
            icon={<Settings className="h-4 w-4" />}
            hint="⌘,"
          >
            Beállítások megnyitása
          </CommandItem>
          <CommandItem value="Súgó" icon={<HelpCircle className="h-4 w-4" />} hint="?">
            Súgó
          </CommandItem>
        </CommandGroup>

        <CommandEmpty />
      </CommandPalette>
    )
  },
}

export const WithKeyboardShortcut: Story = {
  name: 'With Keyboard Shortcut · Billentyűparanccsal',
  render: () => {
    const [open, setOpen] = useState(false)

    // Cmd+K listener
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setOpen(true)
      }
    }

    return (
      <div onKeyDown={handleKeyDown} tabIndex={0} className="outline-none">
        <CommandPalette trigger={<CommandPaletteTrigger />} open={open} onOpenChange={setOpen}>
          <CommandGroup label="Navigáció">
            <CommandItem value="Dashboard" icon={<LayoutDashboard className="h-4 w-4" />}>
              Dashboard
            </CommandItem>
            <CommandItem value="Kampányok" icon={<Megaphone className="h-4 w-4" />}>
              Kampányok
            </CommandItem>
            <CommandItem value="Analitika" icon={<BarChart2 className="h-4 w-4" />}>
              Analitika
            </CommandItem>
          </CommandGroup>

          <CommandEmpty />
        </CommandPalette>

        <p className="mt-3 text-xs text-[var(--color-text-muted)] text-center">
          Kattints a gombra vagy nyomj ⌘K-t a megnyitáshoz
        </p>
      </div>
    )
  },
}

export const CustomTrigger: Story = {
  name: 'Custom Trigger · Egyedi trigger',
  render: () => {
    const [open, setOpen] = useState(false)

    return (
      <CommandPalette
        trigger={
          <div className="flex items-center gap-2">
            <CommandPaletteTrigger>
              <Button variant="secondary" size="sm" leftIcon={<Search className="h-4 w-4" />}>
                Keresés…
              </Button>
            </CommandPaletteTrigger>
            <span className="text-xs text-[var(--color-text-muted)]">vagy nyomj ⌘K-t</span>
          </div>
        }
        open={open}
        onOpenChange={setOpen}
      >
        <CommandGroup label="Gyors elérés">
          <CommandItem value="Dashboard" icon={<LayoutDashboard className="h-4 w-4" />}>
            Dashboard
          </CommandItem>
          <CommandItem value="Kampányok" icon={<Megaphone className="h-4 w-4" />}>
            Kampányok
          </CommandItem>
          <CommandItem value="Új kampány" icon={<Plus className="h-4 w-4" />}>
            Új kampány létrehozása
          </CommandItem>
          <CommandItem value="Beállítások" icon={<Settings className="h-4 w-4" />}>
            Beállítások
          </CommandItem>
        </CommandGroup>

        <CommandEmpty>Nincs találat a keresésre.</CommandEmpty>
      </CommandPalette>
    )
  },
}
