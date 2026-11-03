import type * as React from 'react'
import { Link } from 'react-router'
import { useSectionNavigation } from '../../components/SectionNavigation/useSectionNavigation'
import { posts } from './index'
import { BlogStyled } from './styles'
const navigationDate = new Intl.DateTimeFormat('ru-RU', {
  timeZone: 'Europe/Moscow',
  day: '2-digit',
  month: 'long',
})
const navigationTime = new Intl.DateTimeFormat('ru-RU', {
  timeZone: 'Europe/Moscow',
  hour: '2-digit',
  minute: '2-digit',
  hourCycle: 'h23',
})
const sections = posts.map((post) => ({
  id: post.id,
  label:
    navigationDate.format(new Date(post.date)) +
    ' ' +
    navigationTime.format(new Date(post.date)).replace(':', '.') +
    ' · ' +
    post.title,
}))
export const BlogPage: React.FC = () => {
  const { navigation } = useSectionNavigation({
    sections,
    label: 'Хронология записей блога',
  })
  return (
    <>
      {navigation}
      <BlogStyled className="blog-index" lang="ru">
        <header>
          <p className="eyebrow">Хроника сбоя Beget</p>
          <h1 tabIndex={-1}>Заявления, прогнозы и результаты</h1>
        </header>
        {posts.map((post) => (
          <article
            id={post.id}
            key={post.path}
            tabIndex={-1}
            className="journal-card"
          >
            <p className="eyebrow">
              {post.historical ? 'Восстановленная хроника' : 'Контрольный срез'}
            </p>
            <time dateTime={post.date}>{post.dateLabel}</time>
            <h2>
              <Link to={post.path}>{post.title}</Link>
            </h2>
            <p>{post.description}</p>
            <Link to={post.path}>Читать статью →</Link>
          </article>
        ))}
      </BlogStyled>
    </>
  )
}
