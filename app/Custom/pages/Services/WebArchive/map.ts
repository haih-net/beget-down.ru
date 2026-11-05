import type { ServiceMapProps } from 'app/Custom/components/ServiceMap/interfaces'
export const webArchiveMap: ServiceMapProps = {
  title: 'Нет бэкапа — используем сохранившиеся снимки',
  description:
    'Снимки из открытых источников становятся образцом для разработки сайта заново.',
  stages: [
    {
      id: 'before',
      title: 'Что осталось',
      description:
        'Прежний сайт недоступен; пригодность снимков нужно оценить.',
      nodes: [
        {
          id: 'site',
          title: 'Прежний сайт',
          status: 'unavailable',
          state: 'Не работает',
        },
        {
          id: 'snapshots',
          title: 'Снимки страниц',
          status: 'unknown',
          state: 'Проверяем наличие и полноту',
        },
      ],
    },
    {
      id: 'work',
      title: 'Что делаем',
      description:
        'Воссоздаём сайт по доступным образцам и материалам клиента.',
      nodes: [
        {
          id: 'structure',
          title: 'Структура и содержание',
          status: 'action',
          state: 'Собираем страницы и материалы',
          connection: 'connected',
        },
        {
          id: 'development',
          title: 'Новая реализация',
          status: 'action',
          state: 'Программируем внешний вид и функции',
        },
      ],
    },
    {
      id: 'after',
      title: 'Результат',
      description:
        'Новый работающий сайт с сохранением согласованного облика, основных функций и доступного наполнения.',
      nodes: [
        {
          id: 'new',
          title: 'Рабочий сайт',
          status: 'available',
          state: 'Страницы и функции проверены',
        },
        {
          id: 'content',
          title: 'Наполнение',
          status: 'available',
          state: 'Перенесено из снимков и ваших материалов',
        },
      ],
    },
  ],
  note: 'Снимки могут быть сделаны несколько месяцев назад или раньше и содержать лишь часть сайта. Закрытые данные и серверную базу они не возвращают.',
}
