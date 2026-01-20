import React from 'react'
import { TrendingUp, TrendingDown, DollarSign, HelpCircle } from 'lucide-react'

interface SpendCardProps {
  title: string
  amount: number
  change: number
  changeLabel: string
  projection?: number
  projectionLabel?: string
  sparklineData?: number[]
  tooltip?: string
}

export default function SpendCard({ 
  title, 
  amount, 
  change, 
  changeLabel, 
  projection,
  projectionLabel,
  sparklineData = [65, 72, 68, 85, 92, 88, 95],
  tooltip
}: SpendCardProps) {
  const isPositive = change > 0
  const max = Math.max(...sparklineData)
  const min = Math.min(...sparklineData)
  const range = max - min

  return (
    <div className="lmnt-theme-surface-bg rounded-lg p-6 border lmnt-theme-divider-primary">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-sm lmnt-theme-on-surface-variant">{title}</span>
          {tooltip && (
            <button 
              className="group relative"
              title={tooltip}
            >
              <HelpCircle className="w-4 h-4 lmnt-theme-on-surface-variant" />
              <div className="hidden group-hover:block absolute left-0 top-6 w-64 p-3 lmnt-theme-surface-bg border lmnt-theme-divider-primary rounded-lg shadow-lg z-10">
                <p className="text-xs lmnt-theme-on-surface">{tooltip}</p>
              </div>
            </button>
          )}
        </div>
        <DollarSign className="w-5 h-5 lmnt-theme-primary" />
      </div>

      <div className="text-3xl font-bold lmnt-theme-on-surface mb-2">
        ${amount.toLocaleString()}
      </div>

      {/* Sparkline */}
      <div className="h-12 mb-3 flex items-end gap-0.5">
        {sparklineData.map((value, index) => {
          const height = ((value - min) / range) * 100
          return (
            <div
              key={index}
              className="flex-1 bg-bayer-primary-400 rounded-t opacity-70 hover:opacity-100 transition-opacity"
              style={{ height: `${height}%` }}
            />
          )
        })}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          {isPositive ? (
            <TrendingUp className="w-4 h-4 text-bayer-primary-400" />
          ) : (
            <TrendingDown className="w-4 h-4 text-bayer-secondary-500" />
          )}
          <span className={`text-sm font-medium ${isPositive ? 'text-bayer-primary-400' : 'text-bayer-secondary-500'}`}>
            {isPositive ? '+' : ''}{change}%
          </span>
          <span className="text-sm lmnt-theme-on-surface-variant">{changeLabel}</span>
        </div>

        {projection && (
          <div className="text-sm lmnt-theme-on-surface-variant">
            <span className="font-medium lmnt-theme-secondary">${projection.toLocaleString()}</span> {projectionLabel}
          </div>
        )}
      </div>
    </div>
  )
}