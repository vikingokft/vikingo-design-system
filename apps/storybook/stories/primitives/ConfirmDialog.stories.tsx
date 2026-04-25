import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Trash2 } from 'lucide-react'
import { ConfirmDialog, Button } from '@vikingo/ui'

const meta: Meta = {
  title: 'Overlays/ConfirmDialog',
  parameters: { layout: 'centered', docs: { source: { type: 'code' } } },
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj

export const Default: Story = {
  name: 'Default · Alapértelmezett',
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <div className="p-6 bg-[var(--color-bg)]">
        <Button onClick={() => setOpen(true)}>Megerősítés megnyitása</Button>
        <ConfirmDialog
          open={open}
          onOpenChange={setOpen}
          title="Biztosan folytatod?"
          description="Ez a művelet visszafordíthatatlan. Az adatok véglegesen elvesznek."
          onConfirm={() => {
            alert('Megerősítve!')
            setOpen(false)
          }}
        />
      </div>
    )
  },
}

export const Destructive: Story = {
  name: 'Destructive · Törlés',
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <div className="p-6 bg-[var(--color-bg)]">
        <Button
          variant="destructive"
          leftIcon={<Trash2 className="h-4 w-4" />}
          onClick={() => setOpen(true)}
        >
          Kampány törlése
        </Button>
        <ConfirmDialog
          open={open}
          onOpenChange={setOpen}
          title="Kampány törlése"
          description={
            'A „Nyári akció 2025" kampány véglegesen törlésre kerül. A hirdetési adatok nem állíthatók vissza.'
          }
          confirmLabel="Igen, törlöm"
          cancelLabel="Mégsem"
          variant="destructive"
          onConfirm={() => {
            alert('Törölve!')
            setOpen(false)
          }}
        />
      </div>
    )
  },
}

export const Loading: Story = {
  name: 'Loading · Betöltés közben',
  render: () => {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    return (
      <div className="p-6 bg-[var(--color-bg)]">
        <Button onClick={() => setOpen(true)}>Megnyitás</Button>
        <ConfirmDialog
          open={open}
          onOpenChange={setOpen}
          title="Exportálás indítása"
          description="Az exportálás eltarthat néhány másodpercig."
          confirmLabel="Exportálás"
          loading={loading}
          onConfirm={() => {
            setLoading(true)
            setTimeout(() => {
              setLoading(false)
              setOpen(false)
            }, 2000)
          }}
        />
      </div>
    )
  },
}
