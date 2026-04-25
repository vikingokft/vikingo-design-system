> **Audience:** any consumer (human or AI agent) styling pages or components built with `@vikingo/ui`.
> **Use:** the canonical reference for design tokens, dark mode, the `cn()` helper, and overriding component styles. Linked from every template `CLAUDE.md`.

# Vikingo UI — Styling

## Design tokens

All visual properties (colors, radius, spacing, shadows, fonts, motion) are exposed as **CSS custom properties**. Reference them via `var(--*)` in your own CSS, never hardcode hex codes.

```css
.my-component {
  background: var(--color-surface);
  color: var(--color-text);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  transition: opacity var(--duration-base) var(--ease-out-quint);
}
```

**Single source of truth:** [packages/ui/src/styles/tokens.css](../packages/ui/src/styles/tokens.css)

### Token groups

| Group | Examples |
|---|---|
| Background | `--color-bg`, `--color-surface`, `--color-surface-raised`, `--color-surface-overlay` |
| Text | `--color-text`, `--color-text-muted`, `--color-text-subtle`, `--color-text-on-accent` |
| Accent | `--color-accent`, `--color-accent-hover`, `--color-accent-muted`, `--color-accent-foreground` |
| Border | `--color-border`, `--color-border-strong`, `--color-border-focus` |
| Status | `--color-success`, `--color-warning`, `--color-error`, `--color-info` (each with a `*-muted` background variant) |
| Sidebar | `--sidebar-bg`, `--sidebar-text`, … (dark and `--sidebar-light-*` variants) |
| Topbar | `--topbar-height`, `--topbar-bg`, `--topbar-border` |
| Typography | `--font-display`, `--font-body`, `--font-mono` |
| Radius | `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-xl`, `--radius-full` |
| Spacing | `--spacing-xs` (4px) → `--spacing-3xl` (64px) |
| Shadow | `--shadow-sm`, `--shadow-md`, `--shadow-lg`, `--shadow-xl` |
| Motion | `--duration-fast` (120ms), `--duration-base` (200ms), `--duration-slow` (320ms); `--ease-out-quint`, `--ease-in-out`, `--ease-soft` |

## Dark mode

Toggle by adding the `dark` class to `<html>`. All tokens automatically swap to dark equivalents — no JS gymnastics needed.

```ts
document.documentElement.classList.toggle('dark')
```

To follow the OS preference, listen to `prefers-color-scheme` on mount. Do **not** style components conditionally with `dark:` Tailwind variants — the tokens already handle it.

## The `cn()` helper

Use `cn()` from `@vikingo/ui` to merge class names with Tailwind class deduplication (powered by `tailwind-merge`).

```tsx
import { cn, Button } from '@vikingo/ui'

<Button className={cn('w-full', isWide && 'max-w-2xl', className)}>OK</Button>
```

Without `cn()`, conflicting Tailwind classes (e.g. `p-2` + `p-4`) would both end up in the DOM and the order of inclusion decides which wins — fragile.

## Overriding component styles

1. **Spacing / size / layout** → pass `className` with Tailwind classes:
   ```tsx
   <Button className="w-full mt-4" />
   <Card className="max-w-md p-6" />
   ```
2. **Colors / theme** → override the relevant token at a parent scope:
   ```css
   .checkout-flow {
     --color-accent: #00B27A; /* green CTA inside this section only */
   }
   ```
3. **One-off custom styles** → write a CSS Module / regular CSS rule that uses the tokens.

## What NOT to do

- ❌ **Don't hardcode colors** like `bg-orange-500` or `#FF544D`. Use `--color-accent` so dark mode and theme overrides work.
- ❌ **Don't apply `dark:` Tailwind variants** to your own components. Tokens already react to the `.dark` class.
- ❌ **Don't import individual component CSS** — there isn't any. All styling lives in the global tokens + Tailwind classes inside the components.
- ❌ **Don't `@apply` Vikingo classes** in your own CSS. Compose with `className` props instead.

## CSS entry points

Pick one based on your environment (see also [docs/ARCHITECTURE.md](./ARCHITECTURE.md#css-distribution)):

| Import | When to use |
|---|---|
| `@vikingo/ui/styles/react` | Most React apps with Tailwind v4 (Vite, Next.js, etc.) |
| `@vikingo/ui/styles/react-offline` | Chrome Extensions, offline desktop apps, environments that block CDN imports |
| `@vikingo/ui/styles/tokens` | You only want CSS variables, not full Tailwind base. For framework-agnostic embeds. |

> **Deprecated (still works, will be removed in 1.0):** `@vikingo/ui/styles` → use `/styles/react`. `@vikingo/ui/styles/no-cdn` → use `/styles/react-offline`.
