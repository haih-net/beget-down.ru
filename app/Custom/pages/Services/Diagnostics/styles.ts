import { styled } from '@linaria/react'
import { ServiceSurface } from '../styles'

export const PageStyled = styled(ServiceSurface)`
  header {
    border-bottom: 4px solid #28708b;
  }
  .checks {
    display: grid;
    gap: 1rem;
  }
  .checks > div {
    border-left: 5px solid #28708b;
    padding: 1rem 1.5rem;
    background: #e9f1f5;
  }
  .report {
    padding: 1.5rem;
    border: 2px dashed #6f929e;
    border-radius: 1rem;
  }
`
