import { site, canonicalUrl } from '../../app/components/seo/site'
import { services } from '../../app/Custom/pages/Services/catalog'
import type { Express, Request, Response } from 'express'
import { db } from '../database'

interface SitemapItem {
  uri: string
  updatedAt?: Date | string
}

function escapeXml(value: string): string {
  return value.replace(/[<>&"']/g, (character) => {
    const entities: Record<string, string> = {
      '<': '&lt;',
      '>': '&gt;',
      '&': '&amp;',
      '"': '&quot;',
      "'": '&apos;',
    }
    return entities[character]
  })
}

function generateUrls(items: SitemapItem[]): string {
  const urls = new Map<string, SitemapItem>()
  for (const item of items) {
    const url = URL.parse(item.uri, site.origin)
    if (url?.origin !== site.origin) {
      continue
    }
    urls.set(canonicalUrl(url.href), item)
  }
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${Array.from(urls, ([url, item]) => {
  const lastmod = item.updatedAt
    ? `<lastmod>${new Date(item.updatedAt).toISOString()}</lastmod>`
    : ''
  return `  <url><loc>${escapeXml(url)}</loc>${lastmod}</url>`
}).join('\n')}
</urlset>`
}

async function generateSitemap(_req: Request, res: Response): Promise<void> {
  const concepts = await db('KBConcept')
    .select<SitemapItem[]>(
      db.raw(`COALESCE(NULLIF("uri", ''),
        (SELECT "path" FROM "SiteRoute" WHERE "kBConceptId" = "KBConcept"."id" LIMIT 1),
        '/concepts/' || "id") AS "uri"`),
      'updatedAt',
    )
    .whereNot('visibility', 'unpublished')
    .orderBy('updatedAt', 'desc')
  const xml = generateUrls([
    { uri: '/' },
    { uri: '/about' },
    { uri: '/services' },
    ...services.map((service) => ({ uri: '/services/' + service.slug })),
    ...concepts,
  ])
  res.set('Cache-Control', 'no-store').type('application/xml').send(xml)
}

export function setupSitemap(app: Express): void {
  app.get('/sitemap.xml', generateSitemap)
}
