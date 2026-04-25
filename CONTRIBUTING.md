# Contributing to Vikingo Design System

> **Audience:** developers adding components, fixing bugs, or maintaining the design system.
> **Use:** the canonical reference for project structure, conventions, comment/JSDoc rules, and the release process.

## Prerequisites

- **Node 20** — `nvm use` (`.nvmrc` is present)
- **pnpm 10+** — `npm install -g pnpm`

## Dev environment setup

```bash
pnpm install       # install all workspace dependencies
pnpm storybook     # start Storybook at localhost:6006
pnpm build         # build packages/ui → dist/
pnpm lint          # typecheck (tsc) + Biome lint across workspace
```

Formatting is handled by the pre-commit hook. To format manually inside `packages/ui`:

```bash
cd packages/ui
pnpm format        # biome check --write .
```

## Project structure

See [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md) for the full layout. The hot paths:

```
packages/ui/src/
├─ components/
│  ├─ primitives/   ← one file per primitive component (Button, Card, Dialog, …)
│  ├─ charts/       ← recharts wrappers
│  └─ layout/       ← PageLayout, Sidebar, Topbar
├─ utils/
│  ├─ cn.ts         ← class-name merger
│  └─ format-hu.ts  ← Hungarian number formatters
├─ styles/
│  ├─ tokens.css    ← CSS custom properties (single source of truth)
│  ├─ react.css     ← React + Tailwind v4 entry (with CDN fonts)
│  ├─ react-offline.css  ← React + Tailwind v4 entry (no CDN)
│  └─ _react-base.css    ← internal partial — animations + base styles
└─ index.ts         ← public exports

apps/storybook/stories/
├─ primitives/      ← stories for components/primitives/
├─ layout/          ← stories for components/layout/
└─ tokens/          ← color/typography/spacing reference stories
```

## Adding a new component

- [ ] **1.** Create `packages/ui/src/components/primitives/<component-name>.tsx` (kebab-case).
- [ ] **2.** Follow the [component template](#component-template) below.
- [ ] **3.** Export it from `packages/ui/src/index.ts`.
- [ ] **4.** Create `apps/storybook/stories/primitives/<ComponentName>.stories.tsx`.
- [ ] **5.** Add the component to [docs/components.md](./docs/components.md) — that's the **only** file where the component catalog lives. Templates link to it.
- [ ] **6.** Verify: `pnpm lint && pnpm build && pnpm --filter @vikingo/storybook run build-storybook`.
- [ ] **7.** If the component introduces a *new* common pattern (form composition, dialog flow, etc.), add it to [docs/patterns.md](./docs/patterns.md).

## Component template

```tsx
import type * as React from 'react'
import { cn } from '../../utils/cn'

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
export function Example({
  variant = 'primary',
  label = 'Alapértelmezett',
  className,
  ref,
  ...props
}: ExampleProps & { ref?: React.Ref<HTMLDivElement> }) {
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
}
```

> **React 19 ref-as-prop.** Do not use `React.forwardRef` for new components — React 19 treats `ref` as a regular prop on function components. Named function declarations get an automatic `displayName` from the function name, so no explicit `.displayName = '…'` assignment is needed either.

### Rules

| Rule | Why |
|---|---|
| Plain function component + `ref` prop | React 19 native ref-as-prop |
| Always use `cn()` for classNames | Enables prop-level className overrides |
| CSS custom properties only | No hardcoded colors, radius, shadows, or durations |
| Motion via `var(--duration-*)` + `var(--ease-*)` | Keeps timing tokens consistent; respects `prefers-reduced-motion` globally |
| User-visible strings as props | Hungarian defaults, consumer can override |
| JSDoc on the component + non-obvious props | Powers Storybook autodocs |
| Public, exported types — no `any` | Catches misuse at compile time |

### Tokens

Never hardcode visual values. The full token list lives in [packages/ui/src/styles/tokens.css](./packages/ui/src/styles/tokens.css); see [docs/styling.md](./docs/styling.md) for the consumer-facing reference.

## Comments & JSDoc — what to write, what to skip

The default is **no comments**. Only add a comment when:

- The *why* is non-obvious (a hidden constraint, a workaround, an accessibility requirement, a subtle invariant).
- A reader would otherwise misread the code.
- The behavior would surprise someone in a future read-through.

**Don't** write comments that:

- Restate what well-named code already says (`// state for the dialog` over `const [open, setOpen] = useState(false)`).
- Reference the current commit, PR number, ticket, or "added in v0.5". That belongs in the commit message and rots in code.
- Explain a TODO without an issue link. If it's worth a TODO, file an issue.

### JSDoc

JSDoc is required on every **exported** symbol from `@vikingo/ui` (component, hook, utility, type alias):

- One sentence describing what it does. Skip the boilerplate — assume the reader knows React.
- For props that aren't obvious from the type, a short `/** ... */` line on the prop.
- An `@example` block when the component has 3+ props or a non-trivial composition.

### Story descriptions

Each story can set `parameters.docs.description.story` — write **one sentence about why this variant exists**, not what it contains:

```tsx
// ✅ describes the purpose
parameters: { docs: { description: { story: 'Use when the action is destructive — red accent draws attention.' } } }

// ❌ describes the markup
parameters: { docs: { description: { story: 'A button with variant="destructive".' } } }
```

### Template MD files

Every file in `templates/<platform>/CLAUDE.md` and the canonical docs in `docs/*.md` must start with:

```md
> **Audience:** who this file is for.
> **Use:** what someone reading it should do or learn.
```

This makes the entry point of the file unmistakable for both human readers and AI agents.

## Story template

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

export const Secondary: Story = {
  name: 'Secondary · Másodlagos',
  args: { variant: 'secondary' },
}
```

### Rules

- Story names use bilingual format: `'English · Magyar'`.
- `tags: ['autodocs']` must always be present.
- Use `args:` for static stories, `render:` for stateful/interactive ones.
- Minimum: a `Default` story + one story per major variant or interactive state.

## Pre-commit hook

[husky](https://github.com/typicode/husky) + [lint-staged](https://github.com/lint-staged/lint-staged) runs automatically on every commit.

1. Runs `biome lint --diagnostic-level=error` on staged `.ts/.tsx` files in `packages/ui/src/` and `apps/storybook/stories/`.
2. Runs `biome format --write` on staged `.ts/.tsx/.js/.json` files.

If a commit is blocked: fix the reported errors, `git add` the fix, then commit again. The hook auto-fixes formatting only.

## Maintaining platform templates

Each `templates/<platform>/CLAUDE.md` is the AI agent rules for a platform. Each is **deliberately thin**: it adds platform-specific setup (commands, framework gotchas) and links to the canonical docs in `/docs` for everything else (component catalog, styling rules, patterns). When you add a component, you only need to update [docs/components.md](./docs/components.md) — templates pick up the change automatically through their links.

To add a new platform:

1. Create `templates/<platform>/CLAUDE.md` and `templates/<platform>/README.md` following the existing structure.
2. Add it to the table in [templates/README.md](./templates/README.md).
3. Add it to the table at the top of [README.md](./README.md).

## Releasing

1. Bump `version` in `packages/ui/package.json`.
2. Add a section to [CHANGELOG.md](./CHANGELOG.md) describing the change.
3. Commit: `git commit -m "chore: bump to vX.Y.Z"`.
4. Tag: `git tag vX.Y.Z && git push && git push --tags`.

Vercel picks up the new tag and redeploys Storybook automatically.
