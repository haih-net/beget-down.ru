import { Diagnostics } from './Diagnostics'
import { Recovery } from './Recovery'
import type * as React from 'react'
import { useEffect, useState } from 'react'
import { ServiceStatus } from './ServiceStatus'
import { MainPageViewStyled } from './styles'

const report = 'https://t.me/beget_official/572'
const observations = 'https://kod.ru/beget-krupnyi-sboi/amp'
interface ServiceCard {
  name: string
  status: ServiceStatus
  statusText: string
  detail: string
  forecast: string
}

const services: readonly ServiceCard[] = [
  {
    name: 'DNS доменов',
    status: ServiceStatus.PartialAvailability,
    statusText: 'Два NS отдают A-записи',
    detail:
      'У клиентов возникали перебои с открытием сайтов по имени. В 15:43 Beget назвал NS-серверы первым приоритетом.',
    forecast:
      'В 23:36 оба NS ответили для beget.ru, в 23:54 — для beget.ru и radimax.ru. Публикация новых записей и исполнение заявок на смену NS пока не подтверждены.',
  },
  {
    name: 'Панель, личный кабинет и API',
    status: ServiceStatus.NoResponse,
    statusText: 'Нет ответа при проверке',
    detail:
      'Утром при входе наблюдали HTTP 502 Bad Gateway. В 20:20 панель не ответила. В 23:54 запросы к cp.beget.com и api.beget.com из нашей сети также завершились без HTTP-ответа за 6 секунд.',
    forecast:
      'Когда панель недоступна, через неё нельзя сменить A-запись и направить домен на резервный сервер. Срок восстановления управления Beget не назвал.',
  },
  {
    name: 'Сайты на хостинге',
    status: ServiceStatus.ReportedOutage,
    statusText: 'Жалобы и вечерняя проверка двух сайтов',
    detail:
      'Посетители не могли открыть размещённые у Beget сайты. «Код Дурова» отдельно проверил сайт системы маркировки «Честный знак». В 23:54 beget.ru и radimax.ru не дали HTTP-ответа из нашей сети за 6 секунд. Доля доступных сайтов неизвестна.',
    forecast:
      'Окно для DNS касается только разрешения имён. Время запуска веб-серверов и приложений Beget не сообщил.',
  },
  {
    name: 'Виртуальные серверы (VPS)',
    status: ServiceStatus.ReportedOutage,
    statusText: 'Жалобы на подключение',
    detail:
      'Клиенты сообщали, что не могут подключиться к виртуальным машинам. К вечернему срезу подтверждения массового запуска VPS не найдено.',
    forecast:
      'Сроки по виртуальным машинам и очередь запуска по площадкам не опубликованы.',
  },
  {
    name: 'Электронная почта',
    status: ServiceStatus.ProviderReport,
    statusText: 'Работы по данным Beget',
    detail:
      'Утром фиксировались перебои с SMTP — отправкой писем. В 15:43 Beget сообщил, что работы по почтовой системе продолжаются.',
    forecast:
      'Срок возобновления отправки и доставки писем из очередей неизвестен.',
  },
  {
    name: 'Выделенные серверы',
    status: ServiceStatus.ProviderReport,
    statusText: 'Со слов Beget · информация пока не подтверждена',
    detail:
      'Со слов Beget, восстановлена работа выделенных серверов без администрирования провайдером.',
    forecast:
      'Автор сводки сообщает, что доступа к своим серверам у него по-прежнему нет. Срок восстановления доступа не указан.',
  },
  {
    name: 'Файлы и резервные копии',
    status: ServiceStatus.ProviderReport,
    statusText: 'О наличии копий сообщил Beget',
    detail:
      'Провайдер видит файловые копии большинства ресурсов виртуального хостинга и облака. Список ресурсов и даты снимков Beget не раскрыл.',
    forecast:
      'Beget ожидает длительного восстановления из-за объёма данных. Оценки в часах или днях нет.',
  },
  {
    name: 'Базы данных',
    status: ServiceStatus.NoInformation,
    statusText: 'Нет отдельной сводки',
    detail:
      'Beget сообщил только о файловых копиях. По этому сообщению нельзя определить, доступны ли базы конкретного проекта и до какой транзакции сохранились записи.',
    forecast:
      'Дата доступной копии и время возврата доступа к СУБД неизвестны.',
  },
]

// Moscow time, in minutes after midnight. Segments start at a report or observation.
const chartStart = 2 * 60 + 50
const firstDnsObservation = 23 * 60 + 36
const eveningCheck = 23 * 60 + 54
const incidentMidnight = Date.parse('2026-11-02T00:00:00+03:00')
const morningReport = 10 * 60 + 35
const providerUpdate = 15 * 60 + 43
type Phase = readonly [
  minute: number,
  state: 'down' | 'partial' | 'up',
  description: string,
]
const press = [
  'Компьютерра',
  'https://www.computerra.ru/372724/krupnyj-sboj-beget-narushil-rabotu-sajtov-i-serverov/',
] as const
const kod = ['Код Дурова', observations] as const
const official = ['Официальное сообщение Beget', report] as const
const rbc = [
  'РБК — пересказ заявления Beget',
  'https://amp.rbc.ru/rbcnews/technology_and_media/02/11/2026/6ae8876e2273f59e1557a612',
] as const
type Entry = readonly [
  minute: number,
  evidence: string,
  detail: string,
  sources: ReadonlyArray<readonly [string, string]>,
]
type ServiceLog = {
  id: string
  name: string
  phases: readonly Phase[]
  entries: readonly Entry[]
}
const timeline: readonly ServiceLog[] = [
  {
    id: 'panel',
    name: 'Панель и API',
    phases: [[chartStart, 'down', 'Панель и API · тайм-аут в 23:54']],
    entries: [
      [
        morningReport,
        'Жалобы клиентов · редакция наблюдала HTTP 502',
        'Пользователи не могли войти в панель управления. «Код Дурова» также зафиксировал ошибку 502. Без доступа к панели через неё нельзя изменить A-запись.',
        [press, kod],
      ],
      [
        20 * 60 + 20,
        'Собственный замер · одна сеть',
        'Собственный замер из одной сети: DNS вернул IP панели, но HTTPS-запрос по этому адресу не получил ответа за 8 секунд. Методика и результат приведены в контрольной проверке.',
        [['Контрольная проверка', '#panel-check']],
      ],
      [
        eveningCheck,
        'HTTPS · одна сеть',
        'cp.beget.com и api.beget.com не дали HTTP-ответа за 6 секунд. Возможность войти и изменить записи не подтверждена.',
        [],
      ],
    ],
  },
  {
    id: 'dns',
    name: 'DNS доменов',
    phases: [
      [chartStart, 'down', 'Со слов Beget, идут работы'],
      [firstDnsObservation, 'partial', '23:36 · оба NS ответили для beget.ru'],
    ],
    entries: [
      [
        morningReport,
        'Жалобы в СМИ · без отдельного замера',
        'Поступили сообщения о сбоях DNS.',
        [press, kod],
      ],
      [
        providerUpdate,
        'Заявление и прогноз Beget · внешней проверки нет',
        'Beget поставил восстановление NS на первое место и оценил работы в 4–5 часов с момента публикации.',
        [official],
      ],
      [
        firstDnsObservation,
        'Замер диагностики сайта',
        'ns1.beget.ru и ns2.beget.ru вернули для beget.ru адрес 193.168.47.254 с TTL 300 секунд. Это первый такой замер в сводке. Точное время возобновления ответов неизвестно.',
        [],
      ],
      [
        eveningCheck,
        'Прямые запросы DNS · одна сеть',
        'Оба NS (93.92.81.0 и 194.113.245.0) без рекурсии дали авторитетные ответы: beget.ru — 193.168.47.254 (TTL 300 с), radimax.ru — 45.130.41.93 (TTL 600 с).',
        [],
      ],
    ],
  },
  {
    id: 'sites',
    name: 'Сайты',
    phases: [[chartStart, 'down', 'Восстановление не подтверждено']],
    entries: [
      [
        morningReport,
        'Жалобы клиентов · редакция проверила отдельный сайт',
        'Клиенты сообщали о недоступности размещённых сайтов. Среди затронутых ресурсов упоминался «Честный знак».',
        [press, kod],
      ],
      [
        eveningCheck,
        'HTTPS · одна сеть',
        'За 6 секунд ни beget.ru, ни radimax.ru не дали HTTP-ответа. По этому замеру нельзя установить, на каком этапе запрос прервался у остальных клиентов.',
        [],
      ],
    ],
  },
  {
    id: 'vps',
    name: 'VPS',
    phases: [[chartStart, 'down', 'Восстановление не подтверждено']],
    entries: [
      [
        morningReport,
        'Жалобы клиентов в СМИ · без проверки входа',
        'Клиенты столкнулись с перебоями при подключении к виртуальным серверам.',
        [press, kod],
      ],
    ],
  },
  {
    id: 'mail',
    name: 'Почта',
    phases: [[chartStart, 'down', 'Со слов Beget, идут работы']],
    entries: [
      [
        morningReport,
        'Сообщения в СМИ · без проверки доставки',
        'Зафиксированы перебои в работе почтовых серверов SMTP.',
        [press],
      ],
      [
        providerUpdate,
        'Заявление Beget · доставка не проверена',
        'Beget сообщил, что восстанавливает почтовую систему параллельно с DNS.',
        [official],
      ],
    ],
  },
  {
    id: 'dedicated',
    name: 'Выделенные серверы¹',
    phases: [
      [
        chartStart,
        'down',
        'Со слов Beget, восстановлены · пока не подтверждено',
      ],
    ],
    entries: [
      [
        providerUpdate,
        'Со слов Beget · информация пока не подтверждена',
        'Beget: «На данный момент нам уже удалось восстановить работу выделенных серверов без нашего администрирования». РБК передаёт заявление компании. Независимого подтверждения восстановления пока нет.',
        [official, rbc],
      ],
    ],
  },
  {
    id: 'backups',
    name: 'Файловые копии',
    phases: [[chartStart, 'down', 'Со слов Beget, копии доступны']],
    entries: [
      [
        providerUpdate,
        'Заявление Beget · получение копии клиентом не проверено',
        'По данным Beget, доступны файловые копии большинства ресурсов виртуального хостинга и облака. Из-за объёма данных восстановление займёт длительное время.',
        [official],
      ],
    ],
  },
  {
    id: 'databases',
    name: 'Базы данных',
    phases: [[chartStart, 'down', 'Доступность не подтверждена']],
    entries: [
      [
        providerUpdate,
        'Сведений о состоянии СУБД нет',
        'В сводке Beget говорится о файловых копиях. Отдельных сведений о доступности баз, датах снимков или сроках восстановления СУБД в ней нет.',
        [official],
      ],
    ],
  },
]

function moscowTime(minute: number): string {
  return (
    Math.floor(minute / 60)
      .toString()
      .padStart(2, '0') +
    ':' +
    String(minute % 60).padStart(2, '0')
  )
}

const events = [
  [
    '02:50',
    'Начало роста жалоб на Beget',
    'График жалоб на Beget: в 02:45 — 0, в 02:50 — 9, в 02:55 — 37, в 03:00 — 107.',
    'Detector404 · график жалоб',
    'https://detector404.ru/beget',
  ],
  [
    '04:50',
    'Beget подтверждает сбой',
    'Провайдер сообщает о крупном инциденте.',
    'Beget',
    'https://t.me/beget_official/569',
  ],
  [
    '06:03',
    'Beget сообщил о начале работ',
    'Одновременно команда расследует причины сбоя.',
    'Beget',
    'https://t.me/beget_official/570',
  ],
  [
    '08:23',
    'Beget сообщил о работах в дата-центрах',
    'По сообщению Beget, инфраструктуру настраивают вручную.',
    'Beget',
    'https://t.me/beget_official/571',
  ],
  [
    '15:43',
    'Провайдер называет причину',
    'Beget сообщает о кибератаке и впервые перечисляет результаты по отдельным услугам.',
    'Beget',
    report,
  ],
  [
    '23:36',
    'Оба проверенных NS ответили для beget.ru',
    'Диагностика получила одну и ту же A-запись от обоих серверов.',
    'Журнал DNS',
    '#journal-dns',
  ],
  [
    '23:54',
    'DNS отвечает для двух доменов',
    'При повторной проверке панель, API и оба проверенных сайта не дали HTTP-ответа за 6 секунд.',
    'Результаты проверки',
    '#evening-check',
  ],
] as const

const IncidentChart: React.FC = () => {
  const [chartEnd, setChartEnd] = useState(eveningCheck)
  useEffect(() => {
    const update = () =>
      setChartEnd(
        Math.max(
          eveningCheck,
          Math.floor((Date.now() - incidentMidnight) / 60000),
        ),
      )
    update()
    const timer = window.setInterval(update, 60000)
    return () => window.clearInterval(timer)
  }, [])
  const chartPosition = (minute: number): string =>
    ((minute - chartStart) / (chartEnd - chartStart)) * 100 + '%'
  const endLabel =
    chartEnd < 1440
      ? moscowTime(chartEnd)
      : new Intl.DateTimeFormat('ru-RU', {
          timeZone: 'Europe/Moscow',
          day: '2-digit',
          month: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
        }).format(incidentMidnight + chartEnd * 60000)
  return (
    <figure>
      <figcaption>Последний замер · 2 ноября, 23:54 МСК</figcaption>
      <div className="gantt-axis" aria-hidden="true">
        <span>{moscowTime(chartStart)}</span>
        {chartEnd < 2 * 1440 && (
          <span className="midday" style={{ left: chartPosition(12 * 60) }}>
            12:00
          </span>
        )}
        <span>{endLabel}</span>
      </div>
      {timeline.map(({ id, name, phases }) => (
        <a className="gantt-row" key={id} href={'#journal-' + id}>
          <div className="gantt-name">
            <strong>{name}</strong>
            <small>{phases.at(-1)?.[2] ?? 'Нет данных'}</small>
          </div>
          <div className="track">
            {phases.map(([start, state, description], index) => {
              const time = moscowTime(start)
              const label =
                'С ' +
                time +
                ' · ' +
                (state === 'down' ? 'доступность не подтверждена' : description)
              return (
                <span
                  key={start}
                  data-phase={state}
                  role="img"
                  aria-label={label}
                  title={label}
                  style={{
                    left: chartPosition(start),
                    right:
                      'calc(100% - ' +
                      chartPosition(phases[index + 1]?.[0] ?? chartEnd) +
                      ')',
                  }}
                />
              )
            })}
          </div>
        </a>
      ))}
      <div className="legend">
        <span data-phase="down">Сбой</span>
        <span data-phase="partial">Частичная доступность подтверждена</span>
        <span data-phase="up">Доступность подтверждена</span>
      </div>
      <p className="chart-note">
        02:50 — начало роста{' '}
        <a href="https://detector404.ru/beget">жалоб на Beget</a>. Шкала общая
        для всех услуг. Цвет каждой полосы показывает последний известный статус
        услуги до появления нового замера. ¹ С администрированием клиента.
      </p>
    </figure>
  )
}

export const MainPageView: React.FC = () => (
  <MainPageViewStyled lang="ru">
    <header id="overview" tabIndex={-1}>
      <p className="label">Независимая сводка · 2 ноября 2026</p>
      <h1 tabIndex={-1}>Сбой Beget 2 ноября 2026 года</h1>
      <IncidentChart />
      <p>
        Если ваш домен использует NS Beget, а сайт работает на доступном
        стороннем хостинге, он уже может открываться по прежнему адресу. Для
        этого достаточно, чтобы NS снова отдавали действующую запись. Менять её
        не требуется.
      </p>
    </header>
    <Diagnostics />
    <Recovery />
    <section id="services" tabIndex={-1}>
      <p className="label">03 / Услуги</p>
      <h2>Что сломалось и когда ждать восстановления</h2>
      <p>
        Срез на 23:54 МСК, 2 ноября. Утренние симптомы зафиксировали{' '}
        <a href={observations}>«Код Дурова»</a> и{' '}
        <a href="https://www.computerra.ru/372724/krupnyj-sboj-beget-narushil-rabotu-sajtov-i-serverov/">
          «Компьютерра»
        </a>
        . Сроки и ход работ — по <a href={report}>сводке Beget в 15:43</a>.
      </p>
      <aside id="evening-check">
        <strong>Контрольная проверка · 23:54 МСК</strong>
        <p>
          Оба NS вернули адреса beget.ru и radimax.ru. Из той же сети
          HTTPS-запросы к этим сайтам, панели и API Beget завершились без
          HTTP-ответа за 6 секунд.{' '}
          <a href="#journal-dns">Адреса NS и результаты DNS-запросов</a>.
        </p>
      </aside>
      <aside id="panel-check">
        <strong>Контрольная проверка · 20:20 МСК</strong>
        <p>
          Google Public DNS вернул для cp.beget.com адрес 178.248.232.144. При
          HTTPS-запросе напрямую по этому адресу с именем панели сервер за 8
          секунд не прислал ответ. Замер выполнен из одной сети. Ответ
          публичного резолвера мог прийти из кеша.
        </p>
      </aside>
      <div className="cards">
        {services.map(({ name, status, statusText, detail, forecast }) => (
          <article key={name}>
            <span className="status" data-status={status}>
              {statusText}
            </span>
            <h3>{name}</h3>
            <p>{detail}</p>
            <p className="forecast">
              <strong>Прогноз. </strong>
              {forecast}
            </p>
          </article>
        ))}
      </div>
    </section>
    <section id="history" tabIndex={-1}>
      <p className="label">04 / Хронология</p>
      <h2>Как развивался сбой</h2>
      <p>2 ноября, время московское.</p>
      <ol>
        {events.map(([time, title, detail, source, href]) => (
          <li key={time}>
            <div className="hour">
              <small>02.11.2026</small>
              <br />
              {time} МСК
            </div>
            <div>
              <h3>{title}</h3>
              <p>
                {detail} <a href={href}>{source}</a>
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
    <section id="questions" tabIndex={-1}>
      <p className="label">05 / Данные и обязательства</p>
      <h2>Что ещё предстоит выяснить</h2>
      <dl>
        <dt>За какую дату сохранилась копия моего сайта?</dt>
        <dd>
          Beget сообщил о наличии файловых копий для большинства ресурсов. Даты
          копий и перечень доступных проектов в сообщении не указаны.
        </dd>
        <dt>Уцелела ли база с заказами и платежами?</dt>
        <dd>
          Сводка касается файловых копий. О состоянии и дате последней доступной
          копии конкретной базы данных сведений нет.
        </dd>
        <dt>Когда я смогу зайти на свой VPS?</dt>
        <dd>
          Сообщение Beget о восстановлении относится к выделенным серверам с
          самостоятельным администрированием. Для виртуальных серверов Beget
          отдельного срока не назвал.
        </dd>
        <dt>Будет ли компенсация за простой?</dt>
        <dd>
          Beget уведомил клиентов, что считает атаку обстоятельством с
          признаками форс-мажора. Порядок компенсаций в уведомлении не описан.
        </dd>
      </dl>
      <a href={report}>Официальное уведомление Beget</a>
    </section>
    <section id="journal" tabIndex={-1}>
      <p className="label">06 / Журнал</p>
      <h2>Журнал по услугам</h2>
      <p>Указано московское время публикации или собственного замера.</p>
      {timeline.map(({ id, name, entries }) => (
        <article
          className="journal"
          id={'journal-' + id}
          key={id}
          tabIndex={-1}
        >
          <h3>{name.replace('¹', '')}</h3>
          {entries.map(([minute, evidence, detail, sources]) => (
            <div className="entry" key={minute}>
              <time dateTime={'2026-11-02T' + moscowTime(minute) + ':00+03:00'}>
                02.11.2026 · {moscowTime(minute)} МСК
              </time>
              <p>
                <strong>{evidence}</strong>
              </p>
              <p>{detail}</p>
              <div className="sources">
                {sources.map(([label, href]) => (
                  <a key={href} href={href}>
                    {label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </article>
      ))}
    </section>
  </MainPageViewStyled>
)
