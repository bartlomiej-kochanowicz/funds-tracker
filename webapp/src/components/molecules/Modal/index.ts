import { Background, ModalComponent } from './Modal.styles';

interface IModalComposition {
  Background: typeof Background;
  ModalComponent: typeof ModalComponent;
}

type ModalProps = typeof ModalComponent & IModalComposition;

const Modal: ModalProps = ModalComponent as ModalProps;

Modal.Background = Background;

export { Modal };
