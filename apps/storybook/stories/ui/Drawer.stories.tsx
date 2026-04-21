import type { Meta, StoryObj } from '@storybook/react'
import { Settings, SlidersHorizontal, Copy, BarChart2, Pencil, Trash2 } from 'lucide-react'
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerBody,
  DrawerFooter,
  DrawerClose,
  Button,
  Input,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  DatePicker,
} from '@vikingo/ui'

const meta: Meta = {
  title: 'Overlays/Drawer',
  parameters: { layout: 'centered', docs: { source: { type: 'code' } } },
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj

export const RightSide: Story = {
  name: 'Right Side · Jobb oldal',
  render: () => (
    <div className="p-6 bg-[var(--color-bg)]">
      <Drawer>
        <DrawerTrigger asChild>
          <Button leftIcon={<Settings className="h-4 w-4" />}>Beállítások</Button>
        </DrawerTrigger>
        <DrawerContent side="right" size="md">
          <DrawerHeader>
            <DrawerTitle>Kampány beállítások</DrawerTitle>
            <DrawerDescription>Módosítsd a kampány paramétereit.</DrawerDescription>
          </DrawerHeader>
          <DrawerBody className="flex flex-col gap-4">
            <Input label="Kampány neve" placeholder="pl. Nyári akció 2025" />
            <Input label="Napi büdzsé (Ft)" placeholder="pl. 5000" type="number" />
            <div>
              <label className="text-sm font-medium text-[var(--color-text)] mb-1.5 block">
                Platform
              </label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Válassz platformot" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="meta">Meta Ads</SelectItem>
                  <SelectItem value="google">Google Ads</SelectItem>
                  <SelectItem value="tiktok">TikTok Ads</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </DrawerBody>
          <DrawerFooter>
            <Button variant="secondary">Mégse</Button>
            <Button variant="primary">Mentés</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  ),
}

export const LeftSide: Story = {
  name: 'Left Side · Bal oldal',
  render: () => (
    <div className="p-6 bg-[var(--color-bg)]">
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="secondary" leftIcon={<SlidersHorizontal className="h-4 w-4" />}>
            Szűrők
          </Button>
        </DrawerTrigger>
        <DrawerContent side="left" size="sm">
          <DrawerHeader>
            <DrawerTitle>Szűrők</DrawerTitle>
          </DrawerHeader>
          <DrawerBody className="flex flex-col gap-4">
            <div>
              <label className="text-sm font-medium text-[var(--color-text)] mb-1.5 block">
                Státusz
              </label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Összes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Aktív</SelectItem>
                  <SelectItem value="paused">Szünetel</SelectItem>
                  <SelectItem value="ended">Befejezett</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Input label="Minimum ROAS" placeholder="pl. 2.5" type="number" />
            <DatePicker label="Dátumtól" placeholder="Válassz dátumot" />
            <DatePicker label="Dátumig" placeholder="Válassz dátumot" />
          </DrawerBody>
          <DrawerFooter>
            <Button variant="ghost" size="sm">
              Törlés
            </Button>
            <Button variant="primary" size="sm">
              Alkalmazás
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  ),
}

export const BottomSheet: Story = {
  name: 'Bottom Sheet · Alulról',
  render: () => (
    <div className="p-6 bg-[var(--color-bg)]">
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="secondary">Műveletek</Button>
        </DrawerTrigger>
        <DrawerContent side="bottom" hideClose>
          <DrawerHeader>
            <DrawerTitle>Kampány műveletek</DrawerTitle>
            <DrawerDescription>Válassz az alábbi műveletek közül</DrawerDescription>
          </DrawerHeader>
          <DrawerBody className="p-2">
            <DrawerClose asChild>
              <button className="flex items-center gap-3 w-full px-4 py-3 rounded-[var(--radius-md)] text-sm text-[var(--color-text)] hover:bg-[var(--color-bg)] transition-colors text-left">
                <Pencil className="h-4 w-4 text-[var(--color-text-muted)] shrink-0" />
                Kampány szerkesztése
              </button>
            </DrawerClose>
            <DrawerClose asChild>
              <button className="flex items-center gap-3 w-full px-4 py-3 rounded-[var(--radius-md)] text-sm text-[var(--color-text)] hover:bg-[var(--color-bg)] transition-colors text-left">
                <Copy className="h-4 w-4 text-[var(--color-text-muted)] shrink-0" />
                Másolat készítése
              </button>
            </DrawerClose>
            <DrawerClose asChild>
              <button className="flex items-center gap-3 w-full px-4 py-3 rounded-[var(--radius-md)] text-sm text-[var(--color-text)] hover:bg-[var(--color-bg)] transition-colors text-left">
                <BarChart2 className="h-4 w-4 text-[var(--color-text-muted)] shrink-0" />
                Statisztikák megtekintése
              </button>
            </DrawerClose>
            <div className="my-1 border-t border-[var(--color-border)]" />
            <DrawerClose asChild>
              <button className="flex items-center gap-3 w-full px-4 py-3 rounded-[var(--radius-md)] text-sm text-[var(--color-error)] hover:bg-[var(--color-error)]/8 transition-colors text-left">
                <Trash2 className="h-4 w-4 shrink-0" />
                Kampány törlése
              </button>
            </DrawerClose>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  ),
}
