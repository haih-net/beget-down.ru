import type { MetaFunction } from 'react-router'
import { createSeoMeta } from '../components/seo/SeoHeaders'
import { AboutPage } from '../Custom/pages/About'

export const meta: MetaFunction = () =>
  createSeoMeta({
    title: 'Обо мне — Николай Ланец (Fi1osof)',
    description:
      'Fullstack-разработчик с опытом более 19 лет. Разработка, перенос и восстановление сайтов.',
    path: '/about',
  })
export default AboutPage
