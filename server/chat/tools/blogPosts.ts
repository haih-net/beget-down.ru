import {
  blogPosts,
  readBlogPosts,
} from '../../schema/types/Custom/BlogPost/helpers/posts'
import type { ChatTool } from '../types'

export const listBlogPostsTool: ChatTool = {
  definition: {
    type: 'function',
    function: {
      name: 'list_blog_posts',
      description:
        'Получи список записей блога от старых к новым: id, название и описание. Для полного текста используй read_blog_posts.',
      parameters: {
        type: 'object',
        properties: { reasoning: { type: 'string' } },
        required: ['reasoning'],
        additionalProperties: false,
      },
    },
  },
  prepare: ({ reasoning }) => ({
    reasoning,
    execute: async ({ signal }) => {
      signal.throwIfAborted()
      return JSON.stringify(
        blogPosts().map(({ id, title, description }) => ({
          id,
          title,
          description,
        })),
      )
    },
  }),
}

export const readBlogPostsTool: ChatTool = {
  definition: {
    type: 'function',
    function: {
      name: 'read_blog_posts',
      description:
        'Прочитай полные статьи по ID из list_blog_posts. Возвращает HTML с исходными ссылками, автора, даты сообщений/срезов и подготовки, признак восстановленной хроники. Это исторические сведения, а не текущая диагностика.',
      parameters: {
        type: 'object',
        properties: {
          reasoning: { type: 'string' },
          ids: {
            type: 'array',
            items: { type: 'string' },
            minItems: 1,
            description: 'ID одной или нескольких статей из списка блога.',
          },
        },
        required: ['reasoning', 'ids'],
        additionalProperties: false,
      },
    },
  },
  prepare: ({ reasoning, ids }) => {
    if (
      !Array.isArray(ids) ||
      !ids.length ||
      !ids.every((id): id is string => typeof id === 'string' && !!id.trim())
    ) {
      throw new Error('Expected a non-empty array of blog post IDs')
    }
    return {
      reasoning,
      execute: async ({ signal }) => {
        signal.throwIfAborted()
        const result = await readBlogPosts({ ids })
        signal.throwIfAborted()
        return JSON.stringify(result)
      },
    }
  },
}
