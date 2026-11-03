import { styled } from '@linaria/react'
import { ServiceSurface } from '../styles'

export const PageStyled = styled(ServiceSurface)`
  header {
    border-bottom: 4px solid #528b79;
  }
  .layers {
    display: grid;
    gap: 1rem;
  }
  .layers > div {
    padding: 1.5rem;
    border: 1px solid #a7c4b7;
    border-radius: 0 1.5rem 1.5rem 0;
    background: #edf4ec;
    border-left: 8px solid #528b79;
  }
  .restore-test {
    background: #192d38;
    color: #f3f8f2;
    padding: 2rem;
    border-radius: 1rem;
  }
`
