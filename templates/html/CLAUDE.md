# Project Rules for Claude Code — Plain HTML (no React)

> **Audience:** Claude Code (and any AI agent) working in a non-React project (WordPress/Shopify theme, email template, static HTML page, prototype) that uses `@vikingo/ui`.
> **Use:** copy this file into your project root as `CLAUDE.md`. For React-based projects, see the React/Next.js/Chrome Extension/Marketing templates instead.

This project uses the **Vikingo Design System** for visual consistency without React. Three layers are available:

- **Tokens layer** (v0.6+) — CSS custom properties (`--color-*`, `--spacing-*`, `--font-*`, …). Drop-in for any HTML page.
- **Static CSS layer** (v0.7+) — pre-compiled, semantic class names (`.vk-button`, `.vk-card`, `.vk-badge`, …) for the 19 presentation components.
- **Web Components layer** (v0.8+) — Custom Elements (`<vk-switch>`, `<vk-checkbox>`, `<vk-radio-group>`, `<vk-tabs>`, `<vk-accordion>`, `<vk-dialog>`, `<vk-tooltip>`, `<vk-toast-host>`) for interactive pieces. v0.9 adds `<vk-combobox>`, `<vk-date-picker>`, `<vk-dropdown-menu>`, `<vk-data-table>`, etc.

Canonical references:

- [docs/styling.md](https://github.com/vikingokft/vikingo-design-system/blob/main/docs/styling.md) — tokens (this is the relevant section for HTML)
- [docs/components.md](https://github.com/vikingokft/vikingo-design-system/blob/main/docs/components.md) — what each component does
- [Storybook (live)](https://vikingo-storybook.vercel.app) — visual reference

## Core rules

- **Use the design tokens** (`var(--color-*)`, `var(--radius-*)`, `var(--spacing-*)`) for colors, spacing, radius, fonts, motion. Never hardcode hex codes.
- **Don't introduce a new CSS framework.** No Bootstrap, Bulma, Tailwind, etc. Vikingo's CSS is enough on its own.
- **Don't try to install `@vikingo/ui` and import React components.** That requires a build pipeline; this template assumes no bundler.

## v0.6.x — using tokens only

```html
<!DOCTYPE html>
<html lang="hu">
<head>
  <meta charset="UTF-8" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/vikingokft/vikingo-design-system@v0.6.0/packages/ui/dist/tokens.css" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/vikingokft/vikingo-design-system@v0.6.0/packages/ui/dist/fonts/inter-cdn.css" />
  <style>
    body {
      font-family: var(--font-body);
      color: var(--color-text);
      background: var(--color-bg);
    }
    .my-button {
      background: var(--color-accent);
      color: var(--color-accent-foreground);
      padding: var(--spacing-sm) var(--spacing-md);
      border-radius: var(--radius-md);
      box-shadow: var(--shadow-sm);
      border: none;
      transition: opacity var(--duration-fast) var(--ease-out-quint);
    }
    .my-button:hover { background: var(--color-accent-hover); }
  </style>
</head>
<body>
  <button class="my-button">Mentés</button>
</body>
</html>
```

## v0.7+ — pre-compiled component CSS

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/vikingokft/vikingo-design-system@v0.8.0/packages/ui/dist/vanilla.css" />

<button class="vk-button vk-button--primary vk-button--lg">Mentés</button>
<div class="vk-card">
  <div class="vk-card__header"><h3 class="vk-card__title">Cím</h3></div>
  <div class="vk-card__body">Tartalom</div>
</div>
```

## v0.8+ — Web Components

```html
<script type="module" src="https://cdn.jsdelivr.net/gh/vikingokft/vikingo-design-system@v0.8.0/packages/ui/dist/html.mjs"></script>

<vk-switch checked label="Értesítések"></vk-switch>

<vk-tabs>
  <vk-tab label="Általános" selected><p>General</p></vk-tab>
  <vk-tab label="Beállítások"><p>Settings</p></vk-tab>
</vk-tabs>

<vk-dialog id="confirm">
  <h2 slot="title">Megerősítés</h2>
  <p>Biztosan törölni szeretnéd?</p>
  <div slot="footer">
    <button class="vk-button vk-button--secondary"
            onclick="document.getElementById('confirm').close()">Mégse</button>
    <button class="vk-button vk-button--destructive">Törlés</button>
  </div>
</vk-dialog>
<button class="vk-button vk-button--primary"
        onclick="document.getElementById('confirm').showModal()">Open</button>

<vk-toast-host position="bottom-right"></vk-toast-host>
<script type="module">
  import { vkToast } from 'https://cdn.jsdelivr.net/.../html.mjs'
  vkToast.success('Mentve')
</script>
```

## Dark mode

Toggle by adding the `dark` class to `<html>`. All tokens swap automatically.

```html
<html class="dark">…</html>
```

## When to use what

| Need | Use |
|---|---|
| Color, spacing, font, radius consistency | **Tokens** (v0.6+) |
| Button, Card, Badge, Alert in HTML | **Static CSS** (v0.7+) — `vk-button`, `vk-card`, `vk-badge`, … |
| Switch, Checkbox, Radio, Tabs, Accordion, Dialog, Tooltip, Toast | **Web Components** (v0.8) — `<vk-switch>`, `<vk-tabs>`, `<vk-dialog>`, … |
| Combobox, DatePicker, DropdownMenu, DataTable | **Web Components** (v0.9 — coming) |
| Anything truly dynamic (real-time, complex state) | Switch to React + use `@vikingo/ui` |
