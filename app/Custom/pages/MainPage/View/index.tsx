import { Diagnostics } from './Diagnostics'
import { Recovery } from './Recovery'
import type * as React from 'react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { ServiceStatus } from './ServiceStatus'
import { MainPageViewStyled } from './styles'

const report = 'https://t.me/beget_official/572'
const latestReport = 'https://t.me/beget_official/573'
const analysisPath = '/blog/dns-management-november-3-1530'
const recoveryReport = 'https://t.me/beget_newsfeed/56421'
const recoveryPath = '/blog/hosting-recovery-november-4-0100'
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
    name: 'DNS — чтение записей',
    status: ServiceStatus.Available,
    statusText: 'Ответы NS подтверждены с 2 ноября, 23:36',
    detail:
      'В 23:36 оба проверенных NS ответили для beget.ru; в 23:54 — также для radimax.ru. Повторная проверка 3 ноября в 13:28 подтвердила ответы для обоих доменов.',
    forecast:
      'Это разрешение имён по существующим записям. Проверены два домена; ответы DNS не подтверждают доступность целевых сайтов или возможность редактирования.',
  },
  {
    name: 'DNS — управление записями',
    status: ServiceStatus.Available,
    statusText: 'Доступно редактирование отдельных доменов',
    detail:
      'В срезе на 3 ноября, 15:30 автор подтвердил работу отдельного интерфейса domains.beget.ru. По Beget, доступны A, MX и TXT для .ru/.рф/.su, зарегистрированных у него и использующих его DNS.',
    forecast:
      'Каждый домен требует отдельного кода и авторизации. Массового управления пока нет. Смена самих NS не подтверждена; над международными доменами ещё работают.',
  },
  {
    name: 'Панель, личный кабинет и API',
    status: ServiceStatus.ReportedOutage,
    statusText: 'Основная панель не восстановлена',
    detail:
      '3 ноября в 13:28 cp.beget.com вернул HTTP 502 примерно за 9,12 секунды, API не ответил за 10 секунд. Редактор DNS доступен отдельно от основной панели.',
    forecast:
      'Beget обещает ограниченный интерфейс для части услуг в течение 24 часов от заявления №573. Это не срок полного восстановления панели и API.',
  },
  {
    name: 'Сайты на хостинге',
    status: ServiceStatus.ProviderReport,
    statusText: 'Первые сайты работают — по Beget',
    detail:
      '4 ноября в 01:00 Beget сообщил о запуске серверов виртуального хостинга: первые сайты уже открываются и работают. Перед запуском каждый сервер проверяют вручную.',
    forecast:
      'Почти 100% восстановимых сайтов не означает столько же уже работающих. Сроки по конкретным проектам и даты копий не названы.',
  },
  {
    name: 'Виртуальные серверы (VPS)',
    status: ServiceStatus.ProviderReport,
    statusText: 'Утрата данных и бинарных бэкапов — по Beget',
    detail:
      'Beget сообщает об утрате данных облака и полной потере бинарных бэкапов VPS. Сохранены файловые копии VPS.',
    forecast:
      'Возможность восстановить файлы не гарантирует запуск прежней виртуальной машины со всеми настройками. Даты копий и время выдачи данных неизвестны.',
  },
  {
    name: 'Электронная почта',
    status: ServiceStatus.PartialAvailability,
    statusText: '80% инфраструктуры — по Beget',
    detail:
      'Провайдер сообщил о восстановлении 80% почтовой инфраструктуры. Доставка писем и доступность ящиков независимо не проверены.',
    forecast:
      'Полноценный запуск ожидается в течение 10 часов от заявления №573. 80% инфраструктуры не означает 80% работающих клиентских ящиков.',
  },
  {
    name: 'Dedicated — администрирование пользователями',
    status: ServiceStatus.Available,
    statusText: 'Без администрирования Beget — введены, по заявлению',
    detail:
      'Beget уточнил, что dedicated под управлением клиентов восстановлены 2 ноября примерно в 14:00; сейчас заявляет о вводе всех таких серверов.',
    forecast:
      'Восстановление отмечено по заявлению Beget, без независимой проверки каждого сервера. Старое сообщение автора о недоступности его серверов не является новым замером.',
  },
  {
    name: 'Dedicated — администрирование Beget',
    status: ServiceStatus.ProviderReport,
    statusText: 'Начат запуск серверов — по Beget',
    detail:
      '4 ноября в 01:00 Beget сообщил о начале запуска серверов со своим администрированием. Специалисты проверяют состояние, удаляют вредоносные механизмы и проверяют целостность данных и работу сайтов.',
    forecast:
      'Полное восстановление этой категории не заявлено. Срок доступа к конкретному серверу неизвестен.',
  },
  {
    name: 'Файлы и резервные копии',
    status: ServiceStatus.ProviderReport,
    statusText: 'Сохранены, но выдача недоступна — по Beget',
    detail:
      'Beget заявляет о сохранности файловых бэкапов хостинга и облачной инфраструктуры. Доступ пока закрыт до восстановления инфраструктуры и проверки безопасности серверов.',
    forecast:
      'Требуется ручная проверка более 1000 серверов. Общего срока нет; сохранность копии и возможность получить её — разные состояния.',
  },
  {
    name: 'Базы данных',
    status: ServiceStatus.NoInformation,
    statusText: 'Нет данных по конкретным базам',
    detail:
      'Поддержка, согласно опубликованной переписке, включила базы данных в восстановительные работы. Даты, согласованность и полнота копий конкретных БД не раскрыты.',
    forecast:
      'Файловые копии не подтверждают сохранность всех заказов и платежей. Возможность получить дамп и срок возврата доступа к СУБД неизвестны.',
  },
  {
    name: 'S3, Kubernetes, CDN и IP',
    status: ServiceStatus.ProviderReport,
    statusText: 'Beget сообщил о потерях',
    detail:
      'S3 и Kubernetes перечислены среди облачных услуг с утратой данных. Также сообщается об утрате настроек CDN и IP; способы восстановления ещё ищут.',
    forecast:
      'Наличие пригодных копий S3 и Kubernetes отдельно не подтверждено. Какие назначения IP и конфигурации удастся вернуть, неизвестно.',
  },
  {
    name: 'Доменные имена',
    status: ServiceStatus.ProviderReport,
    statusText: 'Сохранение делегирования — по Beget',
    detail:
      'Beget сообщил о договорённости с КЦ по продолжению делегирования истекающих доменов .ru/.рф/.su. По международным доменам работа продолжается.',
    forecast:
      'Сохранение делегирования не означает автоматическое продление регистрации. Условия для конкретного домена нужно уточнять отдельно.',
  },
]

// Moscow time, in minutes after midnight. Segments start at a report or observation.
const chartStart = 2 * 60 + 50
const firstDnsObservation = 23 * 60 + 36
const eveningCheck = 23 * 60 + 54
const daytimeCheck = 1440 + 13 * 60 + 28
const currentUpdate = 1440 + 15 * 60 + 30
const recoveryUpdate = 2 * 1440 + 60
const incidentMidnight = Date.parse('2026-11-02T00:00:00+03:00')
const morningReport = 10 * 60 + 35
const providerUpdate = 15 * 60 + 43
type Phase = readonly [
  minute: number,
  state: 'down' | 'partial' | 'up' | 'reported',
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
const historicalTimeline: readonly ServiceLog[] = [
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
    name: 'DNS — чтение записей',
    phases: [
      [chartStart, 'down', 'Со слов Beget, идут работы'],
      [firstDnsObservation, 'up', '02.11 · 23:36 — ответы NS подтверждены'],
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
    name: 'Dedicated — управление пользователей',
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

const latest = ['Beget · сообщение №573', latestReport] as const
const currentAnalysis = [
  'Разбор · 3 ноября 2026, 15:30 МСК',
  analysisPath,
] as const
const daytimeSource = [
  'Замер · 3 ноября 2026, 13:28 МСК',
  '/blog/status-november-3-1328',
] as const
const support = [
  'Ответы поддержки в публикации Хабра',
  'https://habr.com/ru/news/1102974/',
] as const
const newEntries: Record<string, readonly Entry[]> = {
  panel: [
    [
      daytimeCheck,
      'Собственный HTTPS-замер · одна сеть',
      'cp.beget.com — HTTP 502 за 9,12 секунды; api.beget.com — тайм-аут за 10 секунд. Вечерний лимит составлял 6 секунд, поэтому разница сама по себе не доказывает улучшения.',
      [daytimeSource],
    ],
    [
      currentUpdate,
      'Срез по заявлению Beget',
      'Обещан ограниченный интерфейс управления частью услуг в течение 24 часов от заявления. Редактор DNS уже доступен отдельно.',
      [latest, currentAnalysis],
    ],
  ],
  dns: [
    [
      daytimeCheck,
      'Прямые DNS-запросы · одна сеть',
      '93.92.81.0 и 194.113.245.0 снова вернули beget.ru — 193.168.47.254, radimax.ru — 45.130.41.93.',
      [daytimeSource],
    ],
  ],
  sites: [
    [
      daytimeCheck,
      'Собственный HTTPS-замер · одна сеть',
      'beget.ru и radimax.ru не ответили за 10 секунд. Доля доступных сайтов по этому замеру неизвестна.',
      [daytimeSource],
    ],
    [
      currentUpdate,
      'Срез по заявлению Beget',
      'Провайдер начал запуск хостинговых серверов; предварительно восстановимы почти 100% сайтов. Это оценка возможности восстановления, а не доля работающих проектов.',
      [latest],
    ],
  ],
  vps: [
    [
      currentUpdate,
      'Срез по заявлению Beget',
      'Данные облака и бинарные бэкапы VPS утрачены; сохранены файловые копии VPS. Сроки и полнота восстановления конкретной машины неизвестны.',
      [latest],
    ],
  ],
  mail: [
    [
      currentUpdate,
      'Срез по заявлению Beget · доставка не проверена',
      'Восстановлено 80% инфраструктуры почты. Полноценный запуск ожидается в течение 10 часов от заявления. Это не измеренная доля доступных ящиков.',
      [latest],
    ],
  ],
  dedicated: [
    [
      currentUpdate,
      'Уточнение Beget · независимой проверки нет',
      'Dedicated под управлением клиентов, по Beget, восстановлены 2 ноября примерно в 14:00. На управляемых провайдером серверах большая часть данных сохранилась, проверка и ввод продолжаются. На предыдущем срезе автор сообщал об отсутствии доступа к своим серверам; нового замера здесь нет.',
      [latest],
    ],
  ],
  backups: [
    [
      currentUpdate,
      'Срез по заявлению Beget',
      'Файловые копии сохранены, но выдача пока недоступна: нужно восстановить инфраструктуру и проверить более 1000 серверов на уязвимости и вредоносные скрипты. Бинарные бэкапы VPS полностью утрачены.',
      [latest],
    ],
  ],
  databases: [
    [
      daytimeCheck,
      'Опубликованные ответы поддержки · исходная переписка не проверена',
      'Поддержка сообщает о восстановлении в том числе баз данных. Дата и согласованность копии конкретной базы, возможность выдать дамп не установлены.',
      [support],
    ],
    [
      currentUpdate,
      'Срез по заявлению Beget',
      'Общая информация о файловых копиях не устанавливает полноту восстановления конкретной базы. Даты снимков и сроки доступа к СУБД не названы.',
      [latest],
    ],
  ],
}
const latestPhases: Record<string, Phase> = {
  panel: [currentUpdate, 'down', 'Панель: 502; ограниченный интерфейс обещан'],
  dns: [currentUpdate, 'up', '02.11 · 23:36 — ответы NS подтверждены'],
  sites: [currentUpdate, 'reported', 'По Beget, запуск начат'],
  vps: [currentUpdate, 'reported', 'По Beget, остались файловые копии'],
  mail: [currentUpdate, 'partial', 'По Beget, 80% инфраструктуры'],
  dedicated: [14 * 60, 'up', 'По Beget, восстановлены 02.11 примерно в 14:00'],
  backups: [currentUpdate, 'reported', 'По Beget, сохранены; выдача закрыта'],
  databases: [currentUpdate, 'down', 'Копии конкретных БД не подтверждены'],
}
const recoverySource = [
  'Сообщение Beget · 4 ноября, 01:00 МСК',
  recoveryReport,
] as const
const recoveryEntry: Entry = [
  recoveryUpdate,
  'Заявление Beget · нового сетевого замера нет',
  'Начат запуск серверов виртуального хостинга и серверов с администрированием Beget. По сообщению компании, первые сайты работают. Каждый сервер проходит ручную проверку, загрузку с загрузочного диска, очистку от вредоносных механизмов и проверку целостности данных; после запуска проверяют сайты. Работы выполняют параллельно.',
  [recoverySource],
]
const timeline: readonly ServiceLog[] = [
  ...historicalTimeline.map((log) => ({
    ...log,
    phases: [
      ...log.phases,
      latestPhases[log.id],
      ...(log.id === 'sites'
        ? [
            [
              recoveryUpdate,
              'partial',
              'По Beget, первые сайты работают',
            ] as const,
          ]
        : []),
    ],
    entries: [
      ...log.entries,
      ...(newEntries[log.id] ?? []),
      ...(log.id === 'sites' ? [recoveryEntry] : []),
    ],
  })),
  {
    id: 'dedicated-managed',
    name: 'Dedicated — управление Beget',
    phases: [
      [currentUpdate, 'reported', 'По Beget, проверка и ввод продолжаются'],
      [recoveryUpdate, 'partial', 'По Beget, начат запуск серверов'],
    ],
    entries: [
      [
        currentUpdate,
        'Срез по заявлению Beget',
        'На серверах под администрированием Beget большая часть данных сохранилась; проверка и ввод в работу продолжаются. Это отдельная категория от серверов под управлением пользователей.',
        [latest],
      ],
      recoveryEntry,
    ],
  },
  {
    id: 'dns-management',
    name: 'DNS — управление записями',
    phases: [
      [chartStart, 'down', 'Редактирование не подтверждено'],
      [currentUpdate, 'up', '03.11 · 15:30 — редактирование доступно'],
    ],
    entries: [
      [
        eveningCheck,
        'Вечерний замер панели и API',
        'Панель и API не дали HTTP-ответа за 6 секунд. Возможность изменить записи не подтверждена.',
        [],
      ],
      [
        daytimeCheck,
        'Опубликованный ответ поддержки',
        'В ответах поддержки, приведённых Хабром, смена адресов домена ещё недоступна. Это отдельная функция от ответов NS существующими записями.',
        [support],
      ],
      [
        currentUpdate,
        'Практический опыт автора и условия Beget',
        'Редактирование DNS-записей доступно через domains.beget.ru: отдельный код и авторизация для каждого домена. По Beget, A/MX/TXT доступны для .ru/.рф/.su при регистрации и DNS у Beget. Смена NS и массовое редактирование не подтверждены.',
        [latest, currentAnalysis],
      ],
    ],
  },
  {
    id: 'cloud',
    name: 'S3, Kubernetes, CDN/IP',
    phases: [
      [currentUpdate, 'reported', 'По Beget, данные и настройки утрачены'],
    ],
    entries: [
      [
        currentUpdate,
        'Срез по заявлению Beget',
        'Данные S3 и Kubernetes утрачены; копии этих услуг отдельно не подтверждены. Сообщается об утрате настроек CDN и IP, способы восстановления ещё ищут.',
        [latest],
      ],
    ],
  },
  {
    id: 'domains',
    name: 'Доменные имена',
    phases: [
      [
        currentUpdate,
        'reported',
        'По Beget, делегирование .ru/.рф/.su сохранится',
      ],
    ],
    entries: [
      [
        currentUpdate,
        'Срез по заявлению Beget',
        'Beget сообщил о договорённости с КЦ о продолжении делегирования истекающих .ru/.рф/.su. Это не подтверждение автоматического продления регистрации. По международным доменам работа продолжается.',
        [latest],
      ],
    ],
  },
]
const displayTimeline: readonly ServiceLog[] = timeline.flatMap((log) =>
  log.id === 'dns-management' || log.id === 'dedicated-managed'
    ? []
    : log.id === 'dns'
      ? [log, ...timeline.filter((item) => item.id === 'dns-management')]
      : log.id === 'dedicated'
        ? [log, ...timeline.filter((item) => item.id === 'dedicated-managed')]
        : [log],
)
const dateFormat = new Intl.DateTimeFormat('ru-RU', {
  timeZone: 'Europe/Moscow',
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
})
function observationDate(minute: number): Date {
  return new Date(incidentMidnight + minute * 60000)
}
function fullTime(minute: number): string {
  return (
    dateFormat.format(observationDate(minute)) +
    ' · ' +
    moscowTime(minute) +
    ' МСК'
  )
}

function moscowTime(minute: number): string {
  return (
    Math.floor((minute % 1440) / 60)
      .toString()
      .padStart(2, '0') +
    ':' +
    String(minute % 60).padStart(2, '0')
  )
}

const events = [
  [
    170,
    'Начало роста жалоб на Beget',
    'График жалоб на Beget: в 02:45 — 0, в 02:50 — 9, в 02:55 — 37, в 03:00 — 107.',
    'Detector404 · график жалоб',
    'https://detector404.ru/beget',
  ],
  [
    290,
    'Beget подтверждает сбой',
    'Провайдер сообщает о крупном инциденте.',
    'Beget',
    'https://t.me/beget_official/569',
  ],
  [
    363,
    'Beget сообщил о начале работ',
    'Одновременно команда расследует причины сбоя.',
    'Beget',
    'https://t.me/beget_official/570',
  ],
  [
    503,
    'Beget сообщил о работах в дата-центрах',
    'По сообщению Beget, инфраструктуру настраивают вручную.',
    'Beget',
    'https://t.me/beget_official/571',
  ],
  [
    943,
    'Провайдер называет причину',
    'Beget сообщает о кибератаке и впервые перечисляет результаты по отдельным услугам.',
    'Beget',
    report,
  ],
  [
    1416,
    'Оба проверенных NS ответили для beget.ru',
    'Диагностика получила одну и ту же A-запись от обоих серверов.',
    'Журнал DNS',
    '#journal-dns',
  ],
  [
    1434,
    'DNS отвечает для двух доменов',
    'При повторной проверке панель, API и оба проверенных сайта не дали HTTP-ответа за 6 секунд.',
    'Результаты проверки',
    '#evening-check',
  ],
  [
    daytimeCheck,
    'Повторный замер DNS, панели и сайтов',
    'DNS ответил для двух доменов; панель вернула 502, API и оба сайта не дали HTTP-ответа за 10 секунд.',
    'Результаты проверки',
    '#daytime-check',
  ],
  [
    currentUpdate,
    'Редактирование DNS доступно; Beget уточнил потери',
    'Срез на 15:30: автор подтвердил редактор DNS с отдельной авторизацией по доменам. Beget сообщил об обнуляющих скриптах, потерях облака и плане восстановления.',
    'Подробный разбор и сообщение №573',
    analysisPath,
  ],
  [
    recoveryUpdate,
    'Beget запускает серверы; первые сайты работают',
    'Виртуальный хостинг и серверы с администрированием Beget запускаются после ручной проверки каждого сервера. По сообщению компании, первые сайты уже открываются.',
    'Подробности ночного обновления',
    recoveryPath,
  ],
] as const

const IncidentChart: React.FC = () => {
  const [chartEnd, setChartEnd] = useState(recoveryUpdate)
  useEffect(() => {
    const update = () =>
      setChartEnd(
        Math.max(
          recoveryUpdate,
          Math.floor((Date.now() - incidentMidnight) / 60000),
        ),
      )
    update()
    const timer = window.setInterval(update, 60000)
    return () => window.clearInterval(timer)
  }, [])
  const chartPosition = (minute: number): string =>
    ((minute - chartStart) / (chartEnd - chartStart)) * 100 + '%'
  const endLabel = new Intl.DateTimeFormat('ru-RU', {
    timeZone: 'Europe/Moscow',
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(observationDate(chartEnd))
  return (
    <figure>
      <figcaption>
        Сводка · 4 ноября 2026, 01:00 МСК; сетевой замер — 3 ноября, 13:28
      </figcaption>
      <div className="gantt-axis" aria-hidden="true">
        <span>02.11 · {moscowTime(chartStart)}</span>
        {chartEnd < 2 * 1440 && (
          <span className="midday" style={{ left: chartPosition(1440) }}>
            03.11 · 00:00
          </span>
        )}
        <span>{endLabel}</span>
      </div>
      {displayTimeline.map(({ id, name, phases }) => (
        <a className="gantt-row" key={id} href={'#journal-' + id}>
          <div className="gantt-name">
            <strong>{name}</strong>
            <small data-phase={phases.at(-1)?.[1]}>
              {phases.at(-1)?.[2] ?? 'Нет данных'}
            </small>
          </div>
          <div className="track">
            {phases.map(([start, state, description], index) => {
              const time = fullTime(start)
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
        <span data-phase="down">Доступность не подтверждена</span>
        <span data-phase="reported">Заявление провайдера</span>
        <span data-phase="partial">Частичное восстановление</span>
        <span data-phase="up">Доступность подтверждена</span>
      </div>
      <p className="chart-note">
        02:50 — начало роста{' '}
        <a href="https://detector404.ru/beget">жалоб на Beget</a>. Шкала общая
        для всех услуг. Цвет каждой полосы показывает последний известный статус
        услуги до текущего времени; это не непрерывный мониторинг. Подробности —
        в подписи и журнале. Серый участок означает отсутствие сведений для этой
        строки. Зелёный для dedicated под управлением пользователей основан на
        заявлении Beget о восстановлении 2 ноября примерно в 14:00.
      </p>
    </figure>
  )
}

export const MainPageView: React.FC = () => (
  <MainPageViewStyled lang="ru">
    <header id="overview" tabIndex={-1}>
      <p className="label">Независимая сводка · 4 ноября 2026, 01:00 МСК</p>
      <h1 tabIndex={-1}>Сбой Beget 2 ноября 2026 года</h1>
      <p>
        <strong>По сообщению Beget, первые сайты уже работают.</strong> Компания
        начала запуск серверов виртуального хостинга и серверов со своим
        администрированием. Каждый сервер проверяют вручную, очищают от
        вредоносных механизмов и проверяют целостность данных перед запуском.
      </p>
      <p>
        <Link to={recoveryPath}>Обновление от 4 ноября, 01:00 МСК →</Link>
      </p>
      <p>
        <strong>DNS-записи уже можно менять.</strong> На{' '}
        <a href="http://domains.beget.ru/">domains.beget.ru</a> доступен
        отдельный редактор. Для каждого домена нужно получить код и
        авторизоваться заново. По Beget, поддерживаются A, MX и TXT для
        .ru/.рф/.su при регистрации и DNS у Beget.
      </p>
      <p>
        <Link to={analysisPath}>
          Разбор обновления от 3 ноября, 15:30 МСК →
        </Link>
      </p>
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
        Сводка обновлена 4 ноября 2026 года, 01:00 МСК по{' '}
        <a href={recoveryReport}>сообщению о запуске серверов</a>. Остальные
        статусы сохранены по <a href={latestReport}>сообщению Beget №573</a> и
        предыдущим наблюдениям; редактирование DNS подтверждено опытом автора.
        Последний сетевой замер выполнен 3 ноября в 13:28 из одной сети. Сроки
        10 и 24 часа отсчитываются от заявления провайдера, а не от времени этой
        сводки.
      </p>
      <aside id="daytime-check">
        <strong>Контрольная проверка · 3 ноября 2026, 13:28 МСК</strong>
        <p>
          Оба проверенных NS ответили для beget.ru и radimax.ru. cp.beget.com
          вернул HTTP 502 за 9,12 секунды; api.beget.com, beget.ru и radimax.ru
          не дали HTTP-ответа за 10 секунд. Это не проверка входа, изменения
          записей или доступности всех клиентов.
        </p>
      </aside>
      <aside id="evening-check">
        <strong>Исторический замер · 2 ноября 2026, 23:54 МСК</strong>
        <p>
          Оба NS вернули адреса beget.ru и radimax.ru. Из той же сети
          HTTPS-запросы к этим сайтам, панели и API Beget завершились без
          HTTP-ответа за 6 секунд.{' '}
          <a href="#journal-dns">Адреса NS и результаты DNS-запросов</a>.
        </p>
      </aside>
      <aside id="panel-check">
        <strong>Исторический замер · 2 ноября 2026, 20:20 МСК</strong>
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
              <strong>Сроки и ограничения. </strong>
              {forecast}
            </p>
          </article>
        ))}
      </div>
    </section>
    <section id="history" tabIndex={-1}>
      <p className="label">04 / Хронология</p>
      <h2>Как развивался сбой</h2>
      <p>
        2–3 ноября 2026 года, время московское. 15:30 — время фиксации нового
        среза, не установленная минута публикации №573.
      </p>
      <ol>
        {events.map(([time, title, detail, source, href]) => (
          <li key={time}>
            <div className="hour">
              <small>{dateFormat.format(observationDate(time))}</small>
              <br />
              {moscowTime(time)} МСК
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
          Beget заявляет о сохранности файловых бэкапов. Даты и проверенная
          полнота конкретных копий не названы; выдача закрыта до восстановления
          инфраструктуры и проверки безопасности.
        </dd>
        <dt>Уцелела ли база с заказами и платежами?</dt>
        <dd>
          Поддержка упоминает базы среди восстанавливаемых данных. Для
          конкретного проекта неизвестны дата согласованной копии, полнота
          транзакций и возможность получить дамп.
        </dd>
        <dt>Когда я смогу зайти на свой VPS?</dt>
        <dd>
          Beget сообщил об утрате данных облака и бинарных бэкапов VPS.
          Сохранены файловые копии; срок и способ восстановления виртуальных
          машин не названы. Для S3 и Kubernetes пригодные копии отдельно не
          подтверждены.
        </dd>
        <dt>Можно ли уже перенаправить домен на резерв?</dt>
        <dd>
          Да, для поддерживаемых доменов через отдельный редактор DNS. Нужны
          рабочий резерв и отдельная авторизация для каждого домена. Это не
          подтверждение смены самих NS или полного возвращения панели.
        </dd>
        <dt>Будет ли компенсация за простой?</dt>
        <dd>
          В{' '}
          <a href="https://habr.com/ru/news/1102974/">
            опубликованных ответах поддержки
          </a>{' '}
          сказано о приостановке списаний и подаче заявки на компенсацию через
          тикеты после восстановления панели. Размер и одобрение компенсации не
          обещаны; исходная переписка независимо не проверена.
        </dd>
        <dt>Что известно о безопасности данных?</dt>
        <dd>
          Beget сообщил о доступе к управляющему контуру и запуске обнуляющих
          скриптов. Компания пока не видит попыток скачать или изменить
          пользовательские данные на серверах, но это предварительный вывод.
          Провайдер рекомендует сменить пароли, ключи и другие учётные данные,
          которые могли храниться на серверах.
        </dd>
      </dl>
      <a href={latestReport}>Новое сообщение Beget №573</a>
    </section>
    <section id="journal" tabIndex={-1}>
      <p className="label">06 / Журнал</p>
      <h2>Журнал по услугам</h2>
      <p>
        Указаны дата и московское время публикации, собственного замера или
        фиксации среза. Записи на 3 ноября, 15:30 — срез по новому заявлению и
        опыту автора.
      </p>
      {displayTimeline.map(({ id, name, entries }) => (
        <article
          className="journal"
          id={'journal-' + id}
          key={id}
          tabIndex={-1}
        >
          <h3>{name}</h3>
          {entries.map(([minute, evidence, detail, sources]) => (
            <div className="entry" key={minute}>
              <time dateTime={observationDate(minute).toISOString()}>
                {fullTime(minute)}
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
