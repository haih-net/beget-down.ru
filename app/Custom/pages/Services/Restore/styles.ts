import { styled } from '@linaria/react'
import { ServiceSurface } from '../styles'

export const PageStyled = styled(ServiceSurface)`
  header {
    border-bottom: 4px solid #2a8c7c;
  }
  .recovery-path {
    display: grid;
    gap: 1rem;
  }
  .recovery-path > div {
    padding: 1.5rem;
    background: #e4f0ea;
    border-radius: 1rem;
  }
  .recovery-path strong {
    display: block;
    color: #16685e;
    font-size: 1.25rem;
  }
  @media (min-width: 48rem) {
    .recovery-path {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }
`
