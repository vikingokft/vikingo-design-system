> **Audience:** any consumer (human or AI agent) using `@vikingo/ui` in their project.
> **Use:** the canonical reference for which components exist, what to import, and when to reach for which one. Linked from every template `CLAUDE.md`.

# Vikingo UI — Component Catalog

All components are exported from `@vikingo/ui` (single import path). Tree-shaking removes anything you don't use.

```tsx
import { Button, Card, Input, Toaster, toast } from '@vikingo/ui'
```

## Categories

| Category | Components |
|---|---|
| **Form input** | [Input](../packages/ui/src/components/primitives/input.tsx), [Textarea](../packages/ui/src/components/primitives/textarea.tsx), [NumberInput](../packages/ui/src/components/primitives/number-input.tsx), [Select](../packages/ui/src/components/primitives/select.tsx), [Combobox](../packages/ui/src/components/primitives/combobox.tsx), [Checkbox](../packages/ui/src/components/primitives/checkbox.tsx), [RadioGroup](../packages/ui/src/components/primitives/radio-group.tsx), [Switch](../packages/ui/src/components/primitives/switch.tsx), [Slider](../packages/ui/src/components/primitives/slider.tsx), [DatePicker](../packages/ui/src/components/primitives/date-picker.tsx), [TagsInput](../packages/ui/src/components/primitives/tags-input.tsx), [FileUpload](../packages/ui/src/components/primitives/file-upload.tsx), [SearchBar](../packages/ui/src/components/primitives/search-bar.tsx) |
| **Form integration** | [Form](../packages/ui/src/components/primitives/form.tsx) (react-hook-form wrappers: `FormField`, `FormControl`, `FormMessage`, …) |
| **Action** | [Button](../packages/ui/src/components/primitives/button.tsx), [CopyButton](../packages/ui/src/components/primitives/copy-button.tsx), [SegmentedControl](../packages/ui/src/components/primitives/segmented-control.tsx) |
| **Overlay** | [Dialog](../packages/ui/src/components/primitives/dialog.tsx), [ConfirmDialog](../packages/ui/src/components/primitives/confirm-dialog.tsx), [Drawer](../packages/ui/src/components/primitives/drawer.tsx), [Popover](../packages/ui/src/components/primitives/popover.tsx), [DropdownMenu](../packages/ui/src/components/primitives/dropdown-menu.tsx), [CommandPalette](../packages/ui/src/components/primitives/command-palette.tsx), [Tooltip](../packages/ui/src/components/primitives/tooltip.tsx) |
| **Feedback** | [Alert](../packages/ui/src/components/primitives/alert.tsx), [Toast](../packages/ui/src/components/primitives/toast.tsx) (`Toaster` + `toast()`), [Progress](../packages/ui/src/components/primitives/progress.tsx), [Spinner](../packages/ui/src/components/primitives/spinner.tsx), [Skeleton](../packages/ui/src/components/primitives/skeleton.tsx), [EmptyState](../packages/ui/src/components/primitives/empty-state.tsx) |
| **Data display** | [Card](../packages/ui/src/components/primitives/card.tsx), [Table](../packages/ui/src/components/primitives/table.tsx), [DataTable](../packages/ui/src/components/primitives/data-table.tsx) (sort/filter/paginate), [StatCard](../packages/ui/src/components/primitives/stat-card.tsx), [MetricRow](../packages/ui/src/components/primitives/metric-row.tsx), [ChartCard](../packages/ui/src/components/primitives/chart-card.tsx), [ImageCard](../packages/ui/src/components/primitives/image-card.tsx), [Badge](../packages/ui/src/components/primitives/badge.tsx), [Chip](../packages/ui/src/components/primitives/chip.tsx), [Avatar](../packages/ui/src/components/primitives/avatar.tsx) |
| **Navigation** | [Tabs](../packages/ui/src/components/primitives/tabs.tsx), [Breadcrumb](../packages/ui/src/components/primitives/breadcrumb.tsx), [Pagination](../packages/ui/src/components/primitives/pagination.tsx), [PageHeader](../packages/ui/src/components/primitives/page-header.tsx), [PeriodFilter](../packages/ui/src/components/primitives/period-filter.tsx) |
| **Layout** | [PageLayout](../packages/ui/src/components/layout/page-layout.tsx), [Sidebar](../packages/ui/src/components/layout/sidebar.tsx), [Topbar](../packages/ui/src/components/layout/topbar.tsx) |
| **Containment** | [Accordion](../packages/ui/src/components/primitives/accordion.tsx), [Carousel](../packages/ui/src/components/primitives/carousel.tsx), [Separator](../packages/ui/src/components/primitives/separator.tsx) |
| **Charts** | [AreaChart](../packages/ui/src/components/charts/area-chart.tsx), [MultiBarChart](../packages/ui/src/components/charts/bar-chart.tsx), [MultiLineChart](../packages/ui/src/components/charts/line-chart.tsx) (recharts wrappers) |
| **Brand** | [Logo](../packages/ui/src/components/primitives/logo.tsx) |

## When to use what

- **Yes/no choice from a list of 2–5** → `RadioGroup` (visible options) or `Select` (compact, takes less space).
- **Yes/no choice for one option** → `Checkbox` (form context) or `Switch` (immediate action / setting).
- **Pick from many options + search** → `Combobox`.
- **Confirm a destructive action** → `ConfirmDialog` (preset, easier than wiring up `Dialog` manually).
- **Show a transient message** → `toast.success(...)` / `toast.error(...)` (requires `<Toaster />` mounted once at app root).
- **Show an inline persistent message** → `Alert`.
- **Empty list / no results** → `EmptyState` (icon + title + description + action).
- **Loading state for individual rows / cards** → `Skeleton*` family. Use a `Spinner` only when the loading region is small or the layout shouldn't shift.
- **Tabular data with sort/filter/paginate** → `DataTable` (don't reach for `Table` — that's a low-level primitive).
- **Multi-step content reveal in a small space** → `Accordion`.

## Authoritative source

Component props, variants, and live examples: **[Storybook](https://vikingo-storybook.vercel.app)**.

The Storybook is the source of truth — if this doc and a story disagree, the story is right.
