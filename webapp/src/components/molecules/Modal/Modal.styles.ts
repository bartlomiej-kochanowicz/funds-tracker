import { transparentize } from 'color2k';
import styled, { createGlobalStyle, css } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
      overflow: hidden;
  }
`;

export const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;

  height: var(--doc-height);
  height: 100%;

  ${({ theme: { colors, zIndex } }) => css`
    background: ${transparentize(colors.black, 0.25)};
    backdrop-filter: blur(10px);
    z-index: ${zIndex.modal.background};
  `}
`;

export const ModalComponent = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  ${({ theme: { colors, radius, shadows, breakpoints, zIndex } }) => css`
    z-index: ${zIndex.modal.modal};
    background-color: ${colors.gray100};
    border-radius: ${radius.primary};
    box-shadow: ${shadows.box};
    padding: 1.75rem 2.5rem;
    max-width: 900px;
    max-height: 85vh;

    ${breakpoints.phone.max} {
      padding: 1.25rem;
    }
  `}
`;

export const CloseButton = styled.button`
  border: 0;
  background: none;
  padding: 0;

  ${({ theme: { colors, font } }) => css`
    width: ${font.size['1.25']};
    height: ${font.size['1.25']};

    svg {
      color: ${colors.gray500};
      font-size: ${font.size['1.25']};
    }
  `}

  &:hover {
    cursor: pointer;
  }
`;
