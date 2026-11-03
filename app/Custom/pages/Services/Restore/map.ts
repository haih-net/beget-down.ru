import { ServiceMapProps } from 'app/Custom/components/ServiceMap/interfaces'

export const restoreMap: ServiceMapProps = {
  title: 'Есть копия — есть путь к восстановлению',
  description:
    'Этот сценарий подходит, если копия хранится отдельно от недоступного сервера и вы можете менять настройки домена.',
  stages: [
    {
      id: 'before',
      title: 'Сейчас',
      description:
        'Привычный адрес есть, но посетитель не может воспользоваться сайтом.',
      nodes: [
        {
          id: 'domain',
          title: 'Домен',
          status: 'available',
          state: 'Есть доступ к настройкам',
          connection: 'interrupted',
        },
        {
          id: 'server',
          title: 'Старый сервер',
          status: 'unavailable',
          state: 'Недоступен',
          connection: 'interrupted',
        },
        {
          id: 'site',
          title: 'Сайт',
          status: 'unavailable',
          state: 'Не открывается',
          connection: 'interrupted',
        },
        {
          id: 'requests',
          title: 'Заявки',
          status: 'unavailable',
          state: 'Через сайт не поступают',
        },
      ],
    },
    {
      id: 'work',
      title: 'Что делаем',
      description:
        'Источником восстановления служит независимая копия, а не недоступный сервер.',
      nodes: [
        {
          id: 'backup',
          title: 'Резервная копия',
          status: 'available',
          state: 'Есть отдельно',
          description: 'Проверяем состав файлов, базу данных и дату копии.',
          connection: 'connected',
        },
        {
          id: 'restore',
          title: 'Новая площадка',
          status: 'action',
          state: 'Восстанавливаем сайт',
          description: 'Подготавливаем сервер, разворачиваем файлы и базу.',
          connection: 'connected',
        },
        {
          id: 'verify',
          title: 'Проверка и запуск',
          status: 'action',
          state: 'Проверяем → переключаем',
          description:
            'Проверяем функции сайта, затем направляем на него домен.',
        },
      ],
    },
    {
      id: 'after',
      title: 'После проверки',
      description:
        'Ожидаемый результат после восстановления и обновления адреса домена.',
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
          title: 'Сайт',
          status: 'available',
          state: 'Восстановлен из копии',
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
  note: 'Данные вернутся на дату копии. Более поздние заказы и изменения нужно сверить отдельно. После переключения часть посетителей некоторое время может попадать на старый адрес из-за кеширования DNS.',
}
