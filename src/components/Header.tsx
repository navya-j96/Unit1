import React, { useState } from 'react'
import { Search, TrendingUp } from 'lucide-react'
import NotificationCenter from './NotificationCenter'
import RoleSelector from './RoleSelector'
import { UserRole, setUserRole, getUserRole } from '../services/api'

interface HeaderProps {
  selectedSquad: string
  onSquadChange: (squad: string) => void
}

const squads = [
  'Platform Engineering',
  'Data Science',
  'Mobile Apps',
  'Infrastructure'
]

const notifications = [
  {
    id: '1',
    type: 'alert' as const,
    title: 'High Severity Anomaly Detected',
    message: 'EC2 spike in Platform Engineering squad',
    timestamp: '5 minutes ago',
    read: false,
    actionLabel: 'View Details',
    onAction: () => console.log('View anomaly')
  },
  {
    id: '2',
    type: 'warning' as const,
    title: 'Budget Threshold Approaching',
    message: 'Data Science squad at 85% of monthly budget',
    timestamp: '1 hour ago',
    read: false
  },
  {
    id: '3',
    type: 'success' as const,
    title: 'Chargeback Approved',
    message: 'Your chargeback request #CB-1234 has been approved',
    timestamp: '3 hours ago',
    read: true
  }
]

export default function Header({ selectedSquad, onSquadChange }: HeaderProps) {
  const [currentRole, setCurrentRole] = useState<UserRole>(getUserRole())

  const handleRoleChange = (role: UserRole) => {
    setCurrentRole(role)
    setUserRole(role)
  }

  return (
    <header className="lmnt-theme-surface-bg border-b lmnt-theme-divider-primary sticky top-0 z-30">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-8 h-8 lmnt-theme-primary" />
              <h1 className="text-2xl font-bold lmnt-theme-on-surface">FinOps Dashboard</h1>
            </div>

            <div className="h-8 w-px lmnt-theme-divider-primary" />

            <select
              value={selectedSquad}
              onChange={(e) => onSquadChange(e.target.value)}
              className="px-4 py-2 rounded-lg lmnt-theme-surface-variant-bg lmnt-theme-on-surface border lmnt-theme-divider-primary focus:outline-none focus:ring-2 focus:ring-bayer-primary-400"
            >
              {squads.map(squad => (
                <option key={squad} value={squad}>{squad}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 lmnt-theme-on-surface-variant" />
              <input
                type="text"
                placeholder="Search resources, tags..."
                className="pl-10 pr-4 py-2 rounded-lg lmnt-theme-surface-variant-bg lmnt-theme-on-surface border lmnt-theme-divider-primary focus:outline-none focus:ring-2 focus:ring-bayer-primary-400 w-64"
              />
            </div>

            <RoleSelector currentRole={currentRole} onRoleChange={handleRoleChange} />

            <NotificationCenter 
              notifications={notifications}
              onMarkAsRead={(id) => console.log('Mark as read:', id)}
              onClearAll={() => console.log('Clear all')}
            />
          </div>
        </div>
      </div>
    </header>
  )
}