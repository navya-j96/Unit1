import { useState, useEffect } from 'react'

export interface DashboardFilters {
  timeRange: { start: string; end: string }
  unit: 'daily' | 'weekly' | 'monthly'
  cloudAccount: string[]
  projectTag: string[]
}

const DEFAULT_FILTERS: DashboardFilters = {
  timeRange: {
    start: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0]
  },
  unit: 'daily',
  cloudAccount: [],
  projectTag: []
}

export function useFilters(storageKey: string = 'finops-filters') {
  const [filters, setFilters] = useState<DashboardFilters>(() => {
    const saved = localStorage.getItem(storageKey)
    return saved ? JSON.parse(saved) : DEFAULT_FILTERS
  })

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(filters))
  }, [filters, storageKey])

  const updateFilters = (updates: Partial<DashboardFilters>) => {
    setFilters(prev => ({ ...prev, ...updates }))
  }

  const resetFilters = () => {
    setFilters(DEFAULT_FILTERS)
  }

  return { filters, updateFilters, resetFilters }
}