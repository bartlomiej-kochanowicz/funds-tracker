import { FC, Fragment, useRef } from 'react';
import { Row } from 'simple-flexbox';
import { FaTimes } from 'react-icons/fa';
import { modals as modalsMap, Modals as TypeModalsMap } from 'modals';
import { Spacer } from 'components/atoms';
import { useDetectOutsideClick } from 'hooks/useDetectOutsideClick';
import { Modal } from './Modal.styles';

interface ModalComponentProps {
  name: TypeModalsMap;
  closeModal: (name: TypeModalsMap) => void;
}

export const ModalComponent: FC<ModalComponentProps> = ({ name, closeModal, ...rest }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const Component = modalsMap[name];

  const handleClose = () => {
    closeModal(name);
  };

  useDetectOutsideClick<HTMLDivElement>(modalRef, handleClose);

  return (
    <Fragment>
      <Modal.Background />

      <Modal ref={modalRef}>
        <Row justifyContent="flex-end">
          <Modal.CloseButton onClick={handleClose}>
            <FaTimes size="1.25rem" />
          </Modal.CloseButton>
        </Row>

        <Spacer space="small" />

        <Component {...rest} />
      </Modal>
    </Fragment>
  );
};
