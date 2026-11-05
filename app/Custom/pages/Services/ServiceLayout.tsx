import { ProjectPrice } from '../../components/ProjectPrice'
import type * as React from 'react'
import { Link } from 'react-router'
import type { PageSection } from '../../components/SectionNavigation'
import { useSectionNavigation } from '../../components/SectionNavigation/useSectionNavigation'
import { useAppContext } from '../../hooks/useAppContext'

export const ServiceLayout: React.FC<
  React.PropsWithChildren<{ sections: readonly PageSection[] }>
> = ({ sections, children }) => {
  const { navigation } = useSectionNavigation({
    sections,
    label: 'На странице услуги',
  })
  return (
    <>
      {navigation}
      {children}
    </>
  )
}

export const ServiceContact: React.FC<{ showPrice?: boolean }> = ({
  showPrice = true,
}) => {
  const context = useAppContext()
  return (
    <>
      {showPrice && <ProjectPrice />}
      <footer>
        <h2>Обсудим вашу ситуацию</h2>
        <p>
          Оперативная связь —{' '}
          <Link to="/contacts">Telegram, форма и ИИ-помощник</Link>.
        </p>
        <p>
          Пришлите адрес сайта, опишите проблему и расскажите, какие доступы и
          материалы сохранились. На первом шаге достаточно описания — пароли в
          сообщении не нужны. После уточнения задачи согласуем объём, стоимость
          и порядок работы.
        </p>
        <button
          type="button"
          className="contact-button"
          disabled={!context?.openFeedback}
          onClick={context?.openFeedback}
        >
          Обсудить задачу
        </button>
        <p>
          <Link to="/about">Николай Ланец · 19+ лет в веб-разработке</Link>
        </p>
        <Link to="/services">← Выбрать другую услугу</Link>
      </footer>
    </>
  )
}
