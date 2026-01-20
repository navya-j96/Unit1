import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine } from 'recharts'

interface TimelineDataPoint {
  date: string
  actual: number
  forecast: number
  budget?: number
}

interface TimelineChartProps {
  data: TimelineDataPoint[]
  title: string
  showBudgetLine?: boolean
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="lmnt-theme-surface-bg border lmnt-theme-divider-primary rounded-lg p-3 shadow-lg">
        <p className="font-semibold lmnt-theme-on-surface mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center justify-between gap-4 text-sm">
            <span style={{ color: entry.color }}>{entry.name}:</span>
            <span className="font-medium lmnt-theme-on-surface">${entry.value.toLocaleString()}</span>
          </div>
        ))}
      </div>
    )
  }
  return null
}

export default function TimelineChart({ data, title, showBudgetLine = false }: TimelineChartProps) {
  const budgetValue = data[0]?.budget || 0

  return (
    <div className="lmnt-theme-surface-bg rounded-lg p-6 border lmnt-theme-divider-primary">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold lmnt-theme-on-surface">{title}</h3>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-0.5 bg-bayer-primary-400"></div>
            <span className="lmnt-theme-on-surface-variant">Actual</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-0.5 bg-bayer-secondary-500 border-dashed border-t-2"></div>
            <span className="lmnt-theme-on-surface-variant">Forecast</span>
          </div>
          {showBudgetLine && (
            <div className="flex items-center gap-2">
              <div className="w-3 h-0.5 bg-yellow-500"></div>
              <span className="lmnt-theme-on-surface-variant">Budget</span>
            </div>
          )}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            dataKey="date" 
            stroke="#6b7280"
            tick={{ fontSize: 12 }}
          />
          <YAxis 
            stroke="#6b7280"
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            wrapperStyle={{ paddingTop: '20px' }}
            iconType="line"
          />
          {showBudgetLine && (
            <ReferenceLine 
              y={budgetValue} 
              stroke="#ff9800" 
              strokeDasharray="3 3"
              label={{ value: 'Budget', position: 'right', fill: '#ff9800' }}
            />
          )}
          <Line 
            type="monotone" 
            dataKey="actual" 
            stroke="#de0043" 
            strokeWidth={3}
            dot={{ fill: '#de0043', r: 4 }}
            activeDot={{ r: 6 }}
            name="Actual Spend"
          />
          <Line 
            type="monotone" 
            dataKey="forecast" 
            stroke="#00bcff" 
            strokeWidth={3}
            strokeDasharray="5 5"
            dot={{ fill: '#00bcff', r: 4 }}
            activeDot={{ r: 6 }}
            name="Forecast"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}