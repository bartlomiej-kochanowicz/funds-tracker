import { FC, Fragment, useRef } from 'react';
import { Row } from 'simple-flexbox';
import { FaTimes } from 'react-icons/fa';
import { modals, ModalsNames } from 'modals';
import { Heading, Spacer, Spreader } from 'components/atoms';
import { useDetectOutsideClick } from 'hooks/useDetectOutsideClick';
import { useTranslation } from 'react-i18next';
import { theme } from 'styles/theme';
import { Modal } from './Modal.styles';

interface ModalComponentProps {
  modalName: ModalsNames;
  closeModal: () => void;
  showName?: boolean;
}

export const ModalComponent: FC<ModalComponentProps> = ({
  modalName,
  closeModal,
  showName = true,
  ...rest
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const { t } = useTranslation();

  const Component = modals[modalName];

  useDetectOutsideClick<HTMLDivElement>(modalRef, closeModal);

  return (
    <Fragment>
      <Modal.Background />

      <div
        data-modal="true"
        ref={modalRef}
      >
        <Modal>
          <Row justifyContent={showName ? 'space-between' : 'flex-end'}>
            {showName && <Heading level="h2">{t(`modal.${modalName}.name`)}</Heading>}

            <Spreader />

            <Modal.CloseButton onClick={closeModal}>
              <FaTimes size={theme.font.size['1.25']} />
            </Modal.CloseButton>
          </Row>

          <Spacer space="small" />

          <Component
            closeModal={closeModal}
            {...(rest as any)} // kind of a hack, but it works - still type safe
          />
        </Modal>
      </div>
    </Fragment>
  );
};
