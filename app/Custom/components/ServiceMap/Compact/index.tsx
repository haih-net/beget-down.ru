import type * as React from 'react'
import type { ServiceMapNode } from '../interfaces'
import { Node } from '../Node'
import { Connection } from '../Connection'
import { CompactStyled } from './styles'

interface CompactProps {
  label: string
  problem: string
  action: string
  result: string
}

export const Compact: React.FC<CompactProps> = ({
  label,
  problem,
  action,
  result,
}) => {
  const nodes: readonly ServiceMapNode[] = [
    { id: 'problem', title: 'Проблема', status: 'unavailable', state: problem },
    { id: 'action', title: 'Что делаем', status: 'action', state: action },
    { id: 'result', title: 'Результат', status: 'available', state: result },
  ]
  return (
    <CompactStyled aria-label={label} role="list">
      {nodes.map((node, index) => (
        <li key={node.id} className="compact-item">
          <Node node={node} headingLevel={3} />
          {index < nodes.length - 1 && (
            <Connection state="connected" layout="compact" />
          )}
        </li>
      ))}
    </CompactStyled>
  )
}
