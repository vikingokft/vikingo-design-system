# @vikingo/ui

The Vikingo Design System — a versioned React component library with CSS tokens, dark mode, and Hungarian-first defaults.

> **Storybook:** https://vikingo-storybook.vercel.app
> **Repo:** https://github.com/vikingokft/vikingo-design-system

## Install

```bash
pnpm add github:vikingokft/vikingo-design-system#v0.6.0
```

Pin to a specific version. The package isn't on npm; it's installed as a Git dependency.

## Quick start

```tsx
// 1. Import styles once at your app root
import '@vikingo/ui/styles/react'

// 2. Use components anywhere
import { Button, Toaster, toast } from '@vikingo/ui'

export function App() {
  return (
    <>
      <Toaster />
      <Button onClick={() => toast.success('Szia!')}>Kattints</Button>
    </>
  )
}
```

For the full setup (Vite, Next.js, Chrome Extension, etc.) see the platform templates in [`/templates`](../../templates/).

## Exports

| Path | What it is |
|---|---|
| `@vikingo/ui` | All components, hooks, utilities (`cn`, `formatFt`, …) |
| `@vikingo/ui/styles/react` | Full CSS — tokens + Tailwind v4 + fonts (Google CDN) |
| `@vikingo/ui/styles/react-offline` | Same as above without the CDN — for Chrome Extensions and offline apps |
| `@vikingo/ui/styles/tokens` | Just the CSS custom properties — for framework-agnostic targets |
| `@vikingo/ui/fonts/inter-cdn` | Standalone Google Fonts CDN @import |
| `@vikingo/ui/fonts/inter-bundled` | Standalone @font-face declarations for bundled woff2 |

Deprecated paths (still work, removed in 1.0): `@vikingo/ui/styles`, `@vikingo/ui/styles/no-cdn`, `@vikingo/ui/styles/google-fonts`, `@vikingo/ui/fonts`.

## Peer dependencies

| Package | Required for | Optional? |
|---|---|---|
| `react`, `react-dom` (>=18) | Everything | No |
| `recharts` (>=3) | `AreaChart`, `MultiBarChart`, `MultiLineChart` | Yes |
| `react-hook-form` (>=7) | `Form*` components | Yes |
| `tailwindcss` (>=4) | All visual styles | No (build-time) |

## Reference

- [Component catalog](../../docs/components.md) — what exists, when to use what
- [Styling](../../docs/styling.md) — tokens, dark mode, `cn()`, overrides
- [Patterns](../../docs/patterns.md) — common compositions
- [Architecture](../../docs/ARCHITECTURE.md) — how the package is built and distributed
- [Troubleshooting](../../docs/TROUBLESHOOTING.md) — integration FAQ
- [Contributing](../../CONTRIBUTING.md) — adding components, conventions, release

## License

UNLICENSED — internal Vikingo use only.
