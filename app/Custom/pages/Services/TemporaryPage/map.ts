import type { ServiceMapProps } from 'app/Custom/components/ServiceMap/interfaces'

export const temporaryPageMap: ServiceMapProps = {
  title: 'Основной сайт недоступен — открываем временный канал',
  description:
    'Показываем случай, когда основной сайт ещё восстанавливается, а изменить его домен сейчас нельзя. Контакты компании и канал для получения обращений доступны.',
  stages: [
    {
      id: 'before',
      title: 'Сейчас',
      description:
        'На прежнем сайте оставить заявку нельзя, но компания продолжает работать.',
      nodes: [
        {
          id: 'domain',
          title: 'Основной домен',
          status: 'unavailable',
          state: 'Настройки недоступны',
        },
        {
          id: 'site',
          title: 'Основной сайт',
          status: 'unavailable',
          state: 'Не работает',
        },
        {
          id: 'contacts',
          title: 'Контакты компании',
          status: 'available',
          state: 'Есть актуальные контакты',
        },
        {
          id: 'recipient',
          title: 'Получатель заявок',
          status: 'available',
          state: 'Готов отвечать клиентам',
        },
      ],
    },
    {
      id: 'work',
      title: 'Что делаем',
      description: 'Создаём отдельный доступный путь для обращений.',
      nodes: [
        {
          id: 'content',
          title: 'Содержание',
          status: 'action',
          state: 'Готовим контакты и предложение',
          description: 'Объясняем, как компания работает и как обратиться.',
          connection: 'connected',
        },
        {
          id: 'page',
          title: 'Временная страница',
          status: 'action',
          state: 'Публикуем и проверяем',
          description:
            'Размещаем на отдельном адресе, проверяем форму и доставку заявки.',
          connection: 'connected',
        },
        {
          id: 'link',
          title: 'Ссылка для клиентов',
          status: 'action',
          state: 'Передаём для размещения',
          description:
            'Вы направляете посетителей через рекламу, рассылку и социальные сети.',
        },
      ],
    },
    {
      id: 'after',
      title: 'После проверки',
      description:
        'Отдельная страница принимает обращения. Основной сайт при этом ещё не восстановлен.',
      nodes: [
        {
          id: 'main',
          title: 'Основной сайт',
          status: 'unavailable',
          state: 'Всё ещё недоступен',
        },
        {
          id: 'address',
          title: 'Временный адрес',
          status: 'available',
          state: 'Есть рабочая ссылка',
          connection: 'connected',
        },
        {
          id: 'page',
          title: 'Страница контактов',
          status: 'available',
          state: 'Доступна клиентам',
          connection: 'connected',
        },
        {
          id: 'requests',
          title: 'Обращения',
          status: 'available',
          state: 'Доставка проверена',
        },
      ],
    },
  ],
  note: 'Посетителей нужно направлять на временную ссылку: основной домен автоматически на неё не переключится. Каталог, личные кабинеты и история заказов основного сайта этим не восстанавливаются.',
}
