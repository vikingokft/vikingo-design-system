'use client'

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart as RechartsLineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { cn } from '../../utils/cn'
import { formatAxisY, formatDatumRovid } from './chart-utils'

export interface LineConfig {
  dataKey: string
  color: string
  label: string
  /** Szaggatott vonal */
  dashed?: boolean
  /** Pontozott vonal */
  dotted?: boolean
  /** Melyik Y-tengelyen jelenjen meg */
  yAxisId?: 'left' | 'right'
}

export interface MultiLineChartProps {
  data: Record<string, string | number>[]
  lines: LineConfig[]
  xAxisKey?: string
  /** Bal oldali tooltip értékformázás */
  leftValueFormatter?: (value: number) => string
  /** Jobb oldali tooltip értékformázás (dual-axis) */
  rightValueFormatter?: (value: number) => string
  /** Bal Y-tengely kompakt formázás. Ha nincs megadva, formatAxisY-t használ. */
  leftYAxisFormatter?: (value: number) => string
  /** Jobb Y-tengely kompakt formázás. Ha nincs megadva, formatAxisY-t használ. */
  rightYAxisFormatter?: (value: number) => string
  height?: number
  className?: string
}

function MultiLineChart({
  data,
  lines,
  xAxisKey = 'x',
  leftValueFormatter = formatAxisY,
  rightValueFormatter = formatAxisY,
  leftYAxisFormatter,
  rightYAxisFormatter,
  height = 220,
  className,
}: MultiLineChartProps) {
  const leftTickFormatter = leftYAxisFormatter ?? formatAxisY
  const rightTickFormatter = rightYAxisFormatter ?? formatAxisY
  const chartData = data.map((d) => ({
    ...d,
    xLabel: formatDatumRovid(String(d[xAxisKey])),
  }))

  const hasDualAxis = lines.some((l) => l.yAxisId === 'right')

  function getStrokeDasharray(line: LineConfig): string | undefined {
    if (line.dotted) return '2 4'
    if (line.dashed) return '6 3'
    return undefined
  }

  return (
    <div className={cn('w-full', className)} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart
          data={chartData}
          margin={{ top: 4, right: hasDualAxis ? 44 : 4, left: 0, bottom: 0 }}
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
            yAxisId="left"
            orientation="left"
            tickFormatter={leftTickFormatter}
            tick={{
              fontSize: 10,
              fill: 'var(--color-text-subtle)',
              fontFamily: 'var(--font-mono)',
            }}
            axisLine={false}
            tickLine={false}
            width={40}
          />
          {hasDualAxis && (
            <YAxis
              yAxisId="right"
              orientation="right"
              tickFormatter={rightTickFormatter}
              tick={{
                fontSize: 10,
                fill: 'var(--color-text-subtle)',
                fontFamily: 'var(--font-mono)',
              }}
              axisLine={false}
              tickLine={false}
              width={40}
            />
          )}
          <Tooltip
            content={({ active, payload }) => {
              if (!active || !payload?.length) return null
              const entry = payload[0]?.payload as { xLabel?: string }
              const date = entry?.xLabel ?? ''
              return (
                <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-md)] shadow-[var(--shadow-md)] px-3 py-2.5 text-xs min-w-[160px]">
                  <p className="font-mono text-[var(--color-text-muted)] mb-2">{date}</p>
                  <div className="flex flex-col gap-1.5">
                    {payload.map((p, i) => {
                      const lineCfg = lines.find((l) => l.dataKey === p.dataKey)
                      const isRight = lineCfg?.yAxisId === 'right'
                      const formatted = isRight
                        ? rightValueFormatter(Number(p.value ?? 0))
                        : leftValueFormatter(Number(p.value ?? 0))
                      return (
                        <div key={i} className="flex items-center gap-2">
                          <span
                            className="h-2 w-2 rounded-full shrink-0"
                            style={{ backgroundColor: String(p.stroke) }}
                          />
                          <span className="text-[var(--color-text-muted)]">{p.name}:</span>
                          <span className="font-mono font-semibold text-[var(--color-text)] ml-auto pl-2">
                            {formatted}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            }}
            cursor={{ stroke: 'var(--color-border-strong)', strokeWidth: 1 }}
          />
          <Legend
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ fontSize: 11, fontFamily: 'var(--font-mono)', paddingTop: 8 }}
            formatter={(value) => <span style={{ color: 'var(--color-text-muted)' }}>{value}</span>}
          />
          {lines.map((line) => (
            <Line
              key={line.dataKey}
              yAxisId={line.yAxisId ?? 'left'}
              type="monotone"
              dataKey={line.dataKey}
              name={line.label}
              stroke={line.color}
              strokeWidth={2}
              strokeDasharray={getStrokeDasharray(line)}
              dot={false}
              activeDot={{ r: 4, fill: line.color, strokeWidth: 2, stroke: 'var(--color-surface)' }}
            />
          ))}
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  )
}

export { MultiLineChart }
