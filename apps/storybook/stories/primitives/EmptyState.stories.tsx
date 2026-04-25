import type { Meta, StoryObj } from '@storybook/react'
import { Search, Megaphone, BarChart2, Image, Inbox } from 'lucide-react'
import { EmptyState, Button } from '@vikingo/ui'

const meta: Meta<typeof EmptyState> = {
  title: 'Display/EmptyState',
  component: EmptyState,
  parameters: { layout: 'centered', docs: { source: { type: 'code' } } },
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof EmptyState>

export const Default: Story = {
  name: 'Default · Alapértelmezett',
  args: {
    icon: <Inbox className="h-6 w-6" />,
    title: 'Nincsenek elemek',
    description: 'Még nem hoztál létre egyetlen elemet sem.',
  },
}

export const WithAction: Story = {
  name: 'With Action · Gombbal',
  args: {
    icon: <Megaphone className="h-6 w-6" />,
    title: 'Nincsenek kampányok',
    description: 'Hozd létre az első kampányodat, és indítsd el a hirdetéseidet.',
    action: <Button variant="primary">Új kampány</Button>,
  },
}

export const SearchEmpty: Story = {
  name: 'Search Empty · Keresési nincs találat',
  args: {
    icon: <Search className="h-6 w-6" />,
    title: 'Nincs találat',
    description: 'Próbálj más keresési feltételekkel.',
  },
}

export const Compact: Story = {
  name: 'Compact · Kompakt',
  render: () => (
    <div className="w-96 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden">
      <div className="px-4 py-3 border-b border-[var(--color-border)]">
        <h3 className="font-semibold text-sm">Riportok</h3>
      </div>
      <EmptyState
        variant="compact"
        icon={<BarChart2 className="h-4 w-4" />}
        title="Még nincs riport"
        description="Válassz időszakot a riport generálásához"
      />
    </div>
  ),
}

export const InTable: Story = {
  name: 'In Table · Táblázatban',
  render: () => (
    <div className="w-[600px] rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden">
      <div className="px-6 py-4 border-b border-[var(--color-border)] flex items-center justify-between">
        <h3 className="font-semibold text-sm">Hirdetések</h3>
        <Button variant="primary" size="sm">
          Feltöltés
        </Button>
      </div>
      <EmptyState
        icon={<Image className="h-6 w-6" />}
        title="Nincsenek hirdetések"
        description="Töltsd fel az első kreatívodat az ad library-be."
        action={
          <Button variant="secondary" size="sm">
            Fájl feltöltése
          </Button>
        }
      />
    </div>
  ),
}
