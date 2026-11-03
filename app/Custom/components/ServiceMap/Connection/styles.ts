import { styled } from '@linaria/react'
import { theme } from 'app/Custom/theme'

export const ConnectionStyled = styled.span`
  position: absolute;
  display: grid;
  place-items: center;
  width: 24px;
  height: 24px;
  bottom: -28px;
  left: calc(50% - 12px);
  color: #39725e;
  &[data-state='interrupted'] {
    color: #a33131;
  }
  @media (min-width: ${theme.breakpoints.sm}px) {
    &[data-layout='compact'] {
      bottom: auto;
      left: auto;
      top: calc(50% - 12px);
      right: -26px;
    }
    &[data-layout='compact'][data-state='connected'] svg {
      transform: rotate(-90deg);
    }
  }
  @media (min-width: ${theme.breakpoints.lg}px) {
    bottom: auto;
    left: auto;
    top: calc(50% - 12px);
    right: -26px;
    &[data-state='connected'] svg {
      transform: rotate(-90deg);
    }
  }
`
