import type { MetaFunction } from 'react-router'
import { createSeoMeta } from '../components/seo/SeoHeaders'
import { ContactsPage } from '../Custom/pages/Contacts'
import { contact } from '../Custom/pages/Contacts/data'
export const meta: MetaFunction = () =>
  createSeoMeta({
    title: 'Контакты — Николай Ланец: восстановление сайта после сбоя Beget',
    description:
      'Оперативная связь в Telegram: @Fi1osof. Если быстрого ответа нет — звоните туда же. Форма обратной связи и ИИ-помощник для обсуждения задачи.',
    path: '/contacts',
    pageType: 'ContactPage',
    contact: {
      url: contact.telegram,
      name: 'Николай Ланец — Telegram ' + contact.label,
    },
    breadcrumbs: [
      { name: 'Главная', path: '/' },
      { name: 'Контакты', path: '/contacts' },
    ],
  })
export default ContactsPage
