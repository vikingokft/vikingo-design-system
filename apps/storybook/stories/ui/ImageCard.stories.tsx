import type { Meta, StoryObj } from '@storybook/react'
import { Bookmark, Copy, MoreHorizontal } from 'lucide-react'
import { ImageCard, Button } from '@vikingo/ui'

const meta: Meta = {
  title: 'Display/Image Card',
  parameters: { layout: 'padded', docs: { source: { type: 'code' } } },
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj

const placeholder = (w: number, h: number, text = '') =>
  `https://placehold.co/${w}x${h}/F6EFE8/9B8FA3?text=${encodeURIComponent(text)}`

export const Default: Story = {
  name: 'Default · Alapértelmezett',
  render: () => (
    <div className="w-64 p-4 bg-[var(--color-bg)]">
      <ImageCard
        src={placeholder(400, 300, 'Ad preview')}
        alt="Kampány hirdetés"
        title="Nyári akció 2025 – carousel"
        description="Facebook feed hirdetés, mobil optimalizált verzió"
        tags={['carousel', 'mobil', 'feed']}
        meta="Létrehozva: 2025. máj. 12."
      />
    </div>
  ),
}

export const WithBadgeAndActions: Story = {
  name: 'With Badge & Actions · Badge-dzsel és akciókkal',
  render: () => (
    <div className="w-64 p-4 bg-[var(--color-bg)]">
      <ImageCard
        src={placeholder(400, 300, 'Ad preview')}
        alt="Kampány hirdetés"
        title="Google Display – brand awareness"
        description="Remarketing kampány, 90 napos közönség"
        tags={['display', 'remarketing']}
        meta="Lejár: 2025. jún. 30."
        badge="Aktív"
        badgeVariant="success"
        actions={
          <div className="flex gap-1">
            <Button variant="secondary" size="icon-sm">
              <Bookmark className="h-3.5 w-3.5" />
            </Button>
            <Button variant="secondary" size="icon-sm">
              <Copy className="h-3.5 w-3.5" />
            </Button>
          </div>
        }
      />
    </div>
  ),
}

export const AspectRatios: Story = {
  name: 'Aspect Ratios · Képarányok',
  render: () => (
    <div className="grid grid-cols-2 gap-4 p-4 bg-[var(--color-bg)]">
      {(
        [
          { ratio: '16/9', label: '16/9 – banner' },
          { ratio: '4/3', label: '4/3 – feed' },
          { ratio: '1/1', label: '1/1 – négyzet' },
          { ratio: '3/2', label: '3/2 – landscape' },
        ] as const
      ).map(({ ratio, label }) => (
        <ImageCard
          key={ratio}
          src={placeholder(400, 300, ratio)}
          alt={label}
          title={label}
          aspectRatio={ratio}
        />
      ))}
    </div>
  ),
}

export const AdLibraryGrid: Story = {
  name: 'Ad Library Grid · Hirdetéstár-rács',
  render: () => (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 p-4 bg-[var(--color-bg)]">
      {[
        {
          title: 'Nyári akció – story',
          tags: ['story', 'mobil'],
          badge: 'Aktív',
          badgeVariant: 'success' as const,
        },
        {
          title: 'Karácsonyi sale – banner',
          tags: ['banner', 'desktop'],
          badge: 'Szüneteltetve',
          badgeVariant: 'warning' as const,
        },
        { title: 'Brand awareness – video', tags: ['video', 'awareness'] },
        {
          title: 'Remarketing – carousel',
          tags: ['carousel', 'remarketing'],
          badge: 'Aktív',
          badgeVariant: 'success' as const,
        },
        {
          title: 'Promo – reel',
          tags: ['reel', 'mobil'],
          badge: 'Befejezett',
          badgeVariant: 'default' as const,
        },
        { title: 'Flash sale – DPA', tags: ['dpa', 'katalógus'] },
      ].map((item, i) => (
        <ImageCard
          key={i}
          src={placeholder(400, 300, `Ad ${i + 1}`)}
          alt={item.title}
          title={item.title}
          tags={item.tags}
          badge={item.badge}
          badgeVariant={item.badgeVariant}
          actions={
            <Button variant="secondary" size="icon-sm">
              <MoreHorizontal className="h-3.5 w-3.5" />
            </Button>
          }
          meta={`Feltöltve: 2025. máj. ${10 + i}.`}
        />
      ))}
    </div>
  ),
}
