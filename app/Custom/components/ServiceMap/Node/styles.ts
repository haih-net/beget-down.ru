import { styled } from '@linaria/react'
import { theme } from 'app/Custom/theme'

export const NodeStyled = styled.div`
  --node-color: #46534c;
  --node-background: ${theme.colors.gray[50]};
  width: 100%;
  min-width: 0;
  padding: 16px;
  border: 1px solid ${theme.colors.border};
  border-top: 3px solid var(--node-color);
  border-radius: 10px;
  background: var(--node-background);
  &[data-status='available'] {
    --node-color: #16634c;
    --node-background: ${theme.colors.successBg};
  }
  &[data-status='unavailable'] {
    --node-color: #a33131;
    --node-background: ${theme.colors.errorBg};
  }
  &[data-status='action'] {
    --node-color: #20559d;
    --node-background: ${theme.colors.infoBg};
  }
  &[data-status='missing'] {
    border-style: dashed;
  }
  .node-heading {
    display: flex;
    align-items: flex-start;
    gap: 8px;
  }
  .node-icon {
    display: grid;
    place-items: center;
    flex: 0 0 22px;
    height: 22px;
    color: var(--node-color);
  }
  .node-title {
    margin: 0;
    font-size: ${theme.fontSizes.md};
    font-weight: 800;
    line-height: 1.4;
  }
  .node-state {
    margin: 10px 0 0;
    color: var(--node-color);
    font-weight: 700;
    font-size: ${theme.fontSizes.sm};
    line-height: 1.45;
  }
  .node-description {
    margin: 8px 0 0;
    font-size: ${theme.fontSizes.sm};
    line-height: 1.5;
  }
  @media (min-width: ${theme.breakpoints.lg}px) {
    padding: 14px 12px;
  }
`
