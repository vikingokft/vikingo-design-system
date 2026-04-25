'use client'

import * as React from 'react'
import {
  Area,
  CartesianGrid,
  AreaChart as RechartsAreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { cn } from '../../utils/cn'
import { formatAxisY, formatDatumRovid } from './chart-utils'

export interface AreaChartDataPoint {
  x: string
  y: number
  [key: string]: string | number
}

export interface AreaChartProps {
  data: AreaChartDataPoint[]
  color?: string
  /** Tooltip értékformázás (pl. formatFt → "5.827.289 Ft") */
  valueFormatter?: (value: number) => string
  /** Y-tengely kompakt formázás (pl. formatAxisY → "5,8M"). Ha nincs megadva, valueFormatter-t használja. */
  yAxisFormatter?: (value: number) => string
  /** Tooltip sor neve, pl. "MRR" */
  seriesLabel?: string
  height?: number
  className?: string
}

function AreaChart({
  data,
  color = 'var(--color-accent)',
  valueFormatter = formatAxisY,
  yAxisFormatter,
  seriesLabel,
  height = 200,
  className,
}: AreaChartProps) {
  const gradientId = React.useId().replace(/:/g, 'g')
  const tickFormatter = yAxisFormatter ?? formatAxisY

  const chartData = data.map((d) => ({
    ...d,
    xLabel: formatDatumRovid(d.x),
  }))

  return (
    <div className={cn('w-full', className)} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsAreaChart data={chartData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.15} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="4 4" stroke="var(--color-border)" vertical={false} />
          <XAxis
            dataKey="xLabel"
            tick={{
              fontSize: 10,
              fill: 'var(--color-text-subtle)',
              fontFamily: 'var(--font-mono)',
            }}
            axisLine={false}
            tickLine={false}
            tickMargin={8}
            interval="preserveStartEnd"
          />
          <YAxis
            tickFormatter={tickFormatter}
            tick={{
              fontSize: 10,
              fill: 'var(--color-text-subtle)',
              fontFamily: 'var(--font-mono)',
            }}
            axisLine={false}
            tickLine={false}
            width={40}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (!active || !payload?.length) return null
              const val = (payload[0]?.value ?? 0) as number
              const entry = payload[0]?.payload as { xLabel?: string }
              const date = entry?.xLabel ?? ''
              return (
                <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-md)] shadow-[var(--shadow-md)] px-3 py-2.5 text-xs">
                  <p className="font-mono text-[var(--color-text-muted)] mb-2">{date}</p>
                  <div className="flex items-center gap-2">
                    <span
                      className="h-2 w-2 rounded-full shrink-0"
                      style={{ backgroundColor: color }}
                    />
                    {seriesLabel && (
                      <span className="text-[var(--color-text-muted)]">{seriesLabel}:</span>
                    )}
                    <span className="font-mono font-semibold text-[var(--color-text)]">
                      {valueFormatter(val)}
                    </span>
                  </div>
                </div>
              )
            }}
            cursor={{ stroke: 'var(--color-border-strong)', strokeWidth: 1 }}
          />
          <Area
            type="monotone"
            dataKey="y"
            stroke={color}
            strokeWidth={2}
            fill={`url(#${gradientId})`}
            dot={false}
            activeDot={{ r: 4, fill: color, strokeWidth: 2, stroke: 'var(--color-surface)' }}
          />
        </RechartsAreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export { AreaChart }
