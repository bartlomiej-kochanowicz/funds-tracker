import { transparentize } from 'color2k';
import styled, { css } from 'styled-components';
import { theme } from 'styles/theme';

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
    border-radius: ${radius.secondary};
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

  ${({ theme: { colors, font } }) => css`
    svg {
      color: ${colors.gray500};
      font-size: ${font.size['1.25']};
    }
  `}

  &:hover {
    cursor: pointer;
  }
`;

interface IModalComposition {
  Background: typeof Background;
  ModalComponent: typeof ModalComponent;
  CloseButton: typeof CloseButton;
}

type ModalProps = typeof ModalComponent & IModalComposition;

const Modal: ModalProps = ModalComponent as ModalProps;

Modal.Background = Background;
Modal.CloseButton = CloseButton;

export { Modal };
