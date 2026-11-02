import type { MetaFunction } from 'react-router'
import { createSeoMeta, unavailableSeoMeta } from '../components/seo/SeoHeaders'
import type { SeoHandle } from '../components/seo/SeoHeaders'
import { MainPage } from 'app/Custom/pages/MainPage'

export const handle = {
  seo: {
    title: 'Сбой Beget 2 ноября 2026 года — хронология и статус сервисов',
    description:
      'Что происходило с сервисами Beget 2 ноября 2026 года. Хронология сбоя по московскому времени, сообщения провайдера и последние известные данные о восстановлении.',
    path: '/',
    image: undefined,
  },
} satisfies SeoHandle

export const meta: MetaFunction = ({ error }) =>
  error ? unavailableSeoMeta() : createSeoMeta(handle.seo)
export default MainPage
