# Chrome Extension (Manifest v3) — setup guide

> **Audience:** humans setting up a Manifest v3 Chrome Extension with `@vikingo/ui`.
> **Use:** the platform-specific setup. The companion [`CLAUDE.md`](./CLAUDE.md) is the most detailed of all the templates — it bakes in real-world lessons from shipping Vikingo Web Audit. Drop it into your extension's project root.

## Quick start

```bash
# 1. Scaffold a Vite + React extension
pnpm create vite my-extension --template react-ts
cd my-extension

# 2. Add the Vite + Manifest v3 plugin
pnpm add -D @crxjs/vite-plugin

# 3. Add Tailwind v4 + Vikingo
pnpm add -D tailwindcss @tailwindcss/vite
pnpm add github:vikingokft/vikingo-design-system#v0.6.0
```

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { crx } from '@crxjs/vite-plugin'
import manifest from './manifest.json'

export default defineConfig({
  plugins: [react(), tailwindcss(), crx({ manifest })],
})
```

```tsx
// src/popup/main.tsx
// Use the offline CSS entry — Manifest v3 CSP blocks remote @import URLs.
import '@vikingo/ui/styles/react-offline'
import { createRoot } from 'react-dom/client'
import { Popup } from './Popup'

createRoot(document.getElementById('root')!).render(<Popup />)
```

## Why `react-offline`?

Manifest v3 disallows remote `@import` resolution by default. The default `react.css` entry imports Google Fonts via CDN — that import is silently dropped, and DM Sans falls back to the system default. Use `react-offline` and either:

1. Bundle DM Sans + DM Mono yourself (download woff2 from Google Fonts, drop into `public/fonts/`, override `--font-body` and `--font-mono` in your own CSS), or
2. Accept the system fallback for DM Sans (Clash Display still works because it's bundled inside `@vikingo/ui`).

## Common pitfalls

The [CLAUDE.md](./CLAUDE.md) has the full list (~900 lines of real-world fixes). The big ones:

- **Shadow DOM in content scripts** — Vikingo's `Toaster` renders to `document.body`. In a content script you usually want a Shadow DOM boundary; mount `Toaster` to a host element inside your shadow root.
- **Storage permissions** — components that persist state (DataTable filters, etc.) need `chrome.storage` access if you want it to survive popup close.
- **Hot-reload behavior** — `crxjs` reloads the extension on save; component state inside service workers won't persist across reloads.

## Next steps

- [docs/components.md](../../docs/components.md), [docs/styling.md](../../docs/styling.md), [docs/patterns.md](../../docs/patterns.md)
- [docs/TROUBLESHOOTING.md](../../docs/TROUBLESHOOTING.md#fonts-not-loading-chrome-extension) — extension-specific FAQ

## Drop the AI agent template

```bash
curl -o CLAUDE.md https://raw.githubusercontent.com/vikingokft/vikingo-design-system/main/templates/chrome-extension/CLAUDE.md
```
