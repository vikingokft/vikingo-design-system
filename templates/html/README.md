# Plain HTML — setup guide

> **Audience:** humans building a non-React project (WordPress/Shopify theme, email, static HTML page, prototype) that should look like Vikingo.
> **Use:** the platform-specific setup. The matching [`CLAUDE.md`](./CLAUDE.md) goes into your project root for the AI agent.

## What ships when

| Layer | Available | What you get |
|---|---|---|
| **Tokens** (CSS variables) | v0.6+ ✅ | Colors, spacing, radius, shadows, fonts, motion — drop into any HTML page |
| **Static CSS** (semantic classes) | v0.7+ ✅ | `.vk-button`, `.vk-card`, `.vk-badge`, … — 19 presentation components, no JS |
| **Web Components batch 1** | v0.8+ ✅ | `<vk-switch>`, `<vk-checkbox>`, `<vk-radio-group>`, `<vk-tabs>`, `<vk-accordion>`, `<vk-dialog>`, `<vk-tooltip>`, `<vk-toast-host>` |
| **Web Components batch 2** | v0.9 ⏳ | `<vk-combobox>`, `<vk-date-picker>`, `<vk-dropdown-menu>`, `<vk-data-table>`, `<vk-drawer>`, `<vk-popover>`, … |

## Today (v0.8.x): tokens + static CSS + Web Components

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/vikingokft/vikingo-design-system@v0.8.0/packages/ui/dist/vanilla.css" />
<script type="module" src="https://cdn.jsdelivr.net/gh/vikingokft/vikingo-design-system@v0.8.0/packages/ui/dist/html.mjs"></script>
```

This gives you all 19 presentation components as `vk-*` CSS classes plus the v0.8 Web Components.

If you just want the design tokens without the static CSS:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/vikingokft/vikingo-design-system@v0.8.0/packages/ui/dist/tokens.css" />
```

CSS custom properties available: `--color-*`, `--radius-*`, `--font-*`, `--shadow-*`, `--spacing-*`, `--duration-*`, `--ease-*`.

```css
.my-button {
  background: var(--color-accent);
  color: var(--color-accent-foreground);
  border-radius: var(--radius-md);
  padding: var(--spacing-sm) var(--spacing-md);
  font-family: var(--font-body);
  transition: background var(--duration-fast) var(--ease-out-quint);
}
.my-button:hover { background: var(--color-accent-hover); }
```

For dark mode, add the `dark` class to `<html>` — all tokens automatically swap.

Full token list: [packages/ui/src/styles/tokens.css](https://github.com/vikingokft/vikingo-design-system/blob/main/packages/ui/src/styles/tokens.css). Reference docs: [docs/styling.md](../../docs/styling.md).

## Static CSS — pre-built component styles

You don't need to write your own button/card/badge CSS:

```html
<button class="vk-button vk-button--primary">Mentés</button>
<div class="vk-card">
  <h3 class="vk-card__title">Cím</h3>
  <p>Szöveg</p>
</div>
```

See [`templates/html/example.html`](./example.html) for a copy-paste page covering all 19 components.

## Web Components — interactive elements

```html
<vk-tabs>
  <vk-tab label="Általános" selected>…</vk-tab>
  <vk-tab label="Beállítások">…</vk-tab>
</vk-tabs>

<vk-switch checked label="Értesítések"></vk-switch>

<vk-dialog id="confirm">
  <h2 slot="title">Megerősítés</h2>
  <p>Biztos vagy benne?</p>
  <div slot="footer">
    <button class="vk-button vk-button--secondary"
            onclick="document.getElementById('confirm').close()">Mégse</button>
    <button class="vk-button vk-button--destructive">OK</button>
  </div>
</vk-dialog>
```

No React, no build step, no JS framework — just `<link>` + `<script type="module">`.

## Coming in v0.9: complex interactive

`<vk-combobox>`, `<vk-date-picker>`, `<vk-dropdown-menu>`, `<vk-data-table>`, `<vk-drawer>`, `<vk-popover>`, `<vk-command-palette>`, `<vk-slider>`, `<vk-tags-input>`, `<vk-file-upload>`. Track in [CHANGELOG.md](../../CHANGELOG.md).

## Try the bundled example

The `example.html` next to this README shows every component that ships in v0.8 (CSS classes + Web Components). To preview it:

```bash
# from the repo root, build dist/ once
pnpm --filter @vikingo/ui run build

# serve the templates/html/ folder over HTTP (file:// blocks ES modules)
npx serve templates/html
# → open http://localhost:3000/example.html
```

The example uses **relative paths** to the local `dist/`. When you copy it into your own project, swap the URLs to either your local `node_modules/@vikingo/ui/dist/...` install path or the published CDN — see the comment block at the top of the file.

## Drop the AI agent template

```bash
curl -o CLAUDE.md https://raw.githubusercontent.com/vikingokft/vikingo-design-system/main/templates/html/CLAUDE.md
```
