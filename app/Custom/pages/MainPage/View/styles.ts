import { styled } from '@linaria/react'
import { ServiceStatus } from './ServiceStatus'

export const MainPageViewStyled = styled.div`
  max-width: 68rem;
  margin: auto;
  padding: clamp(1rem, 4vw, 3rem);
  color: #192d38;
  background: #faf9f5;
  line-height: 1.55;

  @media (min-width: 68rem) {
    margin-left: max(15rem, calc((100% - 68rem) / 2));
  }
  header {
    padding: clamp(1.4rem, 5vw, 4rem);
    background: #163340;
    color: #fff;
    border-top: 5px solid #ffb550;
  }
  h1,
  h2,
  h3,
  p,
  dl,
  dd {
    margin: 0;
  }
  h1,
  h2,
  h3,
  dt {
    line-height: 1.15;
  }
  h1 {
    font-size: clamp(2.4rem, 6vw, 4.8rem);
    max-width: 15ch;
    margin: 0.8rem 0 1rem;
  }
  h2 {
    font-size: clamp(1.7rem, 4vw, 2.6rem);
    margin: 0.5rem 0;
  }
  h3,
  dt {
    font-size: 1.15rem;
  }
  & > [id],
  .journal,
  #panel-check {
    scroll-margin-top: 7rem;
  }
  figure {
    margin: 0;
    --name-width: clamp(7.6rem, 32%, 15rem);
  }
  figcaption,
  .chart-note,
  .gantt-axis,
  .legend {
    font-size: 0.78rem;
    color: #d4e0e4;
  }
  .gantt-row {
    display: grid;
    grid-template-columns: var(--name-width) 1fr;
    align-items: center;
    border-top: 1px solid #36525d;
    min-height: 2.5rem;
  }
  header .gantt-row {
    color: inherit;
    text-decoration: none;
  }
  .gantt-row strong {
    text-decoration: underline;
    text-underline-offset: 0.18em;
  }
  .journal {
    margin-top: 1rem;
    scroll-margin-top: 5rem;
  }
  .journal:target {
    border-color: #24516c;
  }
  .entry {
    margin-top: 1rem;
  }
  .entry time {
    font-size: 0.85rem;
    font-weight: 700;
  }
  .sources {
    display: flex;
    flex-wrap: wrap;
    gap: 0.8rem;
  }
  .gantt-name {
    padding: 0.22rem 0.4rem 0.22rem 0;
    line-height: 1.15;
    font-size: 0.9rem;
  }
  .gantt-name small {
    display: block;
    margin-top: 0.15rem;
    color: #c4d4da;
  }
  .gantt-axis {
    margin-left: var(--name-width);
    position: relative;
    height: 1.5rem;
    font-variant-numeric: tabular-nums;
  }
  .gantt-axis span {
    position: absolute;
  }
  .gantt-axis .midday {
    transform: translateX(-50%);
  }
  .gantt-axis span:last-child {
    right: 0;
  }
  .track {
    height: 0.7rem;
    position: relative;
    background: #667580;
    border-radius: 0.2rem;
    overflow: hidden;
  }
  .track span {
    position: absolute;
    inset-block: 0;
    background: var(--phase);
  }
  @media (prefers-reduced-motion: no-preference) {
    .track span,
    .gantt-axis .midday {
      transition:
        left 650ms ease-out,
        right 650ms ease-out;
    }
  }
  [data-phase='down'] {
    --phase: #ff746f;
  }
  [data-phase='partial'] {
    --phase: #ffb54d;
  }
  [data-phase='reported'] {
    --phase: #93b8e1;
  }
  [data-phase='up'] {
    --phase: #65d8a2;
  }
  .legend {
    display: flex;
    flex-wrap: wrap;
    gap: 0.2rem 0.9rem;
    margin: 0.8rem 0 0.3rem;
  }
  .legend span::before {
    content: '';
    display: inline-block;
    width: 0.65rem;
    height: 0.65rem;
    border-radius: 50%;
    margin-right: 0.35rem;
    background: var(--phase);
  }
  a {
    color: #115b78;
    text-decoration: underline;
    text-underline-offset: 0.18em;
  }
  header a,
  header .label {
    color: #ffd190;
  }
  .label,
  .hour,
  .status {
    font-weight: 700;
  }
  .label {
    font-size: 0.8rem;
    letter-spacing: 0.09em;
    text-transform: uppercase;
    color: #546773;
  }
  section {
    margin-top: clamp(2.4rem, 6vw, 4rem);
  }
  aside {
    margin: 1rem 0;
    padding: 1rem;
    background: #e6eef0;
    border-left: 4px solid #24516c;
  }
  .forecast {
    margin-top: 1rem;
    padding-top: 0.75rem;
    border-top: 1px solid #ced8d9;
  }
  .cards {
    display: grid;
    gap: 0.8rem;
    margin-top: 1.2rem;
  }
  article {
    padding: 1.4rem;
    border: 1px solid #ced8d9;
    background: white;
  }
  article h3 {
    margin: 1rem 0 0.5rem;
  }
  .status {
    display: inline-block;
    background: #fff0d2;
    color: #794400;
    font-size: 0.8rem;
    border-radius: 1rem;
    padding: 0.2rem 0.7rem;
  }
  .gantt-name small[data-phase='up'] {
    color: #65d8a2;
  }
  [data-status='${ServiceStatus.Available}'] {
    background: #d9f5e6;
    color: #145b3a;
  }
  [data-status='${ServiceStatus.NoResponse}'] {
    background: #ffe2de;
    color: #842e26;
  }
  [data-status='${ServiceStatus.NoInformation}'] {
    background: #dcecf6;
    color: #24516c;
  }
  .probe-actions {
    display: flex;
    align-items: end;
    gap: 0.6rem;
    flex-wrap: wrap;
    margin: 1rem 0;
  }
  .probe-actions label {
    display: grid;
  }
  .probe-actions input,
  .probe-actions button,
  .subscribe {
    font: inherit;
    padding: 0.55rem 0.85rem;
    border: 1px solid #65838b;
    border-radius: 0.3rem;
  }
  .probe-actions button,
  .subscribe {
    background: #163340;
    color: white;
    cursor: pointer;
  }
  .subscribe {
    margin-top: 1rem;
  }
  #diagnostics article {
    overflow-wrap: anywhere;
  }
  .probe-state {
    font-size: 0.85rem;
    color: #425965;
  }
  [data-result='failed'] {
    color: #963b2b;
  }
  [data-result='observed'] {
    color: #086359;
  }
  ol {
    list-style: none;
    padding: 0;
  }
  li {
    display: grid;
    grid-template-columns: 6.2rem 1fr;
    gap: 0.6rem;
    padding: 1rem 0;
    border-top: 1px solid #ced8d9;
  }
  .hour {
    color: #24516c;
    font-variant-numeric: tabular-nums;
  }
  li p,
  dd {
    margin-top: 0.4rem;
  }
  dt {
    margin-top: 1.4rem;
    font-weight: 700;
  }
  dd {
    max-width: 70ch;
  }
  dl {
    margin-bottom: 1rem;
  }
  @media (min-width: 42rem) {
    .cards {
      grid-template-columns: repeat(2, 1fr);
    }
  }
`
