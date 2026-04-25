'use client'

import {
  Bar,
  CartesianGrid,
  Legend,
  BarChart as RechartsBarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { cn } from '../../utils/cn'
import { formatAxisY, formatDatumRovid } from './chart-utils'

export interface BarConfig {
  dataKey: string
  color: string
  label: string
}

export interface MultiBarChartProps {
  data: Record<string, string | number>[]
  bars: BarConfig[]
  xAxisKey?: string
  /** Tooltip értékformázás (pl. formatFt) */
  valueFormatter?: (value: number) => string
  /** Y-tengely kompakt formázás. Ha nincs megadva, formatAxisY-t használ. */
  yAxisFormatter?: (value: number) => string
  height?: number
  className?: string
}

function MultiBarChart({
  data,
  bars,
  xAxisKey = 'x',
  valueFormatter = formatAxisY,
  yAxisFormatter,
  height = 200,
  className,
}: MultiBarChartProps) {
  const tickFormatter = yAxisFormatter ?? formatAxisY
  const chartData = data.map((d) => ({
    ...d,
    xLabel: formatDatumRovid(String(d[xAxisKey])),
  }))

  return (
    <div className={cn('w-full', className)} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart
          data={chartData}
          margin={{ top: 4, right: 4, left: 0, bottom: 0 }}
          barCategoryGap="35%"
          barGap={2}
        >
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
              const entry = payload[0]?.payload as { xLabel?: string }
              const date = entry?.xLabel ?? ''
              return (
                <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-md)] shadow-[var(--shadow-md)] px-3 py-2.5 text-xs min-w-[140px]">
                  <p className="font-mono text-[var(--color-text-muted)] mb-2">{date}</p>
                  <div className="flex flex-col gap-1.5">
                    {payload.map((p, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <span
                          className="h-2 w-2 rounded-full shrink-0"
                          style={{ backgroundColor: String(p.fill) }}
                        />
                        <span className="text-[var(--color-text-muted)]">{p.name}:</span>
                        <span className="font-mono font-semibold text-[var(--color-text)] ml-auto pl-2">
                          {valueFormatter(Number(p.value ?? 0))}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )
            }}
            cursor={{ fill: 'var(--color-border)', fillOpacity: 0.4 }}
          />
          <Legend
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ fontSize: 11, fontFamily: 'var(--font-mono)', paddingTop: 8 }}
            formatter={(value) => <span style={{ color: 'var(--color-text-muted)' }}>{value}</span>}
          />
          {bars.map((bar) => (
            <Bar
              key={bar.dataKey}
              dataKey={bar.dataKey}
              name={bar.label}
              fill={bar.color}
              radius={[2, 2, 0, 0]}
            />
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  )
}

export { MultiBarChart }
