# Vikingo Design System

A versioned, reusable React component library built for Vikingo SaaS products. Brand-consistent, dark/light mode ready, with first-class support for Vite, Next.js, Chrome Extensions, marketing sites, and (from v0.7) plain HTML.

> **Live Storybook:** https://vikingo-storybook.vercel.app

---

## I want to use this in my project

Pick the template that matches your platform, copy its `CLAUDE.md` into your project root, and follow the matching `README.md` for the human setup.

| Platform | Copy this template | Setup guide |
|---|---|---|
| **Vite + React** *(default)* | [`templates/react/CLAUDE.md`](./templates/react/CLAUDE.md) | [react/README.md](./templates/react/README.md) |
| **Next.js App Router** | [`templates/nextjs/CLAUDE.md`](./templates/nextjs/CLAUDE.md) | [nextjs/README.md](./templates/nextjs/README.md) |
| **Chrome Extension** *(Manifest v3)* | [`templates/chrome-extension/CLAUDE.md`](./templates/chrome-extension/CLAUDE.md) | [chrome-extension/README.md](./templates/chrome-extension/README.md) |
| **Marketing / landing site** | [`templates/marketing-site/CLAUDE.md`](./templates/marketing-site/CLAUDE.md) | [marketing-site/README.md](./templates/marketing-site/README.md) |
| **Plain HTML** *(no React, v0.7+)* | [`templates/html/CLAUDE.md`](./templates/html/CLAUDE.md) | [html/README.md](./templates/html/README.md) |

```bash
# Example — copy the React template into a new project
curl -o CLAUDE.md https://raw.githubusercontent.com/vikingokft/vikingo-design-system/main/templates/react/CLAUDE.md
```

After this, Claude Code automatically follows the platform-specific rules in your project. The `README.md` next to each template walks a human through the install + first import.

> **What is "Claude Code"?** Anthropic's CLI/IDE agent. The `CLAUDE.md` file in a repo root tells it the local rules; we ship one per platform so the agent never misuses the design system.

---

## I want to understand the system

Read these in order:

1. [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md) — repo layout, build pipeline, CSS distribution
2. [docs/components.md](./docs/components.md) — component catalog
3. [docs/styling.md](./docs/styling.md) — design tokens, dark mode, `cn()`, overrides
4. [docs/patterns.md](./docs/patterns.md) — common compositions (form, dialog, toast, …)
5. [docs/TROUBLESHOOTING.md](./docs/TROUBLESHOOTING.md) — integration FAQ

The deployed [Storybook](https://vikingo-storybook.vercel.app) is the canonical reference for component props and visual variations.

---

## I want to contribute

```bash
git clone https://github.com/vikingokft/vikingo-design-system.git
cd vikingo-design-system
pnpm install
pnpm storybook    # http://localhost:6006
```

See [CONTRIBUTING.md](./CONTRIBUTING.md) for: adding a component, story conventions, comment/JSDoc rules, and the release process.

---

## Stack

| Layer | Technology |
|---|---|
| Monorepo | Turborepo + pnpm workspaces |
| Components | React 19 + TypeScript |
| Styling | Tailwind CSS v4 + CSS custom properties |
| Primitives | Radix UI |
| Icons | [Lucide React](https://lucide.dev/icons/) |
| Docs | Storybook 8 |
| Build | tsup (ESM + CJS dual output) |
| Linter | Biome v2 |

## Brand

| Token | Value |
|---|---|
| Accent | `#FF544D` (orange-red) |
| Background light | `#F6EFE8` (beige) |
| Background dark | `#2A1F30` |
| Text / Sidebar | `#3E2E45` (dark purple) |
| Display font | [Clash Display](https://www.fontshare.com/fonts/clash-display) 600 — self-hosted woff2, Fontshare license |
| Body font | [DM Sans](https://fonts.google.com/specimen/DM+Sans) — Google Fonts CDN, OFL |
| Mono font | [DM Mono](https://fonts.google.com/specimen/DM+Mono) — Google Fonts CDN, OFL |

Full token list: [packages/ui/src/styles/tokens.css](./packages/ui/src/styles/tokens.css). For consumer styling rules, see [docs/styling.md](./docs/styling.md).

---

## Versioning

Manual semver. Pin a specific tag in your consumer project:

```bash
pnpm add github:vikingokft/vikingo-design-system#v0.6.0
```

See [CHANGELOG.md](./CHANGELOG.md) for what changed and migration notes.

## Deploy

Storybook auto-deploys to Vercel on every push to `main` via `.github/workflows/storybook.yml`.

## License

UNLICENSED — internal Vikingo use only.
