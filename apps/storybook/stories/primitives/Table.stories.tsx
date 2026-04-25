import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { MoreHorizontal, TrendingUp, TrendingDown } from 'lucide-react'
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Badge,
  Button,
  Checkbox,
  Avatar,
  AvatarFallback,
} from '@vikingo/ui'
import { formatFt, formatSzam } from '@vikingo/ui'

const meta: Meta = {
  title: 'Data/Table',
  parameters: { layout: 'padded', docs: { source: { type: 'code' } } },
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj

const campaigns = [
  {
    id: '1',
    name: 'Nyári akció 2025',
    platform: 'Facebook Ads',
    status: 'active',
    spend: 284500,
    conversions: 142,
    roas: 4.2,
  },
  {
    id: '2',
    name: 'Google Brand',
    platform: 'Google Ads',
    status: 'active',
    spend: 156200,
    conversions: 98,
    roas: 6.1,
  },
  {
    id: '3',
    name: 'Instagram Retargeting',
    platform: 'Instagram Ads',
    status: 'paused',
    spend: 78400,
    conversions: 31,
    roas: 2.8,
  },
  {
    id: '4',
    name: 'TikTok Awareness',
    platform: 'TikTok Ads',
    status: 'active',
    spend: 92300,
    conversions: 67,
    roas: 3.5,
  },
  {
    id: '5',
    name: 'Bing Remarketing',
    platform: 'Microsoft Ads',
    status: 'ended',
    spend: 34100,
    conversions: 22,
    roas: 1.9,
  },
]

const statusConfig = {
  active: { label: 'Aktív', variant: 'success' as const },
  paused: { label: 'Szüneteltetve', variant: 'warning' as const },
  ended: { label: 'Befejezett', variant: 'default' as const },
}

const platformInitials: Record<string, string> = {
  'Facebook Ads': 'FB',
  'Google Ads': 'GG',
  'Instagram Ads': 'IG',
  'TikTok Ads': 'TT',
  'Microsoft Ads': 'MS',
}

export const CampaignTable: Story = {
  name: 'Campaign Table · Kampánytáblázat',
  render: () => {
    const [selected, setSelected] = useState<string[]>([])
    const [sort, setSort] = useState<{ key: string; dir: 'asc' | 'desc' }>({
      key: 'spend',
      dir: 'desc',
    })

    const allChecked = selected.length === campaigns.length
    const someChecked = selected.length > 0 && !allChecked

    function toggleSort(key: string) {
      setSort((prev) =>
        prev.key === key ? { key, dir: prev.dir === 'asc' ? 'desc' : 'asc' } : { key, dir: 'desc' },
      )
    }

    const sorted = [...campaigns].sort((a, b) => {
      const v = sort.dir === 'asc' ? 1 : -1
      const ak = a[sort.key as keyof typeof a]
      const bk = b[sort.key as keyof typeof b]
      return ak > bk ? v : -v
    })

    return (
      <div className="bg-[var(--color-bg)] p-4">
        <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] overflow-hidden bg-[var(--color-surface)]">
          {selected.length > 0 && (
            <div className="flex items-center gap-3 px-4 py-2 bg-[var(--color-accent-muted)] border-b border-[var(--color-border)]">
              <span className="text-sm font-medium text-[var(--color-accent)]">
                {selected.length} kijelölve
              </span>
              <Button variant="ghost" size="sm">
                Szüneteltetés
              </Button>
              <Button variant="destructive" size="sm">
                Törlés
              </Button>
            </div>
          )}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10">
                  <Checkbox
                    checked={allChecked}
                    indeterminate={someChecked}
                    onCheckedChange={() =>
                      setSelected(allChecked ? [] : campaigns.map((c) => c.id))
                    }
                  />
                </TableHead>
                <TableHead>Kampány</TableHead>
                <TableHead>Státusz</TableHead>
                <TableHead
                  sortable
                  sorted={sort.key === 'spend' ? sort.dir : false}
                  onClick={() => toggleSort('spend')}
                >
                  Büdzsé
                </TableHead>
                <TableHead
                  sortable
                  sorted={sort.key === 'conversions' ? sort.dir : false}
                  onClick={() => toggleSort('conversions')}
                >
                  Konverzió
                </TableHead>
                <TableHead
                  sortable
                  sorted={sort.key === 'roas' ? sort.dir : false}
                  onClick={() => toggleSort('roas')}
                >
                  ROAS
                </TableHead>
                <TableHead className="w-10"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sorted.map((row) => {
                const status = statusConfig[row.status as keyof typeof statusConfig]
                const isSelected = selected.includes(row.id)
                return (
                  <TableRow key={row.id} data-state={isSelected ? 'selected' : undefined}>
                    <TableCell>
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={() =>
                          setSelected((prev) =>
                            prev.includes(row.id)
                              ? prev.filter((id) => id !== row.id)
                              : [...prev, row.id],
                          )
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2.5">
                        <Avatar size="sm">
                          <AvatarFallback>{platformInitials[row.platform]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-[var(--color-text)]">{row.name}</p>
                          <p className="text-xs text-[var(--color-text-muted)]">{row.platform}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={status.variant} dot>
                        {status.label}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-mono">{formatFt(row.spend)}</TableCell>
                    <TableCell className="font-mono">{formatSzam(row.conversions)}</TableCell>
                    <TableCell>
                      <div
                        className={[
                          'flex items-center gap-1 font-mono text-sm',
                          row.roas >= 4
                            ? 'text-[var(--color-success)]'
                            : row.roas >= 2.5
                              ? 'text-[var(--color-warning)]'
                              : 'text-[var(--color-error)]',
                        ].join(' ')}
                      >
                        {row.roas >= 3 ? (
                          <TrendingUp className="h-3.5 w-3.5" />
                        ) : (
                          <TrendingDown className="h-3.5 w-3.5" />
                        )}
                        {row.roas.toFixed(1)}x
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon-sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    )
  },
}

export const Simple: Story = {
  name: 'Simple · Egyszerű',
  render: () => (
    <div className="bg-[var(--color-bg)] p-4">
      <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] overflow-hidden bg-[var(--color-surface)]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Metrika</TableHead>
              <TableHead>Ez a hónap</TableHead>
              <TableHead>Múlt hónap</TableHead>
              <TableHead>Változás</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[
              {
                name: 'Bevétel',
                current: '1 284 500 Ft',
                prev: '1 102 300 Ft',
                change: '+16.5%',
                up: true,
              },
              {
                name: 'Kattintások',
                current: '48 291',
                prev: '41 880',
                change: '+15.3%',
                up: true,
              },
              { name: 'Konverzió', current: '3.8%', prev: '4.2%', change: '-0.4%', up: false },
              { name: 'ROAS', current: '4.2x', prev: '3.9x', change: '+7.7%', up: true },
            ].map((row) => (
              <TableRow key={row.name}>
                <TableCell className="font-medium">{row.name}</TableCell>
                <TableCell className="font-mono">{row.current}</TableCell>
                <TableCell className="font-mono text-[var(--color-text-muted)]">
                  {row.prev}
                </TableCell>
                <TableCell
                  className={[
                    'font-mono font-medium',
                    row.up ? 'text-[var(--color-success)]' : 'text-[var(--color-error)]',
                  ].join(' ')}
                >
                  {row.change}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  ),
}
