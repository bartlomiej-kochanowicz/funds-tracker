import { darken } from 'color2k';
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
    font-family: Roboto, sans-serif;
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
    color: ${({ theme }) => theme.colors.text};
    background-color: ${({ theme }) => theme.colors.background};
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

  .grecaptcha-badge {
    display: none;
  }

  .react-datepicker {
    background-color: ${({ theme: { isDark, colors } }) =>
      isDark ? darken(colors.gray200, 0.09) : colors.gray200};
    border: none;
    border-radius: ${({ theme }) => theme.radius['0.7']};

    &__current-month,
    &__day-name,
    &__day {
      color: ${({ theme }) => theme.colors.text};
    }

    &__day:hover {
      background-color: ${({ theme }) => darken(theme.colors.gray200, 0.15)};
    }

    &__header {
      background-color: ${({ theme: { colors } }) => darken(colors.gray100, 0.05)};
      border-bottom: 2px solid ${({ theme: { colors } }) => colors.gray300};
      border-top-left-radius: ${({ theme: { radius } }) => radius['0.7']};

      &:not(&--has-time-select) {
        border-top-right-radius: ${({ theme: { radius } }) => radius['0.7']};
      }
    }

    &__day {
      &--selected {
        background-color: ${({ theme }) => theme.colors.blue};
        color: ${({ theme: { colors } }) => colors.white};

        &:hover {
          background-color: ${({ theme: { colors } }) => darken(colors.blue, 0.15)};
        }
      }
    }
  }
`;
