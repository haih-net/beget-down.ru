import type * as React from 'react'
import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { SectionNavigation } from './index'
import type { PageSection } from './index'

interface SectionNavigationOptions {
  sections: readonly PageSection[]
  label: string
  actions: React.ReactNode
}

interface SectionNavigationResult {
  navigation: React.ReactElement
  navigateToSection: React.MouseEventHandler<HTMLAnchorElement>
  closeNavigation: () => void
}

export const useSectionNavigation = ({
  sections,
  label,
  actions,
}: SectionNavigationOptions): SectionNavigationResult => {
  const [active, setActive] = useState(0)
  const [expanded, setExpanded] = useState(false)
  const [interactive, setInteractive] = useState(false)
  const navigationRef = useRef<HTMLElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const panelId = useId()
  const closeNavigation = useCallback((): void => setExpanded(false), [])
  const toggleNavigation = useCallback(
    (): void => setExpanded((value) => !value),
    [],
  )
  const closeOnEscape = useCallback(
    (event: React.KeyboardEvent<HTMLElement>): void => {
      if (event.key === 'Escape') {
        setExpanded(false)
        toggleRef.current?.focus()
      }
    },
    [],
  )
  const navigateToSection = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>): void => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return
      }
      const target = document.getElementById(event.currentTarget.hash.slice(1))
      if (!target) {
        return
      }
      event.preventDefault()
      setExpanded(false)
      target.focus({ preventScroll: true })
      target.scrollIntoView({
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
          ? 'instant'
          : 'smooth',
        block: 'start',
      })
    },
    [],
  )

  useEffect(() => {
    if (!expanded) {
      return
    }
    const outside = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !navigationRef.current?.contains(event.target)
      ) {
        closeNavigation()
      }
    }
    document.addEventListener('pointerdown', outside)
    return () => document.removeEventListener('pointerdown', outside)
  }, [expanded, closeNavigation])

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const panels = sections.map(({ id }) => document.getElementById(id))
    let frame = 0
    const update = (): void => {
      frame = 0
      let current = 0
      panels.forEach((panel, index) => {
        if (
          panel &&
          panel.getBoundingClientRect().top <= window.innerHeight * 0.4
        ) {
          current = index
        }
      })
      setActive(current)
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight
      const progress = Math.max(
        0,
        Math.min(1, window.scrollY / Math.max(1, scrollable)),
      )
      navigationRef.current?.style.setProperty(
        '--reading-progress',
        `${progress * 100}%`,
      )
      navigationRef.current?.style.setProperty(
        '--rail-drift',
        `${reducedMotion.matches ? 0 : -progress * 22}px`,
      )
    }
    const schedule = (): void => {
      if (!frame) {
        frame = window.requestAnimationFrame(update)
      }
    }
    update()
    setInteractive(true)
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    reducedMotion.addEventListener('change', schedule)
    const observer = new ResizeObserver(schedule)
    observer.observe(document.body)
    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      reducedMotion.removeEventListener('change', schedule)
      observer.disconnect()
    }
  }, [sections])

  return {
    navigation: (
      <SectionNavigation
        sections={sections}
        label={label}
        panelId={panelId}
        active={active}
        expanded={expanded}
        interactive={interactive}
        navigationRef={navigationRef}
        toggleRef={toggleRef}
        onToggle={toggleNavigation}
        actions={actions}
        onClose={closeNavigation}
        onKeyDown={closeOnEscape}
        onSelect={navigateToSection}
      />
    ),
    navigateToSection,
    closeNavigation,
  }
}
