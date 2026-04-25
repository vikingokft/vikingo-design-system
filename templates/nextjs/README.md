# Next.js (App Router) — setup guide

> **Audience:** humans setting up a Next.js App Router project with `@vikingo/ui`.
> **Use:** the step-by-step install guide. The matching [`CLAUDE.md`](./CLAUDE.md) goes into your project root for the AI agent.

## New project

```bash
# 1. Create the project (TypeScript + Tailwind when prompted)
pnpm create next-app my-app
cd my-app

# 2. Upgrade to Tailwind v4 (if the scaffolder installed v3)
pnpm remove tailwindcss postcss autoprefixer
pnpm add -D tailwindcss @tailwindcss/postcss

# 3. Add @vikingo/ui (pin a specific tag)
pnpm add github:vikingokft/vikingo-design-system#v0.6.0
```

```js
// 4. postcss.config.mjs — replace the contents
const config = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
export default config
```

```tsx
// 5. app/layout.tsx — import styles at the top
import '@vikingo/ui/styles/react'
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

## `'use client'` and Server Components

`@vikingo/ui` components that use React state, refs, or context (Dialog, Drawer, DropdownMenu, Form, Toaster, etc.) must run on the client. Either:

- mark the importing file `'use client'`, or
- import them inside a wrapper component that's `'use client'` and use that wrapper from your Server Components.

Pure presentation components (Button, Card, Badge, Avatar, Spinner, …) work fine in Server Components.

## Self-hosted fonts (`next/font`)

If you'd rather not depend on the Google Fonts CDN, use `next/font/google` for DM Sans + DM Mono and switch to the offline CSS entry:

```tsx
// app/layout.tsx
import '@vikingo/ui/styles/react-offline'  // no CDN @import
import { DM_Sans, DM_Mono } from 'next/font/google'

const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-body' })
const dmMono = DM_Mono({ weight: ['300','400','500'], subsets: ['latin'], variable: '--font-mono' })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="hu" className={`${dmSans.variable} ${dmMono.variable}`}><body>{children}</body></html>
}
```

## Next steps

- [docs/styling.md](../../docs/styling.md) — tokens, dark mode, `cn()`
- [docs/patterns.md](../../docs/patterns.md) — common compositions
- [docs/TROUBLESHOOTING.md](../../docs/TROUBLESHOOTING.md) — Next.js + RSC + Tailwind v4 gotchas

## Drop the AI agent template

```bash
curl -o CLAUDE.md https://raw.githubusercontent.com/vikingokft/vikingo-design-system/main/templates/nextjs/CLAUDE.md
```
