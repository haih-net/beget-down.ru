import { readRegistry } from './probes'

interface RdapEntity {
  roles?: string[]
  handle?: string
  vcardArray?: [string, [string, unknown, string, unknown][]]
}

let bootstrap: { loaded: number; services: [string[], string[]][] } | undefined

async function readRdap(domain: string): Promise<string> {
  const signal = AbortSignal.timeout(6000)
  if (!bootstrap || Date.now() - bootstrap.loaded > 86400000) {
    const response = await fetch('https://data.iana.org/rdap/dns.json', {
      signal,
    })
    if (!response.ok) {
      throw new Error('Не удалось получить список RDAP-сервисов IANA')
    }
    const data = (await response.json()) as { services: [string[], string[]][] }
    bootstrap = { loaded: Date.now(), services: data.services }
  }
  const tld = domain.slice(domain.lastIndexOf('.') + 1)
  const base = bootstrap.services
    .find(([zones]) => zones.includes(tld))?.[1]
    .find((url) => url.startsWith('https://'))
  if (!base) {
    throw new Error('Для этой зоны IANA не указывает HTTPS-сервис RDAP')
  }
  const response = await fetch(base.replace(/\/$/, '') + '/domain/' + domain, {
    signal,
  })
  if (!response.ok) {
    throw new Error('Запрос в реестр RDAP вернул HTTP ' + response.status)
  }
  const record = (await response.json()) as { entities?: RdapEntity[] }
  const registrar = record.entities?.find((entity) =>
    entity.roles?.includes('registrar'),
  )
  const name = registrar?.vcardArray?.[1]?.find(
    (field) => field[0] === 'fn',
  )?.[3]
  if (typeof name === 'string' && name) {
    return name
  }
  if (registrar?.handle) {
    return registrar.handle
  }
  throw new Error('Реестр не указал регистратора')
}

export async function registrarInfo(
  domain: string,
  glue: Map<string, string[]>,
): Promise<string> {
  if (!/\.(ru|xn--p1ai)$/.test(domain)) {
    return readRdap(domain)
  }
  const body = await readRegistry(domain)
  const registrar = /^registrar:\s*(\S+)/im.exec(body)?.[1]
  if (!registrar) {
    throw new Error('WHOIS не предоставил сведения о регистраторе')
  }
  for (const match of body.matchAll(/^nserver:[ \t]*(.+)$/gim)) {
    const [name, ...addresses] = match[1].trim().split(/\s+/)
    glue.set(name.replace(/\.$/, '').toLowerCase(), addresses)
  }
  const state = /^state:[ \t]*(.+)$/im.exec(body)?.[1].trim()
  return [registrar, state, ...glue.keys()].filter(Boolean).join(' · ')
}
