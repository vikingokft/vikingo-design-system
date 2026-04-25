import type { Meta, StoryObj } from '@storybook/react'
import { BarChart2, Image, Megaphone, Settings } from 'lucide-react'
import { Tabs, TabsList, TabsTrigger, TabsContent, Badge } from '@vikingo/ui'

const meta: Meta = {
  title: 'Navigation/Tabs',
  parameters: { layout: 'centered', docs: { source: { type: 'code' } } },
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj

export const Default: Story = {
  name: 'Default · Alapértelmezett',
  render: () => (
    <div className="w-96 p-4 bg-[var(--color-bg)]">
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Áttekintő</TabsTrigger>
          <TabsTrigger value="analytics">Analitika</TabsTrigger>
          <TabsTrigger value="settings">Beállítások</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
            <p className="text-sm text-[var(--color-text-muted)]">Kampány áttekintő tartalma</p>
          </div>
        </TabsContent>
        <TabsContent value="analytics">
          <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
            <p className="text-sm text-[var(--color-text-muted)]">
              Analitikai adatok megjelenítése
            </p>
          </div>
        </TabsContent>
        <TabsContent value="settings">
          <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
            <p className="text-sm text-[var(--color-text-muted)]">Kampány beállítások</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  ),
}

export const Underline: Story = {
  name: 'Underline · Aláhúzásos',
  render: () => (
    <div className="w-96 p-4 bg-[var(--color-bg)]">
      <Tabs defaultValue="all">
        <TabsList variant="underline">
          <TabsTrigger value="all">Összes</TabsTrigger>
          <TabsTrigger value="active">Aktív</TabsTrigger>
          <TabsTrigger value="paused">Szüneteltetve</TabsTrigger>
          <TabsTrigger value="ended">Befejezett</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <p className="text-sm text-[var(--color-text-muted)] py-2">Összes kampány listája</p>
        </TabsContent>
        <TabsContent value="active">
          <p className="text-sm text-[var(--color-text-muted)] py-2">Jelenleg futó kampányok</p>
        </TabsContent>
        <TabsContent value="paused">
          <p className="text-sm text-[var(--color-text-muted)] py-2">Szüneteltetett kampányok</p>
        </TabsContent>
        <TabsContent value="ended">
          <p className="text-sm text-[var(--color-text-muted)] py-2">Lezárt kampányok</p>
        </TabsContent>
      </Tabs>
    </div>
  ),
}

export const WithIconsAndBadge: Story = {
  name: 'With Icons & Badge · Ikonokkal és badge-dzsel',
  render: () => (
    <div className="w-[480px] p-4 bg-[var(--color-bg)]">
      <Tabs defaultValue="campaigns">
        <TabsList>
          <TabsTrigger value="campaigns" className="gap-1.5">
            <Megaphone className="h-3.5 w-3.5" />
            Kampányok
            <Badge variant="accent" size="sm">
              12
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="ads" className="gap-1.5">
            <Image className="h-3.5 w-3.5" />
            Hirdetések
          </TabsTrigger>
          <TabsTrigger value="analytics" className="gap-1.5">
            <BarChart2 className="h-3.5 w-3.5" />
            Analitika
          </TabsTrigger>
          <TabsTrigger value="settings" className="gap-1.5">
            <Settings className="h-3.5 w-3.5" />
            Beállítások
          </TabsTrigger>
        </TabsList>
        <TabsContent value="campaigns">
          <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
            <p className="text-sm text-[var(--color-text-muted)]">12 aktív kampány</p>
          </div>
        </TabsContent>
        <TabsContent value="ads">
          <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
            <p className="text-sm text-[var(--color-text-muted)]">Hirdetéstár</p>
          </div>
        </TabsContent>
        <TabsContent value="analytics">
          <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
            <p className="text-sm text-[var(--color-text-muted)]">Teljesítmény adatok</p>
          </div>
        </TabsContent>
        <TabsContent value="settings">
          <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
            <p className="text-sm text-[var(--color-text-muted)]">Beállítások panel</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  ),
}
