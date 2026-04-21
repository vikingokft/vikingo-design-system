# Chrome Extension Preset — Vikingo Design System

> Guidelines for building Chrome extensions with `@vikingo/ui`.
> Updated based on real-world lessons from building Vikingo Web Audit.

## Core Rules

1. **Never create custom UI components** — always use `@vikingo/ui`
2. **Never write custom CSS** — use Tailwind utilities and CSS custom properties
3. **Never install other UI libraries** (shadcn/ui, MUI, Ant Design, etc.)

---

## Quick Start

### Installation

Clone the design system adjacent to your project:

```bash
git clone https://github.com/vikingokft/vikingo-design-system.git ../vikingo-design-system
cd ../vikingo-design-system && pnpm install && pnpm build && cd -
```

Add to `package.json`:

```json
{
  "dependencies": {
    "@vikingo/ui": "file:../vikingo-design-system/packages/ui",
    "lucide-react": "^0.511.0",
    "react": "^19.1.0",
    "react-dom": "^19.1.0",
    "recharts": "^3.7.0",
    "react-hook-form": "^7.71.2"
  },
  "devDependencies": {
    "@crxjs/vite-plugin": "^2.0.0-beta.28",
    "@tailwindcss/vite": "^4.1.7",
    "@types/chrome": "^0.0.304",
    "@types/react": "^19.1.0",
    "@types/react-dom": "^19.1.0",
    "@vitejs/plugin-react": "^4.7.0",
    "tailwindcss": "^4.1.7",
    "typescript": "^5.8.3",
    "vite": "^6.3.5"
  }
}
```

> `recharts` and `react-hook-form` are required peer dependencies even if unused.

### Vite Config

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { crx } from '@crxjs/vite-plugin'
import tailwindcss from '@tailwindcss/vite'
import manifest from './manifest.json'

export default defineConfig({
  plugins: [react(), tailwindcss(), crx({ manifest })],
})
```

### TypeScript Config

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "skipLibCheck": true,
    "types": ["chrome"]
  },
  "include": ["src"]
}
```

Add SVG import support:

```typescript
// src/vite-env.d.ts
/// <reference types="vite/client" />
declare module '*.svg' {
  const src: string
  export default src
}
```

### Entry Point & Styles

```typescript
// src/popup/main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Toaster } from '@vikingo/ui'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    <Toaster />
  </React.StrictMode>
)
```

```css
/* src/popup/index.css */
@import "@vikingo/ui/styles/no-cdn";

body {
  width: 400px;
  min-height: 500px;
  max-height: 600px;
  margin: 0;
  overflow-y: auto;
}

/* Utility animations */
@keyframes fade-in {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes scale-in {
  from { opacity: 0; transform: scale(0.5); }
  to { opacity: 1; transform: scale(1); }
}

.animate-fade-in { animation: fade-in 0.4s ease-out; }
.animate-scale-in { animation: scale-in 0.3s ease-out; }
```

---

## Manifest V3

```json
{
  "manifest_version": 3,
  "name": "Extension Name",
  "version": "1.0.0",
  "action": {
    "default_popup": "src/popup/index.html"
  },
  "permissions": ["activeTab", "scripting", "storage"],
  "host_permissions": ["<all_urls>"],
  "background": {
    "service_worker": "src/background/service-worker.ts",
    "type": "module"
  },
  "content_scripts": [{
    "matches": ["<all_urls>"],
    "js": ["src/content/content-script.ts"],
    "run_at": "document_idle"
  }]
}
```

Only request permissions you actually need. Common ones:
- `activeTab` + `scripting` — inject content scripts on user action
- `cookies` — read cookies for auditing
- `storage` — use `chrome.storage.local` and `chrome.storage.session`

---

## Available Components

### Recommended for Extensions

**Forms:** Button, Input, NumberInput, Textarea, Select, Checkbox, Switch, RadioGroup, Slider, Chip, ChipGroup, SearchBar, Combobox, TagsInput, SegmentedControl, CopyButton

**Display:** Avatar, Badge, Card (CardContent, CardHeader, CardTitle, CardFooter), Alert, Progress, Skeleton (SkeletonText, SkeletonCircle, SkeletonCard), Spinner, Separator, EmptyState, Logo

**Overlays:** Dialog, Drawer, Tooltip (TooltipProvider, TooltipTrigger, TooltipContent), Toaster + toast(), DropdownMenu, ConfirmDialog, Popover

**Navigation:** Tabs, Accordion

**Data:** Table, DataTable

### NOT Recommended for Extensions

PageLayout, PageContent, Sidebar, Topbar, Carousel, ImageCard, Breadcrumb, Pagination, StatCard, ChartCard, MetricRow, PeriodFilter, PageHeader, AreaChart, MultiBarChart, MultiLineChart, CommandPalette — these are designed for full-page apps and don't fit extension popups.

---

## Icons

Use **Lucide React** exclusively. Browse at [lucide.dev/icons](https://lucide.dev/icons/).

```typescript
import { Search, Settings, ChevronLeft, Download } from 'lucide-react'

// In a button
<Button variant="ghost" size="icon-sm">
  <Settings className="w-4 h-4" />
</Button>

// Consistent sizing: use className, not size prop
<Search className="w-[18px] h-[18px]" strokeWidth={1.75} />
```

---

## Styling

Use Tailwind utilities for layout. Use CSS custom properties for brand colors:

```typescript
// ✅ Correct
<div className="flex flex-col gap-4 p-4 bg-[var(--color-surface)] rounded-[var(--radius-md)]">
<p className="text-xs text-[var(--color-text-muted)]">

// ❌ Wrong — hardcoded values
<p style={{ color: '#888', fontSize: 12 }}>
```

### Available CSS Variables

| Group | Variables |
|-------|-----------|
| Colors | `--color-bg`, `--color-surface`, `--color-text`, `--color-text-muted`, `--color-text-subtle`, `--color-border`, `--color-accent`, `--color-accent-hover`, `--color-accent-muted` |
| Status | `--color-success`, `--color-warning`, `--color-error`, `--color-info` |
| Radius | `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-xl`, `--radius-full` |
| Shadow | `--shadow-sm`, `--shadow-md`, `--shadow-lg`, `--shadow-xl` |
| Duration | `--duration-fast` (120ms), `--duration-base` (200ms), `--duration-slow` (320ms) |
| Easing | `--ease-out-quint` (default), `--ease-in-out`, `--ease-soft` |
| Fonts | `--font-display` (headings), `--font-body` (text), `--font-mono` (code/data) |

Motion respects `prefers-reduced-motion: reduce` globally — animations collapse when the OS setting is on. Important in Chrome extensions where popups need to feel instant.

---

## Architecture Patterns

### Screen-Based Navigation

Use a discriminated union for navigation state. This prevents invalid states and makes the flow explicit:

```typescript
type AppScreen =
  | { screen: 'start' }
  | { screen: 'loading' }
  | { screen: 'results'; view: 'dashboard' | { detail: string } | 'settings' }

export default function App() {
  const [state, setState] = useState<AppScreen>({ screen: 'start' })

  if (state.screen === 'start') return <StartView ... />
  if (state.screen === 'loading') return <LoadingView ... />

  // Results screen with sub-views
  const { view } = state
  return (
    <>
      <Header showBack={view !== 'dashboard'} onBack={() => setState({ screen: 'results', view: 'dashboard' })} />
      {view === 'dashboard' && <Dashboard ... />}
      {typeof view === 'object' && 'detail' in view && <DetailView id={view.detail} />}
    </>
  )
}
```

### Centralized Metadata

Define all category/section metadata in a single file. Never duplicate:

```typescript
// src/types.ts
export const SECTIONS = {
  security: { label: 'Biztonság', icon: 'Shield' },
  performance: { label: 'Teljesítmény', icon: 'Zap' },
} as const

export type SectionId = keyof typeof SECTIONS
export const SECTION_ORDER: SectionId[] = ['security', 'performance']
```

Import everywhere:

```typescript
import { SECTIONS, SECTION_ORDER } from '../types'
```

### Background State (chrome.storage.session)

For operations that should survive popup close/reopen, manage state in the background service worker:

```typescript
// background/service-worker.ts

interface AppState {
  status: 'idle' | 'running' | 'done' | 'error'
  progress: number
  phase: string
  results: Record<string, any>
}

const EMPTY: AppState = { status: 'idle', progress: 0, phase: '', results: {} }

async function getState(): Promise<AppState> {
  const { _state } = await chrome.storage.session.get('_state')
  return _state || EMPTY
}

async function setState(patch: Partial<AppState>) {
  const current = await getState()
  const next = { ...current, ...patch }
  await chrome.storage.session.set({ _state: next })
  // Broadcast to popup
  chrome.runtime.sendMessage({ type: 'STATE_UPDATE', payload: next }).catch(() => {})
}
```

The popup listens for updates and syncs on mount:

```typescript
// In App.tsx
useEffect(() => {
  // Recover state if popup was closed and reopened
  chrome.runtime.sendMessage({ type: 'GET_STATE' }).then(applyState).catch(() => {})
}, [])

useEffect(() => {
  const listener = (msg: any) => {
    if (msg.type === 'STATE_UPDATE') applyState(msg.payload)
  }
  chrome.runtime.onMessage.addListener(listener)
  return () => chrome.runtime.onMessage.removeListener(listener)
}, [])
```

Use `chrome.storage.session` for temporary state (clears on browser restart). Use `chrome.storage.local` for persistent user data (history, settings).

### Messaging

Wrap all Chrome API calls in a utility module. Never call `chrome.*` directly from components:

```typescript
// utils/chrome.ts
export function getCurrentTab(): Promise<chrome.tabs.Tab> {
  return new Promise(resolve => {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => resolve(tabs[0]))
  })
}

export function getDomain(url: string): string {
  try { return new URL(url).hostname } catch { return url }
}

export function sendToBackground(message: any): Promise<any> {
  return chrome.runtime.sendMessage(message)
}

export function sendToTab(tabId: number, message: any): Promise<any> {
  return chrome.tabs.sendMessage(tabId, message)
}
```

### Content Script Injection (Reliability)

Content scripts declared in `manifest.json` auto-inject on new page loads, but NOT on tabs that were already open when the extension was installed/reloaded. Always implement retry logic:

```typescript
// background/service-worker.ts
async function sendToContentScript(tabId: number): Promise<any> {
  // Attempt 1: already loaded
  try {
    const result = await chrome.tabs.sendMessage(tabId, { type: 'RUN' })
    if (result) return result
  } catch {}

  // Attempt 2: inject programmatically
  try {
    const manifest = chrome.runtime.getManifest()
    const files = manifest.content_scripts?.[0]?.js || []
    if (files.length > 0) {
      await chrome.scripting.executeScript({ target: { tabId }, files })
    }
  } catch {}

  // Wait for CRXJS async loader to initialize
  await new Promise(r => setTimeout(r, 1500))

  // Attempt 3
  try {
    const result = await chrome.tabs.sendMessage(tabId, { type: 'RUN' })
    if (result) return result
  } catch {}

  // Attempt 4: longer wait
  await new Promise(r => setTimeout(r, 2000))
  try {
    return await chrome.tabs.sendMessage(tabId, { type: 'RUN' })
  } catch { return null }
}
```

> **Key lesson:** Always handle the case where content script returns `null`. The UI should work with partial data.

---

## UI Patterns

### Popup Layout (~400×600px)

```
┌──────────────────────────────┐
│  Header (fixed)              │ ← SiteHeader: logo/favicon + title + back button
├──────────────────────────────┤
│                              │
│  Content (scrollable)        │ ← flex-1 overflow-y-auto
│                              │
├──────────────────────────────┤
│  Action Bar (fixed)          │ ← Primary CTA + icon buttons with tooltips
└──────────────────────────────┘
```

```typescript
<div className="flex flex-col w-[400px] min-h-[500px] max-h-[600px] bg-[var(--color-bg)]">
  <Header />
  <div className="flex-1 overflow-y-auto p-3">{content}</div>
  <ActionBar />
</div>
```

### Header Pattern

Domain/title + contextual info + back button on sub-views:

```typescript
import { Badge, Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from '@vikingo/ui'
import { ChevronLeft } from 'lucide-react'

function Header({ title, subtitle, showBack, onBack }) {
  return (
    <TooltipProvider delayDuration={200}>
      <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--color-border)]">
        {showBack && (
          <Tooltip>
            <TooltipTrigger asChild>
              <button onClick={onBack} aria-label="Vissza"
                className="flex items-center justify-center w-8 h-8 rounded-[var(--radius-md)]
                  text-[var(--color-text-muted)] hover:text-[var(--color-text)]
                  hover:bg-[var(--color-surface)] transition-colors">
                <ChevronLeft className="w-[18px] h-[18px]" strokeWidth={1.75} />
              </button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="text-[11px]">Vissza</TooltipContent>
          </Tooltip>
        )}
        <div className="flex-1 min-w-0">
          <div className="text-sm font-semibold text-[var(--color-text)] truncate">{title}</div>
          {subtitle && <div className="text-[10px] text-[var(--color-text-muted)]">{subtitle}</div>}
        </div>
      </div>
    </TooltipProvider>
  )
}
```

### Action Bar Pattern

Fixed bottom bar with primary CTA + secondary icon buttons:

```typescript
import { Button, Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from '@vikingo/ui'
import { Search, Download, History } from 'lucide-react'

function ActionBar({ onPrimary, onDownload, onHistory }) {
  return (
    <TooltipProvider delayDuration={200}>
      <div className="flex items-center gap-2 px-4 py-2.5 border-t border-[var(--color-border)]">
        <Button variant="primary" size="sm" className="flex-1"
          leftIcon={<Search className="w-3.5 h-3.5" />}
          onClick={onPrimary}>
          Fő művelet
        </Button>
        <Tooltip>
          <TooltipTrigger asChild>
            <button onClick={onDownload} aria-label="Letöltés"
              className="flex items-center justify-center w-9 h-9 rounded-[var(--radius-md)]
                border border-[var(--color-border)] text-[var(--color-text-muted)]
                hover:text-[var(--color-text)] hover:bg-[var(--color-surface)] transition-colors">
              <Download className="w-4 h-4" strokeWidth={1.75} />
            </button>
          </TooltipTrigger>
          <TooltipContent side="top" className="text-[11px]">Letöltés</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  )
}
```

### Dashboard Grid Pattern

2-column grid of status cards with summary info:

```typescript
import { Card } from '@vikingo/ui'

function Dashboard({ sections, onSelect }) {
  return (
    <div>
      {/* Summary bar */}
      <div className="flex items-center justify-center gap-4 mb-3 py-2.5 px-3
        rounded-[var(--radius-md)] bg-[var(--color-surface)]">
        <Stat icon={CheckCircle2} count={passCount} label="rendben" color="success" />
        <div className="w-px h-4 bg-[var(--color-border)]" />
        <Stat icon={AlertTriangle} count={warnCount} label="figyelmeztetés" color="warning" />
        <div className="w-px h-4 bg-[var(--color-border)]" />
        <Stat icon={XCircle} count={failCount} label="hiba" color="error" />
      </div>

      {/* Card grid */}
      <div className="grid grid-cols-2 gap-2">
        {sections.map(section => (
          <Card key={section.id}
            className="cursor-pointer hover:shadow-[var(--shadow-md)] p-3"
            onClick={() => onSelect(section.id)}
            tabIndex={0} role="button"
            onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && onSelect(section.id)}>
            ...
          </Card>
        ))}
      </div>
    </div>
  )
}
```

### Loading Screen Pattern

ASCII spinner (Claude Code style) + rotating status messages + category progress:

```typescript
const SPINNER_CHARS = ['·', '✻', '✽', '✶', '✳', '✢']

function useSpinner() {
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => setIdx(i => (i + 1) % SPINNER_CHARS.length), 120)
    return () => clearInterval(interval)
  }, [])
  return SPINNER_CHARS[idx]
}

// Usage
const spinner = useSpinner()
<span className="text-sm text-[var(--color-accent)]">{spinner}</span>
<span className="text-xs text-[var(--color-text-muted)]">{statusMessage}</span>
```

Combine with circular SVG progress indicator:

```typescript
const circumference = 2 * Math.PI * 34
const offset = circumference * (1 - progress / 100)

<svg className="w-24 h-24 -rotate-90" viewBox="0 0 80 80">
  <circle cx="40" cy="40" r="34" fill="none" stroke="var(--color-border)"
    strokeWidth="3" opacity="0.3" />
  <circle cx="40" cy="40" r="34" fill="none" stroke="var(--color-accent)"
    strokeWidth="3.5" strokeLinecap="round"
    strokeDasharray={circumference} strokeDashoffset={offset}
    style={{ transition: 'stroke-dashoffset 0.6s ease-out' }} />
</svg>
```

### Detail View with Filters

Status filter chips + expand/collapse all + list with copy-to-clipboard:

```typescript
const FILTERS = [
  { key: 'all', label: 'Mind' },
  { key: 'fail', label: 'Hibák' },
  { key: 'warn', label: 'Figyelmeztetések' },
  { key: 'pass', label: 'Rendben' },
]

// Filter chip buttons
<div className="flex gap-1.5 mb-3">
  {FILTERS.map(({ key, label }) => (
    <button key={key} onClick={() => setFilter(key)}
      className={`text-[10px] px-2 py-1 rounded-[var(--radius-sm)] border transition-colors ${
        active ? 'bg-[var(--color-accent)]/10 border-[var(--color-accent)]/30 text-[var(--color-accent)]'
               : 'border-[var(--color-border)] text-[var(--color-text-muted)]'
      }`}>
      {label} ({count})
    </button>
  ))}
</div>
```

### Expandable List Item

Support string or array details, with copy button on hover:

```typescript
import { Copy, Check, ChevronRight, ChevronDown } from 'lucide-react'

function ListItem({ label, value, details, status }) {
  const [expanded, setExpanded] = useState(false)
  const [copied, setCopied] = useState(false)

  async function copy(e) {
    e.stopPropagation()
    await navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="group py-2 px-2 rounded-[var(--radius-sm)]"
      onClick={() => details && setExpanded(!expanded)}>
      <div className="flex items-start gap-2">
        <StatusIcon status={status} size={14} />
        <div className="flex-1 min-w-0">
          <span className="text-xs font-medium">{label}</span>
          <p className="text-[11px] text-[var(--color-text-muted)]">{value}</p>
        </div>
        <button onClick={copy} className="opacity-0 group-hover:opacity-100 w-5 h-5">
          {copied ? <Check className="w-2.5 h-2.5 text-[var(--color-success)]" />
                   : <Copy className="w-2.5 h-2.5" />}
        </button>
      </div>
      {expanded && details && (
        <div className="mt-2 ml-5 pl-2 border-l-2 border-[var(--color-border)]">
          {Array.isArray(details)
            ? details.map((d, i) => <p key={i} className="text-[10px] text-[var(--color-text-subtle)]">{d}</p>)
            : <p className="text-[10px] text-[var(--color-text-subtle)]">{details}</p>}
        </div>
      )}
    </div>
  )
}
```

### History / List with Delete

Items with hover delete + bulk clear with confirmation:

```typescript
import { ConfirmDialog, Card, Badge } from '@vikingo/ui'
import { X, Trash2 } from 'lucide-react'

function HistoryView({ items, onSelect, onDelete, onClearAll }) {
  const [confirmClear, setConfirmClear] = useState(false)

  return (
    <>
      <div className="flex justify-between mb-3">
        <h2 className="text-sm font-semibold">Előzmények</h2>
        <button onClick={() => setConfirmClear(true)}
          className="text-[10px] text-[var(--color-text-muted)] hover:text-[var(--color-error)]">
          <Trash2 className="w-3 h-3 inline mr-1" />Összes törlése
        </button>
      </div>

      {items.map(item => (
        <Card key={item.id} className="group p-3 cursor-pointer" onClick={() => onSelect(item)}
          tabIndex={0} role="button"
          onKeyDown={e => (e.key === 'Enter') && onSelect(item)}>
          <div className="flex items-center gap-2">
            <span className="flex-1 truncate text-xs">{item.title}</span>
            <button onClick={e => { e.stopPropagation(); onDelete(item.id) }}
              className="opacity-0 group-hover:opacity-100 w-6 h-6
                hover:text-[var(--color-error)] hover:bg-[var(--color-error)]/10 rounded-[var(--radius-sm)]"
              aria-label="Törlés">
              <X className="w-3 h-3" />
            </button>
          </div>
        </Card>
      ))}

      <ConfirmDialog open={confirmClear} onOpenChange={setConfirmClear}
        title="Előzmények törlése"
        description="Biztosan törölni szeretnéd az összes előzményt?"
        confirmLabel="Törlés" cancelLabel="Mégsem" variant="destructive"
        onConfirm={onClearAll} />
    </>
  )
}
```

---

## Export Patterns

Support multiple export formats from the start:

```typescript
export type ExportFormat = 'txt' | 'json' | 'html'

export function downloadFile(content: string, filename: string, mimeType: string) {
  // UTF-8 BOM for .txt files (Windows Notepad compatibility)
  const prefix = mimeType.includes('text/plain') ? '\uFEFF' : ''
  const blob = new Blob([prefix + content], { type: mimeType })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}
```

---

## Accessibility Checklist

Every interactive element must have:

- [ ] `aria-label` on icon-only buttons
- [ ] `tabIndex={0}` on clickable non-button elements
- [ ] `role="button"` on clickable divs/cards
- [ ] `onKeyDown` handler for Enter/Space on custom clickable elements
- [ ] Visible focus indicators (Vikingo UI components handle this by default)

```typescript
// ✅ Accessible clickable card
<Card onClick={handleClick} tabIndex={0} role="button"
  aria-label="Item description"
  onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleClick() } }}>

// ✅ Accessible icon button with tooltip
<Tooltip>
  <TooltipTrigger asChild>
    <button onClick={action} aria-label="Descriptive label"
      className="w-8 h-8 ...">
      <Icon className="w-4 h-4" />
    </button>
  </TooltipTrigger>
  <TooltipContent>{label}</TooltipContent>
</Tooltip>
```

---

## Modular File Structure

```
src/
├── popup/
│   ├── App.tsx                 # Screen state machine (start → loading → results)
│   ├── main.tsx                # Entry: React root + Toaster
│   ├── index.html
│   ├── index.css               # @vikingo/ui/styles/no-cdn + custom animations
│   └── components/
│       ├── StartView.tsx       # Initial screen (input + quick action + history)
│       ├── LoadingView.tsx     # Progress (spinner + status + category list)
│       ├── DashboardView.tsx   # Results grid (summary bar + cards)
│       ├── DetailView.tsx      # Drilldown (filters + expandable items)
│       ├── HistoryView.tsx     # History list (delete + confirm)
│       ├── Header.tsx          # Domain/title + back button
│       ├── ActionBar.tsx       # Primary CTA + icon buttons
│       ├── StatusIcon.tsx      # Pass/warn/fail/info icon mapper
│       └── ListItem.tsx        # Expandable item with copy button
├── background/
│   └── service-worker.ts       # State management + orchestration
├── content/
│   └── content-script.ts       # DOM analysis + message listener
├── types.ts                    # Shared types, metadata, constants (SINGLE SOURCE OF TRUTH)
├── utils/
│   ├── chrome.ts               # Chrome API wrappers (never call chrome.* from components)
│   └── export.ts               # Report generation (TXT + JSON + HTML)
└── assets/
    ├── logo.svg
    └── icon-{16,48,128}.png
```

**Key principles:**
- Types and constants in `types.ts` — single source of truth
- Chrome API calls only in `utils/chrome.ts` — testable, mockable
- Components in `popup/components/` — pure UI, no Chrome API calls
- State in `background/service-worker.ts` — survives popup close

---

## Common Pitfalls

| Pitfall | Solution |
|---------|----------|
| Content script not loaded on existing tabs | Retry logic with programmatic injection fallback |
| Constants duplicated across files | Single `types.ts` with all metadata |
| Popup freezes during long operations | Run in background service worker, broadcast updates |
| UTF-8 characters garbled in .txt export | Add BOM (`\uFEFF`) prefix |
| `overflow-x` scroll from animations | Use `overflow-x-hidden` on animated containers |
| Icon buttons not accessible | Always add `aria-label` + keyboard handlers |
| Regex patterns too broad (false positives) | Use path separators and specific prefixes |
| CDN IP detected as hosting provider | Check if IP belongs to CDN/proxy, note "behind CDN" |
| `chrome.storage.session` empty after restart | Expected — use `chrome.storage.local` for persistent data |
| CRXJS async loader delays content script | Wait 1.5-2s after `executeScript` before sending messages |

---

## Dark Mode

```typescript
import { useState, useEffect } from 'react'

export function useTheme() {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    chrome.storage.local.get('theme', ({ theme }) => {
      const isDark = theme === 'dark' || (!theme && matchMedia('(prefers-color-scheme: dark)').matches)
      setDark(isDark)
      document.documentElement.classList.toggle('dark', isDark)
    })
  }, [])

  function toggle() {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle('dark', next)
    chrome.storage.local.set({ theme: next ? 'dark' : 'light' })
  }

  return { dark, toggle }
}
```

---

## Shadow DOM (Content Script UI)

When injecting UI into web pages, isolate styles:

```typescript
import css from '@vikingo/ui/styles/no-cdn?inline'

const host = document.createElement('div')
document.body.appendChild(host)
const shadow = host.attachShadow({ mode: 'open' })

const style = document.createElement('style')
style.textContent = css
shadow.appendChild(style)

const root = document.createElement('div')
shadow.appendChild(root)

createRoot(root).render(<ContentApp />)
```

**Critical:** Override portal containers for Radix UI overlays (Dialog, Tooltip, Popover):

```typescript
<DialogPortal container={shadowRoot}>
  <DialogContent>...</DialogContent>
</DialogPortal>
```

---

## What NOT to Do

- Don't install other UI libraries (shadcn/ui, MUI, Ant Design)
- Don't write custom CSS — use Tailwind + CSS variables
- Don't hardcode colors (`#333`, `rgb(...)`) — use `var(--color-*)`
- Don't use inline `style={{ }}` — use Tailwind className
- Don't call `chrome.*` from components — wrap in `utils/chrome.ts`
- Don't duplicate metadata — single `types.ts`
- Don't use broad regex patterns — be specific with path separators
- Don't assume content script is loaded — implement retry logic
- Don't forget `aria-label` on icon buttons
- Don't forget keyboard handlers on clickable non-button elements
