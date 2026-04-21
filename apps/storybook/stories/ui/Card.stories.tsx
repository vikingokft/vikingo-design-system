import type { Meta, StoryObj } from '@storybook/react'
import { MoreHorizontal, TrendingUp } from 'lucide-react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Button,
  Badge,
} from '@vikingo/ui'

const meta: Meta = {
  title: 'Display/Card',
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj

export const Default: Story = {
  name: 'Default · Alapértelmezett',
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Nyári akció 2025</CardTitle>
        <CardDescription>Facebook + Instagram kampány</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-[var(--color-text-muted)]">
          A kampány 2025. június 1-jén indul és augusztus 31-ig fut.
        </p>
      </CardContent>
      <CardFooter className="justify-between">
        <Badge variant="success" dot>
          Aktív
        </Badge>
        <Button variant="ghost" size="icon-sm">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  ),
}

export const Hoverable: Story = {
  name: 'Hoverable · Kattintható',
  render: () => (
    <Card hover className="w-80">
      <CardHeader>
        <CardTitle>Kattintható kártya</CardTitle>
        <CardDescription>Hover-elve árnyék jelenik meg</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-[var(--color-text-muted)]">
          Vigyed rá az egeret a hover állapot megtekintéséhez.
        </p>
      </CardContent>
    </Card>
  ),
}

export const MetricCard: Story = {
  name: 'Metric Card · Mértékkártya',
  render: () => (
    <Card className="w-72">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-[var(--color-text-muted)]">
              Bevétel
            </p>
            <p className="mt-1 text-3xl font-display font-semibold text-[var(--color-text)]">
              €48,920
            </p>
          </div>
          <div className="flex items-center gap-1 text-[var(--color-success)] bg-[var(--color-success-muted)] px-2 py-1 rounded-[var(--radius-sm)]">
            <TrendingUp className="h-3.5 w-3.5" />
            <span className="text-xs font-mono font-medium">+12.4%</span>
          </div>
        </div>
        <p className="mt-3 text-xs text-[var(--color-text-muted)]">vs. előző év azonos időszaka</p>
      </CardContent>
    </Card>
  ),
}

export const CardGrid: Story = {
  name: 'Card Grid · Kártyarács',
  render: () => (
    <div className="grid grid-cols-2 gap-4 p-6 bg-[var(--color-bg)]">
      {[
        { title: 'Kampányok', value: '34', badge: 'Aktív', badgeVariant: 'success' as const },
        { title: 'Hirdetések', value: '1,248', badge: 'Futó', badgeVariant: 'accent' as const },
        { title: 'Konverzió', value: '3.8%', badge: 'Csökkent', badgeVariant: 'warning' as const },
        { title: 'Bevétel', value: '€48k', badge: 'Növekvő', badgeVariant: 'success' as const },
      ].map((item) => (
        <Card hover key={item.title} className="p-4">
          <p className="text-xs font-mono text-[var(--color-text-muted)] uppercase tracking-widest">
            {item.title}
          </p>
          <p className="mt-2 text-2xl font-display font-semibold text-[var(--color-text)]">
            {item.value}
          </p>
          <div className="mt-3">
            <Badge variant={item.badgeVariant} dot>
              {item.badge}
            </Badge>
          </div>
        </Card>
      ))}
    </div>
  ),
}
