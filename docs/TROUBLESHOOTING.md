> **Audience:** anyone debugging a `@vikingo/ui` integration.
> **Use:** the FAQ for the most common integration failures. Search by symptom.

# Vikingo UI — Troubleshooting

## Styles don't load / components are unstyled

**Symptom:** components render but look like browser defaults — no fonts, no colors, no rounded corners.

**Cause:** the CSS entry point isn't imported, or it's imported after another CSS file that resets things.

**Fix:** import `@vikingo/ui/styles/react` at the top of your entry file (`main.tsx` for Vite, `app/layout.tsx` for Next.js), **before** any other CSS imports.

```tsx
import '@vikingo/ui/styles/react'   // ← must be first
import './my-other-styles.css'
```

If you're on a Chrome Extension or offline app, use `@vikingo/ui/styles/react-offline` instead — the default entry imports Google Fonts via CDN, which Manifest v3 CSP blocks.

## Tailwind v4 setup not working

**Symptom:** classes like `bg-accent`, `text-text-muted`, `rounded-md` don't apply, but `flex`, `p-4`, `mt-2` do.

**Cause:** the Tailwind v4 plugin isn't reading our CSS, so the custom theme tokens (`--color-accent`, `--radius-md`) aren't bridged into Tailwind utilities.

**Fix:**

- **Vite:** make sure `@tailwindcss/vite` is in your `plugins` array.
  ```ts
  import tailwindcss from '@tailwindcss/vite'
  export default defineConfig({ plugins: [react(), tailwindcss()] })
  ```
- **Next.js:** use `@tailwindcss/postcss` in `postcss.config.mjs`.
  ```js
  export default { plugins: { '@tailwindcss/postcss': {} } }
  ```
- The CSS import must come **before** Tailwind processes your sources. The default order works as long as you don't move it after a `@tailwind` directive (which is v3 syntax — remove those if migrating).

## Dark mode doesn't work

**Symptom:** adding `class="dark"` to `<html>` does nothing.

**Causes & fixes:**

1. **You imported `tokens.css` but not `react.css`.** `tokens.css` defines the variables but doesn't apply base styles. Use `@vikingo/ui/styles/react` (or `/react-offline`).
2. **Some other library overrides body/html colors.** Check the CSS cascade — Vikingo styles must win. If a stale `globals.css` from `create-next-app` has `body { background: white }`, remove it.
3. **You're styling components with hardcoded colors** (e.g. `className="bg-white"`). These don't react to dark mode. Switch to tokens: `className="bg-surface"` or use `var(--color-surface)`.

## Peer dependency warnings on install

**Symptom:** `pnpm add @vikingo/ui` warns about missing `recharts` or `react-hook-form`.

**Cause:** these are *optional* peer dependencies. `peerDependenciesMeta.optional: true` is set in our package.json, but pnpm still surfaces the notice.

**Fix:**
- If you use charts (`AreaChart`, `MultiBarChart`, `MultiLineChart`) → `pnpm add recharts`.
- If you use the Form components → `pnpm add react-hook-form`.
- Otherwise: ignore the warning. The package works fine without them and tree-shaking removes the unused code.

## Components don't tree-shake — bundle is huge

**Symptom:** importing one component pulls in 180KB+ even though I only use `Button`.

**Cause:** you might be importing from a deep path like `@vikingo/ui/dist/index.mjs` which forces the full bundle, or your bundler isn't configured for ESM tree-shaking.

**Fix:**
- Always import from the package root: `import { Button } from '@vikingo/ui'`.
- Verify your bundler uses ESM (`@vikingo/ui` ships ESM at `dist/index.mjs`). For Webpack 5+ / Vite / Rollup / esbuild this is automatic.
- `package.json` declares `sideEffects: ["**/*.css"]` so all JS is tree-shakeable; only CSS is preserved.

## Fonts not loading (Chrome Extension)

**Symptom:** Manifest v3 extension shows DM Sans fallback (system sans-serif), Console shows CSP error mentioning `fonts.googleapis.com`.

**Cause:** Manifest v3 blocks remote `@import` URLs by default — including the one in `react.css`.

**Fix:** import the offline variant.
```ts
import '@vikingo/ui/styles/react-offline'
```
Then either bundle DM Sans / DM Mono yourself with `next/font/google`-equivalent, or add Clash Display + DM Sans woff2 files to your extension and update the `@font-face` paths.

## "@vikingo/ui not found" after pnpm install

**Symptom:** `Cannot find module '@vikingo/ui'`.

**Cause:** the package was added but `pnpm` didn't link it (often after a `package.json` edit followed by a `node_modules` migration).

**Fix:**
```bash
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

## Storybook (this repo) doesn't render after pulling new changes

**Symptom:** you updated the repo, ran `pnpm storybook`, and stories show "ReferenceError: cn is not defined" or similar.

**Cause:** the package's `prepare` script builds on `pnpm install`. If the install didn't run, `dist/` is stale.

**Fix:**
```bash
pnpm install
pnpm --filter @vikingo/ui run build
pnpm storybook
```

## I'm using a deprecated import path

The following import paths still work but will be removed in **v1.0**:

| Deprecated | Replacement |
|---|---|
| `@vikingo/ui/styles` | `@vikingo/ui/styles/react` |
| `@vikingo/ui/styles/no-cdn` | `@vikingo/ui/styles/react-offline` |
| `@vikingo/ui/styles/google-fonts` | `@vikingo/ui/fonts/inter-cdn` |
| `@vikingo/ui/fonts` | `@vikingo/ui/fonts/inter-bundled` |

Update your imports — there is no migration script; a project-wide find/replace is enough.

## My issue isn't here

Open a GitHub issue with: package version, framework + version (Vite/Next.js/etc.), Tailwind version, the error message, and a minimal reproduction. PRs that add a new troubleshooting entry are welcome — see [CONTRIBUTING.md](../CONTRIBUTING.md).
