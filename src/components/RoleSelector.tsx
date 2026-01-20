import React from 'react'
import { Shield } from 'lucide-react'
import { UserRole } from '../services/api'

interface RoleSelectorProps {
  currentRole: UserRole
  onRoleChange: (role: UserRole) => void
}

export default function RoleSelector({ currentRole, onRoleChange }: RoleSelectorProps) {
  const roles: { value: UserRole; label: string; description: string }[] = [
    { value: 'squad_lead', label: 'Squad Lead', description: 'Can annotate, create chargebacks' },
    { value: 'finops', label: 'FinOps Admin', description: 'Full access to all features' },
    { value: 'viewer', label: 'Viewer', description: 'Read-only access' }
  ]

  return (
    <div className="flex items-center gap-2">
      <Shield className="w-4 h-4 lmnt-theme-on-surface-variant" />
      <select
        value={currentRole}
        onChange={(e) => onRoleChange(e.target.value as UserRole)}
        className="px-3 py-1.5 rounded-lg lmnt-theme-surface-variant-bg lmnt-theme-on-surface border lmnt-theme-divider-primary focus:outline-none focus:ring-2 focus:ring-bayer-primary-400 text-sm"
        title={roles.find(r => r.value === currentRole)?.description}
      >
        {roles.map(role => (
          <option key={role.value} value={role.value}>
            {role.label}
          </option>
        ))}
      </select>
    </div>
  )
}