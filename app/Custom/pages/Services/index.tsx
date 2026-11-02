import type * as React from 'react'
import { Link } from 'react-router'
import { InformationPageStyled } from '../../components/InformationPage/styles'
import { services } from './catalog'

export const ServicesPage: React.FC = () => (
  <InformationPageStyled>
    <h1 tabIndex={-1}>Услуги при сбое хостинга</h1>
    <p>
      Выберите задачу с учётом того, сохранилась ли копия сайта и можете ли вы
      управлять доменом.
    </p>
    {services.map((service) => (
      <section key={service.slug}>
        <h2>
          <Link to={'/services/' + service.slug}>{service.title}</Link>
        </h2>
        <p>{service.summary}</p>
      </section>
    ))}
    <Link to="/about">О разработчике — Николай Ланец</Link>
  </InformationPageStyled>
)
