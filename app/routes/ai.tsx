import type { MetaFunction } from 'react-router'
import { createSeoMeta } from '../components/seo/SeoHeaders'
import { AiPage } from 'app/Custom/pages/Ai'

export const meta: MetaFunction = () =>
  createSeoMeta({
    title: 'ИИ-помощник',
    description: 'Задайте вопрос ИИ-помощнику сайта «Сбой Beget».',
    path: '/ai',
    noindex: true,
  })
export default AiPage
