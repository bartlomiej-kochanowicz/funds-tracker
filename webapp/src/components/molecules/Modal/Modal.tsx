import { Heading, Icon, Spacer, Spreader } from 'components/atoms';
import { useDetectOutsideClick } from 'hooks/useDetectOutsideClick';
import { FC, Fragment, ReactNode, useCallback, useEffect, useRef } from 'react';
import FocusLock from 'react-focus-lock';
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

  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.keyCode === 27) {
        closeModal();
      }
    },
    [closeModal],
  );

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown, false);

    return () => {
      document.removeEventListener('keydown', onKeyDown, false);
    };
  }, [onKeyDown]);

  return (
    <Fragment>
      <Background />

      <GlobalStyle />

      <FocusLock>
        <div
          data-modal="true"
          aria-labelledby={modalName}
          role="dialog"
          aria-modal="true"
          tabIndex={-1}
          ref={modalRef}
        >
          <ModalComponent>
            <Row justifyContent={modalName ? 'space-between' : 'flex-end'}>
              {modalName && (
                <Heading
                  level="h2"
                  id={modalName}
                >
                  {modalName}
                </Heading>
              )}

              <Spreader />

              <CloseButton
                onClick={closeModal}
                aria-label="close"
              >
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
      </FocusLock>
    </Fragment>
  );
};
