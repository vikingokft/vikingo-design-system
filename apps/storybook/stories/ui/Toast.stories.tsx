import type { Meta, StoryObj } from '@storybook/react'
import { Toaster, toast, Button } from '@vikingo/ui'

const meta: Meta = {
  title: 'Overlays/Toast',
  parameters: { layout: 'centered', docs: { source: { type: 'code' } } },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <>
        <Story />
        <Toaster richColors position="bottom-right" />
      </>
    ),
  ],
}
export default meta
type Story = StoryObj

export const Types: Story = {
  name: 'Types · Típusok',
  render: () => (
    <div className="flex flex-wrap gap-3 p-4 bg-[var(--color-bg)]">
      <Button
        variant="secondary"
        onClick={() =>
          toast('Kampány elmentve', { description: 'Változtatásaid sikeresen mentésre kerültek.' })
        }
      >
        Alap
      </Button>
      <Button
        variant="secondary"
        onClick={() =>
          toast.success('Sikeresen közzétéve!', { description: 'A kampány most már él.' })
        }
      >
        Siker
      </Button>
      <Button
        variant="secondary"
        onClick={() =>
          toast.error('Hiba történt', { description: 'Nem sikerült csatlakozni az API-hoz.' })
        }
      >
        Hiba
      </Button>
      <Button
        variant="secondary"
        onClick={() =>
          toast.warning('Figyelmeztetés', { description: 'A büdzsé 90%-a felhasználásra került.' })
        }
      >
        Figyelmeztetés
      </Button>
      <Button
        variant="secondary"
        onClick={() =>
          toast.info('Tájékoztatás', { description: 'Az adatok naponta egyszer frissülnek.' })
        }
      >
        Info
      </Button>
      <Button
        variant="secondary"
        onClick={() =>
          toast.loading('Szinkronizálás...', { description: 'Meta API kapcsolódás folyamatban.' })
        }
      >
        Betöltés
      </Button>
    </div>
  ),
}

export const WithActionButton: Story = {
  name: 'With Action Button · Akciógombbal',
  render: () => (
    <div className="flex flex-wrap gap-3 p-4 bg-[var(--color-bg)]">
      <Button
        onClick={() =>
          toast('Kampány törölve', {
            description: '„Nyári akció 2025" kampány törölve.',
            action: {
              label: 'Visszavonás',
              onClick: () => toast.success('Visszaállítva!'),
            },
          })
        }
      >
        Törlés visszavonással
      </Button>
    </div>
  ),
}
