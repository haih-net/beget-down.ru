import type * as React from 'react'
import { useId } from 'react'
import type { ServiceMapStage } from '../interfaces'
import { Node } from '../Node'
import { Connection } from '../Connection'
import { StageStyled } from './styles'

interface StageProps {
  stage: ServiceMapStage
  number: number
}

export const Stage: React.FC<StageProps> = ({ stage, number }) => {
  const titleId = useId()
  return (
    <StageStyled role="group" aria-labelledby={titleId}>
      <div className="stage-heading">
        <span className="stage-number" aria-hidden="true">
          {String(number).padStart(2, '0')}
        </span>
        <div>
          <h3 id={titleId} className="stage-title">
            {stage.title}
          </h3>
          <p className="stage-description">{stage.description}</p>
        </div>
      </div>
      <ol className="stage-nodes">
        {stage.nodes.map((node, index) => (
          <li key={node.id} className="stage-item">
            <Node node={node} />
            {node.connection && index < stage.nodes.length - 1 && (
              <Connection state={node.connection} />
            )}
          </li>
        ))}
      </ol>
    </StageStyled>
  )
}
