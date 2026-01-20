import React, { useState } from 'react'
import { Bell, X, CheckCircle, AlertTriangle, Info, TrendingUp } from 'lucide-react'

interface Notification {
  id: string
  type: 'success' | 'warning' | 'info' | 'alert'
  title: string
  message: string
  timestamp: string
  read: boolean
  actionLabel?: string
  onAction?: () => void
}

interface NotificationCenterProps {
  notifications: Notification[]
  onMarkAsRead?: (id: string) => void
  onClearAll?: () => void
}

export default function NotificationCenter({ 
  notifications, 
  onMarkAsRead,
  onClearAll 
}: NotificationCenterProps) {
  const [isOpen, setIsOpen] = useState(false)

  const unreadCount = notifications.filter(n => !n.read).length

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-bayer-secondary-500" />
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />
      case 'alert':
        return <AlertTriangle className="w-5 h-5 text-bayer-primary-400" />
      case 'info':
        return <Info className="w-5 h-5 text-bayer-secondary-500" />
      default:
        return <Bell className="w-5 h-5 lmnt-theme-on-surface" />
    }
  }

  const getBackgroundColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-bayer-secondary-50'
      case 'warning':
        return 'bg-yellow-50'
      case 'alert':
        return 'bg-bayer-primary-50'
      case 'info':
        return 'bg-bayer-secondary-50'
      default:
        return 'lmnt-theme-surface-variant-bg'
    }
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg hover:lmnt-theme-surface-variant-bg transition-colors"
      >
        <Bell className="w-5 h-5 lmnt-theme-on-surface" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-5 h-5 bg-bayer-primary-400 text-white text-xs font-bold rounded-full flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          <div className="absolute right-0 top-full mt-2 w-96 lmnt-theme-surface-bg rounded-lg shadow-xl border lmnt-theme-divider-primary z-50 max-h-[600px] overflow-hidden flex flex-col">
            <div className="p-4 border-b lmnt-theme-divider-primary flex items-center justify-between">
              <h3 className="font-semibold lmnt-theme-on-surface">Notifications</h3>
              <div className="flex items-center gap-2">
                {notifications.length > 0 && (
                  <button
                    onClick={onClearAll}
                    className="text-sm lmnt-theme-secondary hover:underline"
                  >
                    Clear all
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded hover:lmnt-theme-surface-variant-bg transition-colors"
                >
                  <X className="w-4 h-4 lmnt-theme-on-surface" />
                </button>
              </div>
            </div>

            <div className="overflow-y-auto flex-1">
              {notifications.length === 0 ? (
                <div className="p-8 text-center">
                  <Bell className="w-12 h-12 lmnt-theme-on-surface-variant mx-auto mb-3" />
                  <p className="lmnt-theme-on-surface-variant">No notifications</p>
                </div>
              ) : (
                <div className="divide-y lmnt-theme-divider-primary">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 hover:lmnt-theme-surface-variant-bg transition-colors ${
                        !notification.read ? getBackgroundColor(notification.type) : ''
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {getIcon(notification.type)}
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="font-medium lmnt-theme-on-surface text-sm">
                              {notification.title}
                            </h4>
                            {!notification.read && (
                              <button
                                onClick={() => onMarkAsRead?.(notification.id)}
                                className="text-xs lmnt-theme-secondary hover:underline flex-shrink-0"
                              >
                                Mark read
                              </button>
                            )}
                          </div>
                          
                          <p className="text-sm lmnt-theme-on-surface-variant mt-1">
                            {notification.message}
                          </p>
                          
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs lmnt-theme-on-surface-variant">
                              {notification.timestamp}
                            </span>
                            
                            {notification.actionLabel && notification.onAction && (
                              <button
                                onClick={notification.onAction}
                                className="text-xs lmnt-theme-secondary hover:underline font-medium"
                              >
                                {notification.actionLabel}
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}