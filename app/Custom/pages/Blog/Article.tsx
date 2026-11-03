import type * as React from 'react'
import { Link } from 'react-router'
import { useOpenChatWithMessage } from '../../components/Chat/hooks/useOpenChatWithMessage'
import { useSectionNavigation } from '../../components/SectionNavigation/useSectionNavigation'
import type { PageSection } from '../../components/SectionNavigation'
import { posts } from './index'
import type { Post } from './interfaces'
import { BlogStyled } from './styles'
export const Article: React.FC<
  React.PropsWithChildren<{ post: Post; sections: readonly PageSection[] }>
> = ({ post, sections, children }) => {
  const openChat = useOpenChatWithMessage()
  const chatButton = (
    <button
      type="button"
      className="article-chat-button"
      value="Объясни проще суть материала на этой странице"
      onClick={openChat}
    >
      Обсудить статью с ИИ
    </button>
  )
  const { navigation } = useSectionNavigation({
    sections,
    label: 'Разделы статьи',
    action: chatButton,
  })
  const index = posts.findIndex((item) => item.path === post.path)
  const previous = posts[index - 1]
  const next = posts[index + 1]
  return (
    <>
      {navigation}
      <BlogStyled as="article" className="blog-article" lang="ru">
        <header>
          <Link to={'/blog#' + post.id}>← Хронология блога</Link>
          <p className="eyebrow">
            {post.historical
              ? 'Восстановленная хроника · время исходного сообщения'
              : 'Итоги · время контрольного среза'}
          </p>
          <time dateTime={post.date}>{post.dateLabel}</time>
          <h1 tabIndex={-1}>{post.title}</h1>
          <p>{post.description}</p>
          <p>
            Автор разбора —{' '}
            <Link to="/about" rel="author">
              Николай Ланец
            </Link>
          </p>
          {post.historical && (
            <aside>
              Редакционная реконструкция подготовлена 3 ноября 2026 года. Дата
              выше относится к исходному сообщению. Разбор ограничен сведениями
              того момента; последующие результаты вынесены в отдельную запись.
            </aside>
          )}
        </header>
        <div className="article-body">{children}</div>
        <div className="article-discussion">{chatButton}</div>
        <nav className="post-navigation" aria-label="Соседние записи хроники">
          {previous && (
            <Link to={previous.path}>
              ← {previous.dateLabel} · {previous.title}
            </Link>
          )}
          {next && (
            <Link to={next.path}>
              {next.dateLabel} · {next.title} →
            </Link>
          )}
        </nav>
      </BlogStyled>
    </>
  )
}
