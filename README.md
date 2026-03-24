# Vikingo Design System

A versioned, reusable React component library built for Vikingo SaaS products. Brand-consistent, dark/light mode ready, fully documented in Storybook.

**Live Storybook:** https://vikingo-storybook.vercel.app

---

## Stack

| Layer | Technology |
|---|---|
| Monorepo | Turborepo + pnpm workspaces |
| Components | React 19 + TypeScript |
| Styling | Tailwind CSS v4 |
| Primitives | Radix UI |
| Icons | [Lucide React](https://lucide.dev/icons/) |
| Docs | Storybook 8 |
| Build | tsup (ESM + CJS dual output) |

---

## Brand

- **Accent:** `#FF544D` (orange-red CTA)
- **Background light:** `#F6EFE8` (beige)
- **Text / Sidebar:** `#3E2E45` (dark purple)
- **Dark background:** `#2A1F30`
- **Display font:** [Clash Display](https://www.fontshare.com/fonts/clash-display) 600 (self-hosted woff2, Fontshare license)
- **Body font:** [DM Sans](https://fonts.google.com/specimen/DM+Sans) (Google Fonts CDN, OFL)
- **Mono font:** [DM Mono](https://fonts.google.com/specimen/DM+Mono) (Google Fonts CDN, OFL)

---

## Using with Claude Code

Copy the appropriate preset into your project root as `CLAUDE.md`. This tells Claude Code all the rules: which components exist, how to import them, what patterns to use, and what NOT to do.

### Platform Presets

| Preset | Use When |
|---|---|
| [`CONSUMER_CLAUDE.md`](./CONSUMER_CLAUDE.md) | Generic — Vite + React SPA (default) |
| [`docs/presets/nextjs.md`](./docs/presets/nextjs.md) | Next.js App Router (SSR, `'use client'`, `next/font`) |
| [`docs/presets/chrome-extension.md`](./docs/presets/chrome-extension.md) | Chrome Extension (Manifest v3, Shadow DOM, CSP) |
| [`docs/presets/marketing-site.md`](./docs/presets/marketing-site.md) | Marketing / Landing Page (SEO, performance, minimal JS) |

```bash
# Generic (Vite + React) — the default
curl -o CLAUDE.md https://raw.githubusercontent.com/vikingokft/vikingo-design-system/main/CONSUMER_CLAUDE.md

# Next.js
curl -o CLAUDE.md https://raw.githubusercontent.com/vikingokft/vikingo-design-system/main/docs/presets/nextjs.md

# Chrome Extension
curl -o CLAUDE.md https://raw.githubusercontent.com/vikingokft/vikingo-design-system/main/docs/presets/chrome-extension.md

# Marketing Site
curl -o CLAUDE.md https://raw.githubusercontent.com/vikingokft/vikingo-design-system/main/docs/presets/marketing-site.md
```

---

## Integration Guide

> **Before you start:** The design system requires **Tailwind CSS v4** and **React 18+**. The styles ship as raw Tailwind v4 source — your project must process them with the Tailwind v4 plugin.

---

### A) New Project Setup

#### Vite + React

```bash
# 1. Create project
pnpm create vite my-app --template react-ts
cd my-app
pnpm install
```

```bash
# 2. Install Tailwind v4 Vite plugin
pnpm add -D tailwindcss @tailwindcss/vite
```

```ts
// 3. vite.config.ts — add the Tailwind plugin
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

```bash
# 4. Install @vikingo/ui (pin to a specific version)
pnpm add github:vikingokft/vikingo-design-system#v0.5.0
```

```tsx
// 5. src/main.tsx — import styles before anything else
import '@vikingo/ui/styles'  // Tailwind base + design tokens + fonts
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

```tsx
// 6. src/App.tsx — delete the boilerplate, use components
import { Button, Input, Card, Toaster, toast } from '@vikingo/ui'

export default function App() {
  return (
    <>
      <Toaster />
      <Card className="p-6 max-w-sm mx-auto mt-10">
        <Input label="Email" type="email" placeholder="you@example.com" />
        <Button className="mt-4 w-full" onClick={() => toast.success('Szia!')}>
          Küldés
        </Button>
      </Card>
    </>
  )
}
```

```bash
# 7. Delete default boilerplate (optional)
rm src/App.css src/index.css
```

---

#### Next.js

```bash
# 1. Create project (select TypeScript + Tailwind when prompted)
pnpm create next-app my-app
cd my-app
```

```bash
# 2. Upgrade to Tailwind v4 (if the scaffolder installed v3)
pnpm remove tailwindcss postcss autoprefixer
pnpm add -D tailwindcss @tailwindcss/postcss
```

```js
// 3. postcss.config.mjs — replace content with:
const config = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
export default config
```

```bash
# 4. Install @vikingo/ui (pin to a specific version)
pnpm add github:vikingokft/vikingo-design-system#v0.5.0
```

```tsx
// 5. app/layout.tsx — import styles at the top
import '@vikingo/ui/styles'
import type { Metadata } from 'next'
import { Toaster } from '@vikingo/ui'

export const metadata: Metadata = { title: 'My App' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="hu">
      <body>
        <Toaster />
        {children}
      </body>
    </html>
  )
}
```

```tsx
// 6. app/page.tsx — use components
import { Button, Card, Input } from '@vikingo/ui'

export default function Home() {
  return (
    <Card className="p-6 max-w-sm mx-auto mt-10">
      <Input label="Email" type="email" placeholder="you@example.com" />
      <Button className="mt-4 w-full">Küldés</Button>
    </Card>
  )
}
```

```bash
# 7. Delete Next.js default CSS (keep only globals.css if you need custom styles)
# In app/globals.css — replace everything with nothing (styles come from @vikingo/ui)
```

---

### B) Existing Project Migration

> Use this if your project already has a UI library (shadcn/ui, MUI, Ant Design, etc.) that you want to replace.

#### Step 1 — Upgrade to Tailwind v4

Skip if already on v4. Check with `pnpm list tailwindcss`.

```bash
# Remove v3
pnpm remove tailwindcss postcss autoprefixer

# Install v4
pnpm add -D tailwindcss @tailwindcss/vite    # Vite projects
# OR
pnpm add -D tailwindcss @tailwindcss/postcss  # Next.js / Webpack projects
```

**Vite:** add plugin to `vite.config.ts` (see Step A above).
**Next.js:** update `postcss.config.mjs` (see Step A above).

In your main CSS file, replace the old Tailwind v3 directives:
```css
/* Remove these v3 lines: */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Replace with v4: */
@import "tailwindcss";
```

> **Note:** If you have a `tailwind.config.js` — it's no longer needed in v4. CSS-based configuration replaces it.

#### Step 2 — Install @vikingo/ui

```bash
pnpm add github:vikingokft/vikingo-design-system#v0.5.0
```

#### Step 3 — Import styles

In your entry point (`main.tsx` / `app/layout.tsx`), **replace** the old UI library's CSS import with:

```tsx
// Remove old imports like:
// import 'antd/dist/reset.css'
// import '@mui/material/...'

// Add:
import '@vikingo/ui/styles'
```

> ⚠️ Import this **before** any other CSS. It defines all CSS custom properties (`--color-*`, `--radius-*`, etc.) that components rely on.

#### Step 4 — Remove old UI library

```bash
# Example: removing shadcn/ui
rm -rf src/components/ui          # delete generated shadcn components
pnpm remove class-variance-authority clsx tailwind-merge  # only if not used elsewhere

# Example: removing MUI
pnpm remove @mui/material @mui/icons-material @emotion/react @emotion/styled
```

#### Step 5 — Replace components

Replace imports file by file. Reference the [Storybook](https://vikingo-storybook.vercel.app) for props and variants.

```tsx
// Before (shadcn/ui example):
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

// After:
import { Button, Input } from '@vikingo/ui'
```

Common 1:1 replacements:

| Old (shadcn) | New (@vikingo/ui) |
|---|---|
| `Button` | `Button` (same props) |
| `Input` | `Input` + `label` prop built-in |
| `Textarea` | `Textarea` + `label` + `hint` props |
| `Select` | `Select` |
| `Dialog` | `Dialog` |
| `Tabs` | `Tabs` |
| `Accordion` | `Accordion` |
| `Badge` | `Badge` |
| `Card` | `Card` |
| `Tooltip` | `Tooltip` + `TooltipProvider` |
| `Skeleton` | `Skeleton` |
| `Separator` | `Separator` |
| `Progress` | `Progress` |
| Custom toast | `Toaster` + `toast` (from sonner) |

#### Step 6 — Add Toaster

```tsx
// Root layout / App root:
import { Toaster } from '@vikingo/ui'

// Inside your root component:
<Toaster />

// Usage anywhere:
import { toast } from '@vikingo/ui'
toast.success('Sikeres mentés!')
toast.error('Hiba történt.')
```

---

### Dark Mode

Toggle by adding/removing the `dark` class on `<html>`:

```ts
document.documentElement.classList.toggle('dark')
```

The Sidebar always renders in dark mode regardless of the active theme.

---

### Layout (App Shell)

For a full app with sidebar + topbar:

```tsx
import { PageLayout, PageContent, Sidebar, Topbar } from '@vikingo/ui'

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <PageLayout>
      <Sidebar
        logo={<Logo />}
        navItems={navItems}
        bottomItems={bottomItems}
      />
      <PageContent>
        <Topbar title="Dashboard" />
        {children}
      </PageContent>
    </PageLayout>
  )
}
```

---

### Updating to a New Version

```bash
# In your consumer project:
pnpm update @vikingo/ui

# Commit the updated lockfile:
git add pnpm-lock.yaml
git commit -m "chore: update @vikingo/ui to vX.X.X"
git push
# → Vercel redeploys automatically
```

Check the [CHANGELOG](https://github.com/Vitaio/vikingo-design-system/blob/main/CHANGELOG.md) before updating for breaking changes.

---

### Install via pnpm workspace (monorepo)

If your app lives in the same monorepo:

```json
// In your app's package.json:
"dependencies": {
  "@vikingo/ui": "workspace:*"
}
```

---

## Packages

### `@vikingo/ui`

The main component library. Located in `packages/ui/`.

---

## Component Library

### Forms
`Button` · `Input` · `Textarea` · `Select` · `Checkbox` · `Switch` · `RadioGroup` · `Slider` · `Chip` / `ChipGroup` · `DatePicker` / `DateRangePicker` · `SearchBar`

### Display
`Avatar` · `Badge` · `Card` · `Alert` · `Progress` · `Skeleton` · `ImageCard` · `Spinner` · `Separator` (Divider) · `Carousel` / `CarouselItem`

### Overlays
`Dialog` · `Tooltip` / `TooltipProvider` · `Toaster` / `toast` · `DropdownMenu` (Menu)

### Navigation
`Tabs` · `Breadcrumb` · `Pagination` · `Accordion`

### Data
`Table` · `StatCard` · `ChartCard` · `MetricRow` · `PeriodFilter`

### Layout
`Sidebar` · `Topbar` · `PageLayout` · `PageContent` · `PageHeader`

### Charts
`AreaChart` · `MultiBarChart` · `MultiLineChart`

---

## Monorepo Structure

```
vikingo-design-system/
├── packages/
│   └── ui/                    # @vikingo/ui
│       ├── src/
│       │   ├── components/
│       │   │   ├── ui/        # All UI components
│       │   │   ├── charts/    # Recharts wrappers
│       │   │   └── layout/    # Sidebar, Topbar, PageLayout
│       │   ├── styles/
│       │   │   ├── globals.css   # Tailwind v4 + CSS custom properties
│       │   │   └── fonts.css     # Clash Display @font-face
│       │   ├── lib/
│       │   │   ├── utils.ts      # cn() helper
│       │   │   └── format.ts     # Hungarian number formatters
│       │   └── index.ts          # All exports
│       └── package.json
└── apps/
    └── storybook/             # Storybook 8 documentation
        ├── .storybook/
        └── stories/
            ├── tokens/        # Colors, Typography, Spacing
            ├── ui/            # All component stories
            └── layout/        # Layout stories
```

---

## Development

```bash
# Install dependencies
pnpm install

# Start Storybook (port 6006)
pnpm storybook

# Build @vikingo/ui
pnpm build

# Watch mode (auto-rebuild on source changes)
cd packages/ui && pnpm dev
```

> **Note:** After changing component source, either run `pnpm build` in `packages/ui/` or keep `pnpm dev` running in the background so the dist stays current.

---

## Dark / Light Mode

Class-based: `<html class="dark">`. Storybook has a toolbar toggle via `@storybook/addon-themes`.

The Sidebar always uses dark tokens (`--sidebar-bg: #3E2E45`) regardless of the active theme.

---

## Deploy

Storybook is auto-deployed to Vercel on every push to `main` via `.github/workflows/storybook.yml`.
