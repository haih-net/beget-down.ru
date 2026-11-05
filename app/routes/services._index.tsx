import { serviceOffers } from '../Custom/pages/Services/seo'
import type { MetaFunction } from 'react-router'
import { createSeoMeta } from '../components/seo/SeoHeaders'
import { ServicesPage } from '../Custom/pages/Services'

export const meta: MetaFunction = () =>
  createSeoMeta({
    title:
      'Восстановление сайта после сбоя Beget — услуги от 20 000 ₽ за проект',
    description:
      'Восстановление из бэкапа и веб-архива, новый сайт без резервной копии, перенос и DNS, временная страница, независимые копии и резерв. Проект от 20 000 ₽.',
    path: '/services',
    serviceOffers: serviceOffers(),
    offerCatalog: true,
    breadcrumbs: [
      { name: 'Главная', path: '/' },
      { name: 'Услуги', path: '/services' },
    ],
  })
export default ServicesPage
