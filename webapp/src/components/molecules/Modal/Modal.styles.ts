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
    backdrop-filter: blur(5px);
  `}
`;

export const ModalComponent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  ${({ theme: { colors, radius, shadows, breakpoints } }) => css`
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

  ${({ theme: { colors } }) => css`
    svg {
      color: ${colors.gray500};
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
