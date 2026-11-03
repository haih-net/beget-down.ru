import { styled } from '@linaria/react'
export const BlogStyled = styled.div`
  max-width: 62rem;
  margin: auto;
  padding: clamp(1rem, 4vw, 3rem);
  color: #192d38;
  background: #faf9f5;
  line-height: 1.7;
  overflow-wrap: anywhere;
  h1,
  h2,
  h3 {
    line-height: 1.2;
  }
  h1 {
    font-size: clamp(2rem, 5vw, 3.6rem);
  }
  h2 {
    font-size: clamp(1.4rem, 3vw, 2rem);
    margin-top: 2rem;
  }
  header {
    border-bottom: 3px solid #ffb550;
    padding-bottom: 1.5rem;
  }
  a {
    color: #115b78;
    text-underline-offset: 0.2em;
  }
  time {
    font-weight: 700;
    font-variant-numeric: tabular-nums;
  }
  .eyebrow {
    color: #546773;
    font-size: 0.85rem;
  }
  .journal-card {
    padding: 1.5rem 0;
    border-bottom: 1px solid #ced8d9;
    scroll-margin-top: 7rem;
  }
  .journal-card h2 {
    margin-top: 0.7rem;
  }
  aside,
  blockquote {
    margin: 1.5rem 0;
    padding: 1rem 1.4rem;
    background: #e6eef0;
    border-left: 4px solid #24516c;
  }
  blockquote p:first-child {
    margin-top: 0;
  }
  blockquote p:last-child {
    margin-bottom: 0;
  }
  .table-scroll {
    overflow-x: auto;
  }
  table {
    border-collapse: collapse;
    width: 100%;
    font-size: 0.9rem;
  }
  th,
  td {
    padding: 0.7rem;
    text-align: left;
    border-bottom: 1px solid #ced8d9;
    vertical-align: top;
  }
  .article-body section {
    scroll-margin-top: 7rem;
  }
  .telegram-screenshot {
    margin: 1.5rem 0;
  }
  .telegram-screenshot img {
    display: block;
    max-width: 100%;
    height: auto;
  }
  .telegram-screenshot figcaption {
    margin-top: 0.75rem;
    color: #546773;
    font-size: 0.9rem;
  }
  .article-discussion {
    margin-top: 2.5rem;
  }
  .article-chat-button {
    display: block;
    width: 100%;
    min-height: 60px;
    padding: 1.2rem 1.5rem;
    border: 2px solid #163340;
    border-radius: 0.5rem;
    background: #ffb550;
    color: #163340;
    font: inherit;
    font-size: 1.2rem;
    font-weight: 700;
    cursor: pointer;
  }
  .article-chat-button:hover {
    background: #ffd190;
  }
  .article-chat-button:focus-visible {
    outline: 3px solid #ce3023;
    outline-offset: 3px;
  }
  .post-navigation {
    display: grid;
    gap: 1rem;
    margin-top: 3rem;
    border-top: 1px solid #ced8d9;
    padding-top: 1.5rem;
  }
  @media (min-width: 68rem) {
    &.blog-index,
    &.blog-article {
      margin-left: max(15rem, calc((100% - 62rem) / 2));
    }
  }
`
