import React, { useState } from 'react'
import { X, FileText, Send, Shield, CheckCircle } from 'lucide-react'

interface ActionModalProps {
  type: 'annotate' | 'chargeback' | 'governance'
  onClose: () => void
  context?: {
    squad?: string
    amount?: number
    resource?: string
  }
}

export default function ActionModal({ type, onClose, context }: ActionModalProps) {
  const [formData, setFormData] = useState({
    notes: '',
    costCenter: '',
    businessJustification: '',
    priority: 'medium',
    reviewers: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  const modalConfig = {
    annotate: {
      title: 'Add Annotation',
      icon: FileText,
      description: 'Add context and notes to this cost entry',
      color: 'lmnt-theme-secondary'
    },
    chargeback: {
      title: 'Initiate Chargeback',
      icon: Send,
      description: 'Transfer costs to the appropriate cost center',
      color: 'lmnt-theme-primary'
    },
    governance: {
      title: 'Request Governance Review',
      icon: Shield,
      description: 'Escalate for policy review and approval',
      color: 'text-yellow-600'
    }
  }

  const config = modalConfig[type]
  const Icon = config.icon

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    setTimeout(() => {
      setIsSubmitting(false)
      setIsComplete(true)
      setTimeout(() => {
        onClose()
      }, 2000)
    }, 1500)
  }

  if (isComplete) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="lmnt-theme-surface-bg rounded-lg max-w-md w-full p-8 text-center">
          <CheckCircle className="w-16 h-16 text-bayer-secondary-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold lmnt-theme-on-surface mb-2">Request Submitted</h3>
          <p className="lmnt-theme-on-surface-variant">
            Your {type} request has been submitted successfully.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="lmnt-theme-surface-bg rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 lmnt-theme-surface-bg border-b lmnt-theme-divider-primary p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Icon className={`w-6 h-6 ${config.color}`} />
            <div>
              <h2 className="text-2xl font-bold lmnt-theme-on-surface">{config.title}</h2>
              <p className="text-sm lmnt-theme-on-surface-variant mt-1">{config.description}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:lmnt-theme-surface-variant-bg rounded-lg transition-colors">
            <X className="w-5 h-5 lmnt-theme-on-surface" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {context && (
            <div className="lmnt-theme-surface-variant-bg rounded-lg p-4 space-y-2">
              <h4 className="font-semibold lmnt-theme-on-surface text-sm">Context</h4>
              {context.squad && (
                <div className="text-sm">
                  <span className="lmnt-theme-on-surface-variant">Squad: </span>
                  <span className="lmnt-theme-on-surface font-medium">{context.squad}</span>
                </div>
              )}
              {context.amount && (
                <div className="text-sm">
                  <span className="lmnt-theme-on-surface-variant">Amount: </span>
                  <span className="lmnt-theme-on-surface font-medium">${context.amount.toLocaleString()}</span>
                </div>
              )}
              {context.resource && (
                <div className="text-sm">
                  <span className="lmnt-theme-on-surface-variant">Resource: </span>
                  <span className="lmnt-theme-on-surface font-medium">{context.resource}</span>
                </div>
              )}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium lmnt-theme-on-surface mb-2">
              Notes / Description *
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              required
              rows={4}
              placeholder="Provide details about this action..."
              className="w-full px-4 py-2 rounded-lg lmnt-theme-surface-variant-bg lmnt-theme-on-surface border lmnt-theme-divider-primary focus:outline-none focus:ring-2 focus:ring-bayer-primary-400"
            />
          </div>

          {type === 'chargeback' && (
            <div>
              <label className="block text-sm font-medium lmnt-theme-on-surface mb-2">
                Target Cost Center *
              </label>
              <input
                type="text"
                value={formData.costCenter}
                onChange={(e) => setFormData({ ...formData, costCenter: e.target.value })}
                required
                placeholder="e.g., CC-1234-PROD"
                className="w-full px-4 py-2 rounded-lg lmnt-theme-surface-variant-bg lmnt-theme-on-surface border lmnt-theme-divider-primary focus:outline-none focus:ring-2 focus:ring-bayer-primary-400"
              />
            </div>
          )}

          {type === 'governance' && (
            <>
              <div>
                <label className="block text-sm font-medium lmnt-theme-on-surface mb-2">
                  Business Justification *
                </label>
                <textarea
                  value={formData.businessJustification}
                  onChange={(e) => setFormData({ ...formData, businessJustification: e.target.value })}
                  required
                  rows={3}
                  placeholder="Explain why this requires governance review..."
                  className="w-full px-4 py-2 rounded-lg lmnt-theme-surface-variant-bg lmnt-theme-on-surface border lmnt-theme-divider-primary focus:outline-none focus:ring-2 focus:ring-bayer-primary-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium lmnt-theme-on-surface mb-2">
                  Priority
                </label>
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg lmnt-theme-surface-variant-bg lmnt-theme-on-surface border lmnt-theme-divider-primary focus:outline-none focus:ring-2 focus:ring-bayer-primary-400"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="critical">Critical</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium lmnt-theme-on-surface mb-2">
                  Reviewers (optional)
                </label>
                <input
                  type="text"
                  value={formData.reviewers}
                  onChange={(e) => setFormData({ ...formData, reviewers: e.target.value })}
                  placeholder="email@company.com, email2@company.com"
                  className="w-full px-4 py-2 rounded-lg lmnt-theme-surface-variant-bg lmnt-theme-on-surface border lmnt-theme-divider-primary focus:outline-none focus:ring-2 focus:ring-bayer-primary-400"
                />
              </div>
            </>
          )}

          <div className="flex items-center justify-end gap-3 pt-4 border-t lmnt-theme-divider-primary">
            <button 
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-6 py-2 rounded-lg lmnt-theme-surface-variant-bg lmnt-theme-on-surface hover:opacity-80 transition-opacity disabled:opacity-50"
            >
              Cancel
            </button>
            <button 
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 rounded-lg lmnt-theme-primary-bg lmnt-theme-on-primary hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Submit Request</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}