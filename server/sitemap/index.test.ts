import { createServer, type Server } from 'node:http'
import type { AddressInfo } from 'node:net'
import express from 'express'
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest'

const { query, database } = vi.hoisted(() => {
  const query = {
    select: vi.fn().mockReturnThis(),
    whereNot: vi.fn().mockReturnThis(),
    orderBy: vi.fn(),
  }
  const database = Object.assign(
    vi.fn(() => query),
    { raw: vi.fn() },
  )
  return { query, database }
})
vi.mock('../database', () => ({ db: database }))
import { site } from '../../app/components/seo/site'
import { services } from '../../app/Custom/pages/Services/catalog'
import { setupSitemap } from './index'

let server: Server
let origin: string
beforeAll(async () => {
  const app = express()
  app.set('trust proxy', true)
  setupSitemap(app)
  server = createServer(app)
  await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve))
  origin = `http://127.0.0.1:${(server.address() as AddressInfo).port}`
})
afterAll(async () => {
  await new Promise<void>((resolve, reject) =>
    server.close((error) => (error ? reject(error) : resolve())),
  )
})

describe('Динамическая карта сайта', () => {
  it('выдаёт единую карту и учитывает HTTPS прокси', async () => {
    query.orderBy.mockResolvedValueOnce([{ uri: '/example' }])
    const response = await fetch(`${origin}/sitemap.xml?check=1`, {
      headers: { 'X-Forwarded-Proto': 'https' },
    })
    expect(response.status).toBe(200)
    expect(response.headers.get('content-type')).toContain('application/xml')
    const xml = await response.text()
    expect(xml).toContain(`<loc>${site.origin}/</loc>`)
    expect(xml).toContain(`<loc>${site.origin}/example</loc>`)
    expect(xml).toContain('<urlset')
    expect(xml).not.toContain('<sitemapindex')
  })

  it('включает главную, страницу автора и каталог услуг, если концептов нет', async () => {
    query.orderBy.mockResolvedValueOnce([])
    const xml = await (await fetch(`${origin}/sitemap.xml`)).text()
    expect(xml).toContain(`<loc>${site.origin}/</loc>`)
    expect(xml.match(/<url>/g)).toHaveLength(3 + services.length)
    expect(xml).not.toContain('<lastmod>')
    expect(xml).not.toContain('/signin')
  })

  it('читает базу заново, фильтрует публикации и экранирует XML', async () => {
    query.orderBy.mockResolvedValueOnce([
      { uri: '/city/a&b?ref=test', updatedAt: '2026-10-01T00:00:00Z' },
      { uri: '/city/a&b?ref=test', updatedAt: '2026-10-01T00:00:00Z' },
      { uri: 'https://other.example/test' },
    ])
    const response = await fetch(`${origin}/sitemap.xml`)
    const xml = await response.text()
    expect(response.headers.get('cache-control')).toBe('no-store')
    expect(database).toHaveBeenCalledWith('KBConcept')
    expect(query.whereNot).toHaveBeenCalledWith('visibility', 'unpublished')
    expect(xml).toContain('/city/a&amp;b</loc>')
    expect(xml).toContain('<lastmod>2026-10-01T00:00:00.000Z</lastmod>')
    expect(xml.match(/<url>/g)).toHaveLength(4 + services.length)
    expect(xml).not.toContain('other.example')
    query.orderBy.mockResolvedValueOnce([{ uri: '/new-page' }])
    const nextXml = await (await fetch(`${origin}/sitemap.xml`)).text()
    expect(nextXml).toContain('/new-page</loc>')
    expect(nextXml).not.toContain('/city/a&amp;b')
  })
})
