# Platform Presets

The Vikingo Design System provides **platform-specific presets** — ready-to-use `CLAUDE.md` files tailored for different project types. Each preset contains the full component reference, import patterns, and styling rules, plus platform-specific setup, gotchas, and best practices.

## Available Presets

| Preset | File | Use When |
|---|---|---|
| **Generic (Vite + React)** | [`CONSUMER_CLAUDE.md`](../../CONSUMER_CLAUDE.md) | Default SPA with Vite, CRA, or any client-side React app |
| **Next.js** | [`nextjs.md`](./nextjs.md) | Next.js App Router projects (SSR, RSC, `next/font`) |
| **Chrome Extension** | [`chrome-extension.md`](./chrome-extension.md) | Browser extensions (Manifest v3, popup, sidebar, content scripts) |
| **Marketing Site** | [`marketing-site.md`](./marketing-site.md) | Landing pages, marketing sites (SEO, performance, minimal JS) |

## How to Use

Copy the preset that matches your project into your project root as `CLAUDE.md`:

```bash
# Generic (Vite + React) — the default
curl -o CLAUDE.md https://raw.githubusercontent.com/vikingokft/vikingo-design-system/main/CONSUMER_CLAUDE.md

# Next.js App Router
curl -o CLAUDE.md https://raw.githubusercontent.com/vikingokft/vikingo-design-system/main/docs/presets/nextjs.md

# Chrome Extension
curl -o CLAUDE.md https://raw.githubusercontent.com/vikingokft/vikingo-design-system/main/docs/presets/chrome-extension.md

# Marketing / Landing Page
curl -o CLAUDE.md https://raw.githubusercontent.com/vikingokft/vikingo-design-system/main/docs/presets/marketing-site.md
```

From that point on, Claude Code automatically follows the platform-specific rules whenever you work in that project.

## Maintenance

When updating the design system, keep all presets in sync:

- **Component added/removed** — update the "Available Components" section in every preset file + `CONSUMER_CLAUDE.md`
- **New CSS custom property** — update the "Styling" section in every preset file
- **New common pattern** — add to every preset's "Common Patterns" section
- **New platform** — create a new preset file following the template structure, add it to this README
