import type { Meta, StoryObj } from '@storybook/react'
import { useState, useMemo } from 'react'
import { Megaphone, BarChart2, Users, Image, Settings, Globe } from 'lucide-react'
import { SearchBar, type SearchResult } from '@vikingo/ui'

const meta: Meta = {
  title: 'Forms/Search',
  parameters: { layout: 'centered', docs: { source: { type: 'code' } } },
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj

export const Default: Story = {
  name: 'Default · Alapértelmezett',
  render: () => {
    const [value, setValue] = useState('')
    return (
      <div className="w-80 p-6 bg-[var(--color-bg)]">
        <SearchBar value={value} onChange={setValue} placeholder="Keresés..." />
      </div>
    )
  },
}

export const Variants: Story = {
  name: 'Variants · Variánsok',
  render: () => (
    <div className="flex flex-col gap-4 w-80 p-6 bg-[var(--color-bg)]">
      <div>
        <p className="text-xs font-mono text-[var(--color-text-muted)] mb-2">
          field (alapértelmezett)
        </p>
        <SearchBar placeholder="Keresés..." variant="field" />
      </div>
      <div>
        <p className="text-xs font-mono text-[var(--color-text-muted)] mb-2">bar (lekerekített)</p>
        <SearchBar placeholder="Keresés..." variant="bar" />
      </div>
    </div>
  ),
}

export const Sizes: Story = {
  name: 'Sizes · Méretek',
  render: () => (
    <div className="flex flex-col gap-4 w-80 p-6 bg-[var(--color-bg)]">
      <SearchBar size="sm" placeholder="Kis méret (sm)" />
      <SearchBar size="md" placeholder="Közepes méret (md)" />
      <SearchBar size="lg" placeholder="Nagy méret (lg)" />
    </div>
  ),
}

export const Loading: Story = {
  name: 'Loading State · Betöltés állapot',
  render: () => {
    const [value, setValue] = useState('TikTok')
    return (
      <div className="w-80 p-6 bg-[var(--color-bg)]">
        <SearchBar value={value} onChange={setValue} loading placeholder="Keresés..." />
        <p className="text-xs text-[var(--color-text-muted)] mt-2">
          Keresési eredmények betöltése...
        </p>
      </div>
    )
  },
}

const ALL_RESULTS: SearchResult[] = [
  {
    id: '1',
    label: 'Nyári akció 2025',
    description: 'Facebook Ads · carousel',
    icon: <Megaphone className="h-4 w-4" />,
    category: 'Kampányok',
  },
  {
    id: '2',
    label: 'Google Brand Awareness',
    description: 'Google Ads · display',
    icon: <Globe className="h-4 w-4" />,
    category: 'Kampányok',
  },
  {
    id: '3',
    label: 'TikTok Flash Sale',
    description: 'TikTok Ads · reel',
    icon: <Megaphone className="h-4 w-4" />,
    category: 'Kampányok',
  },
  {
    id: '4',
    label: 'Konverziós riport – május',
    description: '2025. máj. 1–31.',
    icon: <BarChart2 className="h-4 w-4" />,
    category: 'Riportok',
  },
  {
    id: '5',
    label: 'ROAS összesítő – Q1',
    description: '2025. jan–márc',
    icon: <BarChart2 className="h-4 w-4" />,
    category: 'Riportok',
  },
  {
    id: '6',
    label: 'Hirdetés #001 – Nyári banner',
    description: '1200×628 px · feed',
    icon: <Image className="h-4 w-4" />,
    category: 'Hirdetések',
  },
  {
    id: '7',
    label: 'Hirdetés #012 – Story reel',
    description: '1080×1920 px · story',
    icon: <Image className="h-4 w-4" />,
    category: 'Hirdetések',
  },
  {
    id: '8',
    label: 'Nagy Bence',
    description: 'admin · bence@vikingo.hu',
    icon: <Users className="h-4 w-4" />,
    category: 'Felhasználók',
  },
  {
    id: '9',
    label: 'API beállítások',
    description: 'Meta Marketing API konfig',
    icon: <Settings className="h-4 w-4" />,
    category: 'Beállítások',
  },
]

export const WithResults: Story = {
  name: 'With Results · Eredményekkel',
  render: () => {
    const [value, setValue] = useState('')
    const [selected, setSelected] = useState<SearchResult | null>(null)

    const results = useMemo(() => {
      if (!value.trim()) return []
      const q = value.toLowerCase()
      return ALL_RESULTS.filter(
        (r) => r.label.toLowerCase().includes(q) || r.description?.toLowerCase().includes(q),
      )
    }, [value])

    return (
      <div className="w-96 p-6 bg-[var(--color-bg)]">
        <SearchBar
          value={value}
          onChange={setValue}
          results={results}
          onResultSelect={(r) => {
            setSelected(r)
            setValue(r.label)
          }}
          placeholder="Keresés a rendszerben..."
          size="md"
          variant="field"
        />
        {selected && !value.startsWith(selected.label.slice(0, 3)) && (
          <div className="mt-3 p-3 rounded-[var(--radius-md)] bg-[var(--color-accent-muted)] border border-[var(--color-accent)]/20">
            <p className="text-xs font-mono text-[var(--color-accent)]">
              Kiválasztva: {selected.label}
            </p>
          </div>
        )}
        {!value && (
          <p className="text-xs text-[var(--color-text-muted)] mt-2">
            Próbáld: "akció", "riport", "TikTok"
          </p>
        )}
      </div>
    )
  },
}

export const EmptyState: Story = {
  name: 'Empty State · Nincs találat',
  render: () => {
    const [value, setValue] = useState('')
    return (
      <div className="w-80 p-6 bg-[var(--color-bg)]">
        <SearchBar
          value={value}
          onChange={setValue}
          results={value.trim() ? [] : undefined}
          emptyText="Nincs találat erre a keresésre"
          placeholder="Próbálj valami exotikusat..."
        />
        {!value && (
          <p className="text-xs text-[var(--color-text-muted)] mt-2">
            Gépelj valamit — üres találatlista jelenik meg
          </p>
        )}
      </div>
    )
  },
}

export const GlobalSearch: Story = {
  name: 'Global Search · Globális keresés',
  render: () => {
    const [value, setValue] = useState('')

    const results = useMemo(() => {
      if (!value.trim()) return []
      const q = value.toLowerCase()
      return ALL_RESULTS.filter(
        (r) => r.label.toLowerCase().includes(q) || r.description?.toLowerCase().includes(q),
      )
    }, [value])

    return (
      <div className="w-[480px] p-6 bg-[var(--color-bg)]">
        <div className="mb-4">
          <h3 className="font-display font-semibold text-sm text-[var(--color-text)] mb-3">
            Vikingo – Globális keresés
          </h3>
          <SearchBar
            value={value}
            onChange={setValue}
            results={results}
            onResultSelect={(r) => setValue(r.label)}
            placeholder="Kampány, hirdetés, riport keresése..."
            size="lg"
            variant="bar"
          />
        </div>
        {!value && (
          <div className="mt-4">
            <p className="text-xs font-mono uppercase tracking-widest text-[var(--color-text-muted)] mb-2">
              Gyors elérés
            </p>
            <div className="flex flex-wrap gap-2">
              {['Aktív kampányok', 'Legutóbbi riport', 'API beállítások'].map((s) => (
                <button
                  key={s}
                  onClick={() => setValue(s)}
                  className="text-xs px-3 py-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:border-[var(--color-accent)] transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  },
}
