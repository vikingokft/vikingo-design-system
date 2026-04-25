import type { Meta, StoryObj } from '@storybook/react'
import { Settings, Info, Bell } from 'lucide-react'
import { useState } from 'react'
import {
  Button,
  Checkbox,
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverClose,
  Separator,
} from '@vikingo/ui'

const meta: Meta = {
  title: 'Overlays/Popover',
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj

export const Default: Story = {
  name: 'Default · Alapértelmezett',
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary">Megnyit</Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <p className="text-sm text-[var(--color-text-muted)]">
          Ez egy általános célú Popover. Bármilyen tartalmat megjeleníthet.
        </p>
      </PopoverContent>
    </Popover>
  ),
}

export const WithHeader: Story = {
  name: 'With Header · Fejléccel',
  render: () => {
    const [autoRefresh, setAutoRefresh] = useState(true)
    const [emailNotify, setEmailNotify] = useState(false)

    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-72">
          <div className="flex flex-col gap-3">
            <div>
              <p className="font-semibold text-sm">Beállítások</p>
              <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                A kampány megjelenítési beállításai.
              </p>
            </div>
            <Separator />
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Automatikus frissítés</span>
                <Checkbox checked={autoRefresh} onCheckedChange={(v) => setAutoRefresh(!!v)} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Email értesítő</span>
                <Checkbox checked={emailNotify} onCheckedChange={(v) => setEmailNotify(!!v)} />
              </div>
            </div>
            <Separator />
            <div className="flex justify-end gap-2">
              <PopoverClose asChild>
                <Button variant="ghost" size="sm">
                  Mégse
                </Button>
              </PopoverClose>
              <PopoverClose asChild>
                <Button variant="primary" size="sm">
                  Mentés
                </Button>
              </PopoverClose>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    )
  },
}

export const InfoPopover: Story = {
  name: 'Info Popover · Információs',
  render: () => (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium">CPM</span>
      <Popover>
        <PopoverTrigger asChild>
          <button
            type="button"
            className="text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
            aria-label="Információ"
          >
            <Info className="h-4 w-4" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-64" side="top">
          <p className="text-sm font-semibold mb-1">Cost Per Mille (CPM)</p>
          <p className="text-sm text-[var(--color-text-muted)]">
            1000 megjelenítés költsége. Alacsonyabb érték hatékonyabb elérést jelent.
          </p>
        </PopoverContent>
      </Popover>
    </div>
  ),
}

export const Sides: Story = {
  name: 'Sides · Pozíciók',
  render: () => (
    <div className="grid grid-cols-3 gap-4 p-16">
      <div />
      <Popover defaultOpen>
        <PopoverTrigger asChild>
          <Button variant="secondary" size="sm">
            Top
          </Button>
        </PopoverTrigger>
        <PopoverContent side="top" className="w-36 text-center text-sm">
          Felül jelenik meg
        </PopoverContent>
      </Popover>
      <div />

      <Popover defaultOpen>
        <PopoverTrigger asChild>
          <Button variant="secondary" size="sm">
            Left
          </Button>
        </PopoverTrigger>
        <PopoverContent side="left" className="w-36 text-center text-sm">
          Balra jelenik meg
        </PopoverContent>
      </Popover>
      <div />
      <Popover defaultOpen>
        <PopoverTrigger asChild>
          <Button variant="secondary" size="sm">
            Right
          </Button>
        </PopoverTrigger>
        <PopoverContent side="right" className="w-36 text-center text-sm">
          Jobbra jelenik meg
        </PopoverContent>
      </Popover>

      <div />
      <Popover defaultOpen>
        <PopoverTrigger asChild>
          <Button variant="secondary" size="sm">
            Bottom
          </Button>
        </PopoverTrigger>
        <PopoverContent side="bottom" className="w-36 text-center text-sm">
          Alul jelenik meg
        </PopoverContent>
      </Popover>
      <div />
    </div>
  ),
}

export const NotificationPanel: Story = {
  name: 'Notification Panel · Értesítési panel',
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon">
          <Bell className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="px-4 py-3 border-b border-[var(--color-border)]">
          <p className="font-semibold text-sm">Értesítések</p>
        </div>
        {[
          { title: 'Kampány aktiválva', time: '2 perce', accent: true },
          { title: 'Büdzsé 80%-on', time: '1 órája', accent: false },
          { title: 'Heti riport elkészült', time: 'tegnap', accent: false },
        ].map((n, i) => (
          <div
            key={i}
            className="flex items-start gap-3 px-4 py-3 hover:bg-[var(--color-bg)] transition-colors border-b border-[var(--color-border)] last:border-0"
          >
            {n.accent && (
              <span className="mt-1.5 h-2 w-2 rounded-full bg-[var(--color-accent)] shrink-0" />
            )}
            {!n.accent && <span className="mt-1.5 h-2 w-2 shrink-0" />}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium">{n.title}</p>
              <p className="text-xs text-[var(--color-text-muted)]">{n.time}</p>
            </div>
          </div>
        ))}
      </PopoverContent>
    </Popover>
  ),
}
