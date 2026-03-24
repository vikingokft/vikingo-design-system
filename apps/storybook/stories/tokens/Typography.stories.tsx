import type { Meta, StoryObj } from '@storybook/react'

const fonts = [
  {
    name: 'Clash Display',
    role: 'Headings',
    cssVar: '--font-display',
    twClass: 'font-display',
    source: 'Self-hosted (Indian Type Foundry)',
    url: 'https://www.fontshare.com/fonts/clash-display',
    license: 'Fontshare — free for personal & commercial use',
    weights: '500 Medium · 600 Semibold · 700 Bold (Variable)',
  },
  {
    name: 'DM Sans',
    role: 'Body / UI',
    cssVar: '--font-body',
    twClass: 'font-body',
    source: 'Google Fonts',
    url: 'https://fonts.google.com/specimen/DM+Sans',
    license: 'Open Font License (OFL)',
    weights: '400 Regular · 500 Medium · 600 Semibold · 700 Bold',
  },
  {
    name: 'DM Mono',
    role: 'Data / Code',
    cssVar: '--font-mono',
    twClass: 'font-mono',
    source: 'Google Fonts',
    url: 'https://fonts.google.com/specimen/DM+Mono',
    license: 'Open Font License (OFL)',
    weights: '400 Regular · 500 Medium',
  },
]

const TypographyShowcase = () => (
  <div className="p-8 bg-[var(--color-bg)] min-h-screen min-w-[800px] space-y-10">
    <h1 className="font-display font-semibold text-2xl text-[var(--color-text)]">
      Typography · Tipográfia
    </h1>

    {/* ── Font Reference ──────────────────────────────────────────── */}
    <section>
      <p className="text-xs font-mono text-[var(--color-text-muted)] uppercase tracking-widest mb-4">
        Font Stack · Betűtípusok
      </p>
      <div className="grid gap-3">
        {fonts.map((f) => (
          <div
            key={f.name}
            className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5"
          >
            <div className="flex items-baseline justify-between gap-4 mb-2">
              <h3 className={`${f.twClass} font-semibold text-lg text-[var(--color-text)]`}>
                {f.name}
              </h3>
              <span className="shrink-0 rounded-[var(--radius-full)] bg-[var(--color-accent)]/10 px-2.5 py-0.5 text-xs font-mono text-[var(--color-accent)]">
                {f.role}
              </span>
            </div>
            <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
              <span className="text-[var(--color-text-subtle)]">CSS var</span>
              <code className="font-mono text-[var(--color-text-muted)]">{f.cssVar}</code>
              <span className="text-[var(--color-text-subtle)]">Tailwind</span>
              <code className="font-mono text-[var(--color-text-muted)]">{f.twClass}</code>
              <span className="text-[var(--color-text-subtle)]">Weights</span>
              <span className="text-[var(--color-text-muted)]">{f.weights}</span>
              <span className="text-[var(--color-text-subtle)]">License</span>
              <span className="text-[var(--color-text-muted)]">{f.license}</span>
              <span className="text-[var(--color-text-subtle)]">Source</span>
              <a
                href={f.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-accent)] hover:underline"
              >
                {f.source} ↗
              </a>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-3 text-xs text-[var(--color-text-subtle)]">
        Clash Display is self-hosted (woff2) inside <code className="font-mono">@vikingo/ui</code> —
        no extra setup needed. DM Sans & DM Mono are loaded from Google Fonts CDN, or can be
        optimized with <code className="font-mono">next/font/google</code>.
      </p>
    </section>

    {/* ── Heading Scale ────────────────────────────────────────────── */}
    <section>
      <p className="text-xs font-mono text-[var(--color-text-muted)] uppercase tracking-widest mb-4">
        Clash Display – Headings (font-display)
      </p>
      <div className="space-y-4">
        <div>
          <h1 className="font-display font-semibold text-5xl text-[var(--color-text)]">
            H1 – Heading One
          </h1>
          <p className="text-xs font-mono text-[var(--color-text-subtle)] mt-1">
            Clash Display / Semibold 600 / 48px
          </p>
        </div>
        <div>
          <h2 className="font-display font-semibold text-4xl text-[var(--color-text)]">
            H2 – Heading Two
          </h2>
          <p className="text-xs font-mono text-[var(--color-text-subtle)] mt-1">
            Clash Display / Semibold 600 / 36px
          </p>
        </div>
        <div>
          <h3 className="font-display font-semibold text-3xl text-[var(--color-text)]">
            H3 – Heading Three
          </h3>
          <p className="text-xs font-mono text-[var(--color-text-subtle)] mt-1">
            Clash Display / Semibold 600 / 30px
          </p>
        </div>
        <div>
          <h4 className="font-display font-semibold text-2xl text-[var(--color-text)]">
            H4 – Heading Four
          </h4>
          <p className="text-xs font-mono text-[var(--color-text-subtle)] mt-1">
            Clash Display / Semibold 600 / 24px
          </p>
        </div>
      </div>
    </section>

    {/* ── Body ──────────────────────────────────────────────────────── */}
    <section>
      <p className="text-xs font-mono text-[var(--color-text-muted)] uppercase tracking-widest mb-4">
        DM Sans – Body (font-body)
      </p>
      <div className="space-y-3">
        <p className="font-body text-base text-[var(--color-text)]">
          Body – DM Sans Regular 16px. Az elsődleges szövegtípus minden UI elemhez, bekezdésekhez,
          labelekhez, gombok feliratához.
        </p>
        <p className="font-body text-sm text-[var(--color-text-muted)]">
          Small – DM Sans 14px, muted. Másodlagos szöveg, leírások, hintek.
        </p>
        <p className="font-body text-xs text-[var(--color-text-subtle)]">
          XSmall – DM Sans 12px, subtle. Meta adatok, timestamps.
        </p>
      </div>
    </section>

    {/* ── Mono ──────────────────────────────────────────────────────── */}
    <section>
      <p className="text-xs font-mono text-[var(--color-text-muted)] uppercase tracking-widest mb-4">
        DM Mono – Data & Code (font-mono)
      </p>
      <div className="space-y-3">
        <p className="font-mono text-sm text-[var(--color-text)]">
          DM Mono 14px – Adatok, badge-ek, kódok, KPI értékek megjelenítéséhez.
        </p>
        <p className="font-mono text-xs text-[var(--color-text-muted)]">
          123,456 · +12.4% · 2026-03-06 · #FF544D · api_key_xyz
        </p>
      </div>
    </section>
  </div>
)

const meta: Meta = {
  title: 'Tokens/Typography',
  component: TypographyShowcase,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj
export const Default: Story = {
  name: 'Typography · Tipográfia',
}
