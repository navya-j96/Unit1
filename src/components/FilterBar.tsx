import React from 'react'
import { Calendar, Filter, RefreshCw } from 'lucide-react'
import { DashboardFilters } from '../hooks/useFilters'

interface FilterBarProps {
  filters: DashboardFilters
  onFiltersChange: (filters: Partial<DashboardFilters>) => void
  onReset: () => void
  lastUpdated: Date | null
  onRefresh: () => void
}

export default function FilterBar({ 
  filters, 
  onFiltersChange, 
  onReset, 
  lastUpdated,
  onRefresh 
}: FilterBarProps) {
  const formatLastUpdated = () => {
    if (!lastUpdated) return 'Never'
    const seconds = Math.floor((Date.now() - lastUpdated.getTime()) / 1000)
    if (seconds < 60) return `${seconds}s ago`
    const minutes = Math.floor(seconds / 60)
    if (minutes < 60) return `${minutes}m ago`
    const hours = Math.floor(minutes / 60)
    return `${hours}h ago`
  }

  return (
    <div className="lmnt-theme-surface-bg rounded-lg p-4 border lmnt-theme-divider-primary mb-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 lmnt-theme-on-surface-variant" />
            <select
              value={filters.unit}
              onChange={(e) => onFiltersChange({ unit: e.target.value as any })}
              className="px-3 py-1.5 rounded-lg lmnt-theme-surface-variant-bg lmnt-theme-on-surface border lmnt-theme-divider-primary focus:outline-none focus:ring-2 focus:ring-bayer-primary-400"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="date"
              value={filters.timeRange.start}
              onChange={(e) => onFiltersChange({ 
                timeRange: { ...filters.timeRange, start: e.target.value }
              })}
              className="px-3 py-1.5 rounded-lg lmnt-theme-surface-variant-bg lmnt-theme-on-surface border lmnt-theme-divider-primary focus:outline-none focus:ring-2 focus:ring-bayer-primary-400"
            />
            <span className="lmnt-theme-on-surface-variant">to</span>
            <input
              type="date"
              value={filters.timeRange.end}
              onChange={(e) => onFiltersChange({ 
                timeRange: { ...filters.timeRange, end: e.target.value }
              })}
              className="px-3 py-1.5 rounded-lg lmnt-theme-surface-variant-bg lmnt-theme-on-surface border lmnt-theme-divider-primary focus:outline-none focus:ring-2 focus:ring-bayer-primary-400"
            />
          </div>

          <button
            onClick={onReset}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg lmnt-theme-surface-variant-bg lmnt-theme-on-surface hover:opacity-80 transition-opacity"
          >
            <Filter className="w-4 h-4" />
            <span className="text-sm">Reset</span>
          </button>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm lmnt-theme-on-surface-variant">
            Last updated: {formatLastUpdated()}
          </span>
          <button
            onClick={onRefresh}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg lmnt-theme-secondary-bg lmnt-theme-on-secondary hover:opacity-90 transition-opacity"
          >
            <RefreshCw className="w-4 h-4" />
            <span className="text-sm">Refresh</span>
          </button>
        </div>
      </div>
    </div>
  )
}