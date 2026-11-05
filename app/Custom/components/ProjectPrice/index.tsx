import type * as React from 'react'
import { Link } from 'react-router'
import { projectPrice } from './data'
import { ProjectPriceStyled } from './styles'

export const ProjectPrice: React.FC<{ details?: boolean }> = ({
  details = true,
}) => (
  <ProjectPriceStyled aria-label="Стоимость проекта">
    <div className="price-copy">
      <strong className="price-label">{projectPrice.label}</strong>
      <p>{projectPrice.terms}</p>
    </div>
    <Link to={details ? '/prices' : '/contacts'}>
      {details ? 'Как определяется стоимость →' : 'Обсудить проект →'}
    </Link>
  </ProjectPriceStyled>
)
