import { Currency } from '__generated__/graphql';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { Button, Icon, Spacer, Spreader } from 'components/atoms';
import { Modal } from 'components/molecules';
import { MODAL_CONFIRM_DELETE_CASH_ACCOUNT } from 'modals/ConfirmDeleteCashAccount';
import { useTranslation } from 'react-i18next';
import { FaTrash } from 'react-icons/fa';
import { Column, Row } from 'simple-flexbox';

import { OperationsTable } from './components/OperationsTable';

export interface CashAccountOperationsProps {
  deleteModalProps: {
    name: string;
    uuid: string;
    callback: (data: { uuid: string }) => void;
  };
  currency: Currency;
}

export const CashAccountOperations = NiceModal.create<CashAccountOperationsProps>(
  ({ deleteModalProps, currency }) => {
    const { t } = useTranslation();

    const modal = useModal();

    const handleDelete = () => {
      modal.remove();

      NiceModal.show(MODAL_CONFIRM_DELETE_CASH_ACCOUNT, deleteModalProps);
    };

    return (
      <Modal
        modalName={t('modal.CashAccountOperations.name')}
        closeModal={modal.remove}
      >
        <Column>
          <OperationsTable
            uuid={deleteModalProps.uuid}
            currency={currency}
          />

          <Spacer />

          <Row justifyContent="flex-end">
            <Button
              color="error"
              minWidth="240px"
              onClick={handleDelete}
              outline
            >
              {t('modal.CashAccountOperations.button.delete')}

              <Spreader spread="tiny" />

              <Icon icon={FaTrash} />
            </Button>
          </Row>
        </Column>
      </Modal>
    );
  },
);
