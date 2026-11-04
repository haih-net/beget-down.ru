import type { PageSection } from '../../../../components/SectionNavigation'
export const sections = [
  {
    id: 'website' as const,
    label: 'Сайт вернулся, вход в панель пока недоступен',
  },
  {
    id: 'guarantees' as const,
    label: 'Гарантии на фоне продолжающегося восстановления',
  },
] satisfies readonly [PageSection, PageSection]
