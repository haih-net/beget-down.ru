import type { MetaFunction } from 'react-router'
import { createSeoMeta } from '../components/seo/SeoHeaders'
import { PricesPage } from '../Custom/pages/Prices'
import { serviceOffers } from '../Custom/pages/Services/seo'
export const meta: MetaFunction = () =>
  createSeoMeta({
    title:
      'Цены на восстановление сайта после сбоя Beget — от 20 000 ₽ за проект',
    description:
      'Восстановление из резервной копии и веб-архива, разработка и перенос сайта. От 20 000 рублей за весь проект. Индивидуальное и оперативное обсуждение.',
    path: '/prices',
    offerCatalog: true,
    serviceOffers: serviceOffers(),
    breadcrumbs: [
      { name: 'Главная', path: '/' },
      { name: 'Цены', path: '/prices' },
    ],
  })
export default PricesPage
