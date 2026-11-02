import type * as React from 'react'
import { Link } from 'react-router'
import { InformationPageStyled } from '../../components/InformationPage/styles'
import { useAppContext } from '../../hooks/useAppContext'
import type { Service } from './catalog'

export const ServicePage: React.FC<{ service: Service }> = ({ service }) => {
  const context = useAppContext()
  return (
    <InformationPageStyled>
      <Link to="/services">← Все услуги</Link>
      <h1 tabIndex={-1}>{service.title}</h1>
      <p>{service.summary}</p>
      <h2>Что понадобится</h2>
      <p>{service.requirements}</p>
      <h2>Как пройдёт работа</h2>
      <p>{service.work}</p>
      <h2>Что вы получите</h2>
      <p>{service.result}</p>
      <p>
        <Link to="/about">Николай Ланец · 19+ лет в веб-разработке</Link>
      </p>
      <button
        type="button"
        disabled={!context?.openFeedback}
        onClick={context?.openFeedback}
      >
        Обсудить задачу
      </button>
    </InformationPageStyled>
  )
}
