import React from 'react'
import { CheckCircle, XCircle, RefreshCw, AlertCircle, Clock } from 'lucide-react'

interface Integration {
  id: string
  name: string
  status: 'connected' | 'error' | 'syncing' | 'disconnected'
  lastSync: string | null
  nextSync?: string
  recordsProcessed?: number
}

interface IntegrationStatusProps {
  integrations: Integration[]
  compact?: boolean
}

export default function IntegrationStatus({ integrations, compact = false }: IntegrationStatusProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
        return <CheckCircle className="w-4 h-4 text-bayer-secondary-500" />
      case 'error':
        return <XCircle className="w-4 h-4 text-bayer-primary-400" />
      case 'syncing':
        return <RefreshCw className="w-4 h-4 text-bayer-secondary-500 animate-spin" />
      case 'disconnected':
        return <AlertCircle className="w-4 h-4 lmnt-theme-on-surface-variant" />
      default:
        return <Clock className="w-4 h-4 lmnt-theme-on-surface-variant" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected':
        return 'text-bayer-secondary-500'
      case 'error':
        return 'text-bayer-primary-400'
      case 'syncing':
        return 'text-bayer-secondary-500'
      case 'disconnected':
        return 'lmnt-theme-on-surface-variant'
      default:
        return 'lmnt-theme-on-surface-variant'
    }
  }

  if (compact) {
    return (
      <div className="flex items-center gap-3">
        {integrations.map((integration) => (
          <div 
            key={integration.id}
            className="flex items-center gap-2 px-3 py-2 rounded-lg lmnt-theme-surface-variant-bg"
            title={`${integration.name} - ${integration.status}`}
          >
            {getStatusIcon(integration.status)}
            <span className="text-sm lmnt-theme-on-surface">{integration.name}</span>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="lmnt-theme-surface-bg rounded-lg border lmnt-theme-divider-primary">
      <div className="p-4 border-b lmnt-theme-divider-primary">
        <h3 className="font-semibold lmnt-theme-on-surface">Integration Status</h3>
      </div>
      
      <div className="divide-y lmnt-theme-divider-primary">
        {integrations.map((integration) => (
          <div key={integration.id} className="p-4 hover:lmnt-theme-surface-variant-bg transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1">
                {getStatusIcon(integration.status)}
                <div className="flex-1">
                  <div className="font-medium lmnt-theme-on-surface">{integration.name}</div>
                  <div className="flex items-center gap-3 text-sm lmnt-theme-on-surface-variant mt-1">
                    {integration.lastSync && (
                      <span>Last sync: {integration.lastSync}</span>
                    )}
                    {integration.recordsProcessed && (
                      <span>• {integration.recordsProcessed.toLocaleString()} records</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className={`text-sm font-medium capitalize ${getStatusColor(integration.status)}`}>
                  {integration.status}
                </span>
                
                {integration.status === 'connected' && (
                  <button 
                    className="p-2 rounded-lg hover:lmnt-theme-surface-variant-bg transition-colors"
                    title="Refresh now"
                  >
                    <RefreshCw className="w-4 h-4 lmnt-theme-on-surface" />
                  </button>
                )}
                
                {integration.status === 'error' && (
                  <button className="px-3 py-1 text-sm rounded-lg lmnt-theme-primary-bg lmnt-theme-on-primary hover:opacity-90 transition-opacity">
                    Reconnect
                  </button>
                )}
              </div>
            </div>

            {integration.nextSync && integration.status === 'connected' && (
              <div className="mt-2 text-xs lmnt-theme-on-surface-variant">
                Next sync: {integration.nextSync}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}