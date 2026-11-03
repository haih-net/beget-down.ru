import { builder } from '../../../builder'
import type { Post } from '../../../../../app/Custom/pages/Blog/interfaces'
import { canonicalUrl } from '../../../../../app/components/seo/site'
import { blogPostContent } from './helpers/posts'
export const BlogPost = builder.objectRef<Post>('BlogPost').implement({
  fields: (t) => ({
    id: t.exposeString('id', { nullable: false }),
    title: t.exposeString('title', { nullable: false }),
    description: t.exposeString('description', { nullable: false }),
    path: t.exposeString('path', { nullable: false }),
    date: t.exposeString('date', { nullable: false }),
    dateLabel: t.exposeString('dateLabel', { nullable: false }),
    published: t.exposeString('published', { nullable: false }),
    historical: t.exposeBoolean('historical', { nullable: false }),
    url: t.string({
      nullable: false,
      resolve: (post) => canonicalUrl(post.path),
    }),
    author: t.string({ nullable: false, resolve: () => 'Николай Ланец' }),
    contentFormat: t.string({ nullable: false, resolve: () => 'html' }),
    content: t.string({ nullable: false, resolve: blogPostContent }),
  }),
})
