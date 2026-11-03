import { styled } from '@linaria/react'
import { ServiceSurface } from '../styles'

export const PageStyled = styled(ServiceSurface)`
  header {
    border-top: 8px solid #d87942;
  }
  .launch {
    background: #192d38;
    color: #fff8eb;
    padding: 2rem;
    border-radius: 1rem;
  }
  .launch strong {
    color: #ffc279;
    font-size: 2rem;
    display: block;
  }
  .milestones {
    counter-reset: phase;
    list-style: none;
    padding: 0;
  }
  .milestones li {
    counter-increment: phase;
    padding: 1.2rem;
    border-top: 1px solid #d7c6b9;
  }
  .milestones li::before {
    content: '0' counter(phase);
    color: #a54b22;
    font-weight: 800;
    margin-right: 1rem;
  }
`
