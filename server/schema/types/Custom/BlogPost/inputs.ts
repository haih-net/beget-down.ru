import { builder } from '../../../builder'
export const BlogPostWhereInput = builder.inputType('BlogPostWhereInput', {
  fields: (t) => ({ ids: t.stringList() }),
})
export type BlogPostWhere = typeof BlogPostWhereInput.$inferInput
