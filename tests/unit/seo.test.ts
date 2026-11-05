import { serviceNodes } from '../../app/components/seo/JsonLd/services'
import { createSeoMeta } from '../../app/components/seo/SeoHeaders'
import type { SchemaGraph } from '../../app/components/seo/JsonLd/types'
import { describe, expect, test } from 'vitest'
import { canonicalUrl, site } from '../../app/components/seo/site'
import { serializeJsonLd } from '../../app/components/seo/JsonLd/helpers'
import type { SchemaType } from '../../app/components/seo/JsonLd/types'

describe('canonicalUrl', () => {
  test.each([
    ['/', `${site.origin}/`],
    ['/blog/?ref=test#article', `${site.origin}/blog`],
    ['/blog///', `${site.origin}/blog`],
    [`${site.origin}/example?ref=test`, `${site.origin}/example`],
  ])('normalizes %s', (path: string, expected: string) => {
    expect(canonicalUrl(path)).toBe(expected)
  })

  test.each(['https://other.example/article', '//other.example/article'])(
    'rejects foreign origin %s',
    (path: string) => {
      expect(() => canonicalUrl(path)).toThrow(
        'Canonical pages must belong to the configured site origin',
      )
    },
  )
})

describe('serializeJsonLd', () => {
  test.each([
    '</script><script>alert(1)</script><!--',
    '<!-- & "quotes"',
    'Unicode: café — 日本語',
  ])('safely round-trips %s', (name: string) => {
    const data: SchemaType = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name,
    }
    const serialized: string = serializeJsonLd(data)
    expect(serialized).not.toContain('<')
    expect(JSON.parse(serialized)).toEqual(data)
  })
})

describe('Разметка предложений услуг', () => {
  test('минимальная цена проекта не становится фиксированной ценой', () => {
    const nodes = serviceNodes({
      items: [
        {
          name: 'Восстановление',
          description: 'По снимкам',
          path: '/services/web-archive',
        },
      ],
      minimum: 20000,
      currency: 'RUB',
      terms: 'За весь проект, стоимость обсуждается индивидуально',
    })
    const service = nodes.find((node) => node['@type'] === 'Service')
    const offer = nodes.find((node) => node['@type'] === 'Offer')
    if (!service || !offer) {
      throw new Error('Нет услуги или предложения в графе')
    }
    expect(service.offers).toEqual({ '@id': offer['@id'] })
    expect(offer.itemOffered).toEqual({ '@id': service['@id'] })
    expect(offer.price).toBeUndefined()
    expect(offer.priceSpecification).toMatchObject({
      minPrice: 20000,
      priceCurrency: 'RUB',
    })
    expect(offer.priceSpecification).not.toHaveProperty('price')
  })
  test('граф контактов связан с автором, а ошибочные страницы не публикуют предложения', () => {
    const options = {
      title: 'Контакты',
      description: 'Telegram',
      path: '/contacts',
      pageType: 'ContactPage' as const,
      contact: { url: 'https://t.me/Fi1osof', name: 'Telegram' },
    }
    const tags = createSeoMeta(options)
    const descriptor = tags.find((tag) => 'script:ld+json' in tag)
    const graph = (descriptor as { 'script:ld+json': SchemaGraph })[
      'script:ld+json'
    ]['@graph']
    const person = graph.find((node) => node['@type'] === 'Person')
    if (!person) {
      throw new Error('Нет автора в графе')
    }
    expect(
      graph.find((node) => node['@type'] === 'ContactPage')?.mainEntity,
    ).toEqual({ '@id': person['@id'] })
    expect(new Set(graph.map((node) => node['@id'])).size).toBe(graph.length)
    expect(
      createSeoMeta({ ...options, noindex: true }).some(
        (tag) => 'script:ld+json' in tag,
      ),
    ).toBe(false)
  })
})
