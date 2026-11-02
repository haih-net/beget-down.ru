import { styled } from '@linaria/react'

export const NavigationStyled = styled.nav`
  position: relative;
  z-index: 10;

  font-family: Arial, Helvetica, sans-serif;
  .contents-toggle {
    display: flex;
    margin-left: auto;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    padding: 0;
    border: 0;
    background: transparent;
    color: inherit;
    cursor: pointer;
  }
  .contents-panel {
    position: absolute;
    right: 0;
    top: 100%;
    display: none;
    width: min(19rem, calc(100vw - 2rem));
    max-height: calc(100svh - 5rem);
    overflow-y: auto;
    margin-top: 0.5rem;
    padding: 1.2rem;
    background: #f7f5ef;
    border: 1px solid #c9c5bc;
    box-shadow: 0 12px 32px #24221f15;
  }
  &[data-expanded='true'] .contents-panel {
    display: block;
  }
  .contents-caption {
    margin: 0 0 1.1rem;
    font: 0.62rem monospace;
    letter-spacing: 0;
    text-transform: uppercase;
    color: #716d65;
  }
  ol {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .site-links {
    display: flex;
    flex-wrap: wrap;
    gap: 0.3rem 1rem;
    margin-bottom: 1.5rem;
  }
  .site-links a {
    border: 0;
  }
  /* Имя — спокойная личная подпись, не акцентная кнопка продвижения. */
  .identity-link {
    display: block;
    margin-top: 1.25rem;
    padding-top: 1rem;
    border-top: 1px solid #d9d5cd;
    border-bottom: 0;
    color: #716d65;
    font-weight: 400;
    line-height: 1.7;
  }
  .identity-link:hover {
    color: #ce3023;
  }
  li {
    margin: 0;
    padding: 0;
  }
  .section-list a {
    display: flex;
    align-items: center;
    gap: 0.7rem;
    min-height: 44px;
    font-size: 0.76rem;
    text-decoration: none;
    color: #68645d;
    border-bottom: 1px solid #d9d5cd;
  }
  .section-number {
    flex-shrink: 0;
    white-space: nowrap;
    font: 0.62rem monospace;
    color: #807b72;
  }
  .current-mark {
    margin-left: auto;
    visibility: hidden;
    font-size: 1.1rem;
  }
  .section-list a[aria-current] {
    color: #ce3023;
    font-weight: 700;
  }
  .section-list a[aria-current] .section-number {
    color: #ce3023;
  }
  .section-list a[aria-current] .current-mark {
    visibility: visible;
  }
  .section-list a:hover {
    color: #ce3023;
  }
  .reading-meter {
    height: 2px;
    background: #d9d5cd;
    margin-top: 1.4rem;
  }
  .reading-meter span {
    display: block;
    height: 100%;
    width: var(--reading-progress, 0%);
    background: #ce3023;
  }
  .section-counter {
    margin: 0.75rem 0 0;
    font: 0.68rem monospace;
    color: #ce3023;
  }
  .section-counter span {
    color: #807b72;
  }
  @media (min-width: 68rem) {
    .contents-toggle {
      display: none;
    }
    .contents-panel,
    &[data-expanded='true'] .contents-panel {
      display: contents;
    }
    .section-list {
      position: fixed;
      left: 2rem;
      top: 50%;
      width: 10.5rem;
      max-height: calc(100svh - 13rem);
      overflow-y: auto;
      transform: translateY(calc(-50% + var(--rail-drift, 0px)));
    }
    .section-list a {
      min-height: 34px;
    }
    .contents-panel .header-actions {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin: 0;
    }
    .header-actions .account-dropdown {
      position: absolute;
      min-width: 220px;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    --rail-drift: 0px !important;
  }
`
