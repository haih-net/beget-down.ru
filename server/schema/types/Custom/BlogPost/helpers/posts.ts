import { createElement, type FC } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { posts } from '../../../../../../app/Custom/pages/Blog'
import type { Post } from '../../../../../../app/Custom/pages/Blog/interfaces'
import { canonicalUrl } from '../../../../../../app/components/seo/site'
import type { BlogPostWhere } from '../inputs'

const contentLoaders: Record<string, () => Promise<{ Content: FC }>> = {
  'telegram-comments-november-3-2100': () =>
    import('../../../../../../app/Custom/pages/Blog/posts/TelegramComments/Content'),
  'dns-management-november-3-1530': () =>
    import('../../../../../../app/Custom/pages/Blog/posts/IncidentUpdate/Content'),
  'beget-statement-november-2': () =>
    import('../../../../../../app/Custom/pages/Blog/posts/OfficialStatement/Content'),
  'my-response-november-2': () =>
    import('../../../../../../app/Custom/pages/Blog/posts/PersonalForecast/Content'),
  'status-november-3-1328': () =>
    import('../../../../../../app/Custom/pages/Blog/posts/CurrentStatus/Content'),
}

export function blogPosts(where?: BlogPostWhere | null): Post[] {
  if (where?.ids === null || where?.ids === undefined) {
    return posts
  }
  const ids = new Set(where.ids)
  const unknown = [...ids].filter((id) => !posts.some((post) => post.id === id))
  if (unknown.length) {
    throw new Error('Unknown blog post IDs: ' + unknown.join(', '))
  }
  return posts.filter((post) => ids.has(post.id))
}

export async function blogPostContent(post: Post): Promise<string> {
  const load = contentLoaders[post.id]
  if (!load) {
    throw new Error('Blog post content unavailable: ' + post.id)
  }
  const { Content } = await load()
  return renderToStaticMarkup(createElement(Content))
}

export interface BlogPostDetail extends Post {
  url: string
  author: string
  contentFormat: 'html'
  content: string
}

export async function readBlogPosts(
  where: BlogPostWhere,
): Promise<BlogPostDetail[]> {
  return Promise.all(
    blogPosts(where).map(async (post) => ({
      ...post,
      url: canonicalUrl(post.path),
      author: 'Николай Ланец',
      contentFormat: 'html' as const,
      content: await blogPostContent(post),
    })),
  )
}
