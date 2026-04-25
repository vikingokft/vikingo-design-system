# Templates — load Vikingo into a new project

> **Audience:** anyone starting a new project (or migrating an existing one) that should use `@vikingo/ui`.
> **Use:** pick the template matching your platform, copy the `CLAUDE.md` into your project root. Optionally read the matching `README.md` for human-friendly setup.

Each template contains:

- `CLAUDE.md` — instructions for Claude Code (or any AI agent). Drop into your project root.
- `README.md` — the same setup explained for humans, with checklists.

## Pick your template

| Template | Use when |
|---|---|
| [react/](./react/) | **Default.** Vite + React SPA, CRA, or any client-side React app |
| [nextjs/](./nextjs/) | Next.js App Router (SSR, React Server Components, `next/font`) |
| [chrome-extension/](./chrome-extension/) | Browser extension (Manifest v3, popup, sidebar, content script) |
| [marketing-site/](./marketing-site/) | Landing page or marketing site (SEO, perf, minimal JS) |
| [html/](./html/) | Plain HTML — no React. WordPress/Shopify themes, email, prototypes. *(v0.7+)* |

## Copy a template into your project

```bash
# React (Vite + SPA) — the default
curl -o CLAUDE.md https://raw.githubusercontent.com/vikingokft/vikingo-design-system/main/templates/react/CLAUDE.md

# Next.js
curl -o CLAUDE.md https://raw.githubusercontent.com/vikingokft/vikingo-design-system/main/templates/nextjs/CLAUDE.md

# Chrome Extension
curl -o CLAUDE.md https://raw.githubusercontent.com/vikingokft/vikingo-design-system/main/templates/chrome-extension/CLAUDE.md

# Marketing / landing
curl -o CLAUDE.md https://raw.githubusercontent.com/vikingokft/vikingo-design-system/main/templates/marketing-site/CLAUDE.md

# Vanilla HTML (v0.7+)
curl -o CLAUDE.md https://raw.githubusercontent.com/vikingokft/vikingo-design-system/main/templates/html/CLAUDE.md
```

After this, Claude Code automatically follows the platform-specific rules in your project. The matching `README.md` next to each `CLAUDE.md` walks a human through the same setup.

## Why "templates" and not "presets"?

A *template* is a starting point you copy into your project. A *preset* (Tailwind preset, Babel preset, etc.) usually means a build-time configuration object you import. To avoid confusion, this folder is named for what it actually is.

## Maintenance

These template files reference shared canonical docs to avoid drift:

- [docs/components.md](../docs/components.md) — component catalog
- [docs/styling.md](../docs/styling.md) — tokens, dark mode, `cn()`
- [docs/patterns.md](../docs/patterns.md) — common compositions

Each template only adds the **platform-specific** delta (setup commands, framework gotchas, file locations). When the design system gets a new component, only `docs/components.md` needs to change — templates don't list components.
