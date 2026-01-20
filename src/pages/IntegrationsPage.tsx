import React, { useState } from 'react'
import { RefreshCw, Plus } from 'lucide-react'
import IntegrationStatus from '../components/IntegrationStatus'
import { usePolling } from '../hooks/usePolling'
import { api, canPerformAction } from '../services/api'

export default function IntegrationsPage() {
  const [connectingId, setConnectingId] = useState<string | null>(null)

  const { data: integrations, refresh } = usePolling(
    () => api.getIntegrations(),
    30000
  )

  const handleConnect = async (id: string) => {
    if (!canPerformAction('admin')) {
      alert('You do not have permission to manage integrations')
      return
    }

    setConnectingId(id)
    try {
      const result = await api.connectIntegration(id)
      alert(result.message)
      refresh()
    } catch (error) {
      alert('Failed to connect integration')
    } finally {
      setConnectingId(null)
    }
  }

  const handleRefresh = async (id: string) => {
    try {
      await api.refreshIntegration(id)
      refresh()
    } catch (error) {
      alert('Failed to refresh integration')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold lmnt-theme-on-surface">Integrations & Data Sources</h1>
          <p className="lmnt-theme-on-surface-variant mt-1">
            Manage connections to billing systems and cost centers
          </p>
        </div>

        <button 
          disabled={!canPerformAction('admin')}
          className="flex items-center gap-2 px-4 py-2 rounded-lg lmnt-theme-primary-bg lmnt-theme-on-primary hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus className="w-4 h-4" />
          <span>Add Integration</span>
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="lmnt-theme-surface-bg rounded-lg p-6 border lmnt-theme-divider-primary">
          <div className="text-sm lmnt-theme-on-surface-variant mb-1">Total Integrations</div>
          <div className="text-3xl font-bold lmnt-theme-on-surface">{integrations?.length || 0}</div>
        </div>

        <div className="lmnt-theme-surface-bg rounded-lg p-6 border lmnt-theme-divider-primary">
          <div className="text-sm lmnt-theme-on-surface-variant mb-1">Active Connections</div>
          <div className="text-3xl font-bold text-bayer-secondary-500">
            {integrations?.filter(i => i.status === 'connected').length || 0}
          </div>
        </div>

        <div className="lmnt-theme-surface-bg rounded-lg p-6 border lmnt-theme-divider-primary">
          <div className="text-sm lmnt-theme-on-surface-variant mb-1">Needs Attention</div>
          <div className="text-3xl font-bold text-bayer-primary-400">
            {integrations?.filter(i => i.status === 'error' || i.status === 'disconnected').length || 0}
          </div>
        </div>
      </div>

      <div className="lmnt-theme-surface-bg rounded-lg border lmnt-theme-divider-primary">
        <div className="p-6 border-b lmnt-theme-divider-primary">
          <h2 className="text-lg font-semibold lmnt-theme-on-surface">Data Sources</h2>
          <p className="text-sm lmnt-theme-on-surface-variant mt-1">
            Configure and monitor your billing data integrations
          </p>
        </div>

        <div className="divide-y lmnt-theme-divider-primary">
          {integrations?.map((integration) => (
            <div key={integration.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold lmnt-theme-on-surface text-lg">{integration.name}</h3>
                  <p className="text-sm lmnt-theme-on-surface-variant mt-1">
                    Data Source: {integration.dataSource}
                  </p>
                </div>

                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  integration.status === 'connected' ? 'bg-bayer-secondary-100 text-bayer-secondary-700' :
                  integration.status === 'error' ? 'bg-bayer-primary-100 text-bayer-primary-600' :
                  integration.status === 'syncing' ? 'bg-bayer-secondary-100 text-bayer-secondary-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {integration.status.charAt(0).toUpperCase() + integration.status.slice(1)}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="lmnt-theme-surface-variant-bg rounded-lg p-3">
                  <div className="text-xs lmnt-theme-on-surface-variant mb-1">Last Sync</div>
                  <div className="font-medium lmnt-theme-on-surface">
                    {integration.lastSync || 'Never'}
                  </div>
                </div>

                <div className="lmnt-theme-surface-variant-bg rounded-lg p-3">
                  <div className="text-xs lmnt-theme-on-surface-variant mb-1">Next Sync</div>
                  <div className="font-medium lmnt-theme-on-surface">
                    {integration.nextSync || 'N/A'}
                  </div>
                </div>

                <div className="lmnt-theme-surface-variant-bg rounded-lg p-3">
                  <div className="text-xs lmnt-theme-on-surface-variant mb-1">Records Processed</div>
                  <div className="font-medium lmnt-theme-on-surface">
                    {integration.recordsProcessed?.toLocaleString() || '0'}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {integration.status === 'connected' && (
                  <button
                    onClick={() => handleRefresh(integration.id)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg lmnt-theme-secondary-bg lmnt-theme-on-secondary hover:opacity-90 transition-opacity text-sm"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Refresh Now</span>
                  </button>
                )}

                {(integration.status === 'error' || integration.status === 'disconnected') && (
                  <button
                    onClick={() => handleConnect(integration.id)}
                    disabled={connectingId === integration.id || !canPerformAction('admin')}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg lmnt-theme-primary-bg lmnt-theme-on-primary hover:opacity-90 transition-opacity text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {connectingId === integration.id ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                        <span>Connecting...</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" />
                        <span>Reconnect</span>
                      </>
                    )}
                  </button>
                )}

                <button className="px-4 py-2 rounded-lg lmnt-theme-surface-variant-bg lmnt-theme-on-surface hover:opacity-80 transition-opacity text-sm">
                  Configure
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="lmnt-theme-surface-bg rounded-lg p-6 border lmnt-theme-divider-primary">
        <h3 className="font-semibold lmnt-theme-on-surface mb-3">Integration Notes</h3>
        <ul className="space-y-2 text-sm lmnt-theme-on-surface-variant">
          <li>• Cloud billing data is synced every 30 minutes</li>
          <li>• Cost center mappings are updated daily at midnight</li>
          <li>• CI/CD charge events are processed in real-time</li>
          <li>• Historical data is available for up to 90 days</li>
        </ul>
      </div>
    </div>
  )
}