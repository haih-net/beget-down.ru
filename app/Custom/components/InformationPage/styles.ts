import { styled } from '@linaria/react'

export const InformationPageStyled = styled.article`
  box-sizing: border-box;
  max-width: 58rem;
  width: 100%;
  margin: 0 auto;
  padding: clamp(1.25rem, 5vw, 4rem);
  color: #192d38;
  background: #faf9f5;
  border-top: 5px solid #ffb550;
  line-height: 1.6;
  h1,
  h2 {
    line-height: 1.16;
  }
  h1 {
    font-size: clamp(2rem, 5vw, 3.6rem);
  }
  h2 {
    margin: 1.6rem 0 0.4rem;
  }
  a {
    color: #12566c;
  }
  section {
    border-top: 1px solid #cbd5d6;
  }
  img {
    max-width: 100%;
    height: auto;
    border-radius: 0.4rem;
  }
  @media (min-width: 44rem) {
    img {
      float: right;
      margin: 0 0 1rem 2rem;
    }
  }
  display: flow-root;
`
