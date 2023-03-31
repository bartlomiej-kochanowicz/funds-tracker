import { Heading, Icon, Spacer, Spreader } from 'components/atoms';
import { useDetectOutsideClick } from 'hooks/useDetectOutsideClick';
import { FC, Fragment, ReactNode, useRef } from 'react';
import { FaTimes } from 'react-icons/fa';
import { Row } from 'simple-flexbox';

import { Background, CloseButton, GlobalStyle, ModalComponent } from './Modal.styles';

interface ModalComponentProps {
  closeModal: () => void;
  modalName: string;
  children: ReactNode;
}

export const Modal: FC<ModalComponentProps> = ({ closeModal, modalName, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useDetectOutsideClick<HTMLDivElement>(modalRef, closeModal);

  return (
    <Fragment>
      <Background />

      <GlobalStyle />

      <div
        data-modal="true"
        ref={modalRef}
      >
        <ModalComponent>
          <Row justifyContent={modalName ? 'space-between' : 'flex-end'}>
            {modalName && <Heading level="h2">{modalName}</Heading>}

            <Spreader />

            <CloseButton onClick={closeModal}>
              <Icon
                icon={FaTimes}
                size="1.25"
              />
            </CloseButton>
          </Row>

          <Spacer space="0.5" />

          {children}
        </ModalComponent>
      </div>
    </Fragment>
  );
};
