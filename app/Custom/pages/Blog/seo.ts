import type { SeoHeadersProps } from '../../../components/seo/SeoHeaders'
import type { Post } from './interfaces'
export const articleSeo = (post: Post): SeoHeadersProps => ({
  title: post.title + ' — Блог о сбое Beget',
  description: post.description,
  path: post.path,
  breadcrumbs: [
    { name: 'Главная', path: '/' },
    { name: 'Блог', path: '/blog' },
    { name: post.title, path: post.path },
  ],
  article: { headline: post.title, published: post.published },
})
