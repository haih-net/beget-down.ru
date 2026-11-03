import type * as React from 'react'
import { useId } from 'react'
import type { ServiceMapProps } from './interfaces'
import { Stage } from './Stage'
import { ServiceMapStyled } from './styles'

export const ServiceMap: React.FC<ServiceMapProps> = ({
  title,
  description,
  stages,
  note,
}) => {
  const titleId = useId()
  return (
    <ServiceMapStyled aria-labelledby={titleId}>
      <div className="map-introduction">
        <p className="map-label">Карта решения</p>
        <h2 id={titleId} className="map-title">
          {title}
        </h2>
        <p className="map-description">{description}</p>
      </div>
      <div className="map-stages">
        {stages.map((stage, index) => (
          <Stage key={stage.id} stage={stage} number={index + 1} />
        ))}
      </div>
      <p className="map-note">{note}</p>
    </ServiceMapStyled>
  )
}
