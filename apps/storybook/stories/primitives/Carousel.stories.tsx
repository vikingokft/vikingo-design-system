import type { Meta, StoryObj } from '@storybook/react'
import { Carousel, CarouselItem, Badge, Button } from '@vikingo/ui'
import { MoreHorizontal } from 'lucide-react'

const meta: Meta = {
  title: 'Display/Carousel',
  parameters: { layout: 'padded', docs: { source: { type: 'code' } } },
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj

const placeholder = (w: number, h: number, text = '', bg = 'F6EFE8', fg = '9B8FA3') =>
  `https://placehold.co/${w}x${h}/${bg}/${fg}?text=${encodeURIComponent(text)}`

// ── Hero Carousel ────────────────────────────────────────────────────────────

export const HeroCarousel: Story = {
  name: 'Hero Carousel · Kiemelt karusszell',
  render: () => {
    const slides = [
      {
        title: 'Nyári akció 2025',
        desc: 'Facebook + Instagram · carousel · mobil',
        badge: 'Aktív',
        color: '3E2E45',
        text: 'F6EFE8',
      },
      {
        title: 'Google Display – brand',
        desc: 'Remarketing · 90 napos közönség',
        badge: 'Szüneteltetve',
        color: 'FF544D',
        text: 'FFFFFF',
      },
      {
        title: 'TikTok – flash sale',
        desc: 'DPA katalógus · reel formátum',
        badge: 'Tervezet',
        color: '7C3AED',
        text: 'FFFFFF',
      },
    ]

    return (
      <div className="w-[560px] bg-[var(--color-bg)] p-4">
        <Carousel itemsPerView={1} gap={0}>
          {slides.map((slide, i) => (
            <CarouselItem key={i} className="w-full">
              <div className="relative rounded-[var(--radius-lg)] overflow-hidden aspect-video">
                <img
                  src={placeholder(560, 315, slide.title, slide.color, slide.text)}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-5">
                  <Badge
                    variant={i === 0 ? 'success' : i === 1 ? 'warning' : 'default'}
                    dot
                    className="mb-2 w-fit"
                  >
                    {slide.badge}
                  </Badge>
                  <h3 className="font-display font-semibold text-lg text-white">{slide.title}</h3>
                  <p className="text-sm text-white/70 mt-0.5">{slide.desc}</p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </Carousel>
      </div>
    )
  },
}

// ── Multi-browse Carousel ────────────────────────────────────────────────────

export const MultiBrowse: Story = {
  name: 'Multi-browse · Többelemű böngésző',
  render: () => {
    const cards = [
      {
        title: 'Nyári akció – story',
        tags: ['story', 'mobil'],
        badge: 'Aktív',
        bv: 'success' as const,
      },
      {
        title: 'Karácsonyi sale – banner',
        tags: ['banner', 'desktop'],
        badge: 'Szüneteltetve',
        bv: 'warning' as const,
      },
      { title: 'Brand awareness – video', tags: ['video'], badge: undefined, bv: undefined },
      {
        title: 'Remarketing – carousel',
        tags: ['carousel'],
        badge: 'Aktív',
        bv: 'success' as const,
      },
      { title: 'Promo – reel', tags: ['reel'], badge: 'Befejezett', bv: 'default' as const },
      { title: 'Flash sale – DPA', tags: ['dpa'], badge: undefined, bv: undefined },
    ]

    return (
      <div className="w-[720px] bg-[var(--color-bg)] p-4">
        <Carousel itemsPerView={3} gap={12} showDots={false}>
          {cards.map((card, i) => (
            <CarouselItem key={i}>
              <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden">
                <img
                  src={placeholder(300, 180, `Ad ${i + 1}`)}
                  alt={card.title}
                  className="w-full aspect-[5/3] object-cover"
                />
                <div className="p-3">
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <p className="text-sm font-medium text-[var(--color-text)] line-clamp-2 flex-1">
                      {card.title}
                    </p>
                    <Button variant="ghost" size="icon-sm" className="shrink-0">
                      <MoreHorizontal className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {card.tags.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-mono text-[var(--color-text-muted)] bg-[var(--color-bg)] px-1.5 py-0.5 rounded-full border border-[var(--color-border)]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  {card.badge && (
                    <Badge variant={card.bv} dot size="sm">
                      {card.badge}
                    </Badge>
                  )}
                </div>
              </div>
            </CarouselItem>
          ))}
        </Carousel>
      </div>
    )
  },
}

// ── Two-item Carousel ────────────────────────────────────────────────────────

export const TwoItem: Story = {
  name: 'Two Items · Kétoszlopos',
  render: () => {
    const items = [
      {
        label: 'Facebook Ads teljesítmény',
        spend: '2 662 120 Ft',
        roas: '4.2x',
        bg: '3E2E45',
        fg: 'F6EFE8',
      },
      {
        label: 'TikTok Ads teljesítmény',
        spend: '66 386 Ft',
        roas: '6.1x',
        bg: 'FF544D',
        fg: 'FFFFFF',
      },
      {
        label: 'Google Display teljesítmény',
        spend: '156 200 Ft',
        roas: '3.5x',
        bg: '7C3AED',
        fg: 'FFFFFF',
      },
      {
        label: 'Instagram Ads teljesítmény',
        spend: '78 400 Ft',
        roas: '2.8x',
        bg: 'F59E0B',
        fg: 'FFFFFF',
      },
    ]

    return (
      <div className="w-[560px] bg-[var(--color-bg)] p-4">
        <Carousel itemsPerView={2} gap={12}>
          {items.map((item, i) => (
            <CarouselItem key={i}>
              <div
                className="rounded-[var(--radius-lg)] p-5 aspect-square flex flex-col justify-between"
                style={{ backgroundColor: `#${item.bg}` }}
              >
                <p className="text-sm font-medium" style={{ color: `#${item.fg}`, opacity: 0.8 }}>
                  {item.label}
                </p>
                <div>
                  <p className="font-mono text-2xl font-semibold" style={{ color: `#${item.fg}` }}>
                    {item.roas}
                  </p>
                  <p
                    className="text-xs font-mono mt-1"
                    style={{ color: `#${item.fg}`, opacity: 0.6 }}
                  >
                    Spend: {item.spend}
                  </p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </Carousel>
      </div>
    )
  },
}

// ── Ad Library Carousel ──────────────────────────────────────────────────────

export const AdLibrary: Story = {
  name: 'Ad Library · Hirdetéstár',
  render: () => {
    const ads = Array.from({ length: 8 }, (_, i) => ({
      title: `Hirdetés ${i + 1}`,
      meta: `Feltöltve: 2025. máj. ${10 + i}.`,
    }))

    return (
      <div className="w-[640px] bg-[var(--color-bg)] p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-display font-semibold text-base text-[var(--color-text)]">
            Legutóbbi hirdetések
          </h3>
          <Button variant="ghost" size="sm">
            Összes megtekintése
          </Button>
        </div>
        <Carousel itemsPerView={3} gap={12} showDots={false}>
          {ads.map((ad, i) => (
            <CarouselItem key={i}>
              <div className="rounded-[var(--radius-lg)] overflow-hidden border border-[var(--color-border)] bg-[var(--color-surface)]">
                <img
                  src={placeholder(200, 130, ad.title)}
                  alt={ad.title}
                  className="w-full aspect-[3/2] object-cover"
                />
                <div className="p-2.5">
                  <p className="text-xs font-medium text-[var(--color-text)] truncate">
                    {ad.title}
                  </p>
                  <p className="text-[10px] font-mono text-[var(--color-text-muted)] mt-0.5">
                    {ad.meta}
                  </p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </Carousel>
      </div>
    )
  },
}
