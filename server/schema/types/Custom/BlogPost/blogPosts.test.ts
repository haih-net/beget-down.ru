import { createRequire } from 'node:module'
import { expect, it } from 'vitest'
import { schema } from '../../../index'
import { posts } from '../../../../../app/Custom/pages/Blog'
import { blogPosts, readBlogPosts } from './helpers/posts'
import { prepareTool } from '../../../../chat/tools/registry'
import { createToolContext } from '../../../../chat/testing/context'
import { MemoryStorage } from '../../../../chat/testing/MemoryStorage'
const { graphql } = createRequire(import.meta.url)(
  'graphql',
) as typeof import('graphql')

it('filters public posts in chronological order and rejects unknown IDs', () => {
  expect(blogPosts()).toEqual(posts)
  expect(blogPosts({ ids: [] })).toEqual([])
  expect(blogPosts({ ids: [posts[2].id, posts[0].id, posts[0].id] })).toEqual([
    posts[0],
    posts[2],
  ])
  expect(() => blogPosts({ ids: ['missing'] })).toThrow('Unknown blog post IDs')
})

it('reads the same full content through tools and the where-based GraphQL resolver', async () => {
  const ids = [posts[0].id, posts[2].id]
  const details = await readBlogPosts({ ids })
  expect(details[0].content).toContain('https://t.me/beget_official/572')
  expect(details[1].content).toContain('13:28 МСК')
  expect(
    details.every(
      (post) =>
        post.contentFormat === 'html' && post.content.endsWith('</section>'),
    ),
  ).toBe(true)
  const result = await graphql({
    schema,
    source:
      'query Blog($where: BlogPostWhereInput) { blogPosts(where: $where) { id content date historical url } }',
    variableValues: { where: { ids } },
    contextValue: { currentUser: null, req: {} },
  })
  expect(result.errors).toBeUndefined()
  expect(result.data?.blogPosts).toEqual(
    details.map(({ id, content, date, historical, url }) => ({
      id,
      content,
      date,
      historical,
      url,
    })),
  )
  const context = createToolContext({
    storage: new MemoryStorage(),
    chatId: 'blog-test',
    signal: new AbortController().signal,
  })
  const run = (name: string, args: object) =>
    prepareTool({
      id: name,
      type: 'function',
      function: {
        name,
        arguments: JSON.stringify({ reasoning: 'Читаю блог', ...args }),
      },
    }).execute(context)
  expect(JSON.parse(await run('read_blog_posts', { ids }))).toEqual(details)
  expect(JSON.parse(await run('list_blog_posts', {}))).toEqual(
    posts.map(({ id, title, description }) => ({ id, title, description })),
  )
})

it('does not treat an empty detail request as a request for every article', () => {
  expect(() =>
    prepareTool({
      id: 'empty',
      type: 'function',
      function: {
        name: 'read_blog_posts',
        arguments: JSON.stringify({ reasoning: 'Читаю', ids: [] }),
      },
    }),
  ).toThrow('non-empty array')
})
