import { Link } from 'react-router'
import type * as React from 'react'
import { FooterStyled } from './styles'

export const Footer: React.FC = () => (
  <FooterStyled>
    <div className="footer-inner">
      <span>© {new Date().getFullYear()} beget-down.ru</span>
      <Link to="/prices">Цены</Link>
      <Link to="/contacts">Контакты</Link>
      <span className="footer-credit">
        Разработка и сопровождение —{' '}
        <a
          target="_blank"
          href="https://fi1osof.ru"
          aria-label="Разработка и сопровождение — 𝕱i1osof"
          title="Разработка и сопровождение — 𝕱i1osof"
        >
          by 𝕱
        </a>
      </span>
    </div>
  </FooterStyled>
)
