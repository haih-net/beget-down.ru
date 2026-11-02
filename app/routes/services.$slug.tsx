import {
  useLoaderData,
  type LoaderFunctionArgs,
  type MetaFunction,
} from 'react-router'
import { services } from '../Custom/pages/Services/catalog'
import { ServicePage } from '../Custom/pages/Services/Service'
import { createSeoMeta, unavailableSeoMeta } from '../components/seo/SeoHeaders'

export const loader = ({ params }: LoaderFunctionArgs) => {
  const service = services.find((item) => item.slug === params.slug)
  if (!service) {
    throw new Response('Услуга не найдена', { status: 404 })
  }
  return service
}
export const meta: MetaFunction<typeof loader> = ({ loaderData, error }) =>
  error || !loaderData
    ? unavailableSeoMeta()
    : createSeoMeta({
        title: loaderData.title,
        description: loaderData.summary,
        path: '/services/' + loaderData.slug,
      })

export default function ServiceRoute() {
  return <ServicePage service={useLoaderData<typeof loader>()} />
}
