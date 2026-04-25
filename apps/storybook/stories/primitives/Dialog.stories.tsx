import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Lock, Trash2, AlertTriangle, CheckCircle2 } from 'lucide-react'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Button,
  Input,
} from '@vikingo/ui'

const meta: Meta = {
  title: 'Overlays/Dialog',
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

export const LoginDialog: Story = {
  name: 'Login Dialog · Belépési dialógus',
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>Belépés megnyitása</Button>
        </DialogTrigger>
        <DialogContent size="sm">
          <DialogHeader>
            <div className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-[var(--color-accent)]" />
              <DialogTitle>Belépés</DialogTitle>
            </div>
            <DialogDescription>Add meg a jelszót a hozzáféréshez</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <Input label="Jelszó" type="password" placeholder="••••••••" autoFocus />
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Mégse
            </Button>
            <Button onClick={() => setOpen(false)}>Belépés</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  },
}

export const DeleteConfirmation: Story = {
  name: 'Delete Confirmation · Törlés megerősítése',
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="destructive" leftIcon={<Trash2 className="h-4 w-4" />}>
            Kampány törlése
          </Button>
        </DialogTrigger>
        <DialogContent size="sm">
          <DialogHeader>
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-[var(--color-error)]" />
              <DialogTitle>Biztosan törlöd?</DialogTitle>
            </div>
            <DialogDescription>
              A „Nyári akció 2025" kampányt véglegesen törlöd. Ez a művelet nem vonható vissza.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Mégse
            </Button>
            <Button variant="destructive" onClick={() => setOpen(false)}>
              Törlés
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  },
}

export const SuccessDialog: Story = {
  name: 'Success Dialog · Sikeres dialógus',
  render: () => {
    const [open, setOpen] = useState(true)
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="secondary">Megnyitás</Button>
        </DialogTrigger>
        <DialogContent size="sm">
          <DialogHeader>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-[var(--color-success)]" />
              <DialogTitle>Kampány elmentve</DialogTitle>
            </div>
            <DialogDescription>
              A kampány sikeresen mentésre került és hamarosan elindul.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setOpen(false)}>Rendben</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  },
}

export const FormDialog: Story = {
  name: 'Form Dialog · Űrlapos dialógus',
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>Új kampány létrehozása</Button>
        </DialogTrigger>
        <DialogContent size="md">
          <DialogHeader>
            <DialogTitle>Új kampány</DialogTitle>
            <DialogDescription>Töltsd ki az adatokat az új kampány indításához.</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <Input label="Kampány neve" placeholder="pl. Nyári akció 2025" />
            <div className="grid grid-cols-2 gap-3">
              <Input label="Kezdés dátuma" type="date" />
              <Input label="Befejezés dátuma" type="date" />
            </div>
            <Input label="Büdzsé" placeholder="0" hint="Euróban add meg az összeget" />
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Mégse
            </Button>
            <Button onClick={() => setOpen(false)}>Kampány létrehozása</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  },
}
