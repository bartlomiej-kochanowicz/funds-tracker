import { Background, ModalComponent, CloseButton } from './Modal.styles';

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
