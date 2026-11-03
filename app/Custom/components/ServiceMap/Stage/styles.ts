import { styled } from '@linaria/react'
import { theme } from 'app/Custom/theme'

export const StageStyled = styled.div`
  padding: 20px 16px;
  border-top: 1px solid ${theme.colors.border};
  min-width: 0;
  .stage-heading {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    margin-bottom: 18px;
  }
  .stage-number {
    flex: 0 0 30px;
    height: 30px;
    display: grid;
    place-items: center;
    border: 1px solid ${theme.colors.border};
    border-radius: 50%;
    color: ${theme.colors.text.secondary};
    font-size: ${theme.fontSizes.xs};
    font-weight: 800;
    font-variant-numeric: tabular-nums;
  }
  .stage-title {
    margin: 2px 0 6px;
    font-size: ${theme.fontSizes.xl};
    line-height: 1.3;
  }
  .stage-description {
    margin: 0;
    color: ${theme.colors.text.secondary};
    font-size: ${theme.fontSizes.sm};
  }
  .stage-nodes {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: 32px;
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .stage-item {
    position: relative;
    min-width: 0;
    display: flex;
    margin: 0;
  }
  @media (min-width: ${theme.breakpoints.xs}px) {
    padding: 24px;
  }
  @media (min-width: ${theme.breakpoints.lg}px) {
    .stage-nodes {
      grid-auto-flow: column;
      grid-auto-columns: minmax(0, 1fr);
      grid-template-columns: none;
      gap: 28px;
    }
  }
`
