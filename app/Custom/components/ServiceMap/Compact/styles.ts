import { styled } from '@linaria/react'
import { theme } from 'app/Custom/theme'

export const CompactStyled = styled.ol`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 32px;
  list-style: none;
  && {
    margin: 24px 0;
    padding: 0;
  }
  min-width: 0;
  line-height: 1.5;
  .compact-item {
    position: relative;
    display: flex;
    min-width: 0;
    margin: 0;
  }
  @media (min-width: ${theme.breakpoints.sm}px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 28px;
  }
`
