# React (Vite + SPA) — setup guide

> **Audience:** humans setting up a Vite + React project with `@vikingo/ui`.
> **Use:** the step-by-step install guide. The matching [`CLAUDE.md`](./CLAUDE.md) goes into your project root for the AI agent; this README walks you through the same setup.

## New project

```bash
# 1. Create the project
pnpm create vite my-app --template react-ts
cd my-app
pnpm install

# 2. Add Tailwind v4 (Vite plugin)
pnpm add -D tailwindcss @tailwindcss/vite

# 3. Add @vikingo/ui (pin a specific tag)
pnpm add github:vikingokft/vikingo-design-system#v0.6.0
```

```ts
// 4. vite.config.ts — register the Tailwind plugin
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

```tsx
// 5. src/main.tsx — import styles before anything else
import '@vikingo/ui/styles/react'
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
// 6. src/App.tsx — replace the boilerplate with components
import { Button, Card, Input, Toaster, toast } from '@vikingo/ui'

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
# 7. Optional cleanup — these defaults aren't needed anymore
rm src/App.css src/index.css
```

## Existing project — migrating from another UI library

1. Upgrade Tailwind to v4 (replace `@tailwind base/components/utilities` directives with `@import "tailwindcss"`).
2. `pnpm add github:vikingokft/vikingo-design-system#v0.6.0`.
3. Replace your old library's CSS import with `import '@vikingo/ui/styles/react'`.
4. Find/replace component imports → `from '@vikingo/ui'`.
5. Remove the old library: `pnpm remove <old-package>`.

Common 1:1 replacements (shadcn/ui → Vikingo): `Button` → `Button`, `Input` → `Input` (with built-in `label` prop), `Dialog` → `Dialog`, `Toaster` → `Toaster` + `toast` from sonner, etc. See [docs/components.md](../../docs/components.md) for the full catalog.

## Next steps

- Set up dark mode toggle: [docs/styling.md#dark-mode](../../docs/styling.md#dark-mode)
- See common composition patterns: [docs/patterns.md](../../docs/patterns.md)
- If something doesn't work: [docs/TROUBLESHOOTING.md](../../docs/TROUBLESHOOTING.md)

## Now drop the AI agent template

```bash
curl -o CLAUDE.md https://raw.githubusercontent.com/vikingokft/vikingo-design-system/main/templates/react/CLAUDE.md
```

Now Claude Code (or any AI agent reading `CLAUDE.md`) follows the rules — no custom components, no other UI libraries, only Vikingo + tokens.
