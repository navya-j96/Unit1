import React from 'react'
import { DollarSign, TrendingUp, AlertTriangle, Users } from 'lucide-react'
import SpendCard from '../components/SpendCard'
import SpendBreakdown from '../components/SpendBreakdown'
import TimelineChart from '../components/TimelineChart'
import FilterBar from '../components/FilterBar'
import { usePolling } from '../hooks/usePolling'
import { useFilters } from '../hooks/useFilters'
import { api } from '../services/api'

interface GlobalDashboardProps {
  onSquadClick: (squadId: string) => void
}

const timelineData = [
  { date: 'Week 1', actual: 112000, forecast: 108000, budget: 120000 },
  { date: 'Week 2', actual: 118000, forecast: 115000, budget: 120000 },
  { date: 'Week 3', actual: 124800, forecast: 120000, budget: 120000 },
  { date: 'Week 4', actual: 145200, forecast: 126000, budget: 120000 }
]

const costCenterData = [
  { name: 'Platform-001', value: 145200, color: '#de0043' },
  { name: 'DataScience-001', value: 118000, color: '#00bcff' },
  { name: 'Mobile-001', value: 89400, color: '#ff9800' },
  { name: 'Infrastructure-001', value: 67300, color: '#4caf50' },
  { name: 'Shared Services', value: 45100, color: '#9c27b0' }
]

const serviceData = [
  { name: 'Compute (EC2, Lambda)', value: 185600, color: '#de0043' },
  { name: 'Storage (S3, EBS)', value: 124300, color: '#00bcff' },
  { name: 'Database (RDS, DynamoDB)', value: 98700, color: '#ff9800' },
  { name: 'Network & CDN', value: 52400, color: '#4caf50' },
  { name: 'ML & Analytics', value: 38000, color: '#9c27b0' }
]

export default function GlobalDashboard({ onSquadClick }: GlobalDashboardProps) {
  const { filters, updateFilters, resetFilters } = useFilters('global-dashboard-filters')
  
  const { data: squads, lastUpdated, refresh } = usePolling(
    () => api.getSquads(),
    30000
  )

  const { data: anomalies } = usePolling(
    () => api.getAnomalies(),
    30000
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold lmnt-theme-on-surface">Global Dashboard</h1>
        <p className="lmnt-theme-on-surface-variant mt-1">
          Consolidated spend across all squads and cloud accounts
        </p>
      </div>

      <FilterBar
        filters={filters}
        onFiltersChange={updateFilters}
        onReset={resetFilters}
        lastUpdated={lastUpdated}
        onRefresh={refresh}
      />

      <div className="grid grid-cols-4 gap-4">
        <SpendCard
          title="Total Spend (MTD)"
          amount={465000}
          change={12.3}
          changeLabel="vs last month"
          projection={510000}
          projectionLabel="projected"
          tooltip="Month-to-date spend across all squads and cloud accounts"
        />

        <SpendCard
          title="This Week"
          amount={145200}
          change={8.7}
          changeLabel="vs last week"
          sparklineData={[112, 118, 124, 145]}
          tooltip="Current week spending trend"
        />

        <div className="lmnt-theme-surface-bg rounded-lg p-6 border lmnt-theme-divider-primary">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm lmnt-theme-on-surface-variant">Active Squads</span>
            <Users className="w-5 h-5 lmnt-theme-secondary" />
          </div>
          <div className="text-3xl font-bold lmnt-theme-on-surface">{squads?.length || 4}</div>
          <div className="text-sm lmnt-theme-on-surface-variant mt-2">All reporting</div>
        </div>

        <div className="lmnt-theme-surface-bg rounded-lg p-6 border lmnt-theme-divider-primary">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm lmnt-theme-on-surface-variant">Open Anomalies</span>
            <AlertTriangle className="w-5 h-5 text-bayer-primary-400" />
          </div>
          <div className="text-3xl font-bold lmnt-theme-on-surface">
            {anomalies?.filter(a => a.status === 'open').length || 0}
          </div>
          <div className="text-sm text-bayer-primary-400 mt-2">Requires attention</div>
        </div>
      </div>

      <TimelineChart
        data={timelineData}
        title="Consolidated Spend Timeline"
        showBudgetLine={true}
      />

      <div className="grid grid-cols-2 gap-6">
        <SpendBreakdown
          data={costCenterData}
          title="Spend by Cost Center"
          type="donut"
        />

        <SpendBreakdown
          data={serviceData}
          title="Spend by Service Category"
          type="bar"
        />
      </div>

      <div className="lmnt-theme-surface-bg rounded-lg p-6 border lmnt-theme-divider-primary">
        <h2 className="text-lg font-semibold lmnt-theme-on-surface mb-4">Squad Overview</h2>
        <div className="space-y-3">
          {squads?.map((squad) => (
            <div
              key={squad.id}
              onClick={() => onSquadClick(squad.id)}
              className="flex items-center justify-between p-4 rounded-lg lmnt-theme-surface-variant-bg hover:opacity-80 transition-opacity cursor-pointer"
            >
              <div className="flex-1">
                <div className="font-semibold lmnt-theme-on-surface">{squad.name}</div>
                <div className="text-sm lmnt-theme-on-surface-variant">Owner: {squad.owner}</div>
              </div>
              <div className="text-right">
                <div className="text-lg font-semibold lmnt-theme-on-surface">
                  ${(squad.budget * 0.72).toLocaleString()}
                </div>
                <div className="text-sm lmnt-theme-on-surface-variant">
                  72% of ${squad.budget.toLocaleString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}