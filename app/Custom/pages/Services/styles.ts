import { styled } from '@linaria/react'

export const ServiceSurface = styled.article`
  max-width: 68rem;
  margin: auto;
  padding: clamp(1.1rem, 4vw, 3.5rem);
  background: #faf9f5;
  color: #192d38;
  line-height: 1.8;
  overflow-wrap: anywhere;
  h1,
  h2,
  h3 {
    line-height: 1.18;
    text-wrap: balance;
  }
  h1 {
    font-size: clamp(2.1rem, 5vw, 4rem);
    letter-spacing: -0.035em;
    margin: 1rem 0 1.5rem;
  }
  h2 {
    font-size: clamp(1.5rem, 3vw, 2.2rem);
  }
  h3 {
    font-size: 1.2rem;
  }
  a {
    color: #115b78;
    text-underline-offset: 0.2em;
  }
  section {
    padding: 2rem 0;
    scroll-margin-top: 7rem;
  }
  header {
    padding: 1rem 0 2rem;
  }
  header > p:last-child {
    font-size: 1.2rem;
    max-width: 48rem;
  }
  .eyebrow {
    font-size: 0.8rem;
    font-weight: 800;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }
  .grid {
    display: grid;
    gap: 1.2rem;
  }
  .panel {
    padding: 1.5rem;
    border: 1px solid #cad7d8;
    border-radius: 1rem;
    background: #fff;
  }
  .panel h3 {
    margin-top: 0;
  }
  .note {
    padding: 1.5rem;
    border-left: 4px solid #d78c25;
    background: #fff1d9;
  }
  li + li {
    margin-top: 0.7rem;
  }
  figure {
    margin: 1.5rem 0;
  }
  img {
    display: block;
    width: 100%;
    height: auto;
    border-radius: 1.2rem;
  }
  figcaption {
    color: #4c626b;
    font-size: 0.9rem;
    margin-top: 0.7rem;
  }
  footer {
    margin-top: 2rem;
    padding: 2rem 0;
    border-top: 1px solid #cad7d8;
  }
  .contact-button {
    padding: 1rem 1.5rem;
    border: 2px solid #192d38;
    border-radius: 0.6rem;
    background: #ffb550;
    color: #192d38;
    font: inherit;
    font-weight: 800;
    cursor: pointer;
  }
  .contact-button:hover {
    background: #ffd190;
  }
  .contact-button:disabled {
    opacity: 0.6;
    cursor: default;
  }
  :focus-visible {
    outline: 3px solid #ad4d12;
    outline-offset: 4px;
  }
  @media (min-width: 45rem) {
    .grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
  @media (min-width: 68rem) {
    margin-left: max(15rem, calc((100% - 68rem) / 2));
  }
`

export const ServicesStyled = styled(ServiceSurface)`
  header {
    border-bottom: 4px solid #ffb550;
  }
  .service-entry {
    border-bottom: 1px solid #cbd7d9;
  }
  .service-entry h2 {
    max-width: 45rem;
  }
  .service-number {
    font-weight: 800;
    color: #526e78;
    font-variant-numeric: tabular-nums;
  }
  .choose {
    background: #e7efee;
    border-radius: 1rem;
    padding: 1.5rem;
    margin-top: 2rem;
  }
  .service-link {
    display: inline-block;
    margin-top: 0.5rem;
    font-weight: 800;
  }
`
