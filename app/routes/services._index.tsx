import type { MetaFunction } from 'react-router'
import { createSeoMeta } from '../components/seo/SeoHeaders'
import { ServicesPage } from '../Custom/pages/Services'

export const meta: MetaFunction = () =>
  createSeoMeta({
    title: 'Услуги при сбое хостинга',
    description:
      'Срочная разработка сайта с нуля, восстановление из копии, переключение домена и защита от простоя.',
    path: '/services',
  })
export default ServicesPage
