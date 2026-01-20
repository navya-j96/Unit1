import React, { useState } from 'react'
import { X, AlertTriangle, TrendingUp, CheckCircle, XCircle, Send, FileText } from 'lucide-react'

interface AnomalyModalProps {
  anomaly: any
  onClose: () => void
}

export default function AnomalyModal({ anomaly, onClose }: AnomalyModalProps) {
  const [actionInProgress, setActionInProgress] = useState(false)
  const [actionComplete, setActionComplete] = useState(false)

  const handleTakeAction = (action: string) => {
    setActionInProgress(true)
    setTimeout(() => {
      setActionInProgress(false)
      setActionComplete(true)
      setTimeout(() => {
        onClose()
      }, 2000)
    }, 1500)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="lmnt-theme-surface-bg rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 lmnt-theme-surface-bg border-b lmnt-theme-divider-primary p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-6 h-6 text-bayer-primary-400" />
            <h2 className="text-2xl font-bold lmnt-theme-on-surface">Anomaly Details</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:lmnt-theme-surface-variant-bg rounded-lg transition-colors">
            <X className="w-5 h-5 lmnt-theme-on-surface" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <h3 className="text-xl font-semibold lmnt-theme-on-surface mb-2">{anomaly.title}</h3>
            <p className="lmnt-theme-on-surface-variant">{anomaly.description}</p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="lmnt-theme-surface-variant-bg rounded-lg p-4">
              <div className="text-sm lmnt-theme-on-surface-variant mb-1">Severity</div>
              <div className={`text-lg font-semibold ${
                anomaly.severity === 'high' ? 'text-bayer-primary-500' :
                anomaly.severity === 'medium' ? 'text-yellow-600' :
                'text-bayer-secondary-600'
              }`}>
                {anomaly.severity.toUpperCase()}
              </div>
            </div>
            <div className="lmnt-theme-surface-variant-bg rounded-lg p-4">
              <div className="text-sm lmnt-theme-on-surface-variant mb-1">Confidence Score</div>
              <div className="text-lg font-semibold lmnt-theme-on-surface">{anomaly.confidence}%</div>
            </div>
            <div className="lmnt-theme-surface-variant-bg rounded-lg p-4">
              <div className="text-sm lmnt-theme-on-surface-variant mb-1">Financial Impact</div>
              <div className="text-lg font-semibold text-bayer-primary-500">${anomaly.impact.toLocaleString()}</div>
            </div>
          </div>

          <div className="lmnt-theme-surface-variant-bg rounded-lg p-4">
            <h4 className="font-semibold lmnt-theme-on-surface mb-3 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 lmnt-theme-secondary" />
              Root Cause Signals
            </h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-bayer-secondary-500 flex-shrink-0 mt-0.5" />
                <span className="lmnt-theme-on-surface">Resource utilization increased by 320% in the last 6 hours</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-bayer-secondary-500 flex-shrink-0 mt-0.5" />
                <span className="lmnt-theme-on-surface">No corresponding increase in application traffic detected</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-bayer-secondary-500 flex-shrink-0 mt-0.5" />
                <span className="lmnt-theme-on-surface">Similar pattern detected in staging environment 2 days ago</span>
              </li>
              <li className="flex items-start gap-2">
                <XCircle className="w-5 h-5 text-bayer-primary-400 flex-shrink-0 mt-0.5" />
                <span className="lmnt-theme-on-surface">Cost center tag missing on 3 new EC2 instances</span>
              </li>
            </ul>
          </div>

          <div className="lmnt-theme-surface-variant-bg rounded-lg p-4">
            <h4 className="font-semibold lmnt-theme-on-surface mb-3 flex items-center gap-2">
              <FileText className="w-5 h-5 lmnt-theme-secondary" />
              Supporting Evidence
            </h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 lmnt-theme-surface-bg rounded">
                <span className="lmnt-theme-on-surface">EC2 CloudWatch Metrics (6h)</span>
                <button className="text-sm lmnt-theme-secondary hover:underline">View</button>
              </div>
              <div className="flex items-center justify-between p-3 lmnt-theme-surface-bg rounded">
                <span className="lmnt-theme-on-surface">Cost & Usage Report Export</span>
                <button className="text-sm lmnt-theme-secondary hover:underline">Download</button>
              </div>
              <div className="flex items-center justify-between p-3 lmnt-theme-surface-bg rounded">
                <span className="lmnt-theme-on-surface">Resource Tag Audit Log</span>
                <button className="text-sm lmnt-theme-secondary hover:underline">View</button>
              </div>
            </div>
          </div>

          <div className="border-t lmnt-theme-divider-primary pt-6">
            <h4 className="font-semibold lmnt-theme-on-surface mb-4">Recommended Actions</h4>
            
            {actionComplete ? (
              <div className="lmnt-theme-success-bg rounded-lg p-6 text-center">
                <CheckCircle className="w-12 h-12 lmnt-theme-success mx-auto mb-3" />
                <p className="text-lg font-semibold lmnt-theme-success">Action completed successfully!</p>
                <p className="lmnt-theme-on-surface-variant text-sm mt-2">The system will process your request shortly.</p>
              </div>
            ) : (
              <div className="space-y-3">
                <button 
                  onClick={() => handleTakeAction('disable')}
                  disabled={actionInProgress}
                  className="w-full flex items-center justify-between p-4 lmnt-theme-primary-bg lmnt-theme-on-primary rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  <div className="text-left">
                    <div className="font-semibold">Disable Duplicate Resources</div>
                    <div className="text-sm opacity-90">Stop 3 redundant EC2 instances (Est. savings: $8,400/mo)</div>
                  </div>
                  {actionInProgress ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                </button>

                <button 
                  onClick={() => handleTakeAction('reassign')}
                  disabled={actionInProgress}
                  className="w-full flex items-center justify-between p-4 lmnt-theme-secondary-bg lmnt-theme-on-secondary rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  <div className="text-left">
                    <div className="font-semibold">Reassign Cost Center Tags</div>
                    <div className="text-sm opacity-90">Apply correct tags to untagged resources</div>
                  </div>
                  {actionInProgress ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                </button>

                <button 
                  onClick={() => handleTakeAction('notify')}
                  disabled={actionInProgress}
                  className="w-full flex items-center justify-between p-4 lmnt-theme-surface-variant-bg lmnt-theme-on-surface rounded-lg hover:opacity-80 transition-opacity disabled:opacity-50"
                >
                  <div className="text-left">
                    <div className="font-semibold">Notify Resource Owner</div>
                    <div className="text-sm lmnt-theme-on-surface-variant">Send alert to squad lead for manual review</div>
                  </div>
                  {actionInProgress ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-600"></div>
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}