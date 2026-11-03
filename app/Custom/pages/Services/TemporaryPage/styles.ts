import { styled } from '@linaria/react'
import { ServiceSurface } from '../styles'

export const PageStyled = styled(ServiceSurface)`
  header {
    background: #fff0d7;
    border-radius: 1.5rem;
    padding: 2rem;
  }
  .message {
    border: 2px solid #db9b47;
    padding: 2rem;
    border-radius: 1rem;
  }
  .message h3 {
    font-size: 1.6rem;
  }
  .channels {
    display: flex;
    flex-wrap: wrap;
    gap: 0.7rem;
  }
  .channels span {
    padding: 0.6rem 1rem;
    background: #192d38;
    color: #fff;
    border-radius: 2rem;
  }
`
