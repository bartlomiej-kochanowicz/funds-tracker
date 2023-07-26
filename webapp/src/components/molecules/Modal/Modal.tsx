import { Box, Heading, Icon, Spacer, Spreader } from 'components/atoms';
import { ErrorContent } from 'components/molecules/ErrorContent';
import { useDetectOutsideClick } from 'hooks/useDetectOutsideClick';
import { FC, Fragment, ReactNode, useCallback, useEffect, useRef } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import FocusLock from 'react-focus-lock';
import { FaTimes } from 'react-icons/fa';

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
      const excludeElements = [
        document.activeElement?.attributes.getNamedItem('aria-expanded')?.value === 'true',
        document.activeElement?.attributes.getNamedItem('role')?.value === 'menuitem',
        document.activeElement?.attributes.getNamedItem('role')?.value === 'option',
        Boolean(document.querySelector('.react-datepicker-popper')),
      ].filter(Boolean);

      if (event.key === 'Escape' && !excludeElements.length) {
        event.preventDefault();
        closeModal();
      }
    },
    [closeModal],
  );

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown, true);

    return () => {
      document.removeEventListener('keydown', onKeyDown, true);
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
            <Box
              $flex
              $justifyContent={modalName ? 'space-between' : 'flex-end'}
            >
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
            </Box>

            <Spacer $space="0.5" />

            <ErrorBoundary FallbackComponent={ErrorContent}>{children}</ErrorBoundary>
          </ModalComponent>
        </div>
      </FocusLock>
    </Fragment>
  );
};
