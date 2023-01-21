import { FC, Fragment, useRef } from 'react';
import { Row } from 'simple-flexbox';
import { FaTimes } from 'react-icons/fa';
import { modals, ModalsNames } from 'modals';
import { Heading, Spacer, Spreader } from 'components/atoms';
import { useDetectOutsideClick } from 'hooks/useDetectOutsideClick';
import { useTranslation } from 'react-i18next';
import { useBreakpoint } from 'hooks/useBreakpoint';
import { Modal } from './Modal.styles';

interface ModalComponentProps {
  name: ModalsNames;
  closeModal: () => void;
  showName?: boolean;
}

export const ModalComponent: FC<ModalComponentProps> = ({
  name,
  closeModal,
  showName = true,
  ...rest
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const isPhone = useBreakpoint('tablet', 'max');

  const { t } = useTranslation();

  const Component = modals[name];

  useDetectOutsideClick<HTMLDivElement>(modalRef, closeModal);

  return (
    <Fragment>
      <Modal.Background />

      <div
        data-modal="true"
        ref={modalRef}
      >
        <Modal>
          <Row justifyContent="space-between">
            {showName && (
              <Fragment>
                <Heading level="h2">{t(`modal.${name}.name`)}</Heading>

                {!isPhone && (
                  <Fragment>
                    <Spreader spread="huge" />

                    <Spreader spread="huge" />
                  </Fragment>
                )}
              </Fragment>
            )}

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
      </div>
    </Fragment>
  );
};
