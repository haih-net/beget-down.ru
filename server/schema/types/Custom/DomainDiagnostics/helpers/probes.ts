import { Resolver } from 'node:dns/promises'
import { createConnection } from 'node:net'
import { domainToASCII } from 'node:url'
import ipaddr from 'ipaddr.js'

export function normalizeDomain(value: string): string {
  const input = value.trim()
  const domain = domainToASCII(input).toLowerCase().replace(/\.$/, '')
  const labels = domain.split('.')
  if (
    /[/:?#@%\\\s\p{Cc}]/u.test(input) ||
    domain.length > 253 ||
    labels.length < 2 ||
    ipaddr.isValid(domain) ||
    !labels.every((label) =>
      /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/.test(label),
    )
  ) {
    throw new Error('Введите домен или поддомен без протокола и пути.')
  }
  return domain
}

export async function readRegistry(domain: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const socket = createConnection(43, 'whois.tcinet.ru')
    const timeout = setTimeout(
      () => socket.destroy(new Error('WHOIS: тайм-аут')),
      4500,
    )
    let body = ''
    socket.setEncoding('utf8')
    socket.on('connect', () => socket.end(domain + '\r\n'))
    socket.on('data', (chunk: string) => {
      body += chunk
      if (body.length > 65536) {
        socket.destroy(new Error('Слишком большой ответ WHOIS'))
      }
    })
    socket.on('end', () => resolve(body))
    socket.on('error', reject)
    socket.on('close', () => clearTimeout(timeout))
  })
}

export function dnsResolver(): Resolver {
  return new Resolver({ timeout: 1800, tries: 1 })
}

export async function probeNameserver(
  host: string,
  domain: string,
  glue: string[] = [],
): Promise<string> {
  const lookup = dnsResolver()
  const isPublic = (ip: string): boolean =>
    ipaddr.isValid(ip) && ipaddr.parse(ip).range() === 'unicast'
  let address = glue.find(isPublic)
  if (!address) {
    const results = await Promise.allSettled([
      lookup.resolve4(host),
      lookup.resolve6(host),
    ])
    address = results
      .flatMap((result) => (result.status === 'fulfilled' ? result.value : []))
      .find(isPublic)
  }
  if (!address) {
    throw new Error(
      'Не удалось получить публичный адрес этого NS для прямой проверки.',
    )
  }
  const resolver = dnsResolver()
  resolver.setServers([address])
  const query = async (type: 'A' | 'AAAA'): Promise<string> => {
    try {
      const records =
        type === 'A'
          ? await resolver.resolve4(domain, { ttl: true })
          : await resolver.resolve6(domain, { ttl: true })
      if (!records.length) {
        return type + ' отсутствует в ответе'
      }
      return (
        type +
        ' ' +
        records
          .map((record) => record.address + ' (TTL ' + record.ttl + ' с)')
          .join(', ')
      )
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENODATA') {
        return type + ' отсутствует'
      }
      throw error
    }
  }
  return (
    address +
    ' · ' +
    (
      await Promise.all([
        query('A'),
        query('AAAA'),
        resolver
          .resolveCname(domain)
          .then((names) => (names.length ? 'CNAME ' + names.join(', ') : ''))
          .catch(() => ''),
      ])
    )
      .filter(Boolean)
      .join(' · ')
  )
}

export async function probeEndpoint(url: string): Promise<string> {
  const response = await fetch(url, {
    method: 'HEAD',
    redirect: 'manual',
    signal: AbortSignal.timeout(4500),
  })
  return (
    url +
    ' · HTTP ' +
    response.status +
    '. Получен ответ на HEAD без авторизации.'
  )
}
