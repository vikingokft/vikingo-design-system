# Project Rules for Claude Code
# Platform: Next.js (App Router)

This project uses the **Vikingo Design System** (`@vikingo/ui`) with **Next.js App Router**.

## Core Rules

- **Never create custom UI components.** Always use components from `@vikingo/ui`.
- **Never write custom CSS.** Use Tailwind utility classes and CSS custom properties (`--color-*`, `--radius-*`, etc.).
- **Never install other UI libraries** (shadcn/ui, MUI, Ant Design, Chakra, etc.).
- All imports come from `@vikingo/ui`: `import { Button, Input, Card } from '@vikingo/ui'`

---

## Available Components

### Forms
`Button` `Input` `NumberInput` `Textarea` `Select` `Checkbox` `Switch` `RadioGroup` `RadioButton` `Slider` `Chip` `ChipGroup` `DatePicker` `DateRangePicker` `SearchBar` `FileUpload` `Combobox` `TagsInput` `CopyButton` `SegmentedControl` `Form` `FormField` `FormItem` `FormLabel` `FormControl` `FormDescription` `FormMessage`

### Display
`Avatar` `Badge` `Card` `Alert` `Progress` `Skeleton` `ImageCard` `Spinner` `Separator` `Carousel` `CarouselItem` `EmptyState` `Logo`

### Overlays
`Dialog` `Drawer` `Tooltip` `TooltipProvider` `Toaster` `toast` `DropdownMenu` `CommandPalette` `ConfirmDialog` `Popover` `PopoverTrigger` `PopoverContent` `PopoverClose`

### Navigation
`Tabs` `Breadcrumb` `Pagination` `Accordion`

### Data
`Table` `DataTable` `StatCard` `ChartCard` `MetricRow` `PeriodFilter` `PageHeader`

### Layout
`PageLayout` `PageContent` `Sidebar` `Topbar`

### Charts
`AreaChart` `MultiBarChart` `MultiLineChart`

**Reference:** https://vikingo-storybook.vercel.app

---

## Platform Setup

### Installation

```bash
# 1. Clone and build the design system (monorepo — github: URL doesn't work directly)
git clone https://github.com/vikingokft/vikingo-design-system.git ../vikingo-design-system
cd ../vikingo-design-system && pnpm install && pnpm build && cd -

# 2. Reference it locally in your package.json
# Add to dependencies: "@vikingo/ui": "file:../vikingo-design-system/packages/ui"
pnpm install

# 3. Install peer dependencies (required even if unused — bundled static imports)
pnpm add recharts react-hook-form

# 4. Tailwind v4 with PostCSS (required for Next.js)
pnpm add -D tailwindcss @tailwindcss/postcss
```

### PostCSS Config

```js
// postcss.config.mjs
const config = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
export default config
```

### Font Loading (next/font)

Use `next/font` for optimal font loading instead of the Google Fonts CDN fallback:

```tsx
// app/fonts.ts
import { DM_Sans, DM_Mono } from 'next/font/google'
import localFont from 'next/font/local'

export const clashDisplay = localFont({
  src: '../node_modules/@vikingo/ui/assets/fonts/ClashDisplay-Variable.woff2',
  variable: '--font-display',
  display: 'swap',
  weight: '100 700',
})

export const dmSans = DM_Sans({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-body',
  display: 'swap',
})

export const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
})
```

### Root Layout

```tsx
// app/layout.tsx
import '@vikingo/ui/styles'
import { Toaster } from '@vikingo/ui'
import { clashDisplay, dmSans, dmMono } from './fonts'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'My App' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="hu" className={`${clashDisplay.variable} ${dmSans.variable} ${dmMono.variable}`}>
      <body>
        <Toaster />
        {children}
      </body>
    </html>
  )
}
```

---

## Import Pattern

```tsx
import { Button, Input, Card, Dialog, toast, Toaster } from '@vikingo/ui'
```

### 'use client' Directive

All interactive Vikingo components are client components. Any page or component that **uses** them must have `'use client'` at the top, unless it's already inside a client boundary.

**Interactive (need 'use client'):** `Button` `Input` `NumberInput` `Textarea` `Select` `Checkbox` `Switch` `RadioGroup` `RadioButton` `Slider` `Chip` `ChipGroup` `DatePicker` `DateRangePicker` `SearchBar` `FileUpload` `Combobox` `TagsInput` `CopyButton` `SegmentedControl` `Dialog` `Drawer` `Tooltip` `DropdownMenu` `CommandPalette` `ConfirmDialog` `Popover` `Tabs` `Accordion` `Pagination` `Carousel` `DataTable` `Form` `Toaster` `toast`

**Static (safe in Server Components):** `Badge` `Card` `Alert` `Avatar` `Progress` `Skeleton` `Separator` `EmptyState` `Logo` `Table` `StatCard` `PageHeader`

```tsx
// app/dashboard/page.tsx — Server Component (static only)
import { Card, Badge, StatCard, PageHeader } from '@vikingo/ui'

export default function DashboardPage() {
  return (
    <>
      <PageHeader title="Dashboard" />
      <Card><Badge variant="success">Active</Badge></Card>
    </>
  )
}
```

```tsx
// app/dashboard/client-section.tsx — Client Component (interactive)
'use client'
import { Button, Input, toast } from '@vikingo/ui'

export function ClientSection() {
  return (
    <div>
      <Input label="Name" />
      <Button onClick={() => toast.success('Saved!')}>Save</Button>
    </div>
  )
}
```

---

## Fonts

| Font | CSS Variable | Tailwind Class | Usage |
|---|---|---|---|
| [Clash Display](https://www.fontshare.com/fonts/clash-display) | `--font-display` | `font-display` | Headings (h1-h4) |
| [DM Sans](https://fonts.google.com/specimen/DM+Sans) | `--font-body` | `font-body` | Body text, labels, buttons |
| [DM Mono](https://fonts.google.com/specimen/DM+Mono) | `--font-mono` | `font-mono` | Data, code, badges, KPIs |

With `next/font`, fonts are self-hosted and optimized automatically — no external CDN requests.

---

## Icons

The design system uses **[Lucide React](https://lucide.dev/icons/)** for icons. Do **not** install other icon libraries (heroicons, react-icons, etc.).

```tsx
import { Search, Plus, Trash2, ChevronDown } from 'lucide-react'

<Search size={16} />
<Button variant="ghost" size="icon"><Trash2 size={18} /></Button>
<Search className="text-[var(--color-text-muted)]" size={16} />
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

// Wrong — custom CSS class
<p className="my-custom-text">
```

Available CSS custom properties:
- Colors: `--color-text`, `--color-text-muted`, `--color-bg`, `--color-surface`, `--color-border`, `--color-accent`, `--color-accent-hover`, `--color-accent-muted`
- Status: `--color-success`, `--color-warning`, `--color-error`, `--color-info`
- Radius: `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-xl`, `--radius-full`
- Shadow: `--shadow-sm`, `--shadow-md`, `--shadow-lg`, `--shadow-xl`
- Duration: `--duration-fast` (120ms), `--duration-base` (200ms), `--duration-slow` (320ms)
- Easing: `--ease-out-quint` (default), `--ease-in-out`, `--ease-soft`

Motion respects `prefers-reduced-motion: reduce` globally — animations collapse when the OS setting is on.

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
<Input label="Jelszó" type="password" error />
```

### Form (react-hook-form + zod)
```tsx
'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, Button, Input } from '@vikingo/ui'

const schema = z.object({ email: z.string().email() })

function MyForm() {
  const form = useForm({ resolver: zodResolver(schema) })
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(console.log)} className="flex flex-col gap-4">
        <FormField control={form.control} name="email" render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl><Input type="email" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <Button type="submit">Küldés</Button>
      </form>
    </Form>
  )
}
```

### Toast
```tsx
import { toast } from '@vikingo/ui'

toast.success('Sikeres mentés!')
toast.error('Hiba történt.')
toast.info('Frissítés elérhető.')
toast.warning('Lejáró előfizetés.')
```

`<Toaster />` must be present in the root layout (already added).

### Dialog
```tsx
'use client'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter, Button } from '@vikingo/ui'

<Dialog>
  <DialogTrigger asChild><Button>Megnyit</Button></DialogTrigger>
  <DialogContent>
    <DialogHeader><DialogTitle>Cím</DialogTitle></DialogHeader>
    <p>Tartalom</p>
    <DialogFooter><Button>OK</Button></DialogFooter>
  </DialogContent>
</Dialog>
```

### DataTable (sorting, search, pagination)
```tsx
'use client'
import { DataTable, type ColumnDef, Badge } from '@vikingo/ui'

interface User { id: number; name: string; status: 'active' | 'inactive' }

const columns: ColumnDef<User>[] = [
  { key: 'id', header: '#' },
  { key: 'name', header: 'Név', sortable: true },
  {
    key: 'status',
    header: 'Státusz',
    sortable: true,
    cell: (row) => (
      <Badge variant={row.status === 'active' ? 'success' : 'error'} dot>
        {row.status === 'active' ? 'Aktív' : 'Inaktív'}
      </Badge>
    ),
  },
]

<DataTable
  data={users}
  columns={columns}
  searchable
  searchPlaceholder="Keresés..."
  pageSize={20}
  emptyText="Nincs találat."
/>
```

---

## Layout (App Shell)

```tsx
'use client'
import { PageLayout, PageContent, Sidebar, Topbar, Logo } from '@vikingo/ui'
import { LayoutDashboard, Users } from 'lucide-react'

const navItems = [
  { label: 'Dashboard', href: '/', icon: <LayoutDashboard size={18} /> },
  { label: 'Ügyfelek', href: '/clients', icon: <Users size={18} /> },
]

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <PageLayout>
      <Sidebar logo={<Logo />} navItems={navItems} />
      <PageContent>
        <Topbar title="Oldal neve" />
        {children}
      </PageContent>
    </PageLayout>
  )
}
```

Place the AppShell in `app/layout.tsx` or a layout group like `app/(app)/layout.tsx`.

---

## Dark Mode

For SSR, avoid hydration mismatch by reading the theme from a cookie:

```tsx
// lib/theme.ts
'use server'
import { cookies } from 'next/headers'

export async function getTheme() {
  const cookieStore = await cookies()
  return cookieStore.get('theme')?.value ?? 'light'
}
```

```tsx
// app/layout.tsx
import { getTheme } from '@/lib/theme'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const theme = await getTheme()
  return (
    <html lang="hu" className={theme === 'dark' ? 'dark' : ''}>
      <body>{children}</body>
    </html>
  )
}
```

```tsx
// components/theme-toggle.tsx
'use client'
export function ThemeToggle() {
  function toggle() {
    const next = document.documentElement.classList.toggle('dark') ? 'dark' : 'light'
    document.cookie = `theme=${next};path=/;max-age=31536000`
  }
  return <Button variant="ghost" size="icon" onClick={toggle}><Sun size={18} /></Button>
}
```

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

// ❌ Don't install shadcn components
npx shadcn-ui add button

// ✅ Already in @vikingo/ui
import { Button } from '@vikingo/ui'

// ❌ Don't use interactive components in Server Components without 'use client'
// This will cause a runtime error
import { Button } from '@vikingo/ui'
export default function Page() { return <Button>Click</Button> } // ERROR

// ✅ Add 'use client' or wrap in a client component
'use client'
import { Button } from '@vikingo/ui'
export default function Page() { return <Button>Click</Button> } // OK
```

---

## Next.js Gotchas

- **Image optimization:** Use `next/image` for raster images. `ImageCard` accepts children — put `<Image />` inside it.
- **Route transitions:** Vikingo has no built-in page transition support. Use Next.js `loading.tsx` with `<Skeleton />` for loading states.
- **Metadata:** Use Next.js `metadata` exports, not custom `<head>` tags. Vikingo components don't manage `<head>`.
- **API Routes:** Never import `@vikingo/ui` in API routes or server actions — it's a client-side React library.
