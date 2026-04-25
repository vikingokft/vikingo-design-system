# Project Rules for Claude Code — Vite + React

> **Audience:** Claude Code (and any AI agent) working in a consumer project that uses `@vikingo/ui`.
> **Use:** copy this file into your project root as `CLAUDE.md`. Other platforms have their own templates — see [templates/README.md](https://github.com/vikingokft/vikingo-design-system/blob/main/templates/README.md).

This project uses the **Vikingo Design System** (`@vikingo/ui`). The canonical references for components, styling, and patterns live in the design-system repo:

- [docs/components.md](https://github.com/vikingokft/vikingo-design-system/blob/main/docs/components.md) — what exists, when to use what
- [docs/styling.md](https://github.com/vikingokft/vikingo-design-system/blob/main/docs/styling.md) — tokens, dark mode, `cn()`
- [docs/patterns.md](https://github.com/vikingokft/vikingo-design-system/blob/main/docs/patterns.md) — common compositions
- [Storybook (live)](https://vikingo-storybook.vercel.app) — the source of truth for props and visuals

The list below mirrors those — defer to the canonical docs if anything diverges.

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

## Import Pattern

```tsx
import { Button, Input, Card, Dialog, toast, Toaster } from '@vikingo/ui'
```

Styles must be imported once in the entry point (already done in this project):
```tsx
import '@vikingo/ui/styles'
```

---

## Fonts

The design system ships three font families (already loaded by `@vikingo/ui/styles`):

| Font | CSS Variable | Tailwind Class | Usage |
|---|---|---|---|
| [Clash Display](https://www.fontshare.com/fonts/clash-display) | `--font-display` | `font-display` | Headings (h1-h4) |
| [DM Sans](https://fonts.google.com/specimen/DM+Sans) | `--font-body` | `font-body` | Body text, labels, buttons |
| [DM Mono](https://fonts.google.com/specimen/DM+Mono) | `--font-mono` | `font-mono` | Data, code, badges, KPIs |

Clash Display is self-hosted inside the package. DM Sans and DM Mono load from Google Fonts CDN (or use `next/font/google` for optimization).

```tsx
<h1 className="font-display font-semibold text-2xl">Heading</h1>
<p className="font-body text-sm">Body text</p>
<span className="font-mono text-xs">123,456</span>
```

---

## Icons

The design system uses **[Lucide React](https://lucide.dev/icons/)** for icons. Do **not** install other icon libraries (heroicons, react-icons, etc.).

```tsx
import { Search, Plus, Trash2, ChevronDown } from 'lucide-react'

// Standard size for inline use
<Search size={16} />

// In buttons
<Button variant="ghost" size="icon"><Trash2 size={18} /></Button>

// Color via CSS custom properties
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

Motion respects `prefers-reduced-motion: reduce` globally — animations collapse to ~0ms when the OS setting is on. Compose duration + easing directly:

```tsx
<div style={{ transition: 'opacity var(--duration-base) var(--ease-out-quint)' }} />
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
<Input label="Jelszó" type="password" error />
```

### Form (react-hook-form + zod)
```tsx
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

### Confirm Dialog (destructive actions)
```tsx
import { ConfirmDialog } from '@vikingo/ui'

<ConfirmDialog
  trigger={<Button variant="destructive">Törlés</Button>}
  title="Biztosan törlöd?"
  description="Ez a művelet nem vonható vissza."
  confirmLabel="Törlés"
  variant="destructive"
  onConfirm={async () => { await deleteItem() }}
/>
```

### Table
```tsx
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@vikingo/ui'

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Név</TableHead>
      <TableHead>Email</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {rows.map(row => (
      <TableRow key={row.id}>
        <TableCell>{row.name}</TableCell>
        <TableCell>{row.email}</TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
```

### DataTable (sorting, search, pagination)
```tsx
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

### SegmentedControl
```tsx
import { SegmentedControl } from '@vikingo/ui'
import { List, LayoutGrid } from 'lucide-react'

// Icon + label
<SegmentedControl
  options={[
    { value: 'list', icon: <List className="h-4 w-4" />, label: 'Lista' },
    { value: 'grid', icon: <LayoutGrid className="h-4 w-4" />, label: 'Rács' },
  ]}
  value={view}
  onChange={setView}
/>

// Text only
<SegmentedControl
  options={[
    { value: 'day', label: 'Nap' },
    { value: 'week', label: 'Hét' },
    { value: 'month', label: 'Hónap' },
  ]}
  defaultValue="week"
  onChange={setPeriod}
/>
```

### Popover
```tsx
import { Popover, PopoverTrigger, PopoverContent, Button } from '@vikingo/ui'

<Popover>
  <PopoverTrigger asChild>
    <Button variant="secondary">Megnyit</Button>
  </PopoverTrigger>
  <PopoverContent className="w-64">
    <p className="text-sm">Bármilyen tartalom kerülhet ide.</p>
  </PopoverContent>
</Popover>
```

### TagsInput
```tsx
import { TagsInput } from '@vikingo/ui'

<TagsInput
  label="Cimkék"
  placeholder="Írj és nyomj Entert..."
  value={tags}
  onChange={setTags}
  hint="Enter vagy vesszővel adj hozzá."
/>
```

### Dark Mode
```ts
document.documentElement.classList.toggle('dark')
// or
document.documentElement.classList.add('dark')
document.documentElement.classList.remove('dark')
```

---

## Layout (App Shell)

```tsx
import { PageLayout, PageContent, Sidebar, Topbar, Logo } from '@vikingo/ui'

const navItems = [
  { label: 'Dashboard', href: '/', icon: <LayoutDashboard size={18} /> },
  { label: 'Ügyfelek', href: '/clients', icon: <Users size={18} /> },
]

export default function AppShell({ children }) {
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
```
