import React from 'react'
import { Clock, User, FileText, Send, Shield, DollarSign, AlertTriangle } from 'lucide-react'

interface Activity {
  id: string
  type: 'annotation' | 'chargeback' | 'governance' | 'cost_alert' | 'budget_update' | 'anomaly_detected'
  user: string
  action: string
  details: string
  timestamp: string
}

interface ActivityLogProps {
  activities: Activity[]
  limit?: number
}

export default function ActivityLog({ activities, limit }: ActivityLogProps) {
  const displayActivities = limit ? activities.slice(0, limit) : activities

  const getIcon = (type: string) => {
    switch (type) {
      case 'annotation':
        return <FileText className="w-4 h-4 lmnt-theme-secondary" />
      case 'chargeback':
        return <Send className="w-4 h-4 lmnt-theme-primary" />
      case 'governance':
        return <Shield className="w-4 h-4 text-yellow-600" />
      case 'cost_alert':
        return <AlertTriangle className="w-4 h-4 text-bayer-primary-400" />
      case 'budget_update':
        return <DollarSign className="w-4 h-4 text-bayer-secondary-500" />
      case 'anomaly_detected':
        return <AlertTriangle className="w-4 h-4 text-bayer-primary-400" />
      default:
        return <Clock className="w-4 h-4 lmnt-theme-on-surface-variant" />
    }
  }

  return (
    <div className="lmnt-theme-surface-bg rounded-lg border lmnt-theme-divider-primary">
      <div className="p-4 border-b lmnt-theme-divider-primary">
        <h3 className="font-semibold lmnt-theme-on-surface">Activity Log</h3>
      </div>

      <div className="divide-y lmnt-theme-divider-primary max-h-96 overflow-y-auto">
        {displayActivities.length === 0 ? (
          <div className="p-8 text-center">
            <Clock className="w-12 h-12 lmnt-theme-on-surface-variant mx-auto mb-3" />
            <p className="lmnt-theme-on-surface-variant">No recent activity</p>
          </div>
        ) : (
          displayActivities.map((activity) => (
            <div key={activity.id} className="p-4 hover:lmnt-theme-surface-variant-bg transition-colors">
              <div className="flex items-start gap-3">
                <div className="lmnt-theme-surface-variant-bg p-2 rounded-lg flex-shrink-0">
                  {getIcon(activity.type)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div>
                      <p className="font-medium lmnt-theme-on-surface text-sm">
                        {activity.action}
                      </p>
                      <p className="text-sm lmnt-theme-on-surface-variant mt-1">
                        {activity.details}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-xs lmnt-theme-on-surface-variant mt-2">
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      <span>{activity.user}</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{activity.timestamp}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {limit && activities.length > limit && (
        <div className="p-4 border-t lmnt-theme-divider-primary text-center">
          <button className="text-sm lmnt-theme-secondary hover:underline">
            View all activity ({activities.length} total)
          </button>
        </div>
      )}
    </div>
  )
}