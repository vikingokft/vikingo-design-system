import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import {
  Megaphone,
  Image,
  BarChart2,
  Tag,
  Smile,
  Facebook,
  Instagram,
  Youtube,
  Globe,
} from 'lucide-react'
import { Chip, ChipGroup } from '@vikingo/ui'

const meta: Meta = {
  title: 'Forms/Chip',
  parameters: { layout: 'centered', docs: { source: { type: 'code' } } },
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj

export const Types: Story = {
  name: 'Types · Típusok',
  render: () => (
    <div className="flex flex-col gap-6 p-6 bg-[var(--color-bg)] w-[480px]">
      <div className="flex flex-col gap-2">
        <p className="text-xs font-mono uppercase tracking-widest text-[var(--color-text-muted)]">
          Assist chips
        </p>
        <ChipGroup>
          <Chip variant="assist" icon={<Megaphone className="h-3.5 w-3.5" />}>
            Új kampány
          </Chip>
          <Chip variant="assist" icon={<Image className="h-3.5 w-3.5" />}>
            Hirdetés feltöltése
          </Chip>
          <Chip variant="assist" icon={<BarChart2 className="h-3.5 w-3.5" />}>
            Riport exportálása
          </Chip>
        </ChipGroup>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-xs font-mono uppercase tracking-widest text-[var(--color-text-muted)]">
          Filter chips
        </p>
        <FilterChipDemo />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-xs font-mono uppercase tracking-widest text-[var(--color-text-muted)]">
          Input chips
        </p>
        <InputChipDemo />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-xs font-mono uppercase tracking-widest text-[var(--color-text-muted)]">
          Suggestion chips
        </p>
        <ChipGroup>
          <Chip variant="suggestion">Facebook Ads</Chip>
          <Chip variant="suggestion">Google Ads</Chip>
          <Chip variant="suggestion">TikTok Ads</Chip>
          <Chip variant="suggestion">Instagram</Chip>
        </ChipGroup>
      </div>
    </div>
  ),
}

function FilterChipDemo() {
  const filters = ['Aktív', 'Szüneteltetve', 'Befejezett', 'Tervezet']
  const [selected, setSelected] = useState<string[]>(['Aktív'])
  return (
    <ChipGroup>
      {filters.map((f) => (
        <Chip
          key={f}
          variant="filter"
          selected={selected.includes(f)}
          onClick={() =>
            setSelected((prev) => (prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]))
          }
        >
          {f}
        </Chip>
      ))}
    </ChipGroup>
  )
}

function InputChipDemo() {
  const [tags, setTags] = useState(['carousel', 'mobil', 'feed'])
  return (
    <ChipGroup>
      {tags.map((tag) => (
        <Chip key={tag} variant="input" onRemove={() => setTags((t) => t.filter((x) => x !== tag))}>
          {tag}
        </Chip>
      ))}
    </ChipGroup>
  )
}

export const FilterChips: Story = {
  name: 'Filter Chips · Szűrőchipek',
  render: () => {
    const [selected, setSelected] = useState<string[]>(['facebook'])
    const platforms = [
      { id: 'facebook', label: 'Facebook', icon: <Facebook className="h-3.5 w-3.5" /> },
      { id: 'instagram', label: 'Instagram', icon: <Instagram className="h-3.5 w-3.5" /> },
      { id: 'google', label: 'Google', icon: <Globe className="h-3.5 w-3.5" /> },
      { id: 'tiktok', label: 'TikTok', icon: <Youtube className="h-3.5 w-3.5" /> },
    ]

    const toggle = (id: string) =>
      setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))

    return (
      <div className="flex flex-col gap-4 p-6 bg-[var(--color-bg)] w-[400px]">
        <div>
          <p className="text-sm font-medium text-[var(--color-text)] mb-2">Platform szűrők</p>
          <ChipGroup>
            {platforms.map((p) => (
              <Chip
                key={p.id}
                variant="filter"
                selected={selected.includes(p.id)}
                icon={p.icon}
                onClick={() => toggle(p.id)}
              >
                {p.label}
              </Chip>
            ))}
          </ChipGroup>
        </div>
        <p className="text-xs font-mono text-[var(--color-text-muted)]">
          Kijelölve: {selected.join(', ') || '—'}
        </p>
      </div>
    )
  },
}

export const InputChips: Story = {
  name: 'Input Chips · Beviteli chipek',
  render: () => {
    const [tags, setTags] = useState(['nyári akció', 'carousel', 'mobil', 'feed', 'remarketing'])
    const [input, setInput] = useState('')

    function addTag(e: React.KeyboardEvent<HTMLInputElement>) {
      if ((e.key === 'Enter' || e.key === ',') && input.trim()) {
        e.preventDefault()
        const val = input.trim().replace(/,$/, '')
        if (!tags.includes(val)) setTags((t) => [...t, val])
        setInput('')
      }
    }

    return (
      <div className="w-[480px] p-6 bg-[var(--color-bg)]">
        <p className="text-sm font-medium text-[var(--color-text)] mb-2">Kampány tag-ek</p>
        <div className="flex flex-wrap gap-2 p-3 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] min-h-[52px]">
          {tags.map((tag) => (
            <Chip
              key={tag}
              variant="input"
              onRemove={() => setTags((t) => t.filter((x) => x !== tag))}
            >
              {tag}
            </Chip>
          ))}
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={addTag}
            placeholder="Tag hozzáadása..."
            className="flex-1 min-w-[120px] bg-transparent text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-subtle)] outline-none"
          />
        </div>
        <p className="text-xs text-[var(--color-text-muted)] mt-1">
          Enter vagy vessző a hozzáadáshoz
        </p>
      </div>
    )
  },
}

export const AssistChips: Story = {
  name: 'Assist Chips · Segítő chipek',
  render: () => {
    const [done, setDone] = useState<string[]>([])
    const actions = [
      { id: 'export', label: 'Exportálás PDF-be', icon: <BarChart2 className="h-3.5 w-3.5" /> },
      { id: 'share', label: 'Megosztás', icon: <Globe className="h-3.5 w-3.5" /> },
      { id: 'tag', label: 'Tag hozzáadása', icon: <Tag className="h-3.5 w-3.5" /> },
      { id: 'react', label: 'Reakció', icon: <Smile className="h-3.5 w-3.5" /> },
    ]

    return (
      <div className="p-6 bg-[var(--color-bg)] w-[400px]">
        <p className="text-sm font-medium text-[var(--color-text)] mb-3">Gyors műveletek</p>
        <ChipGroup>
          {actions.map((a) => (
            <Chip
              key={a.id}
              variant="assist"
              icon={a.icon}
              onClick={() => setDone((d) => (d.includes(a.id) ? d : [...d, a.id]))}
              disabled={done.includes(a.id)}
            >
              {done.includes(a.id) ? `✓ ${a.label}` : a.label}
            </Chip>
          ))}
        </ChipGroup>
      </div>
    )
  },
}
