# Marketing / Landing Page — setup guide

> **Audience:** humans building a marketing site or landing page with `@vikingo/ui`.
> **Use:** the platform-specific setup. The matching [`CLAUDE.md`](./CLAUDE.md) goes into your project root for the AI agent.

## Recommended stack

- **Framework:** Astro 5+ (best perf for static / SSG marketing) or Next.js (if you need ISR / dynamic data).
- **Styling:** Tailwind v4 + `@vikingo/ui/styles/react`.
- **Icons:** lucide-react via `@vikingo/ui` re-export.

## Astro example

```bash
pnpm create astro@latest my-site
cd my-site
pnpm add -D tailwindcss @tailwindcss/vite
pnpm add github:vikingokft/vikingo-design-system#v0.6.0 react react-dom
pnpm astro add react
```

```ts
// astro.config.mjs
import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  integrations: [react()],
  vite: { plugins: [tailwindcss()] },
})
```

```astro
---
// src/pages/index.astro
import '@vikingo/ui/styles/react'
import { Button, Card } from '@vikingo/ui'
---
<html lang="hu">
  <head><title>My Site</title></head>
  <body>
    <main class="max-w-3xl mx-auto py-20">
      <h1>Welcome</h1>
      <Card client:load className="p-6 mt-8">
        <Button>Get started</Button>
      </Card>
    </main>
  </body>
</html>
```

> **`client:load` directive:** without it, Astro renders Vikingo components as static HTML, which works for purely visual ones (Card, Button without onClick). Add `client:load` (or `client:visible`, etc.) for interactive components.

## Performance tips

- Tree-shaking is automatic — only import what you use.
- For above-the-fold content, prefer pure-presentation components (Card, Button, Badge). They render as static HTML in Astro.
- Use `client:visible` instead of `client:load` for below-the-fold interactive components — defers JS until they enter the viewport.
- Self-host fonts if you want offline-perfect performance: use `react-offline.css` + bundle DM Sans/DM Mono.

## Next steps

- [docs/components.md](../../docs/components.md), [docs/styling.md](../../docs/styling.md), [docs/patterns.md](../../docs/patterns.md)
- See the [marketing-site/CLAUDE.md](./CLAUDE.md) for hero/pricing/FAQ patterns

## Drop the AI agent template

```bash
curl -o CLAUDE.md https://raw.githubusercontent.com/vikingokft/vikingo-design-system/main/templates/marketing-site/CLAUDE.md
```
