import React from 'react'
import { LayoutDashboard, Users, Bell, Settings, TrendingUp } from 'lucide-react'

interface SidebarProps {
  currentPage: string
  onPageChange: (page: any) => void
}

const navItems = [
  { id: 'dashboard', label: 'Global Dashboard', icon: LayoutDashboard },
  { id: 'squad', label: 'Squad Details', icon: Users },
  { id: 'alerts', label: 'Alerts & Inbox', icon: Bell },
  { id: 'integrations', label: 'Integrations', icon: Settings }
]

export default function Sidebar({ currentPage, onPageChange }: SidebarProps) {
  return (
    <aside className="w-64 lmnt-theme-surface-bg border-r lmnt-theme-divider-primary min-h-[calc(100vh-64px)]">
      <nav className="p-4 space-y-2">
        {navItems.map(item => {
          const Icon = item.icon
          const isActive = currentPage === item.id
          
          return (
            <button
              key={item.id}
              onClick={() => onPageChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive 
                  ? 'lmnt-theme-primary-bg lmnt-theme-on-primary' 
                  : 'hover:lmnt-theme-surface-variant-bg lmnt-theme-on-surface'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          )
        })}
      </nav>

      <div className="p-4 mt-8">
        <div className="lmnt-theme-surface-variant-bg rounded-lg p-4">
          <div className="flex items-start gap-2 mb-2">
            <TrendingUp className="w-5 h-5 lmnt-theme-secondary flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold lmnt-theme-on-surface text-sm mb-1">Quick Tip</h3>
              <p className="text-xs lmnt-theme-on-surface-variant leading-relaxed">
                Forecasts use weekly trends + tagging data. Click any forecast to see methodology details.
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}