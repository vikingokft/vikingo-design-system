# Project Rules for Claude Code
# Platform: Marketing / Landing Page

This project uses the **Vikingo Design System** (`@vikingo/ui`) for a **marketing or landing page site**.

## Core Rules

- **Never create custom UI components.** Always use components from `@vikingo/ui`.
- **Never write custom CSS.** Use Tailwind utility classes and CSS custom properties (`--color-*`, `--radius-*`, etc.).
- **Never install other UI libraries** (shadcn/ui, MUI, Ant Design, Chakra, etc.).
- All imports come from `@vikingo/ui`: `import { Button, Input, Card } from '@vikingo/ui'`

---

## Available Components

Use a focused subset for marketing pages. Heavy data/app components are not needed.

### Recommended
`Button` `Input` `Textarea` `Card` `Badge` `Alert` `Avatar` `Separator` `Accordion` `Carousel` `CarouselItem` `Tabs` `Dialog` `Tooltip` `TooltipProvider` `Toaster` `toast` `Logo` `EmptyState` `Progress`

### Available but rarely needed
`Select` `Checkbox` `Switch` `RadioGroup` `Chip` `ChipGroup` `Spinner` `Skeleton` `ConfirmDialog` `Popover` `Breadcrumb` `Pagination` `Table`

### Skip for marketing sites
`DataTable` `Form` `FormField` `FormItem` `FormLabel` `FormControl` `FormDescription` `FormMessage` `NumberInput` `DatePicker` `DateRangePicker` `FileUpload` `Combobox` `TagsInput` `SearchBar` `CopyButton` `SegmentedControl` `Drawer` `DropdownMenu` `CommandPalette` `StatCard` `ChartCard` `MetricRow` `PeriodFilter` `PageHeader` `PageLayout` `PageContent` `Sidebar` `Topbar` `AreaChart` `MultiBarChart` `MultiLineChart`

**Reference:** https://vikingo-storybook.vercel.app

---

## Platform Setup

### Vite + React

```bash
# 1. Create project
pnpm create vite my-site --template react-ts
cd my-site

# 2. Install Tailwind
pnpm add -D tailwindcss @tailwindcss/vite

# 3. Install the design system
pnpm add github:vikingokft/vikingo-design-system#v0.5.0
```

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

### Next.js (Static Export)

For statically exported marketing sites with Next.js:

```bash
pnpm add -D tailwindcss @tailwindcss/postcss
```

```js
// next.config.ts
const config = { output: 'export' }
export default config
```

```js
// postcss.config.mjs
const config = { plugins: { '@tailwindcss/postcss': {} } }
export default config
```

### Entry Point

```tsx
// src/main.tsx (Vite) or app/layout.tsx (Next.js)
import '@vikingo/ui/styles'
```

---

## Import Pattern

```tsx
import { Button, Card, Badge, Accordion } from '@vikingo/ui'
```

Styles must be imported once in the entry point:
```tsx
import '@vikingo/ui/styles'
```

### Tree-Shaking

Import only what you use. The design system supports tree-shaking — unused components are excluded from the bundle:

```tsx
// ✅ Good — only Button and Card are bundled
import { Button, Card } from '@vikingo/ui'

// ❌ Avoid importing heavy components you don't need
import { DataTable, AreaChart } from '@vikingo/ui' // Pulls in recharts (~150KB)
```

---

## Fonts

| Font | CSS Variable | Tailwind Class | Usage |
|---|---|---|---|
| [Clash Display](https://www.fontshare.com/fonts/clash-display) | `--font-display` | `font-display` | Headings, hero text |
| [DM Sans](https://fonts.google.com/specimen/DM+Sans) | `--font-body` | `font-body` | Body text, CTAs |
| [DM Mono](https://fonts.google.com/specimen/DM+Mono) | `--font-mono` | `font-mono` | Pricing, stats |

### Performance Tips

For marketing sites, optimize font loading:

```html
<!-- In index.html — preload the hero heading font -->
<link rel="preload" href="/assets/ClashDisplay-Variable.woff2" as="font" type="font/woff2" crossorigin>
```

If using Next.js, use `next/font` for automatic optimization (see the Next.js preset for details).

---

## Icons

The design system uses **[Lucide React](https://lucide.dev/icons/)** for icons. Do **not** install other icon libraries.

```tsx
import { ArrowRight, Check, Star } from 'lucide-react'

<Button>Get Started <ArrowRight size={16} className="ml-1" /></Button>
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

## Marketing-Specific Patterns

### Hero Section

```tsx
<section className="py-20 px-6 text-center bg-[var(--color-bg)]">
  <h1 className="font-display font-semibold text-5xl text-[var(--color-text)] mb-4">
    Your Headline Here
  </h1>
  <p className="text-lg text-[var(--color-text-muted)] max-w-2xl mx-auto mb-8">
    Subheadline describing the value proposition.
  </p>
  <div className="flex gap-3 justify-center">
    <Button variant="primary" size="lg">Get Started</Button>
    <Button variant="secondary" size="lg">Learn More</Button>
  </div>
</section>
```

### Feature Cards

```tsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
  {features.map(f => (
    <Card key={f.title} className="p-6">
      <f.icon size={32} className="text-[var(--color-accent)] mb-4" />
      <h3 className="font-display font-semibold text-xl text-[var(--color-text)] mb-2">{f.title}</h3>
      <p className="text-sm text-[var(--color-text-muted)]">{f.description}</p>
    </Card>
  ))}
</div>
```

### Pricing Table

```tsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {plans.map(plan => (
    <Card key={plan.name} className={cn('p-6', plan.featured && 'border-[var(--color-accent)] border-2')}>
      {plan.featured && <Badge variant="accent" className="mb-3">Popular</Badge>}
      <h3 className="font-display font-semibold text-xl">{plan.name}</h3>
      <p className="font-mono text-3xl font-semibold my-4">{plan.price}</p>
      <ul className="space-y-2 mb-6">
        {plan.features.map(f => (
          <li key={f} className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
            <Check size={16} className="text-[var(--color-success)]" /> {f}
          </li>
        ))}
      </ul>
      <Button variant={plan.featured ? 'primary' : 'secondary'} className="w-full">
        Choose Plan
      </Button>
    </Card>
  ))}
</div>
```

### FAQ Accordion

```tsx
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@vikingo/ui'

<Accordion type="single" collapsible>
  {faqs.map(faq => (
    <AccordionItem key={faq.q} value={faq.q}>
      <AccordionTrigger>{faq.q}</AccordionTrigger>
      <AccordionContent>{faq.a}</AccordionContent>
    </AccordionItem>
  ))}
</Accordion>
```

### Testimonials Carousel

```tsx
import { Carousel, CarouselItem } from '@vikingo/ui'

<Carousel>
  {testimonials.map(t => (
    <CarouselItem key={t.name}>
      <Card className="p-6">
        <p className="text-[var(--color-text-muted)] italic mb-4">"{t.quote}"</p>
        <div className="flex items-center gap-3">
          <Avatar src={t.avatar} fallback={t.name[0]} />
          <div>
            <p className="font-semibold text-sm">{t.name}</p>
            <p className="text-xs text-[var(--color-text-subtle)]">{t.role}</p>
          </div>
        </div>
      </Card>
    </CarouselItem>
  ))}
</Carousel>
```

### Contact / Newsletter Form

For simple marketing forms (1-3 fields), skip the full `Form` + `react-hook-form` machinery:

```tsx
<form onSubmit={handleSubmit} className="flex gap-3 max-w-md mx-auto">
  <Input type="email" placeholder="Email address" className="flex-1" />
  <Button type="submit">Subscribe</Button>
</form>
```

---

## Dark Mode

```ts
document.documentElement.classList.toggle('dark')
// or
document.documentElement.classList.add('dark')
document.documentElement.classList.remove('dark')
```

For marketing sites, consider defaulting to light mode and offering a toggle only if the brand supports it.

---

## SEO & Performance

- Use semantic HTML: `<section>`, `<article>`, `<header>`, `<footer>`, `<nav>`, `<main>`
- Set proper heading hierarchy: one `<h1>` per page, then `<h2>`, `<h3>`
- Add `alt` text to all images
- Use `loading="lazy"` for below-the-fold images
- Lazy-load heavy interactive components:

```tsx
import { lazy, Suspense } from 'react'

const Dialog = lazy(() => import('@vikingo/ui').then(m => ({ default: m.Dialog })))

// Wrap in Suspense
<Suspense fallback={null}>
  <Dialog>...</Dialog>
</Suspense>
```

---

## Internationalization

Marketing sites may target international audiences. Override Hungarian default strings on all components:

```tsx
// ❌ Relies on Hungarian defaults
<Input label="Email" error />
// Error message might show "Hiba" by default

// ✅ Override all user-visible strings
<Button isLoading loadingText="Sending...">Subscribe</Button>
<DataTable emptyText="No results found." searchPlaceholder="Search..." />
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

// ❌ Don't import heavy components for simple marketing pages
import { DataTable, AreaChart, CommandPalette } from '@vikingo/ui'

// ✅ Use lightweight alternatives
// Simple table → plain HTML table or <Table>
// Stats → font-mono numbers in a Card
// Search → simple <Input> with search icon

// ❌ Don't use app layout components for marketing sites
import { PageLayout, Sidebar, Topbar } from '@vikingo/ui'

// ✅ Build marketing layouts with Tailwind + semantic HTML
<header className="flex items-center justify-between p-6">
  <Logo />
  <nav>...</nav>
</header>
```
