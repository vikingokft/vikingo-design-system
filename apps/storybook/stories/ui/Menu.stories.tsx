import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import {
  MoreHorizontal,
  Edit,
  Copy,
  Trash2,
  Pause,
  Play,
  Download,
  Share2,
  Tag,
  AlertTriangle,
  ChevronDown,
  Settings,
  LogOut,
  User,
  Bell,
  CreditCard,
  BarChart2,
  Filter,
  SortAsc,
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  Button,
  Badge,
  Avatar,
  AvatarFallback,
} from '@vikingo/ui'

const meta: Meta = {
  title: 'Overlays/Menu',
  parameters: { layout: 'centered', docs: { source: { type: 'code' } } },
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj

// ── Context Menu (row actions) ───────────────────────────────────────────────

export const ContextMenu: Story = {
  name: 'Context Menu · Kontextusmenü',
  render: () => (
    <div className="p-6 bg-[var(--color-bg)]">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon-sm">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem>
            <Edit className="h-4 w-4" />
            Szerkesztés
            <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Copy className="h-4 w-4" />
            Másolás
            <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Share2 className="h-4 w-4" />
            Megosztás
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Pause className="h-4 w-4" />
            Szüneteltetés
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Download className="h-4 w-4" />
            Exportálás
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem destructive>
            <Trash2 className="h-4 w-4" />
            Törlés
            <DropdownMenuShortcut>⌫</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  ),
}

// ── User Menu ────────────────────────────────────────────────────────────────

export const UserMenu: Story = {
  name: 'User Menu · Felhasználói menü',
  render: () => (
    <div className="p-6 bg-[var(--color-bg)]">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-2.5 px-3 py-1.5 rounded-[var(--radius-md)] hover:bg-[var(--color-surface)] transition-colors">
            <Avatar size="sm">
              <AvatarFallback>NB</AvatarFallback>
            </Avatar>
            <div className="text-left hidden sm:block">
              <p className="text-sm font-medium text-[var(--color-text)]">Nagy Bence</p>
              <p className="text-xs text-[var(--color-text-muted)]">admin</p>
            </div>
            <ChevronDown className="h-3.5 w-3.5 text-[var(--color-text-muted)]" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col gap-0.5">
              <p className="text-sm font-semibold text-[var(--color-text)]">Nagy Bence</p>
              <p className="text-xs font-mono text-[var(--color-text-muted)]">bence@vikingo.hu</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <User className="h-4 w-4" />
              Profilom
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CreditCard className="h-4 w-4" />
              Számlázás
              <Badge variant="accent" size="sm" className="ml-auto">
                Pro
              </Badge>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Bell className="h-4 w-4" />
              Értesítések
              <Badge variant="error" size="sm" className="ml-auto">
                12
              </Badge>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="h-4 w-4" />
              Beállítások
              <DropdownMenuShortcut>⌘,</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem destructive>
            <LogOut className="h-4 w-4" />
            Kijelentkezés
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  ),
}

// ── Campaign Actions Menu ────────────────────────────────────────────────────

export const CampaignActions: Story = {
  name: 'Campaign Actions · Kampányműveletek',
  render: () => {
    const [status, setStatus] = useState('active')
    return (
      <div className="p-6 bg-[var(--color-bg)]">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button>
              Műveletek
              <ChevronDown className="h-4 w-4 ml-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-52">
            <DropdownMenuLabel>Kampány státusz</DropdownMenuLabel>
            <DropdownMenuRadioGroup value={status} onValueChange={setStatus}>
              <DropdownMenuRadioItem value="active">
                <Play className="h-4 w-4 mr-1.5" />
                Aktív
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="paused">
                <Pause className="h-4 w-4 mr-1.5" />
                Szüneteltetve
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Műveletek</DropdownMenuLabel>
            <DropdownMenuItem>
              <Edit className="h-4 w-4" />
              Kampány szerkesztése
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Copy className="h-4 w-4" />
              Duplikálás
            </DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <Download className="h-4 w-4" />
                Exportálás
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem>PDF riport</DropdownMenuItem>
                <DropdownMenuItem>CSV adatok</DropdownMenuItem>
                <DropdownMenuItem>Excel formátum</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuSeparator />
            <DropdownMenuItem destructive>
              <Trash2 className="h-4 w-4" />
              Kampány törlése
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    )
  },
}

// ── Table Filter Menu ─────────────────────────────────────────────────────────

export const FilterMenu: Story = {
  name: 'Filter Menu · Szűrőmenü',
  render: () => {
    const [columns, setColumns] = useState({
      spend: true,
      conversions: true,
      roas: true,
      ctr: false,
      cpc: false,
    })

    const toggle = (key: keyof typeof columns) => setColumns((c) => ({ ...c, [key]: !c[key] }))

    const [sort, setSort] = useState('spend')

    return (
      <div className="flex items-center gap-2 p-6 bg-[var(--color-bg)]">
        {/* Column visibility */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="sm">
              <BarChart2 className="h-3.5 w-3.5" />
              Oszlopok
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-44">
            <DropdownMenuLabel>Megjelenített oszlopok</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {Object.entries(columns).map(([key, checked]) => (
              <DropdownMenuCheckboxItem
                key={key}
                checked={checked}
                onCheckedChange={() => toggle(key as keyof typeof columns)}
              >
                {key.toUpperCase()}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Sort */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="sm">
              <SortAsc className="h-3.5 w-3.5" />
              Rendezés
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-44">
            <DropdownMenuLabel>Rendezés alapja</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup value={sort} onValueChange={setSort}>
              <DropdownMenuRadioItem value="spend">Büdzsé (csökkentő)</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="conversions">Konverziók</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="roas">ROAS</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="name">Név (A–Z)</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    )
  },
}

// ── Nested Submenu ───────────────────────────────────────────────────────────

export const WithSubmenu: Story = {
  name: 'With Submenu · Almenüvel',
  render: () => (
    <div className="p-6 bg-[var(--color-bg)]">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary">
            <Tag className="h-4 w-4" />
            Több lehetőség
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-52">
          <DropdownMenuItem>
            <Edit className="h-4 w-4" />
            Szerkesztés
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Share2 className="h-4 w-4" />
              Megosztás
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem>Linkként másolás</DropdownMenuItem>
              <DropdownMenuItem>E-mailben küldés</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Csapattaggal megosztás</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Download className="h-4 w-4" />
              Exportálás
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem>PDF riport</DropdownMenuItem>
              <DropdownMenuItem>CSV adatok</DropdownMenuItem>
              <DropdownMenuItem>Excel (.xlsx)</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Tag className="h-4 w-4" />
            Tag hozzáadása
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem destructive>
            <AlertTriangle className="h-4 w-4" />
            Archiválás
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  ),
}
