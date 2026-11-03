import { builder } from '../../../../builder'
import { BlogPostWhereInput } from '../inputs'
import { BlogPost } from '../types'
import { blogPosts } from '../helpers/posts'

builder.queryField('blogPosts', (t) =>
  t.field({
    type: [BlogPost],
    nullable: false,
    args: { where: t.arg({ type: BlogPostWhereInput }) },
    resolve: (_root, { where }) => blogPosts(where),
  }),
)
