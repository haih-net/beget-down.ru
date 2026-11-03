import { styled } from '@linaria/react'
import { ServiceSurface } from '../styles'

export const PageStyled = styled(ServiceSurface)`
  header {
    border-left: 6px solid #7771a5;
    padding-left: 1.5rem;
  }
  .address {
    padding: 1.5rem;
    border-radius: 1rem;
    background: #edeaf6;
  }
  .address strong {
    font-size: 1.4rem;
  }
  .records {
    border-top: 2px solid #7771a5;
    border-bottom: 2px solid #7771a5;
    padding: 1rem 0;
  }
`
