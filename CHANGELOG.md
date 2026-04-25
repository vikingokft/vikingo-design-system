# Changelog

All notable changes to the Vikingo Design System.

---

## [0.8.0] – 2026-04-25

Web Components — first batch.

### New: `@vikingo/ui/html`

Importable as a single ES module that registers all `<vk-*>` Custom Elements:

```html
<script type="module" src="@vikingo/ui/html"></script>
```

Or programmatically:

```ts
import { vkToast } from '@vikingo/ui/html'
vkToast.success('Mentve')
```

### Components shipped

| Element | Description | Form-associated |
|---|---|---|
| `<vk-switch>` | Toggle | ✓ |
| `<vk-checkbox>` | Checkbox with `indeterminate` tri-state | ✓ |
| `<vk-radio-group>` + `<vk-radio>` | Radio set with roving tabindex | — |
| `<vk-tooltip>` | Hover/focus reveal | — |
| `<vk-tabs>` + `<vk-tab>` | Tab list with arrow-key navigation | — |
| `<vk-accordion>` + `<vk-accordion-item>` | Collapsible panels (single or multiple open) | — |
| `<vk-dialog>` | Modal built on native `<dialog>` (focus trap + backdrop free) | — |
| `<vk-toast-host>` + `vkToast()` | Toast notifications with imperative API | — |

All components implement keyboard navigation and ARIA semantics. Style via the `vk-*` class hooks in `vanilla.css` plus host-level `:host` styles in each Web Component.

### Bundle

- `dist/html.mjs` ≈ 38 KB raw / **7.3 KB gzipped** for all 8 elements.
- Zero runtime dependencies — vanilla `HTMLElement` + Shadow DOM where needed.
- No React.

### What's still missing

The complex interactive components — `vk-drawer`, `vk-popover`, `vk-dropdown-menu`, `vk-combobox`, `vk-date-picker`, `vk-data-table`, `vk-command-palette`, `vk-slider`, `vk-tags-input`, `vk-file-upload` — ship in **v0.9**.

### Fixes inside this release

- `.vk-chip--selected:hover` now keeps its filled accent style. Previously the unselected `.vk-chip:hover` rule (specificity 0,2,0) overrode the selected rule (0,1,0), so a selected chip "unfilled" on hover.

---

## [0.7.0] – 2026-04-25

Vanilla HTML target — first cut.

### New: `@vikingo/ui/styles/vanilla`

- `packages/ui/src/styles/vanilla.css` — pre-compiled component styles for plain HTML projects (no React, no Tailwind).
- `vk-` prefixed BEM-style class names: `vk-button vk-button--primary`, `vk-card vk-card__header`, etc.
- Coverage (19 presentation components): Button, Badge, Chip, Card, Alert, Avatar, Breadcrumb, Separator, Spinner, Progress, Skeleton, EmptyState, MetricRow, PageHeader, StatCard, ChartCard, ImageCard, Pagination, SegmentedControl, plus form base (Input, Textarea, Label).
- Bundle: ~26KB raw / ~5.5KB gzipped (incl. inlined tokens).
- Light + dark mode via `<html class="dark">` (same toggle as React).

### Demo

- `templates/html/example.html` — copy-paste vanilla HTML page using the new CSS. Open it in a browser to see all 19 components without any build pipeline.

### What's still missing

Interactive components (Dialog, Drawer, DropdownMenu, Combobox, DatePicker, DataTable, Tabs, Accordion, Tooltip, Switch, Checkbox, RadioGroup, Slider, Toast, …) need JS + ARIA + keyboard handling. They ship as Web Components (`<vk-dialog>`, `<vk-tabs>`) in **v0.8+** under `@vikingo/ui/html`.

---

## [0.6.0] – 2026-04-25

This release renames folders and files for clarity, splits the design tokens into a single source of truth, and reorganizes the documentation around the question *"how do I load this into another project?"* No component APIs changed; the React surface is fully backwards-compatible.

### Source structure (renames)

- `packages/ui/src/components/ui/` → `packages/ui/src/components/primitives/` — eliminates the triple-`ui` redundancy (`packages/ui/components/ui/`).
- `packages/ui/src/lib/` → `packages/ui/src/utils/` — `lib/` was a catch-all; `utils/` describes what's actually there.
  - `lib/utils.ts` (only `cn()`) → `utils/cn.ts`.
  - `lib/format.ts` (Hungarian formatters) → `utils/format-hu.ts`.
- `packages/ui/src/components/primitives/search.tsx` → `search-bar.tsx` — file name now matches the `SearchBar` component it exports.
- `apps/storybook/stories/ui/` → `apps/storybook/stories/primitives/` — same convention as the source.

These are internal — public exports from `@vikingo/ui` are unchanged.

### CSS distribution (renames + tokens.css)

- New: `packages/ui/src/styles/tokens.css` — single source of truth for all CSS custom properties (`--color-*`, `--radius-*`, `--font-*`, `--duration-*`, …). Both React entry CSS files now `@import` it. Fixes a real drift: `globals.css` and `globals-no-cdn.css` had different `--transition-*` values in 0.5.x.
- Renamed for clarity:
  - `globals.css` → `react.css`
  - `globals-no-cdn.css` → `react-offline.css`
  - `google-fonts.css` → `fonts/inter-cdn.css`
  - `fonts.css` → `fonts/inter-bundled.css`
- New internal partial: `_react-base.css` — Tailwind v4 `@theme` bridge, Radix UI animations, base styles. Imported by both `react.css` and `react-offline.css` so they can never drift again.
- New `package.json` exports: `./styles/react`, `./styles/react-offline`, `./styles/tokens`, `./fonts/inter-cdn`, `./fonts/inter-bundled`.
- **Deprecated aliases (still work, removed in v1.0):** `./styles`, `./styles/no-cdn`, `./styles/google-fonts`, `./fonts`. Keep your existing imports working without changes.

### Documentation rewrite

- `README.md` rewritten — the question *"how do I load this into another project?"* is now answered in the first 30 lines via a platform table.
- New `templates/<platform>/{CLAUDE.md, README.md}` per-platform structure (was `docs/presets/*.md` and `CONSUMER_CLAUDE.md` at root).
- New canonical reference docs:
  - `docs/components.md` — single component catalog (templates link here instead of duplicating)
  - `docs/styling.md` — tokens, dark mode, `cn()`, overrides
  - `docs/patterns.md` — common compositions
  - `docs/ARCHITECTURE.md` — repo layout, build pipeline, CSS distribution
  - `docs/TROUBLESHOOTING.md` — integration FAQ
- New `packages/ui/README.md` and `apps/storybook/README.md`.
- `CONTRIBUTING.md` extended with a "Comments & JSDoc" section and updated paths.
- Old paths kept as redirect stubs for one release: `CONSUMER_CLAUDE.md`, `docs/presets/*.md`.

### Vanilla HTML (preview)

- `templates/html/{CLAUDE.md, README.md}` added — describes the upcoming v0.7+ vanilla HTML target. v0.6.x already ships standalone `tokens.css` for use in non-React projects; static `vikingo.css` and `<vk-*>` Web Components arrive in v0.7 / v0.8.

### Migration

No breaking changes for React consumers. The deprecated CSS imports keep working. If you have internal scripts or AI agents that referenced the old folder names (`components/ui/`, `lib/utils`), update them — see the renames above.

---

## [0.5.1] – 2026-04-21

### Fix
- **Tokens/Icons story restored** (`tokens-icons--icon-browser`) — the broken bookmark URL at `/?path=/story/tokens-icons--icon-browser` resolves again. Previous removal (`e72bbae`) eager-imported all ~1400 Lucide icons; the new story is curated to the ~54 icons actually used across `@vikingo/ui` with an inline usage guide and a link out to [lucide.dev/icons](https://lucide.dev/icons/) for anything else.

### Motion Tokens (Claude Design alignment)
- `globals.css`: Named easing curves — `--ease-out-quint` (default deceleration), `--ease-in-out` (reversible), `--ease-soft` (gentle overshoot, no bounce)
- `globals.css`: Explicit duration tokens — `--duration-fast` (120ms), `--duration-base` (200ms), `--duration-slow` (320ms). Old `--transition-{fast,base,slow}` kept as back-compat aliases composing duration + easing — no consumer breakage.
- `globals.css`: **`prefers-reduced-motion: reduce` respected globally** — animations collapse to ~0ms when the OS setting is on. Internal animation utilities (`animate-in`/`animate-out`, accordion keyframes, Switch thumb) now reference the duration/easing tokens instead of hard-coded values.
- `apps/storybook/.storybook/preview.tsx`: Added a Motion toolbar toggle (`full` / `reduced`) so designers can preview the reduced-motion state without changing OS settings. Applies the `.force-reduce-motion` class from `@vikingo/ui/styles`.

### React 19 Hygiene
- Dropped `React.forwardRef` wrappers across all 28 components in `packages/ui/src/components/ui/` — React 19 natively treats `ref` as a regular prop, so forwardRef is dead weight for pure pass-through components. Types preserved via `React.ComponentPropsWithoutRef` + `React.ComponentRef`. No public API change; refs still attach identically.
- Named function declarations auto-set `displayName`, so explicit `.displayName = '…'` assignments were removed.

### Storybook
- `apps/storybook/stories/tokens/Spacing.stories.tsx`: Added missing `tags: ['autodocs']`. Updated the Transitions preview to display the new `--duration-*` tokens and accurate millisecond values.

### Docs
- `CONSUMER_CLAUDE.md`, `docs/presets/{nextjs,chrome-extension,marketing-site}.md`: Added motion tokens to the available CSS custom properties list.
- `CONTRIBUTING.md`: Updated component template to the React 19 ref-as-prop pattern; added duration/easing rows to the CSS custom properties table; dropped the outdated "always `forwardRef`/`displayName`" rule.

---

## [0.4.0] – 2026-03-06

### New Components
- **Form** (`Forms/Form`) — react-hook-form + zod integration; `Form`, `FormField`, `FormItem`, `FormLabel`, `FormControl`, `FormDescription`, `FormMessage`, `useFormField`; `required` asterisk, error state on label, ARIA attributes via Radix Slot
- **CommandPalette** (`Overlays/Command Palette`) — Cmd+K search palette built on Radix Dialog; `CommandPalette`, `CommandPaletteTrigger`, `CommandGroup`, `CommandItem`, `CommandSeparator`, `CommandEmpty`; real-time query filtering, keyboard close (Esc), custom trigger support
- **Drawer** (`Overlays/Drawer`) — Radix Dialog-based slide-in panel; `left`, `right`, `bottom` placement variants; `DrawerClose` for asChild action buttons; `hideClose` prop
- **EmptyState** (`Display/Empty State`) — zero-data placeholder; icon slot, title, description, optional action button; variants: default, search, error, permission
- **FileUpload** (`Forms/File Upload`) — drag-and-drop zone with file list, progress bar per file, remove button, `accept`/`maxSize`/`multiple` props
- **Combobox** (`Forms/Combobox`) — searchable select with popover dropdown; keyboard navigation, custom empty state, grouped options support
- **ConfirmDialog** (`Overlays/Confirm Dialog`) — destructive action confirmation dialog; `title`, `description`, `confirmLabel`, `cancelLabel`, `variant` (destructive/warning), async `onConfirm` with loading state

### New Stories
- `Display/Logo` — size variants (sm/md/lg), white/dark variant, iconOnly mode, on dark + light backgrounds
- `Layout/Topbar` — Default, WithAvatar, WithLogo, WithBadges, Minimal
- `Forms/Form` — BasicForm, RegistrationForm, WithValidationErrors, TwoColumnLayout, WithIcons

### Dark Mode Fixes
- `globals.css`: Added `color-scheme: dark` to `.dark` block — native browser elements (scrollbar, select, date input) now adopt dark styling
- `globals.css`: Status colors overridden in dark mode for better contrast on dark backgrounds (`--color-success: #4ADE80`, `--color-warning: #FBB040`, `--color-error: #F87171`, `--color-info: #60A5FA`); muted variants updated to match
- `Dialog.stories`, `MetricRow.stories`, `PeriodFilter.stories`: Added `bg-[var(--color-bg)]` meta-level decorators so canvas background follows dark/light mode

### Storybook DX
- Added `@storybook/addon-a11y` — automatic accessibility audit panel (ARIA, contrast, label issues) in every story
- Added viewport presets: Mobile S (375px), Mobile L (430px), Tablet (768px), Desktop (1440px)

### Button
- Active state changed from `scale(0.97)` to an outer glow ring (`box-shadow: 0 0 0 3px var(--color-accent-muted)`) — no size change, no color/readability impact

### Other
- `globals.css`: Added `@source "../**/*.{ts,tsx}"` so Tailwind v4 scans all component source files
- `globals.css`: Added `.btn-press:active` utility class outside any layer for guaranteed CSS generation

---

## [0.3.0] – 2026-03-06

### New Components
- **Spinner** (`Display/Spinner`) — CVA-based loading indicator with 5 sizes (xs–xl) and 6 color variants (accent, muted, white, success, warning, error); optional `label` prop
- **Chip / ChipGroup** (`Forms/Chip`) — All 4 M3 chip types: assist, filter (toggleable), input (removable), suggestion
- **Carousel / CarouselItem** (`Display/Carousel`) — Scroll-snap carousel with `itemsPerView` (1/2/3/auto), dot indicators, prev/next arrows on hover, no external dependency
- **DatePicker / DateRangePicker** (`Forms/Date Picker`) — Custom calendar built with Radix Popover; Hungarian month/day names, Monday-first grid, min/max constraints, range hover preview
- **SearchBar** (`Forms/Search`) — Controlled/uncontrolled search with result dropdown, keyboard navigation (↑↓ Enter Esc), grouped categories, loading state

### New Stories
- `Display/Divider` — 5 stories using the existing `Separator` component (horizontal, vertical, with label, in card, inset)
- `Overlays/Menu` — 5 stories using existing `DropdownMenu` (context menu, user menu, campaign actions, filter menu, nested submenu)
- `Navigation/Pagination` — Added `Icon Only · Csak nyilak` story with chevron-only navigation

### Fixes & Improvements
- **Storybook:** Added `viteFinal` hook with `resolve.conditions: ['source']` and `optimizeDeps.exclude` — Storybook now resolves `@vikingo/ui` to TypeScript source without a dist rebuild
- **Storybook:** Added `"source"` export condition to `packages/ui/package.json` for Vite-friendly source resolution
- **Tooltip:** Added `animate-in` / `animate-out` / `fade-in-0` / `zoom-in-95` / `slide-in-from-*` keyframes and CSS classes to `globals.css` — tooltips were previously invisible because these animation utilities were missing
- **Switch:** Larger size (h-6 w-11, thumb h-5 w-5), `cubic-bezier(0.4,0,0.2,1)` easing, `will-change-transform` for GPU-accelerated thumb movement
- **Pagination:** Fixed text overflow on Előző/Következő buttons — root cause was `PaginationPrevious`/`PaginationNext` inheriting the fixed `w-7` from `PaginationLink`'s `icon-sm` variant; now render as standalone `<a>` elements with `ghost/sm` styles
- **SearchBar:** Fixed TypeScript `DTS` build error — excluded `size` and `results` from `InputHTMLAttributes` Omit to avoid type conflicts with native HTML attributes
- **Story naming:** All stories renamed to bilingual `'English · Magyar'` format with logical Storybook group hierarchy (Forms / Display / Overlays / Navigation / Data / Layout / Tokens)

---

## [0.2.0] – 2025-12-01

### New Components
- **Accordion** (Radix UI) — collapsible sections with animated open/close
- **RadioGroup / RadioGroupItem** (Radix UI)
- **Slider** (Radix UI) — accent/success/default variants
- **Textarea**
- **Alert** — info/success/warning/error variants, closeable
- **ChartCard** — wrapper for area/bar/line charts with period filter
- **MetricRow** — horizontal KPI row
- **PeriodFilter** — preset date range selector
- **PageHeader** — page title + breadcrumb + action slot
- **AreaChart / MultiBarChart / MultiLineChart** — Recharts wrappers with brand tokens

### New Features
- Dark mode class-based toggle (`html.dark`) with Storybook toolbar
- Storybook `@storybook/addon-themes` integration
- Vercel auto-deploy via GitHub Actions

---

## [0.1.0] – 2025-10-15

### Initial Release

Core component library:

- **Button** — primary/secondary/ghost/destructive, sizes sm/md/lg, loading state
- **Input** — label, hint, error, left/right icon slots
- **Select** — Radix Select
- **Checkbox / Switch** — Radix primitives
- **Badge** — default/accent/success/warning/error, dot variant
- **Card** — padding variants, hover state
- **StatCard** — KPI value with trend arrow and period label
- **Avatar / AvatarImage / AvatarFallback** — image + initials fallback
- **Progress / Skeleton / Separator**
- **Dialog** — Radix Dialog
- **DropdownMenu** — full Radix DropdownMenu API (checkbox, radio, sub, shortcut)
- **Tooltip / TooltipProvider** — Radix Tooltip
- **Toaster / toast** — Sonner-based toast notifications
- **Tabs** — Radix Tabs, underline + pill variants
- **Breadcrumb / Pagination**
- **Table** — sortable headers, checkbox selection, row actions
- **ImageCard** — ad library card with image, title, tags, badge
- **Sidebar / Topbar / PageLayout** — collapsible app shell
- **Logo** — brand SVG component

Design tokens: CSS custom properties for color, typography, radius, spacing, shadow, transition — light + dark mode, Tailwind v4 `@theme` bridge.

Fonts: Clash Display (self-hosted woff2), DM Sans + DM Mono (Google Fonts CDN).
