export type ServiceMapStatus =
  'available' | 'unavailable' | 'missing' | 'unknown' | 'action'

export type ServiceMapConnection = 'connected' | 'interrupted'

export interface ServiceMapNode {
  id: string
  title: string
  status: ServiceMapStatus
  state: string
  description?: string
  connection?: ServiceMapConnection
}

export interface ServiceMapStage {
  id: string
  title: string
  description: string
  nodes: readonly ServiceMapNode[]
}

export interface ServiceMapProps {
  title: string
  description: string
  stages: readonly ServiceMapStage[]
  note: string
}
