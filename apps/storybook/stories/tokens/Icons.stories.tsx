import type { Meta, StoryObj } from '@storybook/react'
import {
  AlertCircle,
  AlertTriangle,
  BarChart2,
  Bell,
  Bookmark,
  Calendar,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronsUpDown,
  Circle,
  Clock,
  Copy,
  Download,
  Eye,
  EyeOff,
  FileText,
  Filter,
  Globe,
  HelpCircle,
  Image as ImageIcon,
  Inbox,
  Info,
  LayoutDashboard,
  Loader2,
  Lock,
  type LucideIcon,
  Mail,
  Megaphone,
  Menu,
  Minus,
  Monitor,
  MoreHorizontal,
  MoveDown,
  MoveUp,
  Pencil,
  Phone,
  Plus,
  Search,
  Settings,
  Slash,
  SlidersHorizontal,
  SortAsc,
  Trash2,
  TrendingDown,
  TrendingUp,
  TriangleAlert,
  UploadCloud,
  User,
  Users,
  X,
  XCircle,
} from 'lucide-react'
import { useState } from 'react'

type IconEntry = { name: string; Icon: LucideIcon }

const GROUPS: { title: string; icons: IconEntry[] }[] = [
  {
    title: 'Navigation · Navigáció',
    icons: [
      { name: 'ChevronLeft', Icon: ChevronLeft },
      { name: 'ChevronRight', Icon: ChevronRight },
      { name: 'ChevronUp', Icon: ChevronUp },
      { name: 'ChevronDown', Icon: ChevronDown },
      { name: 'ChevronsUpDown', Icon: ChevronsUpDown },
      { name: 'MoreHorizontal', Icon: MoreHorizontal },
      { name: 'Menu', Icon: Menu },
      { name: 'Slash', Icon: Slash },
    ],
  },
  {
    title: 'Actions · Műveletek',
    icons: [
      { name: 'Plus', Icon: Plus },
      { name: 'Minus', Icon: Minus },
      { name: 'X', Icon: X },
      { name: 'Check', Icon: Check },
      { name: 'Copy', Icon: Copy },
      { name: 'Trash2', Icon: Trash2 },
      { name: 'Pencil', Icon: Pencil },
      { name: 'Download', Icon: Download },
      { name: 'Bookmark', Icon: Bookmark },
      { name: 'Search', Icon: Search },
    ],
  },
  {
    title: 'Status · Állapot',
    icons: [
      { name: 'AlertCircle', Icon: AlertCircle },
      { name: 'AlertTriangle', Icon: AlertTriangle },
      { name: 'TriangleAlert', Icon: TriangleAlert },
      { name: 'CheckCircle2', Icon: CheckCircle2 },
      { name: 'XCircle', Icon: XCircle },
      { name: 'Info', Icon: Info },
      { name: 'HelpCircle', Icon: HelpCircle },
      { name: 'Clock', Icon: Clock },
      { name: 'Loader2', Icon: Loader2 },
      { name: 'Circle', Icon: Circle },
    ],
  },
  {
    title: 'Data & Trend · Adat',
    icons: [
      { name: 'TrendingUp', Icon: TrendingUp },
      { name: 'TrendingDown', Icon: TrendingDown },
      { name: 'BarChart2', Icon: BarChart2 },
      { name: 'MoveUp', Icon: MoveUp },
      { name: 'MoveDown', Icon: MoveDown },
      { name: 'SortAsc', Icon: SortAsc },
      { name: 'Filter', Icon: Filter },
    ],
  },
  {
    title: 'Domain · Tartalom',
    icons: [
      { name: 'Calendar', Icon: Calendar },
      { name: 'Mail', Icon: Mail },
      { name: 'Phone', Icon: Phone },
      { name: 'User', Icon: User },
      { name: 'Users', Icon: Users },
      { name: 'Lock', Icon: Lock },
      { name: 'Globe', Icon: Globe },
      { name: 'Eye', Icon: Eye },
      { name: 'EyeOff', Icon: EyeOff },
      { name: 'Bell', Icon: Bell },
      { name: 'Settings', Icon: Settings },
      { name: 'LayoutDashboard', Icon: LayoutDashboard },
      { name: 'SlidersHorizontal', Icon: SlidersHorizontal },
      { name: 'Inbox', Icon: Inbox },
      { name: 'Megaphone', Icon: Megaphone },
      { name: 'FileText', Icon: FileText },
      { name: 'UploadCloud', Icon: UploadCloud },
      { name: 'Image', Icon: ImageIcon },
      { name: 'Monitor', Icon: Monitor },
    ],
  },
]

const IconTile = ({
  entry,
  size,
  copied,
  onCopy,
}: {
  entry: IconEntry
  size: number
  copied: boolean
  onCopy: (name: string) => void
}) => {
  const { name, Icon } = entry
  return (
    <button
      type="button"
      onClick={() => onCopy(name)}
      title={`import { ${name} } from 'lucide-react'`}
      className={[
        'group flex flex-col items-center gap-2 p-3 rounded-[var(--radius-md)] border text-center',
        'transition-colors duration-150',
        copied
          ? 'border-[var(--color-accent)] bg-[var(--color-accent-muted)] text-[var(--color-accent)]'
          : 'border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-muted)] hover:border-[var(--color-border-strong)] hover:text-[var(--color-text)]',
      ].join(' ')}
    >
      {copied ? <Check size={size} /> : <Icon size={size} />}
      <span className="text-[10px] font-mono leading-tight break-all line-clamp-2">
        {copied ? 'Copied!' : name}
      </span>
    </button>
  )
}

const IconsShowcase = () => {
  const [size, setSize] = useState(24)
  const [copied, setCopied] = useState<string | null>(null)

  const handleCopy = (name: string) => {
    const importStr = `import { ${name} } from 'lucide-react'`
    navigator.clipboard?.writeText(importStr)
    setCopied(name)
    setTimeout(() => setCopied(null), 1500)
  }

  const total = GROUPS.reduce((sum, g) => sum + g.icons.length, 0)

  return (
    <div className="p-8 bg-[var(--color-bg)] min-h-screen space-y-10">
      {/* ── Header ──────────────────────────────────────────────── */}
      <header>
        <h1 className="font-display font-semibold text-2xl text-[var(--color-text)] mb-1">
          Icons · Ikonok
        </h1>
        <p className="text-sm text-[var(--color-text-muted)] max-w-2xl">
          Vikingo uses <strong className="text-[var(--color-text)]">Lucide React</strong> as its
          single icon library. Do not install others (heroicons, react-icons, phosphor). {total}{' '}
          curated icons below — the ones actually used across{' '}
          <code className="font-mono">@vikingo/ui</code>.
        </p>
      </header>

      {/* ── How to import ───────────────────────────────────────── */}
      <section>
        <p className="text-xs font-mono text-[var(--color-text-muted)] uppercase tracking-widest mb-3">
          Usage · Használat
        </p>
        <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5 space-y-4">
          <div>
            <p className="text-xs text-[var(--color-text-subtle)] mb-2 font-mono uppercase tracking-wide">
              Import — always named, always from <code>lucide-react</code>
            </p>
            <pre className="font-mono text-sm text-[var(--color-text)] bg-[var(--color-bg)] rounded-[var(--radius-md)] p-3 overflow-x-auto">
              {`import { Search, Check, Trash2 } from 'lucide-react'`}
            </pre>
          </div>

          <div>
            <p className="text-xs text-[var(--color-text-subtle)] mb-2 font-mono uppercase tracking-wide">
              Use — size + color via tokens
            </p>
            <pre className="font-mono text-sm text-[var(--color-text)] bg-[var(--color-bg)] rounded-[var(--radius-md)] p-3 overflow-x-auto">
              {`<Search size={16} />
<Button variant="ghost" size="icon"><Trash2 size={18} /></Button>
<Check className="text-[var(--color-success)]" size={20} />`}
            </pre>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[var(--color-border)]">
            <div>
              <p className="text-xs text-[var(--color-text-subtle)] mb-1 font-mono uppercase tracking-wide">
                Size
              </p>
              <p className="text-sm text-[var(--color-text-muted)]">
                <code className="font-mono">16</code> dense inline ·{' '}
                <code className="font-mono">20</code> icon button ·{' '}
                <code className="font-mono">24</code> default ·{' '}
                <code className="font-mono">32</code> hero
              </p>
            </div>
            <div>
              <p className="text-xs text-[var(--color-text-subtle)] mb-1 font-mono uppercase tracking-wide">
                Color
              </p>
              <p className="text-sm text-[var(--color-text-muted)]">
                Inherits <code className="font-mono">currentColor</code> by default. Override with{' '}
                <code className="font-mono">text-[var(--color-…)]</code> — never hex.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Size toggle ─────────────────────────────────────────── */}
      <section>
        <div className="flex items-center gap-2">
          <span className="text-xs text-[var(--color-text-muted)] font-mono uppercase tracking-widest">
            Preview size
          </span>
          {[16, 20, 24, 32].map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSize(s)}
              className={[
                'px-2.5 py-1 text-xs rounded-[var(--radius-sm)] font-mono transition-colors duration-150',
                size === s
                  ? 'bg-[var(--color-accent)] text-[var(--color-accent-foreground)]'
                  : 'bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text)]',
              ].join(' ')}
            >
              {s}
            </button>
          ))}
        </div>
      </section>

      {/* ── Grouped grids ───────────────────────────────────────── */}
      {GROUPS.map((group) => (
        <section key={group.title}>
          <p className="text-xs font-mono text-[var(--color-text-muted)] uppercase tracking-widest mb-3">
            {group.title}
          </p>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(110px,1fr))] gap-2">
            {group.icons.map((entry) => (
              <IconTile
                key={entry.name}
                entry={entry}
                size={size}
                copied={copied === entry.name}
                onCopy={handleCopy}
              />
            ))}
          </div>
        </section>
      ))}

      {/* ── Footer: full catalog pointer ────────────────────────── */}
      <footer className="rounded-[var(--radius-lg)] border border-dashed border-[var(--color-border)] bg-[var(--color-surface)] p-5">
        <p className="text-sm text-[var(--color-text)] mb-1">Need an icon not shown here?</p>
        <p className="text-sm text-[var(--color-text-muted)]">
          Browse the full catalog at{' '}
          <a
            href="https://lucide.dev/icons/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-accent)] hover:underline"
          >
            lucide.dev/icons ↗
          </a>{' '}
          and import it the same way:{' '}
          <code className="font-mono text-xs">{`import { MyIcon } from 'lucide-react'`}</code>. No
          other icon library is allowed in Vikingo consumers — see{' '}
          <code className="font-mono text-xs">CONSUMER_CLAUDE.md</code> for the full rule.
        </p>
      </footer>
    </div>
  )
}

const meta: Meta<typeof IconsShowcase> = {
  title: 'Tokens/Icons',
  component: IconsShowcase,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof IconsShowcase>

export const IconBrowser: Story = {
  name: 'Icon Browser · Ikonböngésző',
}
