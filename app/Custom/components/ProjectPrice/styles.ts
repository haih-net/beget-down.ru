import { styled } from '@linaria/react'

export const ProjectPriceStyled = styled.aside`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1.25rem;
  margin: 2rem 0;
  padding: clamp(1.25rem, 3vw, 2rem);
  background: #173f2e;
  color: #fff8eb;
  border-radius: 1rem;
  border-top: 4px solid #ffb550;
  .price-copy {
    flex: 1 1 16rem;
  }
  .price-label {
    display: block;
    font-size: clamp(1.8rem, 4vw, 2.5rem);
    line-height: 1.2;
  }
  p {
    margin: 0.65rem 0 0;
  }
  && a {
    color: #ffce8c;
    font-weight: 800;
    text-underline-offset: 0.25em;
  }
`
