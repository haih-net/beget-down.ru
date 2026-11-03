import type * as React from 'react'
import { Check, CircleHelp, Minus, Wrench, X } from 'lucide-react'
import type { ServiceMapNode, ServiceMapStatus } from '../interfaces'
import { NodeStyled } from './styles'

interface NodeProps {
  node: ServiceMapNode
  headingLevel?: 3 | 4
}

const statusIcons: Record<ServiceMapStatus, typeof Check> = {
  available: Check,
  unavailable: X,
  missing: Minus,
  unknown: CircleHelp,
  action: Wrench,
}

export const Node: React.FC<NodeProps> = ({ node, headingLevel = 4 }) => {
  const Icon = statusIcons[node.status]
  const Heading = headingLevel === 3 ? 'h3' : 'h4'
  return (
    <NodeStyled data-status={node.status}>
      <div className="node-heading">
        <span className="node-icon">
          <Icon size={18} aria-hidden="true" />
        </span>
        <Heading className="node-title">{node.title}</Heading>
      </div>
      <p className="node-state">{node.state}</p>
      {node.description && (
        <p className="node-description">{node.description}</p>
      )}
    </NodeStyled>
  )
}
