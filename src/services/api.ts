// Mock API Service with realistic data

export interface Squad {
  id: string
  name: string
  owner: string
  budget: number
}

export interface FinancialData {
  squadId: string
  timeSeries: {
    date: string
    actual: number
    forecast: number
    budget: number
  }[]
  breakdown: {
    costCenter: { name: string; value: number; color: string }[]
    service: { name: string; value: number; color: string }[]
  }
  summary: {
    currentMonth: number
    forecast: number
    avgDaily: number
  }
}

export interface Anomaly {
  id: string
  squadId: string
  title: string
  description: string
  severity: 'high' | 'medium' | 'low'
  confidence: number
  impact: number
  timestamp: string
  status: 'open' | 'acknowledged' | 'resolved'
  rootCause: string[]
  evidence: { name: string; url: string }[]
}

export interface Charge {
  id: string
  service: string
  amount: number
  timestamp: string
  account: string
  costCenter: string
  tags: string[]
  resource: string
  squadId: string
}

export interface Integration {
  id: string
  name: string
  status: 'connected' | 'error' | 'syncing' | 'disconnected'
  lastSync: string | null
  nextSync?: string
  recordsProcessed?: number
  dataSource: 'CloudBilling' | 'PlatformCostCenter' | 'CICDChargeEvents'
}

export interface Annotation {
  id: string
  squadId: string
  recordId: string
  text: string
  user: string
  timestamp: string
}

export interface Chargeback {
  id: string
  squadId: string
  amount: number
  reason: string
  tickets: string[]
  status: 'pending' | 'approved' | 'rejected'
  createdAt: string
}

export type UserRole = 'squad_lead' | 'finops' | 'viewer'

// Generate 90 days of time series data
const generateTimeSeries = (squadId: string) => {
  const data = []
  const today = new Date()
  const baseSpend = squadId === 'squad-1' ? 4000 : squadId === 'squad-2' ? 3500 : 3000
  
  for (let i = 89; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    
    const variance = Math.random() * 0.3 - 0.15
    const trend = (90 - i) / 90 * 0.2
    const actual = Math.round(baseSpend * (1 + variance + trend))
    const forecast = Math.round(actual * (1 + Math.random() * 0.1))
    const budget = Math.round(baseSpend * 1.15)
    
    data.push({
      date: date.toISOString().split('T')[0],
      actual,
      forecast,
      budget
    })
  }
  
  return data
}

// Mock data storage
let mockSquads: Squad[] = [
  { id: 'squad-1', name: 'Platform Engineering', owner: 'Sarah Chen', budget: 175000 },
  { id: 'squad-2', name: 'Data Science', owner: 'Michael Rodriguez', budget: 150000 },
  { id: 'squad-3', name: 'Mobile Apps', owner: 'Jennifer Kim', budget: 120000 },
  { id: 'squad-4', name: 'Infrastructure', owner: 'David Thompson', budget: 200000 }
]

let mockAnomalies: Anomaly[] = [
  {
    id: 'anom-1',
    squadId: 'squad-1',
    title: 'Unusual EC2 spike in us-east-1',
    description: '3x normal compute usage detected',
    severity: 'high',
    confidence: 92,
    impact: 12500,
    timestamp: '2 hours ago',
    status: 'open',
    rootCause: [
      'Resource utilization increased by 320% in the last 6 hours',
      'No corresponding increase in application traffic detected',
      'Similar pattern detected in staging environment 2 days ago'
    ],
    evidence: [
      { name: 'EC2 CloudWatch Metrics (6h)', url: '#' },
      { name: 'Cost & Usage Report Export', url: '#' }
    ]
  },
  {
    id: 'anom-2',
    squadId: 'squad-1',
    title: 'Duplicate RDS instances running',
    description: '2 identical database configurations',
    severity: 'medium',
    confidence: 87,
    impact: 4200,
    timestamp: '5 hours ago',
    status: 'open',
    rootCause: [
      'Two RDS instances with identical configurations detected',
      'Both instances actively processing queries',
      'No load balancing configuration found'
    ],
    evidence: [
      { name: 'RDS Configuration Comparison', url: '#' },
      { name: 'Query Log Analysis', url: '#' }
    ]
  },
  {
    id: 'anom-3',
    squadId: 'squad-2',
    title: 'Untagged GPU instances in ml-training',
    description: '8 instances missing cost allocation tags',
    severity: 'medium',
    confidence: 95,
    impact: 8900,
    timestamp: '1 day ago',
    status: 'acknowledged',
    rootCause: [
      'GPU instances launched without required tags',
      'Cost center allocation unclear',
      'Automated tagging policy not enforced'
    ],
    evidence: [
      { name: 'Resource Tag Audit', url: '#' }
    ]
  },
  {
    id: 'anom-4',
    squadId: 'squad-3',
    title: 'S3 storage costs increasing',
    description: 'Storage growing 15% week over week',
    severity: 'low',
    confidence: 78,
    impact: 2100,
    timestamp: '3 days ago',
    status: 'open',
    rootCause: [
      'No lifecycle policies configured',
      'Old snapshots not being deleted',
      'Test data accumulating in dev buckets'
    ],
    evidence: [
      { name: 'S3 Bucket Analysis', url: '#' }
    ]
  }
]

let mockCharges: Charge[] = [
  { id: 'charge-1', service: 'EC2 Instances', amount: 12500, timestamp: '2 hours ago', account: 'prod-us-east-1', costCenter: 'Platform-001', tags: ['production', 'web'], resource: 'i-0abc123', squadId: 'squad-1' },
  { id: 'charge-2', service: 'RDS Database', amount: 8900, timestamp: '5 hours ago', account: 'prod-us-west-2', costCenter: 'Platform-001', tags: ['production', 'database'], resource: 'db-prod-main', squadId: 'squad-1' },
  { id: 'charge-3', service: 'S3 Storage', amount: 3200, timestamp: '8 hours ago', account: 'prod-us-east-1', costCenter: 'Platform-002', tags: ['production', 'storage'], resource: 'bucket-assets', squadId: 'squad-1' },
  { id: 'charge-4', service: 'Lambda Invocations', amount: 1800, timestamp: '12 hours ago', account: 'prod-eu-west-1', costCenter: 'Platform-001', tags: ['production', 'serverless'], resource: 'func-api-handler', squadId: 'squad-1' },
  { id: 'charge-5', service: 'CloudFront', amount: 2100, timestamp: '1 day ago', account: 'global', costCenter: 'Platform-002', tags: ['production', 'cdn'], resource: 'dist-E123ABC', squadId: 'squad-1' },
  { id: 'charge-6', service: 'GPU Instances', amount: 15600, timestamp: '3 hours ago', account: 'ml-us-east-1', costCenter: 'DataScience-001', tags: ['ml', 'training'], resource: 'p3.8xlarge', squadId: 'squad-2' },
  { id: 'charge-7', service: 'SageMaker', amount: 9200, timestamp: '6 hours ago', account: 'ml-us-west-2', costCenter: 'DataScience-001', tags: ['ml', 'notebook'], resource: 'notebook-research', squadId: 'squad-2' },
  { id: 'charge-8', service: 'S3 ML Storage', amount: 4500, timestamp: '10 hours ago', account: 'ml-us-east-1', costCenter: 'DataScience-002', tags: ['ml', 'datasets'], resource: 'bucket-datasets', squadId: 'squad-2' },
  { id: 'charge-9', service: 'Mobile Backend', amount: 6700, timestamp: '4 hours ago', account: 'prod-us-east-1', costCenter: 'Mobile-001', tags: ['mobile', 'api'], resource: 'ecs-mobile-api', squadId: 'squad-3' },
  { id: 'charge-10', service: 'App Distribution', amount: 1200, timestamp: '7 hours ago', account: 'global', costCenter: 'Mobile-001', tags: ['mobile', 'cdn'], resource: 'cloudfront-mobile', squadId: 'squad-3' }
]

let mockIntegrations: Integration[] = [
  {
    id: 'int-1',
    name: 'AWS Cost & Usage Reports',
    status: 'connected',
    lastSync: '5 minutes ago',
    nextSync: 'in 25 minutes',
    recordsProcessed: 45821,
    dataSource: 'CloudBilling'
  },
  {
    id: 'int-2',
    name: 'Internal Cost Center Database',
    status: 'connected',
    lastSync: '10 minutes ago',
    nextSync: 'in 20 minutes',
    recordsProcessed: 1247,
    dataSource: 'PlatformCostCenter'
  },
  {
    id: 'int-3',
    name: 'CI/CD Pipeline Charges',
    status: 'syncing',
    lastSync: '2 hours ago',
    recordsProcessed: 892,
    dataSource: 'CICDChargeEvents'
  },
  {
    id: 'int-4',
    name: 'GCP Billing Export',
    status: 'error',
    lastSync: '2 days ago',
    recordsProcessed: 0,
    dataSource: 'CloudBilling'
  }
]

let mockAnnotations: Annotation[] = []
let mockChargebacks: Chargeback[] = []

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// API Functions
export const api = {
  async getSquads(): Promise<Squad[]> {
    await delay(300)
    return mockSquads
  },

  async getFinancials(squadId: string, start: string, end: string): Promise<FinancialData> {
    await delay(500)
    
    const timeSeries = generateTimeSeries(squadId)
    const filtered = timeSeries.filter(d => d.date >= start && d.date <= end)
    
    return {
      squadId,
      timeSeries: filtered,
      breakdown: {
        costCenter: [
          { name: 'Platform-001', value: 45200, color: '#de0043' },
          { name: 'Platform-002', value: 32100, color: '#00bcff' },
          { name: 'Platform-003', value: 28900, color: '#ff9800' },
          { name: 'Shared', value: 18800, color: '#4caf50' }
        ],
        service: [
          { name: 'Compute', value: 45200, color: '#de0043' },
          { name: 'Storage', value: 32100, color: '#00bcff' },
          { name: 'Database', value: 28900, color: '#ff9800' },
          { name: 'Network', value: 12800, color: '#4caf50' },
          { name: 'Other', value: 6000, color: '#9c27b0' }
        ]
      },
      summary: {
        currentMonth: 125000,
        forecast: 135000,
        avgDaily: 4167
      }
    }
  },

  async getAnomalies(squadId?: string): Promise<Anomaly[]> {
    await delay(300)
    if (squadId) {
      return mockAnomalies.filter(a => a.squadId === squadId)
    }
    return mockAnomalies
  },

  async updateAnomalyStatus(id: string, status: 'open' | 'acknowledged' | 'resolved'): Promise<Anomaly> {
    await delay(400)
    const anomaly = mockAnomalies.find(a => a.id === id)
    if (!anomaly) throw new Error('Anomaly not found')
    anomaly.status = status
    return anomaly
  },

  async createAnnotation(data: Omit<Annotation, 'id' | 'timestamp'>): Promise<Annotation> {
    await delay(500)
    const annotation: Annotation = {
      ...data,
      id: `ann-${Date.now()}`,
      timestamp: new Date().toISOString()
    }
    mockAnnotations.push(annotation)
    return annotation
  },

  async createChargeback(data: Omit<Chargeback, 'id' | 'status' | 'createdAt'>): Promise<Chargeback> {
    await delay(600)
    const chargeback: Chargeback = {
      ...data,
      id: `cb-${Date.now()}`,
      status: 'pending',
      createdAt: new Date().toISOString()
    }
    mockChargebacks.push(chargeback)
    return chargeback
  },

  async getCharges(squadId?: string): Promise<Charge[]> {
    await delay(300)
    if (squadId) {
      return mockCharges.filter(c => c.squadId === squadId)
    }
    return mockCharges
  },

  async updateChargeCostCenter(id: string, costCenter: string): Promise<Charge> {
    await delay(400)
    const charge = mockCharges.find(c => c.id === id)
    if (!charge) throw new Error('Charge not found')
    charge.costCenter = costCenter
    return charge
  },

  async getIntegrations(): Promise<Integration[]> {
    await delay(300)
    return mockIntegrations
  },

  async connectIntegration(id: string): Promise<{ success: boolean; message: string }> {
    await delay(1500)
    const integration = mockIntegrations.find(i => i.id === id)
    if (!integration) throw new Error('Integration not found')
    
    // Simulate random success/failure
    const success = Math.random() > 0.3
    if (success) {
      integration.status = 'connected'
      integration.lastSync = 'just now'
      return { success: true, message: 'Integration connected successfully' }
    } else {
      integration.status = 'error'
      return { success: false, message: 'Failed to authenticate. Please check credentials.' }
    }
  },

  async refreshIntegration(id: string): Promise<void> {
    await delay(800)
    const integration = mockIntegrations.find(i => i.id === id)
    if (!integration) throw new Error('Integration not found')
    integration.lastSync = 'just now'
    integration.recordsProcessed = (integration.recordsProcessed || 0) + Math.floor(Math.random() * 100)
  }
}

// User role management
let currentUserRole: UserRole = 'squad_lead'

export const setUserRole = (role: UserRole) => {
  currentUserRole = role
}

export const getUserRole = (): UserRole => {
  return currentUserRole
}

export const canPerformAction = (action: 'write' | 'annotate' | 'chargeback' | 'admin'): boolean => {
  const permissions = {
    squad_lead: ['write', 'annotate', 'chargeback'],
    finops: ['write', 'annotate', 'chargeback', 'admin'],
    viewer: []
  }
  return permissions[currentUserRole].includes(action)
}