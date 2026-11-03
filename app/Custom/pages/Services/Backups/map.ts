import type { ServiceMapProps } from 'app/Custom/components/ServiceMap/interfaces'

export const backupsMap: ServiceMapProps = {
  title: 'Сайт работает — сохраняем независимую копию',
  description:
    'Сценарий подготовки к будущему сбою: данные сайта сейчас доступны, но копии вне основного хостинга нет.',
  stages: [
    {
      id: 'before',
      title: 'Сейчас',
      description:
        'Рабочий сайт и его данные зависят от доступности основной площадки.',
      nodes: [
        {
          id: 'site',
          title: 'Сайт',
          status: 'available',
          state: 'Работает',
        },
        {
          id: 'data',
          title: 'Файлы и база',
          status: 'available',
          state: 'Доступны на хостинге',
        },
        {
          id: 'copy',
          title: 'Независимая копия',
          status: 'missing',
          state: 'Отдельной копии нет',
        },
        {
          id: 'restore',
          title: 'Восстановление',
          status: 'unknown',
          state: 'Пригодность копии не проверена',
        },
      ],
    },
    {
      id: 'work',
      title: 'Что делаем',
      description:
        'Сохраняем данные отдельно и проверяем, что из них можно запустить сайт.',
      nodes: [
        {
          id: 'schedule',
          title: 'Правила хранения',
          status: 'action',
          state: 'Согласуем частоту и сроки',
          description:
            'Определяем допустимую потерю изменений и количество сохраняемых версий.',
          connection: 'connected',
        },
        {
          id: 'copy',
          title: 'Отдельное хранилище',
          status: 'action',
          state: 'Настраиваем копирование',
          description: 'Сохраняем файлы и базу вне основной площадки.',
          connection: 'connected',
        },
        {
          id: 'test',
          title: 'Контрольная копия',
          status: 'action',
          state: 'Проверяем восстановлением',
          description:
            'Разворачиваем копию отдельно и проверяем согласованные функции.',
        },
      ],
    },
    {
      id: 'after',
      title: 'После проверки',
      description:
        'Сайт продолжает работать, а путь к восстановлению больше не зависит только от основного хостинга.',
      nodes: [
        {
          id: 'site',
          title: 'Основной сайт',
          status: 'available',
          state: 'Продолжает работать',
        },
        {
          id: 'copy',
          title: 'Независимая копия',
          status: 'available',
          state: 'Есть вне хостинга',
          description: 'Настроено расписание и хранение версий.',
        },
        {
          id: 'test',
          title: 'Проверка запуска',
          status: 'available',
          state: 'Копия развёрнута и проверена',
        },
        {
          id: 'guide',
          title: 'Инструкция',
          status: 'available',
          state: 'Порядок восстановления описан',
        },
      ],
    },
  ],
  note: 'Резервная копия — не работающий запасной сервер. При аварии потребуется время на развёртывание. Ответственного за контроль копирования и уведомления согласуем отдельно; проверку нужно повторять после существенных изменений проекта.',
}
