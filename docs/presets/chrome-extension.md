# Project Rules for Claude Code
# Platform: Chrome Extension (Manifest v3)

This project uses the **Vikingo Design System** (`@vikingo/ui`) in a **Chrome Extension**.

## Core Rules

- **Never create custom UI components.** Always use components from `@vikingo/ui`.
- **Never write custom CSS.** Use Tailwind utility classes and CSS custom properties (`--color-*`, `--radius-*`, etc.).
- **Never install other UI libraries** (shadcn/ui, MUI, Ant Design, Chakra, etc.).
- All imports come from `@vikingo/ui`: `import { Button, Input, Card } from '@vikingo/ui'`

---

## Available Components

Use these components in popup, sidebar, and options pages. **Avoid** full-page layout components (`PageLayout`, `Sidebar`, `Topbar`) — they are designed for full-screen apps, not constrained extension UIs.

### Forms
`Button` `Input` `NumberInput` `Textarea` `Select` `Checkbox` `Switch` `RadioGroup` `RadioButton` `Slider` `Chip` `ChipGroup` `SearchBar` `Combobox` `TagsInput` `CopyButton` `SegmentedControl`

### Display
`Avatar` `Badge` `Card` `Alert` `Progress` `Skeleton` `Spinner` `Separator` `EmptyState` `Logo`

### Overlays
`Dialog` `Drawer` `Tooltip` `TooltipProvider` `Toaster` `toast` `DropdownMenu` `ConfirmDialog` `Popover` `PopoverTrigger` `PopoverContent` `PopoverClose`

### Navigation
`Tabs` `Accordion`

### Data
`Table` `DataTable`

**Not recommended for extensions:** `PageLayout` `PageContent` `Sidebar` `Topbar` `Carousel` `ImageCard` `Breadcrumb` `Pagination` `StatCard` `ChartCard` `MetricRow` `PeriodFilter` `PageHeader` `AreaChart` `MultiBarChart` `MultiLineChart` `CommandPalette`

**Reference:** https://vikingo-storybook.vercel.app

---

## Platform Setup

### Installation

The design system lives in a monorepo. For Chrome extensions, use a **local file reference** (the `github:` install method installs the monorepo root, not the `packages/ui` subpackage):

```bash
# 1. Clone the design system next to your project
git clone https://github.com/vikingokft/vikingo-design-system.git ../vikingo-design-system
cd ../vikingo-design-system && pnpm install && pnpm build && cd -

# 2. Reference it locally in your package.json
# Add to dependencies: "@vikingo/ui": "file:../vikingo-design-system/packages/ui"
pnpm install
```

**Required peer dependencies:** Even if you don't use charts or forms, the bundled `@vikingo/ui` statically imports `recharts` and `react-hook-form`. You **must** install them to avoid Vite/Rollup build errors:

```bash
pnpm add recharts react-hook-form
```

### Vite Config (without CRXJS)

> **Note:** `@crxjs/vite-plugin` (beta) has compatibility issues with Vite 5+/6 (ESM service worker MIME type errors). Use a plain Vite multi-page build instead:

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: './',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        popup: 'index.html',
        // sidepanel: 'sidepanel.html',  // if using side panel
        // options: 'options.html',      // if using options page
      },
    },
  },
})
```

After `pnpm build`, copy your `manifest.json` and any static assets into `dist/`, then load `dist/` as an unpacked extension in `chrome://extensions`.

### Manifest v3

```json
{
  "manifest_version": 3,
  "name": "My Extension",
  "version": "1.0.0",
  "action": {
    "default_popup": "index.html"
  },
  "permissions": [],
  "content_security_policy": {
    "extension_pages": "script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com"
  }
}
```

**CSP breakdown:**
- `style-src 'unsafe-inline'` — required for Tailwind's inline styles
- `style-src https://fonts.googleapis.com` — required for Google Fonts CSS (DM Sans, DM Mono)
- `font-src https://fonts.gstatic.com` — required for Google Fonts woff2 files

### Entry Point & Styles

Use the **CDN-free** styles variant to avoid CSP issues with the Google Fonts `@import`:

```tsx
// src/main.tsx
import '@vikingo/ui/styles/no-cdn'  // ← No Google Fonts CDN @import
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

**`@vikingo/ui/styles/no-cdn`** is identical to `@vikingo/ui/styles` but without the Google Fonts CDN `@import`. This means:
- **Clash Display** — works (self-hosted woff2 inside the package)
- **DM Sans & DM Mono** — you must load them yourself:

**Option A: Allow Google Fonts in CSP** (easiest)
```css
/* Add to your app's CSS, BEFORE the @vikingo/ui import */
@import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=DM+Sans:wght@400;500;600;700&display=swap');
```
And add `https://fonts.googleapis.com` to `style-src` and `https://fonts.gstatic.com` to `font-src` in the manifest CSP.

**Option B: Self-host the fonts** (no external requests)
Download DM Sans and DM Mono woff2 files from Google Fonts, place them in `src/fonts/`, and add `@font-face` declarations in a local CSS file.

---

## Import Pattern

```tsx
import { Button, Input, Card, Dialog, toast, Toaster } from '@vikingo/ui'
```

Styles must be imported once in the entry point:
```tsx
import '@vikingo/ui/styles/no-cdn'  // CDN-free for Chrome Extensions
```

---

## Fonts

| Font | CSS Variable | Tailwind Class | Usage |
|---|---|---|---|
| [Clash Display](https://www.fontshare.com/fonts/clash-display) | `--font-display` | `font-display` | Headings (h1-h4) |
| [DM Sans](https://fonts.google.com/specimen/DM+Sans) | `--font-body` | `font-body` | Body text, labels, buttons |
| [DM Mono](https://fonts.google.com/specimen/DM+Mono) | `--font-mono` | `font-mono` | Data, code, badges, KPIs |

Clash Display is self-hosted inside the package (works without CSP issues).

DM Sans & DM Mono require either Google Fonts CDN (with CSP allowance) or self-hosting. See the [Entry Point & Styles](#entry-point--styles) section above.

---

## Icons

The design system uses **[Lucide React](https://lucide.dev/icons/)** for icons. Do **not** install other icon libraries.

```tsx
import { Search, Plus, Trash2, ChevronDown } from 'lucide-react'

<Search size={16} />
<Button variant="ghost" size="icon"><Trash2 size={18} /></Button>
```

Browse all available icons at: https://lucide.dev/icons/

---

## Styling

Use Tailwind utility classes for layout and spacing. Use CSS custom properties for brand colors:

```tsx
// Correct — Tailwind utilities
<div className="flex flex-col gap-4 p-6">

// Correct — brand color via CSS variable
<p className="text-[var(--color-text-muted)]">

// Wrong — hardcoded color
<p style={{ color: '#888' }}>
```

Available CSS custom properties:
- Colors: `--color-text`, `--color-text-muted`, `--color-bg`, `--color-surface`, `--color-border`, `--color-accent`, `--color-accent-hover`, `--color-accent-muted`
- Status: `--color-success`, `--color-warning`, `--color-error`, `--color-info`
- Radius: `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-xl`, `--radius-full`
- Shadow: `--shadow-sm`, `--shadow-md`, `--shadow-lg`

---

## Extension-Specific Patterns

### Popup Layout

Popups have a fixed max size (~400x600px). Design for compact layouts:

```tsx
// src/App.tsx
import { Button, Input, Logo, Toaster } from '@vikingo/ui'

export default function App() {
  return (
    <div className="w-[360px] min-h-[400px] bg-[var(--color-bg)] p-4 flex flex-col gap-3">
      <Toaster position="top-center" />
      <header className="flex items-center gap-2 pb-3 border-b border-[var(--color-border)]">
        <Logo />
        <h1 className="font-display font-semibold text-lg text-[var(--color-text)]">My Extension</h1>
      </header>
      <main className="flex-1 flex flex-col gap-3">
        {/* Content */}
      </main>
    </div>
  )
}
```

### Sidebar Panel

```json
// manifest.json — add side panel support
{
  "side_panel": {
    "default_path": "sidepanel.html"
  },
  "permissions": ["sidePanel"]
}
```

Sidepanel has more vertical space but is narrow (~300-400px). Use the same compact layout approach as popups.

### Content Script UI (Shadow DOM)

For injecting UI into web pages, use Shadow DOM to isolate Vikingo styles from the host page:

```tsx
// content-script.tsx
import css from '@vikingo/ui/styles/no-cdn?inline'

const host = document.createElement('div')
document.body.appendChild(host)
const shadow = host.attachShadow({ mode: 'open' })

// Inject styles into shadow DOM
const style = document.createElement('style')
style.textContent = css
shadow.appendChild(style)

// Mount React into shadow DOM
const root = document.createElement('div')
shadow.appendChild(root)

import { createRoot } from 'react-dom/client'
import { ContentApp } from './ContentApp'
createRoot(root).render(<ContentApp />)
```

**Important:** Vikingo components use Radix UI portals (Dialog, Tooltip, DropdownMenu, Popover). These portal to `document.body` by default, which is **outside** the Shadow DOM. You must override the portal container:

```tsx
import { Dialog, DialogContent, DialogPortal } from '@vikingo/ui'

// Pass the shadow root element as the container
<Dialog>
  <DialogPortal container={shadowRoot}>
    <DialogContent>...</DialogContent>
  </DialogPortal>
</Dialog>
```

---

## Dark Mode

Sync with system preference or store in `chrome.storage`:

```tsx
// hooks/use-theme.ts
import { useState, useEffect } from 'react'

export function useTheme() {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    chrome.storage.local.get('theme', ({ theme }) => {
      const isDark = theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)
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

## Common Patterns

### Button
```tsx
<Button variant="primary" size="md" onClick={handleClick}>Mentés</Button>
<Button variant="secondary">Mégse</Button>
<Button variant="destructive">Törlés</Button>
<Button variant="ghost" size="icon"><Trash2 /></Button>
<Button isLoading>Folyamatban...</Button>
```

### Input
```tsx
<Input label="Email" type="email" placeholder="you@example.com" hint="Nem jelenítjük meg" />
```

### Toast
```tsx
import { toast } from '@vikingo/ui'

toast.success('Sikeres mentés!')
toast.error('Hiba történt.')
```

`<Toaster position="top-center" />` must be present — use `top-center` for popups (bottom toasts get clipped).

### Dialog
```tsx
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter, Button } from '@vikingo/ui'

<Dialog>
  <DialogTrigger asChild><Button>Megnyit</Button></DialogTrigger>
  <DialogContent className="max-w-[340px]">
    <DialogHeader><DialogTitle>Cím</DialogTitle></DialogHeader>
    <p>Tartalom</p>
    <DialogFooter><Button>OK</Button></DialogFooter>
  </DialogContent>
</Dialog>
```

Note: constrain `DialogContent` width for popup/sidebar contexts.

---

## What NOT to Do

```tsx
// ❌ Don't create a custom button
function MyButton({ children }) {
  return <button className="bg-blue-500 text-white px-4 py-2 rounded">{children}</button>
}

// ✅ Use the design system button
import { Button } from '@vikingo/ui'
<Button variant="primary">{children}</Button>

// ❌ Don't use hardcoded colors
<div style={{ backgroundColor: '#FF544D' }}>

// ✅ Use CSS custom properties
<div className="bg-[var(--color-accent)]">

// ❌ Don't use full-page layout in popup
import { PageLayout, Sidebar } from '@vikingo/ui'
// These are for full-screen apps, not 400px popups

// ❌ Don't use @vikingo/ui/styles (includes Google Fonts CDN @import → CSP violation)
import '@vikingo/ui/styles'

// ✅ Use the CDN-free variant
import '@vikingo/ui/styles/no-cdn'

// ❌ Don't inject Vikingo styles into the host page (content scripts)
// This pollutes the host page!

// ✅ Use Shadow DOM isolation for content scripts
const shadow = host.attachShadow({ mode: 'open' })

// ❌ Don't install via github: URL (installs the monorepo root, not packages/ui)
// "@vikingo/ui": "github:vikingokft/vikingo-design-system#v0.5.0"

// ✅ Use local file reference
// "@vikingo/ui": "file:../vikingo-design-system/packages/ui"
```

---

## Chrome Extension Gotchas

- **Popup size:** Chrome popups max out at ~800x600px (varies by OS). Design for 360px width.
- **CSP & Google Fonts:** The default `@vikingo/ui/styles` imports Google Fonts via CDN, which causes CSP violations. Use `@vikingo/ui/styles/no-cdn` instead, and load DM Sans/DM Mono separately (via CSP-allowed CDN or self-hosted woff2).
- **Peer dependencies:** `recharts` and `react-hook-form` must be installed even if unused — the main bundle statically imports them. Run `pnpm add recharts react-hook-form`.
- **Installation:** Use `"file:../vikingo-design-system/packages/ui"` in package.json, not `"github:..."` — the GitHub URL installs the monorepo root which doesn't contain the built `dist/`.
- **CRXJS:** `@crxjs/vite-plugin@beta` has known compatibility issues with Vite 5+/6 (ESM service worker MIME type errors). Use a plain Vite multi-page build with `base: './'` instead.
- **Portals:** Radix UI portals (Dialog, Tooltip, Popover) attach to `document.body`. In Shadow DOM content scripts, you must override the portal container.
- **Background scripts:** Keep the service worker (background script) standalone — don't import shared modules, as the CRXJS loader can fail with MIME type errors.
- **Storage:** Use `chrome.storage` instead of `localStorage` for data that needs to sync across devices.
- **No SSR:** Chrome extensions are purely client-side. No need for 'use client' directives.
- **Bundle size:** Extensions are loaded locally, so bundle size matters less than network-loaded apps. However, avoid importing chart components if you don't need charts (they pull in recharts ~150KB).
