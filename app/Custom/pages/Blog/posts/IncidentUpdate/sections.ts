import type { PageSection } from '../../../../components/SectionNavigation'
export const sections: readonly PageSection[] = [
  {
    id: 'dns-management',
    label: 'Главное: домен теперь можно переключить на резерв',
  },
  {
    id: 'attack',
    label: 'Управляющий контур и обнуляющие скрипты',
  },
  {
    id: 'data',
    label: 'Какие данные потеряны и какие копии остались',
  },
  {
    id: 'recovery',
    label: 'Почему сохранённые копии пока нельзя получить',
  },
  {
    id: 'services',
    label: 'Что восстановлено и что ещё обещают',
  },
  {
    id: 'domains',
    label: 'Домены и сроки делегирования',
  },
  {
    id: 'forecast',
    label: 'Что изменилось относительно моего прогноза',
  },
  {
    id: 'security',
    label: 'Что означает заявление о доступе к данным',
  },
  {
    id: 'questions',
    label: 'Что остаётся неизвестным и мой вывод',
  },
]
