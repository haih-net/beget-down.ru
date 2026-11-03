import type { ServiceMapProps } from 'app/Custom/components/ServiceMap/interfaces'

export const standbyMap: ServiceMapProps = {
  title: 'Сайт работает — готовим запасной путь',
  description:
    'Сценарий для проекта, которому важно сократить простой: основная площадка работает, но подготовленного резерва и внешнего контроля ещё нет.',
  stages: [
    {
      id: 'before',
      title: 'Сейчас',
      description:
        'При сбое пока некуда быстро переключиться и нет настроенного внешнего сигнала.',
      nodes: [
        {
          id: 'site',
          title: 'Основной сайт',
          status: 'available',
          state: 'Работает',
        },
        {
          id: 'data',
          title: 'Данные проекта',
          status: 'available',
          state: 'Доступны на основной площадке',
        },
        {
          id: 'reserve',
          title: 'Резервная площадка',
          status: 'missing',
          state: 'Не подготовлена',
        },
        {
          id: 'monitor',
          title: 'Внешний мониторинг',
          status: 'missing',
          state: 'Не настроен',
        },
      ],
    },
    {
      id: 'work',
      title: 'Что делаем',
      description:
        'Подготовка включает площадку, актуальные данные и проверку порядка действий.',
      nodes: [
        {
          id: 'reserve',
          title: 'Запасной сервер',
          status: 'action',
          state: 'Готовим резерв',
          description: 'Разворачиваем окружение и согласуем обновление данных.',
          connection: 'connected',
        },
        {
          id: 'monitor',
          title: 'Внешние проверки',
          status: 'action',
          state: 'Настраиваем уведомления',
          description:
            'Определяем проверяемые функции и получателя сигнала о сбое.',
          connection: 'connected',
        },
        {
          id: 'switch',
          title: 'Пробное переключение',
          status: 'action',
          state: 'Проверяем план на практике',
          description:
            'Согласуем проверку, измеряем время и описываем возврат на основную площадку.',
        },
      ],
    },
    {
      id: 'after',
      title: 'После проверки',
      description:
        'Основная площадка остаётся рабочей. Резерв включается по согласованному плану, а не принимает заказы параллельно.',
      nodes: [
        {
          id: 'site',
          title: 'Основной сайт',
          status: 'available',
          state: 'Продолжает работать',
        },
        {
          id: 'reserve',
          title: 'Резервная площадка',
          status: 'available',
          state: 'Готова к переключению',
          description: 'Проверено контрольным запуском.',
        },
        {
          id: 'monitor',
          title: 'Мониторинг',
          status: 'available',
          state: 'Отправляет уведомления',
        },
        {
          id: 'plan',
          title: 'План переключения',
          status: 'available',
          state: 'Проверен и описан',
          description:
            'Назначены ответственные и зафиксировано время проверки.',
        },
      ],
    },
  ],
  note: 'Мониторинг не означает круглосуточное дежурство, а наличие резерва — автоматическое переключение. Эти условия согласуем отдельно. Резерв также не заменяет историю независимых копий.',
}
