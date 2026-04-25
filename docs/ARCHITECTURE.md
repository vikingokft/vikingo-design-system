> **Audience:** contributors and consumers who want to understand how the design system is built and distributed.
> **Use:** the architectural overview. Read this once before contributing or before integrating in a non-standard environment.

# Vikingo Design System — Architecture

## Repository layout

```
vikingo-design-system/
├─ packages/
│  └─ ui/                       The published @vikingo/ui package
│     ├─ src/
│     │  ├─ components/
│     │  │  ├─ primitives/      Stateless + interactive UI primitives (Button, Card, Dialog, …)
│     │  │  ├─ charts/          recharts wrappers (AreaChart, MultiBarChart, MultiLineChart)
│     │  │  └─ layout/          Higher-level layout (PageLayout, Sidebar, Topbar)
│     │  ├─ utils/
│     │  │  ├─ cn.ts            class-name merger (clsx + tailwind-merge)
│     │  │  └─ format-hu.ts     Hungarian number / currency / percentage formatters
│     │  ├─ styles/
│     │  │  ├─ tokens.css       Design tokens — single source of truth
│     │  │  ├─ react.css        React + Tailwind v4 entry (with Google Fonts CDN)
│     │  │  ├─ react-offline.css  React + Tailwind v4 entry (no CDN — Chrome Ext, offline)
│     │  │  ├─ _react-base.css  Internal partial — animations, Tailwind theme bridge, base styles
│     │  │  └─ fonts/
│     │  │     ├─ inter-cdn.css      Google Fonts CDN @import
│     │  │     └─ inter-bundled.css  Local woff2 @font-face declarations
│     │  ├─ web-components/     (Future) Vanilla HTML Web Components — see docs/components.md
│     │  └─ index.ts            Public exports
│     ├─ assets/
│     │  └─ fonts/              Self-hosted Clash Display woff2 files
│     ├─ tsup.config.ts         Build config: ESM + CJS + DTS + CSS emission
│     └─ package.json           Exports map (one package, multiple sub-paths)
├─ apps/
│  └─ storybook/                Storybook 8 — the source of truth for component behavior
├─ templates/                   Per-platform CLAUDE.md templates for consumer projects
│  ├─ react/                    Vite + React (default)
│  ├─ nextjs/                   Next.js App Router
│  ├─ chrome-extension/         Manifest v3
│  ├─ marketing-site/           Static / SSG
│  └─ html/                     Vanilla HTML (no React)
├─ docs/
│  ├─ ARCHITECTURE.md           This file
│  ├─ components.md             Component catalog (canonical, deduplicated)
│  ├─ styling.md                Tokens, dark mode, cn(), overrides
│  ├─ patterns.md               Common composition patterns
│  └─ TROUBLESHOOTING.md        Integration FAQ
├─ CONTRIBUTING.md              How to add components, write stories, release
├─ CHANGELOG.md                 Per-version changes
└─ README.md                    Entry point — load-as-template instructions first
```

## Build pipeline

`packages/ui` is built with **tsup**:

1. TypeScript → `dist/index.js` (CJS), `dist/index.mjs` (ESM), `dist/index.d.ts` (DTS).
2. CSS partials are inlined and emitted in `onSuccess()`:
   - `dist/tokens.css` (standalone)
   - `dist/react.css` (tokens + Tailwind v4 + base + CDN fonts inlined)
   - `dist/react-offline.css` (same minus CDN)
   - `dist/fonts/inter-cdn.css`, `dist/fonts/inter-bundled.css`
3. **Deprecated aliases** (`globals.css`, `globals-no-cdn.css`, `google-fonts.css`, `fonts.css`) are also emitted for backwards compatibility — removed in 1.0.
4. Font url() paths inside the inlined CSS are rewritten so they resolve correctly from `dist/`.

See [packages/ui/tsup.config.ts](../packages/ui/tsup.config.ts) for the exact logic.

## CSS distribution

The system has **three layered CSS targets**, sharing a single token source:

```
            tokens.css  ────────────┐
                                    │
                ┌───────────────────┴────────────────────┐
                │                   │                    │
        react.css            react-offline.css       vanilla.css *
        (Tailwind v4         (Tailwind v4 +          (precompiled,
         + CDN fonts)         local fonts only)       no Tailwind)
                │                   │                    │
        Vite, Next.js        Chrome Extension,        Plain HTML pages,
                             offline desktop          email templates,
                                                      WP/Shopify themes
```

\* `vanilla.css` is added in v0.7. See [docs/components.md](./components.md) for which components are covered.

`react.css` and `react-offline.css` both import `_react-base.css` — a single internal partial that holds the Tailwind v4 `@theme` bridge, Radix UI animations, accordion keyframes, and global base styles (typography, focus, scrollbar, reduced-motion). This eliminates the drift that existed between `globals.css` and `globals-no-cdn.css` in 0.5.x.

## Component conventions

Every component in `src/components/primitives/`:

- Uses `React.forwardRef` and sets `displayName`.
- Uses `cn()` for any class-name merging.
- Has JSDoc on the component and on non-obvious props.
- Reads visual properties from CSS custom properties only (`var(--color-*)`, `var(--radius-*)`, …) — never hardcodes hex codes.
- Defaults user-visible strings to Hungarian, exposes them as overridable props.
- Has no `any` types.

See [CONTRIBUTING.md](../CONTRIBUTING.md) for the full template.

## Storybook

`apps/storybook` is the **source of truth** for component behavior, props, and visual variations. The Vercel-hosted Storybook is the canonical reference; this repo's MD files only summarize.

Stories live in `apps/storybook/stories/{primitives,layout,tokens}/<Name>.stories.tsx` and import from `@vikingo/ui` (the published API), not from internal paths — so they double as integration tests for the package's exports.

## Versioning

Manual semver in [packages/ui/package.json](../packages/ui/package.json) and [CHANGELOG.md](../CHANGELOG.md). Consumers pin a specific version:

```bash
pnpm add github:vikingokft/vikingo-design-system#v0.6.0
```

A new version is published when `CHANGELOG.md` lists the change and the `version` field is bumped — no automated release pipeline.

## Peer dependencies

| Package | Required for | Optional? |
|---|---|---|
| `react`, `react-dom` (>=18) | Everything | No |
| `recharts` (>=3) | `AreaChart`, `MultiBarChart`, `MultiLineChart` | Yes |
| `react-hook-form` (>=7) | `Form`, `FormField`, `FormControl`, `FormMessage` | Yes |

The optional ones are declared as `peerDependenciesMeta.optional: true` so installing the package doesn't fail if a consumer doesn't use charts or forms.
