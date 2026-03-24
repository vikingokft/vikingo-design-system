# Contributing to Vikingo Design System

## Prerequisites

- **Node 20** — `nvm use` (`.nvmrc` is present)
- **pnpm 10+** — `npm install -g pnpm`

## Dev Environment Setup

```bash
pnpm install       # install all workspace dependencies

pnpm storybook     # start Storybook at localhost:6006
pnpm build         # build packages/ui → dist/
pnpm lint          # typecheck (tsc) + Biome lint across workspace
```

Formatting is handled automatically by the pre-commit hook. To format manually inside `packages/ui`:

```bash
cd packages/ui
pnpm format        # biome check --write .
```

## Project Structure

```
vikingo-design-system/
├── packages/ui/
│   ├── src/
│   │   ├── components/ui/   ← one file per component
│   │   ├── lib/utils.ts     ← cn() utility (clsx + tailwind-merge)
│   │   └── index.ts         ← public exports (all components exported here)
│   ├── tsup.config.ts       ← builds ESM + CJS + DTS
│   └── package.json
└── apps/storybook/
    └── stories/ui/          ← one .stories.tsx file per component
```

---

## Adding a New Component

Follow these steps in order:

- [ ] **1.** Create `packages/ui/src/components/ui/<component-name>.tsx`
- [ ] **2.** Follow the [component template](#component-template) below
- [ ] **3.** Export from `packages/ui/src/index.ts`
- [ ] **4.** Create `apps/storybook/stories/ui/<ComponentName>.stories.tsx`
- [ ] **5.** Verify: `pnpm lint && pnpm build`
- [ ] **6.** If it introduces a common usage pattern, add an example to `CONSUMER_CLAUDE.md`

---

## Component Template

Every component must follow this exact structure:

```tsx
import * as React from 'react'
import { cn } from '../../lib/utils'

// ── Types ─────────────────────────────────────────────────────────────────────

export interface ExampleProps {
  /** Short description of what this prop does */
  variant?: 'primary' | 'secondary'
  /** User-visible string — always a prop with a Hungarian default */
  label?: string
  className?: string
}

// ── Component ─────────────────────────────────────────────────────────────────

/**
 * One-line description of what this component does.
 *
 * @example
 * <Example variant="primary" label="Mentés" />
 */
export const Example = React.forwardRef<HTMLDivElement, ExampleProps>(
  ({ variant = 'primary', label = 'Alapértelmezett', className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'base-classes',
          variant === 'secondary' && 'secondary-classes',
          className,
        )}
        {...props}
      >
        {label}
      </div>
    )
  },
)
Example.displayName = 'Example'
```

### Rules

| Rule | Why |
|---|---|
| Always `React.forwardRef` | Ref forwarding is required for composability |
| Always set `displayName` | Required for React DevTools and Storybook autodocs |
| Always use `cn()` for classNames | Enables prop-level className overrides |
| CSS custom properties only | No hardcoded colors, radius, or shadows |
| User-visible strings as props | Hungarian defaults, consumer can override |
| JSDoc on the component and non-obvious props | Powers Storybook autodocs descriptions |

### CSS Custom Properties

Never use hardcoded values. Use these tokens:

| Purpose | Tokens |
|---|---|
| Text | `--color-text` · `--color-text-muted` |
| Background | `--color-bg` · `--color-surface` |
| Border | `--color-border` · `--color-border-strong` · `--color-border-focus` |
| Accent | `--color-accent` · `--color-accent-hover` · `--color-accent-muted` |
| Status | `--color-success` · `--color-warning` · `--color-error` · `--color-info` |
| Radius | `--radius-sm` · `--radius-md` · `--radius-lg` · `--radius-xl` · `--radius-full` |
| Shadow | `--shadow-sm` · `--shadow-md` · `--shadow-lg` |
| Transition | `--transition-fast` |

---

## Story Template

Every component needs a story file:

```tsx
import type { Meta, StoryObj } from '@storybook/react'
import { Example } from '@vikingo/ui'

const meta: Meta<typeof Example> = {
  title: 'Category/Example',
  // Categories: Forms | Display | Overlays | Navigation | Data | Layout | Charts
  component: Example,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof Example>

export const Default: Story = {
  name: 'Default · Alapértelmezett',
  args: {
    variant: 'primary',
    label: 'Példa szöveg',
  },
}

// Add one story per major variant or interactive state
export const Secondary: Story = {
  name: 'Secondary · Másodlagos',
  args: { variant: 'secondary' },
}
```

### Rules

- Story names use bilingual format: `'English · Magyar'`
- `tags: ['autodocs']` must always be present
- Use `args:` for static stories, `render:` for stateful/interactive ones
- Minimum: Default story + one story per major variant

---

## Pre-commit Hook

[husky](https://github.com/typicode/husky) + [lint-staged](https://github.com/lint-staged/lint-staged) runs automatically on every commit.

**What it does:**
1. Runs `biome lint --diagnostic-level=error` on all staged `.ts/.tsx` files in `packages/ui/src/` and `apps/storybook/stories/`
2. Runs `biome format --write` on all staged `.ts/.tsx/.js/.json` files

**If the commit is blocked:** fix the reported errors, `git add` the fixed files, then commit again. The hook does not auto-fix lint errors — only formatting.

---

## Maintaining Platform Presets

Platform-specific consumer presets live in `docs/presets/`. Each preset is a **self-contained** `CLAUDE.md` file that includes the base rules + platform-specific guidance.

**When to update all presets:**
- Adding or removing a component from the "Available Components" list
- Adding a new CSS custom property
- Adding a new common pattern

**When adding a new preset:**
1. Create `docs/presets/<platform>.md` following the existing preset structure
2. Add it to `docs/presets/README.md`
3. Add it to the "Platform Presets" table in `README.md`

---

## Releasing

1. Bump `version` in `packages/ui/package.json`
2. Commit: `git commit -m "chore: bump to vX.Y.Z"`
3. Tag: `git tag vX.Y.Z`
4. Push: `git push && git push --tags`

Vercel picks up the new tag and redeploys Storybook automatically via the CI pipeline.
