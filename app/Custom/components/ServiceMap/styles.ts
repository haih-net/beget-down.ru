import { styled } from '@linaria/react'
import { theme } from 'app/Custom/theme'

export const ServiceMapStyled = styled.section`
  && {
    padding: 0;
    margin: 1.5rem 0 2.5rem;
    border: 1px solid ${theme.colors.border};
    border-radius: 16px;
    background: ${theme.backgrounds.paper};
    color: ${theme.colors.text.primary};
    line-height: 1.5;
    min-width: 0;
  }
  .map-introduction {
    padding: 20px 16px;
  }
  .map-label {
    margin: 0 0 8px;
    color: ${theme.colors.text.secondary};
    font-size: ${theme.fontSizes.xs};
    font-weight: 800;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }
  .map-title {
    margin: 0;
    font-size: 24px;
    line-height: 1.2;
    text-wrap: balance;
  }
  .map-description {
    margin: 12px 0 0;
    max-width: 50rem;
    font-size: ${theme.fontSizes.md};
  }
  .map-stages {
    display: grid;
  }
  .map-note {
    margin: 0;
    padding: 16px;
    border-top: 1px solid ${theme.colors.border};
    border-radius: 0 0 16px 16px;
    background: ${theme.colors.warningBg};
    font-size: ${theme.fontSizes.sm};
  }
  @media (min-width: ${theme.breakpoints.xs}px) {
    .map-introduction {
      padding: 24px;
    }
    .map-note {
      padding: 20px 24px;
    }
  }
  @media (min-width: ${theme.breakpoints.lg}px) {
    .map-title {
      font-size: 28px;
    }
  }
`
