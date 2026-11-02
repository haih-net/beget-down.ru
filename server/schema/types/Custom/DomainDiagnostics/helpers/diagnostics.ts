import { getDomain } from 'tldts'
import { registrarInfo } from './registrar'
import {
  dnsResolver,
  normalizeDomain,
  probeEndpoint,
  probeNameserver,
} from './probes'

export type Probe = {
  label: string
  state: 'observed' | 'failed' | 'unknown'
  detail: string
}
export interface Snapshot {
  domain: string
  checkedAt: string
  checks: Probe[]
}

async function check(
  label: string,
  read: () => Promise<string>,
): Promise<Probe> {
  try {
    return { label, state: 'observed', detail: await read() }
  } catch (error) {
    return {
      label,
      state: 'failed',
      detail:
        error instanceof Error ? error.message : 'Проверка не завершилась',
    }
  }
}

async function domainChecks(domain: string): Promise<Probe[]> {
  let hosts: string[] = []
  const glue = new Map<string, string[]>()
  const registered = getDomain(domain)
  const [registry, dns] = await Promise.all([
    check('Регистратор' + (registered ? ' · ' + registered : ''), async () => {
      if (!registered) {
        throw new Error('Не удалось определить регистрируемый домен')
      }
      return registrarInfo(registered, glue)
    }),
    check('Обслуживающие NS (возможен кеш резолвера)', async () => {
      const resolver = dnsResolver()
      let zone = domain
      while (zone.includes('.')) {
        try {
          const answer = await resolver.resolveNs(zone)
          if (answer.length) {
            hosts = answer
            return zone + ' · ' + hosts.join(', ')
          }
        } catch (error) {
          const code = (error as NodeJS.ErrnoException).code
          if (code !== 'ENODATA' && code !== 'ENOTFOUND') {
            throw error
          }
        }
        zone = zone.slice(zone.indexOf('.') + 1)
      }
      throw new Error('Не удалось найти обслуживающие NS')
    }),
  ])
  const checks = [registry, dns]
  if (!hosts.length && domain === registered) {
    hosts = [...glue.keys()]
  }
  checks.push(
    ...(await Promise.all(
      hosts
        .slice(0, 13)
        .map((host) =>
          check(host, () => probeNameserver(host, domain, glue.get(host))),
        ),
    )),
  )
  return checks
}

const pending = new Map<string, Promise<Snapshot>>()
const cache = new Map<string, Snapshot>()
export async function diagnoseDomain(
  input = 'beget.ru',
  refresh = false,
): Promise<Snapshot> {
  const domain = normalizeDomain(input)
  const previous = cache.get(domain)
  if (
    previous &&
    Date.now() - Date.parse(previous.checkedAt) < (refresh ? 5000 : 60000)
  ) {
    return previous
  }
  const running = pending.get(domain)
  if (running) {
    return running
  }
  if (pending.size >= 16) {
    throw new Error('Проверки заняты. Попробуйте немного позже.')
  }
  const run = async (): Promise<Snapshot> => {
    const [dns, panel, api] = await Promise.all([
      domainChecks(domain),
      check('Панель Beget', () => probeEndpoint('https://cp.beget.com/')),
      check('API Beget', () =>
        probeEndpoint('https://api.beget.com/api/dns/getData'),
      ),
    ])
    const result: Snapshot = {
      domain,
      checkedAt: new Date().toISOString(),
      checks: [
        ...dns,
        panel,
        api,
        {
          label: 'Публикация новых A/AAAA',
          state: 'unknown',
          detail:
            'Без авторизованного изменения и последующей проверки NS исполнение не подтверждено.',
        },
        {
          label: 'Исполнение смены NS',
          state: 'unknown',
          detail:
            'Опубликованное делегирование не показывает, принимаются ли сейчас новые заявки. Срок неизвестен.',
        },
      ],
    }
    const oldest = cache.keys().next().value
    if (cache.size >= 256 && oldest) {
      cache.delete(oldest)
    }
    cache.set(domain, result)
    return result
  }
  const task = run().finally(() => pending.delete(domain))
  pending.set(domain, task)
  return task
}
