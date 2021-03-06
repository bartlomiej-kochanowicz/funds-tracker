import * as styled from 'styled-components';

export const GlobalStyle = styled.createGlobalStyle`
  :root {
    --doc-height: 100%;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-family: 'Roboto', sans-serif;
  }

  * {
    margin: 0;
  }

  html,
  body {
    height: 100%;
    font-size: 16px;
    height: 100vh; /* fallback for Js load */
    height: var(--doc-height);
    color: #111111;
  }

  body {
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
  }

  img,
  picture,
  video,
  canvas,
  svg {
    display: block;
    max-width: 100%;
  }

  input,
  button,
  textarea,
  select {
    font: inherit;
  }

  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    overflow-wrap: break-word;
  }

  #root,
  #__next {
    isolation: isolate;
  }
`;
