# Changelog

All notable changes to the Vikingo Design System.

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
