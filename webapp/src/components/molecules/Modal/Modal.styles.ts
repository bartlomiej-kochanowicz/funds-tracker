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
`;
