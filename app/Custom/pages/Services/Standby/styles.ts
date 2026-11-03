import { styled } from '@linaria/react'
import { ServiceSurface } from '../styles'

export const PageStyled = styled(ServiceSurface)`
  header {
    background: #192d38;
    color: #f6f7ef;
    border-radius: 1rem;
    padding: 2rem;
  }
  header a {
    color: #ffcf8b;
  }
  .readiness {
    display: grid;
    gap: 1rem;
  }
  .readiness > div {
    padding: 1.5rem;
    border-top: 5px solid #398478;
    background: #e8efef;
  }
  .runbook {
    border-left: 2px solid #577c8d;
    padding-left: 1.5rem;
  }
  @media (min-width: 45rem) {
    .readiness {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
`
