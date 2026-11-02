import type * as React from 'react'
import { useCallback } from 'react'
import { NavigationStyled } from './styles'

export interface PageSection {
  id: string
  label: string
}

interface SectionNavigationProps {
  sections: readonly PageSection[]
  label: string
  panelId: string
  active: number
  expanded: boolean
  interactive: boolean
  navigationRef: React.RefObject<HTMLElement | null>
  toggleRef: React.RefObject<HTMLButtonElement | null>
  onToggle: () => void
  onClose: () => void
  actions: React.ReactNode
  onKeyDown: React.KeyboardEventHandler<HTMLElement>
  onSelect: React.MouseEventHandler<HTMLAnchorElement>
}

export const SectionNavigation: React.FC<SectionNavigationProps> = ({
  sections,
  label,
  panelId,
  active,
  expanded,
  interactive,
  navigationRef,
  toggleRef,
  onToggle,
  actions,
  onClose,
  onKeyDown,
  onSelect,
}) => {
  const selectAction = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (
        event.target instanceof Element &&
        event.target.closest('a, button')
      ) {
        onClose()
      }
    },
    [onClose],
  )
  return (
    <NavigationStyled
      ref={navigationRef}
      aria-label={label}
      data-expanded={expanded}
      onKeyDown={onKeyDown}
    >
      <button
        type="button"
        aria-label={expanded ? 'Закрыть меню' : 'Открыть меню'}
        ref={toggleRef}
        className="contents-toggle"
        aria-expanded={expanded}
        aria-controls={panelId}
        disabled={!interactive}
        onClick={onToggle}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <path
            d={expanded ? 'M6 6l12 12M18 6 6 18' : 'M3 6h18M3 12h18M3 18h18'}
          />
        </svg>
      </button>
      <div className="contents-panel" id={panelId}>
        <div className="section-list">
          <p className="contents-caption">На этой странице</p>
          <ol>
            {sections.map(({ id, label: sectionLabel }, index) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  aria-current={active === index ? 'location' : undefined}
                  onClick={onSelect}
                >
                  <span className="section-number" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span>{sectionLabel}</span>
                  <span className="current-mark" aria-hidden="true">
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </ol>
          <div className="reading-meter" aria-hidden="true">
            <span />
          </div>
          <p className="section-counter" aria-hidden="true">
            {String(active + 1).padStart(2, '0')}{' '}
            <span>/ {String(sections.length).padStart(2, '0')}</span>
          </p>
        </div>
        <div className="header-actions" onClick={selectAction}>
          {actions}
        </div>
      </div>
    </NavigationStyled>
  )
}
