import type { MetaFunction } from 'react-router'
import { createSeoMeta, unavailableSeoMeta } from '../components/seo/SeoHeaders'
import type { SeoHandle } from '../components/seo/SeoHeaders'
import { posts } from '../Custom/pages/Blog'
export const handle = {
  seo: {
    title: 'Хронология сбоя Beget — блог Николая Ланца',
    description:
      'Заявления Beget, личные прогнозы и результаты проверок в хронологическом порядке, с полной датой и временем каждого события.',
    path: '/blog',
    blog: { posts: posts.map((post) => ({ ...post, date: post.published })) },
    breadcrumbs: [
      { name: 'Главная', path: '/' },
      { name: 'Блог', path: '/blog' },
    ],
  },
} satisfies SeoHandle
export const meta: MetaFunction = ({ error }) =>
  error ? unavailableSeoMeta() : createSeoMeta(handle.seo)
// React Router requires a default export at the route integration boundary.
export { BlogPage as default } from '../Custom/pages/Blog/BlogPage'
