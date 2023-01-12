import { transparentize } from 'color2k';
import styled, { css } from 'styled-components';

export const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;

  height: var(--doc-height);
  height: 100%;

  ${({ theme: { colors } }) => css`
    background: ${transparentize(colors.black, 0.5)};
    backdrop-filter: blur(2px);
  `}
`;

export const ModalComponent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  ${({ theme: { colors, radius, padding } }) => css`
    background-color: ${colors.gray200};
    border-radius: ${radius.secondary};
    padding: ${padding.huge};
    width: 95vw;
    max-width: 900px;
  `}
`;

export const CloseButton = styled.button`
  border: 0;
  background: none;

  ${({ theme: { colors } }) => css`
    svg {
      color: ${colors.gray500};
    }
  `}

  &:hover {
    cursor: pointer;
  }
`;
