import { styled } from '@linaria/react'
import { InformationPageStyled } from '../../components/InformationPage/styles'

export const ContactsStyled = styled(InformationPageStyled)`
  .lead {
    font-size: 1.2rem;
    max-width: 42rem;
  }
  .telegram {
    margin: 2rem 0;
    padding: clamp(1.25rem, 4vw, 2.5rem);
    border-radius: 1rem;
    background: #173f2e;
    color: #fff8eb;
  }
  .telegram h2 {
    margin-top: 0;
  }
  .telegram a {
    color: #ffce8c;
    font-size: 1.3rem;
    font-weight: 800;
  }
  .channels {
    display: grid;
    gap: 1.25rem;
    margin: 2rem 0;
  }
  .channel {
    display: flex;
    flex-direction: column;
    border: 1px solid #cbd5d6;
    border-radius: 1rem;
    padding: 1.5rem;
    background: white;
  }
  .channel button {
    margin-top: auto;
    align-self: flex-start;
  }
  .channel h2 {
    margin-top: 0;
    font-size: 1.5rem;
  }
  button {
    border: 2px solid #173f2e;
    border-radius: 0.6rem;
    background: #ffb550;
    color: #192d38;
    font: inherit;
    font-weight: 800;
    padding: 0.8rem 1rem;
    cursor: pointer;
  }
  button:disabled {
    opacity: 0.6;
    cursor: default;
  }
  :focus-visible {
    outline: 3px solid #ad4d12;
    outline-offset: 4px;
  }
  @media (min-width: 44rem) {
    .channels {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
`
