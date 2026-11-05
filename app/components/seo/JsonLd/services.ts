import type { SchemaNode } from './types'
import { author, canonicalUrl } from '../site'

export interface ServiceDescription {
  name: string
  description: string
  path: string
}
export interface ServiceOffers {
  items: readonly ServiceDescription[]
  minimum: number
  currency: string
  terms: string
}

export function serviceNodes(offers: ServiceOffers): SchemaNode[] {
  return offers.items.flatMap((service) => {
    const url = canonicalUrl(service.path)
    return [
      {
        '@type': 'Service',
        '@id': url + '#service',
        name: service.name,
        description: service.description,
        url,
        serviceType: service.name,
        provider: { '@id': author['@id'] },
        mainEntityOfPage: { '@id': url + '#webpage' },
        offers: { '@id': url + '#offer' },
      },
      {
        '@type': 'Offer',
        '@id': url + '#offer',
        url,
        name: service.name,
        description: offers.terms,
        seller: { '@id': author['@id'] },
        itemOffered: { '@id': url + '#service' },
        priceSpecification: {
          '@type': 'PriceSpecification',
          minPrice: offers.minimum,
          priceCurrency: offers.currency,
          description: offers.terms,
        },
      },
    ]
  })
}
