import type { ServiceMapProps } from 'app/Custom/components/ServiceMap/interfaces'

export const diagnosticsMap: ServiceMapProps = {
  title: 'Сайт не открывается — выясняем причину',
  description:
    'Пока известен только симптом. Проверяем домен, сервер и приложение, не принимая предположение о причине за установленный факт.',
  stages: [
    {
      id: 'before',
      title: 'Сейчас',
      description:
        'Недоступность сайта подтверждена, состояние остальных частей ещё нужно проверить.',
      nodes: [
        {
          id: 'domain',
          title: 'Домен',
          status: 'unknown',
          state: 'Состояние неизвестно',
        },
        {
          id: 'server',
          title: 'Сервер',
          status: 'unknown',
          state: 'Состояние неизвестно',
        },
        {
          id: 'application',
          title: 'Приложение',
          status: 'unknown',
          state: 'Причина ошибки неизвестна',
        },
        {
          id: 'site',
          title: 'Сайт',
          status: 'unavailable',
          state: 'Не открывается',
        },
      ],
    },
    {
      id: 'work',
      title: 'Что делаем',
      description:
        'Идём от адреса сайта к приложению. Глубина проверки зависит от доступов.',
      nodes: [
        {
          id: 'dns',
          title: 'Домен и адрес',
          status: 'action',
          state: 'Проверяем DNS',
          description:
            'Выясняем, куда направляются посетители и кто отвечает за домен.',
          connection: 'connected',
        },
        {
          id: 'connection',
          title: 'Соединение',
          status: 'action',
          state: 'Проверяем сервер и HTTPS',
          description: 'Отделяем ошибки соединения от проблем приложения.',
          connection: 'connected',
        },
        {
          id: 'app',
          title: 'Приложение',
          status: 'action',
          state: 'Проверяем при наличии доступа',
          description:
            'Изучаем запуск, сообщения об ошибках и подключение к базе.',
        },
      ],
    },
    {
      id: 'after',
      title: 'Результат диагностики',
      description:
        'Результат услуги — проверенные сведения и следующий шаг. Работа сайта ещё не считается восстановленной.',
      nodes: [
        {
          id: 'facts',
          title: 'Подтверждённые факты',
          status: 'available',
          state: 'Зафиксированы результаты',
          description:
            'Указано, что именно проверено и какие причины подтверждены.',
        },
        {
          id: 'limits',
          title: 'Границы проверки',
          status: 'available',
          state: 'Неизвестное обозначено',
          description:
            'Если причина не установлена, перечислены недостающие доступы или сведения.',
        },
        {
          id: 'plan',
          title: 'План действий',
          status: 'available',
          state: 'Определён следующий шаг',
          description:
            'Понятно, что можно сделать самостоятельно и что зависит от провайдера.',
        },
      ],
    },
  ],
  note: 'Диагностика не означает автоматическое устранение неисправности. Исправление настроек, восстановление или перенос согласуем отдельно по результатам проверки.',
}
