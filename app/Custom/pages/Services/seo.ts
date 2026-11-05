import type { ServiceOffers } from '../../../components/seo/JsonLd/services'
import { projectPrice } from '../../components/ProjectPrice/data'
import { services, type Service } from './catalog'

export const serviceOffers = (
  items: readonly Service[] = services,
): ServiceOffers => ({
  items: items.map((service) => ({
    name: service.title,
    description: service.summary,
    path: '/services/' + service.slug,
  })),
  minimum: projectPrice.minimum,
  currency: projectPrice.currency,
  terms: projectPrice.label + '. ' + projectPrice.terms,
})
