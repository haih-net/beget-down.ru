import type * as React from 'react'
import { Link } from 'react-router'
import { useAppContext } from '../../hooks/useAppContext'
import { useOpenChatWithMessage } from '../../components/Chat/hooks/useOpenChatWithMessage'
import { ProjectPrice } from '../../components/ProjectPrice'
import { contact } from './data'
import { ContactsStyled } from './styles'

export const ContactsPage: React.FC = () => {
  const context = useAppContext()
  const openChat = useOpenChatWithMessage()
  return (
    <ContactsStyled>
      <p>На связи — Николай Ланец</p>
      <h1>Контакты</h1>
      <p className="lead">
        Сайт не работает или нужно запустить его заново? Расскажите, что
        случилось. Оперативно обсудим вашу задачу, доступные варианты, стоимость
        и начало работ.
      </p>
      <div className="telegram">
        <h2>Для оперативной связи — Telegram</h2>
        <p>
          Напишите мне адрес сайта и коротко опишите ситуацию. Если я не ответил
          оперативно, звоните туда же, в Telegram.
        </p>
        <a href={contact.telegram} target="_blank" rel="noopener noreferrer">
          Написать {contact.label} ↗
        </a>
      </div>
      <div className="channels">
        <section className="channel">
          <h2>Оставить заявку</h2>
          <p>
            Укажите удобный способ связи и задачу в форме обратной связи. Можно
            начать с краткого описания — техническое задание заранее не
            требуется.
          </p>
          <button
            type="button"
            onClick={context?.openFeedback}
            disabled={!context?.openFeedback}
          >
            Открыть форму
          </button>
        </section>
        <section className="channel">
          <h2>Сначала обсудить с ИИ</h2>
          <p>
            Помощник на сайте поможет предварительно разобраться в вопросах и
            описать задачу. Ему также можно сообщить свои контакты и удобный
            способ связи.
          </p>
          <p>Если вопрос срочный, напишите или позвоните мне в Telegram.</p>
          <button
            type="button"
            onClick={openChat}
            value="Хочу обсудить восстановление сайта и оставить контакты для связи"
          >
            Обсудить с ИИ
          </button>
        </section>
      </div>
      <section>
        <h2>Что написать в первом сообщении</h2>
        <p>
          Адрес сайта, что перестало работать и какой результат нужен сейчас.
          Уточните, есть ли доступ к домену, резервная копия или сохранившиеся
          материалы. Если не знаете — так и напишите, разберёмся вместе.
        </p>
        <p>
          Пароли в первом сообщении не нужны. Способ предоставления необходимых
          доступов согласуем отдельно.
        </p>
      </section>
      <ProjectPrice />
      <Link to="/services">Посмотреть услуги →</Link>
    </ContactsStyled>
  )
}
