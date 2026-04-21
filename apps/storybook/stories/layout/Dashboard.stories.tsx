import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import {
  LayoutDashboard,
  CreditCard,
  Megaphone,
  Music2,
  Settings,
  HelpCircle,
  Bell,
  Users,
} from 'lucide-react'
import {
  Sidebar,
  Topbar,
  PageLayout,
  PageContent,
  StatCard,
  ChartCard,
  MetricRow,
  PageHeader,
  PeriodFilter,
  AreaChart,
  MultiBarChart,
  Badge,
  Button,
  Avatar,
  AvatarFallback,
  Logo,
  Card,
  CardContent,
  formatFt,
  formatSzam,
  formatSzazalek,
} from '@vikingo/ui'

const hu = formatSzam
const huf = formatFt
const pct = (n: number) => formatSzazalek(n, 2)

function generateDates(days: number, endDateStr = '2026-03-06'): string[] {
  const end = new Date(endDateStr)
  return Array.from({ length: days }, (_, i) => {
    const d = new Date(end)
    d.setDate(d.getDate() - (days - 1 - i))
    return d.toISOString().slice(0, 10)
  })
}

const mrrDates = generateDates(30)
const mrrData = mrrDates.map((x, i) => ({
  x,
  y: 5_800_000 + Math.round(Math.sin(i * 0.3) * 80_000 + (i < 15 ? -20_000 : 20_000)),
}))

const elofizetokDates = generateDates(30)
const elofizetokData = elofizetokDates.map((x, i) => ({
  x,
  y: 1_650 + Math.round(Math.sin(i * 0.4) * 30 + i * 2.4),
}))

const adDates = generateDates(30)
const adSpendData = adDates.map((x, i) => ({
  x,
  facebook: Math.max(
    0,
    Math.round(
      80_000 +
        (i >= 10 && i <= 20 ? (i - 10) * 16_000 : i > 20 ? (30 - i) * 11_000 : 0) +
        (i % 3) * 15_000,
    ),
  ),
  tiktok: Math.max(0, Math.round(3_000 + (i % 5) * 2_000)),
}))

const navSections = [
  {
    label: 'Navigáció',
    items: [
      {
        label: 'Összesítő',
        href: '#',
        icon: <LayoutDashboard className="h-4 w-4" />,
        active: true,
      },
      { label: 'Előfizetések', href: '#', icon: <CreditCard className="h-4 w-4" /> },
      { label: 'Facebook Ads', href: '#', icon: <Megaphone className="h-4 w-4" />, badge: 3 },
      { label: 'TikTok Ads', href: '#', icon: <Music2 className="h-4 w-4" /> },
    ],
  },
  {
    label: 'Egyéb',
    items: [
      { label: 'Értesítések', href: '#', icon: <Bell className="h-4 w-4" />, badge: 5 },
      { label: 'Beállítások', href: '#', icon: <Settings className="h-4 w-4" /> },
      { label: 'Súgó', href: '#', icon: <HelpCircle className="h-4 w-4" /> },
    ],
  },
]

const periodOptions = [
  { label: 'Ez a hónap', value: 'this-month' },
  { label: 'Előző hónap', value: 'last-month' },
  { label: '2026', value: '2026' },
  { label: '30 nap', value: '30d' },
  { label: '90 nap', value: '90d' },
  { label: 'Teljes időszak', value: 'all' },
]

function AnalyticsDashboard() {
  const [collapsed, setCollapsed] = useState(false)
  const [period, setPeriod] = useState('30d')

  return (
    <PageLayout
      sidebar={
        <Sidebar
          logo={<Logo variant="white" name="Fegyvertár" size="md" />}
          logoCollapsed={<Logo variant="white" iconOnly size="sm" />}
          sections={navSections}
          collapsed={collapsed}
          onCollapsedChange={setCollapsed}
          footer={
            !collapsed ? (
              <div className="flex items-center gap-2 px-1">
                <Avatar size="sm">
                  <AvatarFallback>NB</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-[var(--sidebar-text)] truncate">
                    Nagy Bence
                  </p>
                  <p className="text-[10px] font-mono text-[var(--sidebar-text-muted)] truncate">
                    admin
                  </p>
                </div>
              </div>
            ) : (
              <Avatar size="sm">
                <AvatarFallback>NB</AvatarFallback>
              </Avatar>
            )
          }
        />
      }
      topbar={
        <Topbar
          left={null}
          right={
            <div className="flex items-center gap-2">
              <Button variant="secondary" size="icon-sm">
                <Bell className="h-4 w-4" />
              </Button>
              <Avatar size="sm">
                <AvatarFallback>NB</AvatarFallback>
              </Avatar>
            </div>
          }
        />
      }
    >
      <PageContent>
        <PageHeader
          title="Összesítő"
          description="Összes forrás · 30 nap"
          periodFilter={
            <PeriodFilter options={periodOptions} value={period} onChange={setPeriod} />
          }
          lastUpdated="12:36:14"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-6">
          <StatCard
            label="MRR"
            value={huf(5827289)}
            sublabel={`ARPU: ${huf(3386)}`}
            trend={0.3}
            trendLabel="30 nap"
            tooltip="Havi ismétlődő bevétel (Monthly Recurring Revenue)"
          />
          <StatCard
            label="Aktív előfizetők"
            value={hu(1721)}
            sublabel={`${hu(1608)} havi · 113 éves`}
            trend={-1.1}
            trendLabel="30 nap"
            tooltip="Aktív fizetős felhasználók száma"
          />
          <StatCard
            label="Összes Ad Spend"
            value={huf(2728506)}
            sublabel={`FB: ${huf(2662120)} · TT: ${huf(66386)}`}
            tooltip="Összes hirdetési kiadás az időszakban"
          />
          <StatCard
            label="CAC"
            value={huf(20515)}
            sublabel={`133 új vásárló · 30 nap`}
            tooltip="Ügyfélszerzési költség (Customer Acquisition Cost)"
          />
          <StatCard
            label="ROAS"
            value="0,17x"
            sublabel={`Churn: ${pct(7.9)}`}
            tooltip="Hirdetési megtérülés (Return on Ad Spend)"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          <ChartCard
            title="MRR trend – 30 nap"
            description="Havi ismétlődő bevétel"
            value={huf(5827289)}
            chartMinHeight={230}
          >
            <AreaChart
              data={mrrData}
              color="#FF544D"
              valueFormatter={huf}
              seriesLabel="MRR"
              height={210}
            />
          </ChartCard>

          <ChartCard
            title="Előfizetők – 30 nap"
            description="Aktív + trial felhasználók"
            value={hu(1721)}
            chartMinHeight={230}
          >
            <AreaChart
              data={elofizetokData}
              color="#7C3AED"
              valueFormatter={hu}
              seriesLabel="Előfizetők"
              height={210}
            />
          </ChartCard>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          <ChartCard
            title="Napi hirdetési költés"
            description="Facebook vs TikTok (HUF)"
            value={huf(2728506)}
            chartMinHeight={250}
          >
            <MultiBarChart
              data={adSpendData}
              xAxisKey="x"
              bars={[
                { dataKey: 'facebook', color: '#7C3AED', label: 'Facebook' },
                { dataKey: 'tiktok', color: '#FF544D', label: 'TikTok' },
              ]}
              valueFormatter={huf}
              height={230}
            />
          </ChartCard>

          <Card>
            <CardContent className="pt-6">
              <h3 className="font-display font-semibold text-base text-[var(--color-text)] mb-1">
                Összefoglaló – 30 nap
              </h3>
              <MetricRow
                color="var(--color-accent)"
                label="Új előfizetők"
                sublabel="Trial → Aktív: 49"
                value={133}
              />
              <MetricRow
                color="var(--color-error)"
                label="Lemondások"
                sublabel={`Churn rate: ${pct(7.9)}`}
                value={275}
              />
              <MetricRow
                color="#5B21B6"
                label="FB konverziók"
                sublabel={`Spend: ${huf(2662120)} · CAC: ${huf(35028)}`}
                value={76}
              />
              <MetricRow
                color="#F59E0B"
                label="TikTok konverziók"
                sublabel={`Spend: ${huf(66386)} · CAC: ${huf(221)}`}
                value={300}
              />
              <MetricRow
                color="var(--color-success)"
                label="Circle.so tagok"
                sublabel="Új tagok / 30 nap: +366"
                value={hu(1980)}
              />
            </CardContent>
          </Card>
        </div>
      </PageContent>
    </PageLayout>
  )
}

const meta: Meta = {
  title: 'Layout/Analytics Dashboard',
  component: AnalyticsDashboard,
  parameters: {
    layout: 'fullscreen',
    docs: { source: { type: 'code' } },
  },
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj

export const Default: Story = {
  name: 'Analytics Dashboard · Elemzési vezérlőpult',
  render: () => <AnalyticsDashboard />,
  parameters: {
    docs: {
      source: {
        code: `import { useState } from 'react'
import {
  PageLayout, PageContent, Sidebar, Topbar, Logo,
  StatCard, ChartCard, MetricRow, PageHeader, PeriodFilter,
  AreaChart, MultiBarChart,
  Avatar, AvatarFallback, Button,
  formatFt, formatSzam,
} from '@vikingo/ui'

export function AnalyticsDashboard() {
  const [collapsed, setCollapsed] = useState(false)
  const [period, setPeriod] = useState('30d')

  return (
    <PageLayout
      sidebar={
        <Sidebar
          logo={<Logo variant="white" name="Fegyvertár" size="md" />}
          sections={navSections}
          collapsed={collapsed}
          onCollapsedChange={setCollapsed}
        />
      }
      topbar={<Topbar right={<Avatar size="sm"><AvatarFallback>NB</AvatarFallback></Avatar>} />}
    >
      <PageContent>
        <PageHeader
          title="Összesítő"
          description="Összes forrás · 30 nap"
          periodFilter={<PeriodFilter options={periodOptions} value={period} onChange={setPeriod} />}
          lastUpdated="12:36:14"
        />
        {/* KPI kártyák, grafikonok... */}
      </PageContent>
    </PageLayout>
  )
}`,
      },
    },
  },
}
