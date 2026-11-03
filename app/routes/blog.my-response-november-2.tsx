import type { MetaFunction } from 'react-router'
import { createSeoMeta, unavailableSeoMeta } from '../components/seo/SeoHeaders'
import { articleSeo } from '../Custom/pages/Blog/seo'
import { post } from '../Custom/pages/Blog/posts/PersonalForecast/data'
export const handle = { seo: articleSeo(post) }
export const meta: MetaFunction = ({ error }) =>
  error ? unavailableSeoMeta() : createSeoMeta(handle.seo)
// React Router requires a default export at the route integration boundary.
export { PersonalForecast as default } from '../Custom/pages/Blog/posts/PersonalForecast'
