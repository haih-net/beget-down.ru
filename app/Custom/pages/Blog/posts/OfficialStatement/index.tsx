import type * as React from 'react'
import { Article } from '../../Article'
import { post } from './data'
import { Content } from './Content'
import { sections } from './sections'

export const OfficialStatement: React.FC = () => (
  <Article post={post} sections={sections}>
    <Content />
  </Article>
)
