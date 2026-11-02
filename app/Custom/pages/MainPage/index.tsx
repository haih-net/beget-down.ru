import { useSectionNavigation } from '../../components/SectionNavigation/useSectionNavigation'
import { MainPageView } from './View'

const homeSections = [
  { id: 'overview', label: 'Сводка' },
  { id: 'diagnostics', label: 'Проверить домен' },
  { id: 'recovery', label: 'Пути восстановления' },
  { id: 'services', label: 'Состояние услуг' },
  { id: 'history', label: 'Хронология' },
  { id: 'questions', label: 'Открытые вопросы' },
  { id: 'journal', label: 'Журнал по услугам' },
] as const

export const MainPage: React.FC = () => {
  const { navigation } = useSectionNavigation({
    sections: homeSections,
    label: 'Разделы главной',
  })
  return (
    <>
      {navigation}
      <MainPageView />
    </>
  )
}
