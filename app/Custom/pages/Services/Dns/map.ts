import type { ServiceMapProps } from 'app/Custom/components/ServiceMap/interfaces'

export const dnsMap: ServiceMapProps = {
  title: 'Новый сайт готов — направляем на него домен',
  description:
    'Сценарий, когда новая площадка уже работает, но привычный домен всё ещё ведёт на недоступный старый сервер. Доступ к настройкам домена есть.',
  stages: [
    {
      id: 'before',
      title: 'Сейчас',
      description:
        'Новая площадка готова, но посетители ещё не попадают на неё по привычному адресу.',
      nodes: [
        {
          id: 'domain',
          title: 'Домен',
          status: 'available',
          state: 'Настройки доступны',
          description: 'Пока направлен на старый сервер.',
          connection: 'interrupted',
        },
        {
          id: 'old',
          title: 'Старый сервер',
          status: 'unavailable',
          state: 'Недоступен',
        },
        {
          id: 'new',
          title: 'Новая площадка',
          status: 'available',
          state: 'Сайт уже работает',
          description: 'Файлы и база уже размещены, функции проверены.',
        },
        {
          id: 'visitors',
          title: 'Посетители',
          status: 'unavailable',
          state: 'Не открывают сайт по домену',
        },
      ],
    },
    {
      id: 'work',
      title: 'Что делаем',
      description:
        'Меняем маршрут к готовому сайту, учитывая остальные службы домена.',
      nodes: [
        {
          id: 'prepare',
          title: 'Проверка настроек',
          status: 'action',
          state: 'Проверяем сайт и службы',
          description: 'Уточняем IP, HTTPS, почту, поддомены и записи зоны.',
          connection: 'connected',
        },
        {
          id: 'change',
          title: 'Настройки домена',
          status: 'action',
          state: 'Меняем направление',
          description:
            'Обновляем записи DNS или заранее готовим зону для смены NS.',
          connection: 'connected',
        },
        {
          id: 'verify',
          title: 'Контроль',
          status: 'action',
          state: 'Проверяем ответы',
          description:
            'Проверяем новое направление домена и открытие сайта по HTTPS.',
        },
      ],
    },
    {
      id: 'after',
      title: 'После проверки',
      description:
        'По мере обновления кешей посетители переходят на новую площадку.',
      nodes: [
        {
          id: 'domain',
          title: 'Домен',
          status: 'available',
          state: 'Указывает на новый сервер',
          connection: 'connected',
        },
        {
          id: 'server',
          title: 'Новый сервер',
          status: 'available',
          state: 'Отвечает на запросы',
          connection: 'connected',
        },
        {
          id: 'site',
          title: 'Готовый сайт',
          status: 'available',
          state: 'Открывается по домену',
          connection: 'connected',
        },
        {
          id: 'visitors',
          title: 'Посетители',
          status: 'available',
          state: 'Попадают на новую площадку',
        },
      ],
    },
  ],
  note: 'Переключение домена не переносит файлы и не восстанавливает базу. Старые адреса некоторое время сохраняются в кешах. Если нельзя изменить ни DNS, ни NS, сначала потребуется восстановить управление доменом.',
}
