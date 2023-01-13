import { FC, Fragment, useRef } from 'react';
import { Row } from 'simple-flexbox';
import { FaTimes } from 'react-icons/fa';
import { modals, ModalsNames } from 'modals';
import { Spacer } from 'components/atoms';
import { useDetectOutsideClick } from 'hooks/useDetectOutsideClick';
import { Modal } from './Modal.styles';

interface ModalComponentProps {
  name: ModalsNames;
  closeModal: () => void;
}

export const ModalComponent: FC<ModalComponentProps> = ({ name, closeModal, ...rest }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const Component = modals[name];

  useDetectOutsideClick<HTMLDivElement>(modalRef, closeModal);

  return (
    <Fragment>
      <Modal.Background />

      <Modal ref={modalRef}>
        <Row justifyContent="flex-end">
          <Modal.CloseButton onClick={closeModal}>
            <FaTimes size="1.25rem" />
          </Modal.CloseButton>
        </Row>

        <Spacer space="small" />

        <Component
          closeModal={closeModal}
          {...rest}
        />
      </Modal>
    </Fragment>
  );
};
