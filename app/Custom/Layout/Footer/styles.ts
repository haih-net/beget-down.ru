import { styled } from '@linaria/react'
import { theme } from '../../theme'

export const FooterStyled = styled.footer`
  border-top: 1px solid ${theme.colors.divider};
  color: ${theme.colors.text.secondary};
  font-size: ${theme.fontSizes.sm};
  line-height: 1.5;

  .footer-inner {
    display: flex;
    align-items: baseline;
    flex-wrap: wrap;
    gap: 8px 24px;
    max-width: 1328px;
    margin: auto;
    padding: 20px 24px;

    @media (min-width: ${theme.breakpoints.sm}px) {
      padding: 24px 40px;
    }
  }

  .footer-credit {
    margin-inline-start: auto;
    text-align: right;
  }

  a {
    color: ${theme.colors.primary};
    font-weight: 700;
    white-space: nowrap;
    text-underline-offset: 3px;
  }

  a:hover {
    text-decoration: underline;
  }

  a:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 3px;
  }
`
