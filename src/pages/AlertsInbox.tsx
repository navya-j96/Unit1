import React, { useState } from 'react'
import { Filter } from 'lucide-react'
import AnomalyCard from '../components/AnomalyCard'
import { usePolling } from '../hooks/usePolling'
import { api, canPerformAction } from '../services/api'

interface AlertsInboxProps {
  onAnomalyClick: (anomaly: any) => void
}

export default function AlertsInbox({ onAnomalyClick }: AlertsInboxProps) {
  const [statusFilter, setStatusFilter] = useState<'all' | 'open' | 'acknowledged' | 'resolved'>('all')
  const [severityFilter, setSeverityFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all')

  const { data: anomalies, refresh } = usePolling(
    () => api.getAnomalies(),
    30000
  )

  const handleQuickAction = async (anomalyId: string, action: string) => {
    if (!canPerformAction('write')) {
      alert('You do not have permission to modify anomalies')
      return
    }

    try {
      if (action === 'acknowledge') {
        await api.updateAnomalyStatus(anomalyId, 'acknowledged')
      } else if (action === 'dismiss') {
        await api.updateAnomalyStatus(anomalyId, 'resolved')
      }
      refresh()
    } catch (error) {
      alert('Failed to update anomaly status')
    }
  }

  const filteredAnomalies = anomalies?.filter(anomaly => {
    if (statusFilter !== 'all' && anomaly.status !== statusFilter) return false
    if (severityFilter !== 'all' && anomaly.severity !== severityFilter) return false
    return true
  })

  const stats = {
    total: anomalies?.length || 0,
    open: anomalies?.filter(a => a.status === 'open').length || 0,
    acknowledged: anomalies?.filter(a => a.status === 'acknowledged').length || 0,
    resolved: anomalies?.filter(a => a.status === 'resolved').length || 0
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold lmnt-theme-on-surface">Alerts & Inbox</h1>
        <p className="lmnt-theme-on-surface-variant mt-1">
          Monitor and respond to cost anomalies and alerts
        </p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="lmnt-theme-surface-bg rounded-lg p-6 border lmnt-theme-divider-primary">
          <div className="text-sm lmnt-theme-on-surface-variant mb-1">Total Alerts</div>
          <div className="text-3xl font-bold lmnt-theme-on-surface">{stats.total}</div>
        </div>

        <div className="lmnt-theme-surface-bg rounded-lg p-6 border lmnt-theme-divider-primary">
          <div className="text-sm lmnt-theme-on-surface-variant mb-1">Open</div>
          <div className="text-3xl font-bold text-bayer-primary-400">{stats.open}</div>
        </div>

        <div className="lmnt-theme-surface-bg rounded-lg p-6 border lmnt-theme-divider-primary">
          <div className="text-sm lmnt-theme-on-surface-variant mb-1">Acknowledged</div>
          <div className="text-3xl font-bold text-yellow-600">{stats.acknowledged}</div>
        </div>

        <div className="lmnt-theme-surface-bg rounded-lg p-6 border lmnt-theme-divider-primary">
          <div className="text-sm lmnt-theme-on-surface-variant mb-1">Resolved</div>
          <div className="text-3xl font-bold text-bayer-secondary-600">{stats.resolved}</div>
        </div>
      </div>

      <div className="lmnt-theme-surface-bg rounded-lg p-4 border lmnt-theme-divider-primary">
        <div className="flex items-center gap-4">
          <Filter className="w-5 h-5 lmnt-theme-on-surface-variant" />
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="px-3 py-2 rounded-lg lmnt-theme-surface-variant-bg lmnt-theme-on-surface border lmnt-theme-divider-primary focus:outline-none focus:ring-2 focus:ring-bayer-primary-400"
          >
            <option value="all">All Status</option>
            <option value="open">Open</option>
            <option value="acknowledged">Acknowledged</option>
            <option value="resolved">Resolved</option>
          </select>

          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value as any)}
            className="px-3 py-2 rounded-lg lmnt-theme-surface-variant-bg lmnt-theme-on-surface border lmnt-theme-divider-primary focus:outline-none focus:ring-2 focus:ring-bayer-primary-400"
          >
            <option value="all">All Severity</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {filteredAnomalies && filteredAnomalies.length > 0 ? (
          filteredAnomalies.map((anomaly) => (
            <AnomalyCard
              key={anomaly.id}
              {...anomaly}
              onViewDetails={() => onAnomalyClick(anomaly)}
              onQuickAction={(action) => handleQuickAction(anomaly.id, action)}
            />
          ))
        ) : (
          <div className="lmnt-theme-surface-bg rounded-lg p-12 text-center border lmnt-theme-divider-primary">
            <p className="text-lg lmnt-theme-on-surface-variant">No alerts match your filters</p>
            <button
              onClick={() => {
                setStatusFilter('all')
                setSeverityFilter('all')
              }}
              className="mt-4 px-4 py-2 rounded-lg lmnt-theme-primary-bg lmnt-theme-on-primary hover:opacity-90 transition-opacity"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}