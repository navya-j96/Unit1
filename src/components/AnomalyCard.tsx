import React from 'react'
import { AlertTriangle, TrendingUp, CheckCircle, XCircle, Clock } from 'lucide-react'

interface AnomalyCardProps {
  id: number
  title: string
  description: string
  severity: 'high' | 'medium' | 'low'
  confidence: number
  impact: number
  timestamp: string
  status?: 'open' | 'acknowledged' | 'resolved'
  onViewDetails: () => void
  onQuickAction?: (action: string) => void
}

export default function AnomalyCard({ 
  id,
  title, 
  description, 
  severity, 
  confidence, 
  impact,
  timestamp,
  status = 'open',
  onViewDetails,
  onQuickAction
}: AnomalyCardProps) {
  const severityColors = {
    high: 'border-bayer-primary-400 bg-bayer-primary-50',
    medium: 'border-yellow-500 bg-yellow-50',
    low: 'border-bayer-secondary-500 bg-bayer-secondary-50'
  }

  const severityBadgeColors = {
    high: 'bg-bayer-primary-100 text-bayer-primary-600',
    medium: 'bg-yellow-100 text-yellow-700',
    low: 'bg-bayer-secondary-100 text-bayer-secondary-700'
  }

  const statusIcons = {
    open: <Clock className="w-4 h-4 text-yellow-600" />,
    acknowledged: <CheckCircle className="w-4 h-4 text-bayer-secondary-500" />,
    resolved: <CheckCircle className="w-4 h-4 text-bayer-secondary-600" />
  }

  return (
    <div className={`lmnt-theme-surface-bg rounded-lg p-5 border-l-4 ${severityColors[severity]} border lmnt-theme-divider-primary hover:shadow-md transition-shadow`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start gap-3 flex-1">
          <AlertTriangle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
            severity === 'high' ? 'text-bayer-primary-400' :
            severity === 'medium' ? 'text-yellow-600' :
            'text-bayer-secondary-600'
          }`} />
          
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              {statusIcons[status]}
              <h3 className="font-semibold lmnt-theme-on-surface">{title}</h3>
            </div>
            <p className="text-sm lmnt-theme-on-surface-variant mb-3">{description}</p>
            
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <span className="lmnt-theme-on-surface-variant">Confidence:</span>
                <span className="font-medium lmnt-theme-on-surface">{confidence}%</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="lmnt-theme-on-surface-variant">Impact:</span>
                <span className="font-medium text-bayer-primary-500">${impact.toLocaleString()}</span>
              </div>
              <span className="lmnt-theme-on-surface-variant">{timestamp}</span>
            </div>
          </div>
        </div>

        <span className={`text-xs px-2 py-1 rounded-full font-medium ${severityBadgeColors[severity]}`}>
          {severity.toUpperCase()}
        </span>
      </div>

      <div className="flex items-center gap-2 mt-4 pt-4 border-t lmnt-theme-divider-primary">
        <button 
          onClick={onViewDetails}
          className="px-4 py-2 rounded-lg lmnt-theme-primary-bg lmnt-theme-on-primary hover:opacity-90 transition-opacity text-sm font-medium"
        >
          View Details
        </button>
        
        {onQuickAction && status === 'open' && (
          <>
            <button 
              onClick={() => onQuickAction('acknowledge')}
              className="px-4 py-2 rounded-lg lmnt-theme-secondary-bg lmnt-theme-on-secondary hover:opacity-90 transition-opacity text-sm font-medium"
            >
              Acknowledge
            </button>
            <button 
              onClick={() => onQuickAction('dismiss')}
              className="px-4 py-2 rounded-lg lmnt-theme-surface-variant-bg lmnt-theme-on-surface hover:opacity-80 transition-opacity text-sm font-medium"
            >
              Dismiss
            </button>
          </>
        )}
      </div>
    </div>
  )
}