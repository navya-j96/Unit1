import React, { useState } from 'react'
import { TrendingUp, AlertTriangle, DollarSign, FileText, Send, Shield } from 'lucide-react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import ChargesTable from '../components/ChargesTable'
import FilterBar from '../components/FilterBar'
import { usePolling } from '../hooks/usePolling'
import { useFilters } from '../hooks/useFilters'
import { api, canPerformAction } from '../services/api'

interface SquadDetailViewProps {
  squad: string
  onAnomalyClick: (anomaly: any) => void
}

const spendTimeline = [
  { date: 'Week 1', spend: 28000, forecast: 27000 },
  { date: 'Week 2', spend: 29500, forecast: 28500 },
  { date: 'Week 3', spend: 31200, forecast: 30000 },
  { date: 'Week 4', spend: 36300, forecast: 31500 }
]

const costDrivers = [
  { category: 'Compute', amount: 45200, percentage: 36 },
  { category: 'Storage', amount: 32100, percentage: 26 },
  { category: 'Database', amount: 28900, percentage: 23 },
  { category: 'Network', amount: 12800, percentage: 10 },
  { category: 'Other', amount: 6000, percentage: 5 }
]

export default function SquadDetailView({ squad, onAnomalyClick }: SquadDetailViewProps) {
  const { filters, updateFilters, resetFilters } = useFilters('squad-detail-filters')
  const [showAnnotationModal, setShowAnnotationModal] = useState(false)
  const [showChargebackModal, setShowChargebackModal] = useState(false)
  const [annotation, setAnnotation] = useState('')
  const [chargebackReason, setChargebackReason] = useState('')

  const { data: anomalies, lastUpdated, refresh } = usePolling(
    () => api.getAnomalies('squad-1'),
    30000
  )

  const { data: charges } = usePolling(
    () => api.getCharges('squad-1'),
    30000
  )

  const handleAnnotate = async () => {
    if (!canPerformAction('annotate')) {
      alert('You do not have permission to create annotations')
      return
    }

    try {
      await api.createAnnotation({
        squadId: 'squad-1',
        recordId: 'record-1',
        text: annotation,
        user: 'Current User'
      })
      setAnnotation('')
      setShowAnnotationModal(false)
      alert('Annotation created successfully!')
    } catch (error) {
      alert('Failed to create annotation')
    }
  }

  const handleChargeback = async () => {
    if (!canPerformAction('chargeback')) {
      alert('You do not have permission to create chargebacks')
      return
    }

    try {
      await api.createChargeback({
        squadId: 'squad-1',
        amount: 12500,
        reason: chargebackReason,
        tickets: ['JIRA-1234']
      })
      setChargebackReason('')
      setShowChargebackModal(false)
      alert('Chargeback request created successfully!')
    } catch (error) {
      alert('Failed to create chargeback')
    }
  }

  const handleUpdateCostCenter = async (id: string, costCenter: string) => {
    if (!canPerformAction('write')) {
      alert('You do not have permission to edit cost centers')
      return
    }

    try {
      await api.updateChargeCostCenter(id, costCenter)
      refresh()
    } catch (error) {
      alert('Failed to update cost center')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold lmnt-theme-on-surface">{squad}</h1>
          <p className="lmnt-theme-on-surface-variant mt-1">
            Detailed cost analysis and anomaly tracking
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowAnnotationModal(true)}
            disabled={!canPerformAction('annotate')}
            className="flex items-center gap-2 px-4 py-2 rounded-lg lmnt-theme-surface-variant-bg hover:opacity-80 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FileText className="w-4 h-4 lmnt-theme-on-surface" />
            <span className="lmnt-theme-on-surface">Annotate</span>
          </button>
          <button 
            onClick={() => setShowChargebackModal(true)}
            disabled={!canPerformAction('chargeback')}
            className="flex items-center gap-2 px-4 py-2 rounded-lg lmnt-theme-secondary-bg lmnt-theme-on-secondary hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" />
            <span>Start Chargeback</span>
          </button>
          <button 
            disabled={!canPerformAction('admin')}
            className="flex items-center gap-2 px-4 py-2 rounded-lg lmnt-theme-primary-bg lmnt-theme-on-primary hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Shield className="w-4 h-4" />
            <span>Request Governance Review</span>
          </button>
        </div>
      </div>

      <FilterBar
        filters={filters}
        onFiltersChange={updateFilters}
        onReset={resetFilters}
        lastUpdated={lastUpdated}
        onRefresh={refresh}
      />

      <div className="grid grid-cols-4 gap-4">
        <div className="lmnt-theme-surface-bg rounded-lg p-6 border lmnt-theme-divider-primary">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm lmnt-theme-on-surface-variant">Current Month</span>
            <DollarSign className="w-5 h-5 lmnt-theme-primary" />
          </div>
          <div className="text-3xl font-bold lmnt-theme-on-surface">$125,000</div>
          <div className="text-sm lmnt-theme-on-surface-variant mt-2">72% of budget</div>
        </div>

        <div className="lmnt-theme-surface-bg rounded-lg p-6 border lmnt-theme-divider-primary">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm lmnt-theme-on-surface-variant">Month-End Forecast</span>
            <TrendingUp className="w-5 h-5 lmnt-theme-secondary" />
          </div>
          <div className="text-3xl font-bold lmnt-theme-on-surface">$135,000</div>
          <div className="text-sm lmnt-theme-secondary mt-2">+8.2% projected</div>
        </div>

        <div className="lmnt-theme-surface-bg rounded-lg p-6 border lmnt-theme-divider-primary">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm lmnt-theme-on-surface-variant">Active Anomalies</span>
            <AlertTriangle className="w-5 h-5 text-bayer-primary-400" />
          </div>
          <div className="text-3xl font-bold lmnt-theme-on-surface">
            {anomalies?.filter(a => a.status === 'open').length || 0}
          </div>
          <div className="text-sm text-bayer-primary-400 mt-2">
            {anomalies?.filter(a => a.severity === 'high').length || 0} high priority
          </div>
        </div>

        <div className="lmnt-theme-surface-bg rounded-lg p-6 border lmnt-theme-divider-primary">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm lmnt-theme-on-surface-variant">Avg Daily Spend</span>
            <DollarSign className="w-5 h-5 lmnt-theme-secondary" />
          </div>
          <div className="text-3xl font-bold lmnt-theme-on-surface">$4,167</div>
          <div className="text-sm lmnt-theme-on-surface-variant mt-2">Last 30 days</div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 lmnt-theme-surface-bg rounded-lg p-6 border lmnt-theme-divider-primary">
          <h2 className="text-lg font-semibold lmnt-theme-on-surface mb-4">Spend Timeline & Forecast</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={spendTimeline}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="date" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'var(--lmnt-theme-surface)', 
                  border: '1px solid var(--lmnt-theme-divider-primary)',
                  borderRadius: '8px'
                }}
              />
              <Line type="monotone" dataKey="spend" stroke="#de0043" strokeWidth={2} name="Actual" />
              <Line type="monotone" dataKey="forecast" stroke="#00bcff" strokeWidth={2} strokeDasharray="5 5" name="Forecast" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="lmnt-theme-surface-bg rounded-lg p-6 border lmnt-theme-divider-primary">
          <h2 className="text-lg font-semibold lmnt-theme-on-surface mb-4">Cost Drivers</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={costDrivers} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis type="number" stroke="#6b7280" />
              <YAxis dataKey="category" type="category" stroke="#6b7280" width={80} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'var(--lmnt-theme-surface)', 
                  border: '1px solid var(--lmnt-theme-divider-primary)',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="amount" fill="#de0043" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold lmnt-theme-on-surface mb-4">Recent Charges</h2>
        {charges && (
          <ChargesTable 
            charges={charges} 
            onUpdateCostCenter={handleUpdateCostCenter}
          />
        )}
      </div>

      <div className="lmnt-theme-surface-bg rounded-lg p-6 border lmnt-theme-divider-primary">
        <h2 className="text-lg font-semibold lmnt-theme-on-surface mb-4">Active Anomalies</h2>
        <div className="space-y-3">
          {anomalies?.map((anomaly) => (
            <div 
              key={anomaly.id} 
              className="p-4 rounded-lg lmnt-theme-surface-variant-bg border-l-4 cursor-pointer hover:opacity-80 transition-opacity"
              style={{ borderLeftColor: anomaly.severity === 'high' ? '#de0043' : anomaly.severity === 'medium' ? '#ff9800' : '#00bcff' }}
              onClick={() => onAnomalyClick(anomaly)}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="font-semibold lmnt-theme-on-surface">{anomaly.title}</div>
                  <div className="text-sm lmnt-theme-on-surface-variant mt-1">{anomaly.description}</div>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                  anomaly.severity === 'high' ? 'bg-bayer-primary-100 text-bayer-primary-600' :
                  anomaly.severity === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-bayer-secondary-100 text-bayer-secondary-700'
                }`}>
                  {anomaly.severity.toUpperCase()}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="lmnt-theme-on-surface-variant">
                  Confidence: <span className="font-medium lmnt-theme-on-surface">{anomaly.confidence}%</span>
                </span>
                <span className="lmnt-theme-on-surface-variant">
                  Impact: <span className="font-medium text-bayer-primary-500">${anomaly.impact.toLocaleString()}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Annotation Modal */}
      {showAnnotationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="lmnt-theme-surface-bg rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold lmnt-theme-on-surface mb-4">Add Annotation</h3>
            <textarea
              value={annotation}
              onChange={(e) => setAnnotation(e.target.value)}
              placeholder="Enter your annotation..."
              className="w-full p-3 rounded-lg lmnt-theme-surface-variant-bg lmnt-theme-on-surface border lmnt-theme-divider-primary focus:outline-none focus:ring-2 focus:ring-bayer-primary-400 min-h-[120px]"
            />
            <div className="flex items-center gap-3 mt-4">
              <button
                onClick={handleAnnotate}
                className="flex-1 px-4 py-2 rounded-lg lmnt-theme-primary-bg lmnt-theme-on-primary hover:opacity-90 transition-opacity"
              >
                Save Annotation
              </button>
              <button
                onClick={() => setShowAnnotationModal(false)}
                className="flex-1 px-4 py-2 rounded-lg lmnt-theme-surface-variant-bg lmnt-theme-on-surface hover:opacity-80 transition-opacity"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Chargeback Modal */}
      {showChargebackModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="lmnt-theme-surface-bg rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold lmnt-theme-on-surface mb-4">Start Chargeback</h3>
            <textarea
              value={chargebackReason}
              onChange={(e) => setChargebackReason(e.target.value)}
              placeholder="Enter chargeback reason..."
              className="w-full p-3 rounded-lg lmnt-theme-surface-variant-bg lmnt-theme-on-surface border lmnt-theme-divider-primary focus:outline-none focus:ring-2 focus:ring-bayer-primary-400 min-h-[120px]"
            />
            <div className="flex items-center gap-3 mt-4">
              <button
                onClick={handleChargeback}
                className="flex-1 px-4 py-2 rounded-lg lmnt-theme-primary-bg lmnt-theme-on-primary hover:opacity-90 transition-opacity"
              >
                Submit Chargeback
              </button>
              <button
                onClick={() => setShowChargebackModal(false)}
                className="flex-1 px-4 py-2 rounded-lg lmnt-theme-surface-variant-bg lmnt-theme-on-surface hover:opacity-80 transition-opacity"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}