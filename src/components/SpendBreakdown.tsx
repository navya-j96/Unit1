import React from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts'

interface SpendItem {
  name: string
  value: number
  color: string
}

interface SpendBreakdownProps {
  data: SpendItem[]
  type?: 'donut' | 'bar'
  title: string
}

const COLORS = ['#de0043', '#00bcff', '#ff9800', '#4caf50', '#9c27b0', '#607d8b']

export default function SpendBreakdown({ data, type = 'donut', title }: SpendBreakdownProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0)

  return (
    <div className="lmnt-theme-surface-bg rounded-lg p-6 border lmnt-theme-divider-primary">
      <h3 className="text-lg font-semibold lmnt-theme-on-surface mb-4">{title}</h3>

      {type === 'donut' ? (
        <div className="flex items-center gap-6">
          <ResponsiveContainer width="50%" height={250}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color || COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => `$${value.toLocaleString()}`}
                contentStyle={{ 
                  backgroundColor: 'var(--lmnt-theme-surface)', 
                  border: '1px solid var(--lmnt-theme-divider-primary)',
                  borderRadius: '8px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>

          <div className="flex-1 space-y-3">
            {data.map((item, index) => {
              const percentage = ((item.value / total) * 100).toFixed(1)
              return (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color || COLORS[index % COLORS.length] }}
                    />
                    <span className="text-sm lmnt-theme-on-surface">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm lmnt-theme-on-surface-variant">{percentage}%</span>
                    <span className="text-sm font-medium lmnt-theme-on-surface">${item.value.toLocaleString()}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="name" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip 
              formatter={(value: number) => `$${value.toLocaleString()}`}
              contentStyle={{ 
                backgroundColor: 'var(--lmnt-theme-surface)', 
                border: '1px solid var(--lmnt-theme-divider-primary)',
                borderRadius: '8px'
              }}
            />
            <Bar dataKey="value">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color || COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}