import type { ServiceMapProps } from 'app/Custom/components/ServiceMap/interfaces'

export const newSiteMap: ServiceMapProps = {
  title: 'Копии нет — создаём новый сайт',
  description:
    'Сценарий для ситуации, когда прежний сайт недоступен, независимой копии нет, но вы можете управлять доменом и предоставить материалы компании.',
  stages: [
    {
      id: 'before',
      title: 'Сейчас',
      description:
        'Восстановить прежнюю версию не из чего. Для нового сайта используем сохранившиеся материалы.',
      nodes: [
        {
          id: 'site',
          title: 'Прежний сайт',
          status: 'unavailable',
          state: 'Недоступен',
        },
        {
          id: 'backup',
          title: 'Резервная копия',
          status: 'missing',
          state: 'Копии нет',
        },
        {
          id: 'domain',
          title: 'Домен',
          status: 'available',
          state: 'Настройки доступны',
        },
        {
          id: 'materials',
          title: 'Материалы',
          status: 'available',
          state: 'Есть описание и контакты',
          description:
            'Фотографии, тексты и другие сохранившиеся материалы компании.',
        },
      ],
    },
    {
      id: 'work',
      title: 'Что делаем',
      description:
        'Согласуем первую версию вокруг самого важного действия клиента.',
      nodes: [
        {
          id: 'scope',
          title: 'Первая версия',
          status: 'action',
          state: 'Определяем состав',
          description:
            'Выбираем необходимые страницы и способ приёма обращений.',
          connection: 'connected',
        },
        {
          id: 'create',
          title: 'Новый сайт',
          status: 'action',
          state: 'Создаём и размещаем',
          description:
            'Готовим тексты, оформление и функции на новой площадке.',
          connection: 'connected',
        },
        {
          id: 'launch',
          title: 'Проверка и запуск',
          status: 'action',
          state: 'Проверяем → подключаем',
          description:
            'Отправляем пробную заявку и направляем домен на готовый сайт.',
        },
      ],
    },
    {
      id: 'after',
      title: 'После проверки',
      description:
        'Клиенты могут обращаться через новый сайт на привычном адресе.',
      nodes: [
        {
          id: 'domain',
          title: 'Домен',
          status: 'available',
          state: 'Ведёт на новую площадку',
          connection: 'connected',
        },
        {
          id: 'server',
          title: 'Новый сервер',
          status: 'available',
          state: 'Работает',
          connection: 'connected',
        },
        {
          id: 'site',
          title: 'Новый сайт',
          status: 'available',
          state: 'Согласованная версия готова',
          connection: 'connected',
        },
        {
          id: 'requests',
          title: 'Заявки',
          status: 'available',
          state: 'Приём проверен',
        },
      ],
    },
  ],
  note: 'Это создание нового сайта, а не восстановление прежней базы. Старые заказы и аккаунты можно перенести только при наличии отдельного источника данных. Срок и объём первой версии согласуем до начала работы.',
}
