import { styled } from '@linaria/react'

export const AboutDetailsStyled = styled.div`
  clear: both;
  margin: 2rem 0;
  .one-day {
    padding: clamp(1rem, 4vw, 2rem);
    background: #163340;
    border-left: 5px solid #ffb550;
    color: white;
  }
  .one-day p {
    margin: 0;
  }
  .one-day strong {
    display: block;
    margin: 0.6rem 0 1rem;
    font-size: clamp(1.6rem, 4vw, 2.6rem);
    line-height: 1.15;
  }
  .one-day a {
    color: #ffcf87;
  }
  section {
    margin-top: 2rem;
  }
  .questions,
  .query {
    display: flex;
    gap: 0.65rem;
    flex-wrap: wrap;
  }
  .questions a,
  input,
  button {
    padding: 0.75rem 1rem;
    border: 1px solid #9bacb1;
    border-radius: 0.4rem;
    font: inherit;
  }
  .questions a {
    background: white;
  }
  form {
    margin-top: 1.25rem;
  }
  label {
    display: block;
    margin-bottom: 0.4rem;
    font-weight: bold;
  }
  .query input {
    min-width: 0;
    flex: 1 1 19rem;
  }
  button {
    background: #163340;
    color: white;
    cursor: pointer;
  }
`
