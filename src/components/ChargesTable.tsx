import React, { useState } from 'react'
import { ArrowUpDown, Edit2, Check, X, Tag } from 'lucide-react'

interface Charge {
  id: string
  service: string
  amount: number
  timestamp: string
  account: string
  costCenter: string
  tags: string[]
  resource: string
}

interface ChargesTableProps {
  charges: Charge[]
  onUpdateCostCenter?: (id: string, costCenter: string) => void
}

type SortField = 'service' | 'amount' | 'timestamp' | 'account' | 'costCenter'
type SortDirection = 'asc' | 'desc'

export default function ChargesTable({ charges, onUpdateCostCenter }: ChargesTableProps) {
  const [sortField, setSortField] = useState<SortField>('timestamp')
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editValue, setEditValue] = useState('')

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const sortedCharges = [...charges].sort((a, b) => {
    let aVal: any = a[sortField]
    let bVal: any = b[sortField]

    if (sortField === 'amount') {
      aVal = parseFloat(aVal)
      bVal = parseFloat(bVal)
    }

    if (sortDirection === 'asc') {
      return aVal > bVal ? 1 : -1
    } else {
      return aVal < bVal ? 1 : -1
    }
  })

  const startEdit = (charge: Charge) => {
    setEditingId(charge.id)
    setEditValue(charge.costCenter)
  }

  const saveEdit = (id: string) => {
    if (onUpdateCostCenter) {
      onUpdateCostCenter(id, editValue)
    }
    setEditingId(null)
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditValue('')
  }

  const SortButton = ({ field, label }: { field: SortField; label: string }) => (
    <button
      onClick={() => handleSort(field)}
      className="flex items-center gap-1 hover:lmnt-theme-on-surface transition-colors"
    >
      <span>{label}</span>
      <ArrowUpDown className={`w-4 h-4 ${sortField === field ? 'lmnt-theme-primary' : 'lmnt-theme-on-surface-variant'}`} />
    </button>
  )

  return (
    <div className="lmnt-theme-surface-bg rounded-lg border lmnt-theme-divider-primary overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="lmnt-theme-surface-variant-bg">
            <tr>
              <th className="text-left py-3 px-4 font-semibold lmnt-theme-on-surface">
                <SortButton field="service" label="Service" />
              </th>
              <th className="text-left py-3 px-4 font-semibold lmnt-theme-on-surface">
                Resource
              </th>
              <th className="text-right py-3 px-4 font-semibold lmnt-theme-on-surface">
                <SortButton field="amount" label="Amount" />
              </th>
              <th className="text-left py-3 px-4 font-semibold lmnt-theme-on-surface">
                <SortButton field="account" label="Account" />
              </th>
              <th className="text-left py-3 px-4 font-semibold lmnt-theme-on-surface">
                <SortButton field="costCenter" label="Cost Center" />
              </th>
              <th className="text-left py-3 px-4 font-semibold lmnt-theme-on-surface">
                Tags
              </th>
              <th className="text-left py-3 px-4 font-semibold lmnt-theme-on-surface">
                <SortButton field="timestamp" label="Time" />
              </th>
            </tr>
          </thead>
          <tbody className="divide-y lmnt-theme-divider-primary">
            {sortedCharges.map((charge) => (
              <tr key={charge.id} className="hover:lmnt-theme-surface-variant-bg transition-colors">
                <td className="py-3 px-4 lmnt-theme-on-surface font-medium">{charge.service}</td>
                <td className="py-3 px-4 lmnt-theme-on-surface-variant text-sm">{charge.resource}</td>
                <td className="py-3 px-4 text-right lmnt-theme-on-surface font-semibold">
                  ${charge.amount.toLocaleString()}
                </td>
                <td className="py-3 px-4 lmnt-theme-on-surface-variant text-sm">{charge.account}</td>
                <td className="py-3 px-4">
                  {editingId === charge.id ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className="px-2 py-1 text-sm rounded lmnt-theme-surface-variant-bg lmnt-theme-on-surface border lmnt-theme-divider-primary focus:outline-none focus:ring-2 focus:ring-bayer-primary-400"
                        autoFocus
                      />
                      <button
                        onClick={() => saveEdit(charge.id)}
                        className="p-1 rounded hover:lmnt-theme-surface-variant-bg text-bayer-secondary-500"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="p-1 rounded hover:lmnt-theme-surface-variant-bg text-bayer-primary-400"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className="lmnt-theme-on-surface text-sm">{charge.costCenter}</span>
                      <button
                        onClick={() => startEdit(charge)}
                        className="p-1 rounded hover:lmnt-theme-surface-variant-bg lmnt-theme-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Edit2 className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-1 flex-wrap">
                    {charge.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs lmnt-theme-surface-variant-bg lmnt-theme-on-surface"
                      >
                        <Tag className="w-3 h-3" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="py-3 px-4 lmnt-theme-on-surface-variant text-sm">{charge.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}