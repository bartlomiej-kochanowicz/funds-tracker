import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { Button, Icon, Spacer, Spreader } from 'components/atoms';
import { Modal } from 'components/molecules';
import { MODAL_CONFIRM_DELETE_CASH_ACCOUNT } from 'modals/ConfirmDeleteCashAccount';
import { useTranslation } from 'react-i18next';
import { FaTrash } from 'react-icons/fa';
import { Column, Row } from 'simple-flexbox';

import { CashAccountOperations } from './components/CashAccountsOperations';

export interface ManageCashAccountProps {
  deleteModalProps: {
    name: string;
    uuid: string;
    callback: (data: { uuid: string }) => void;
  };
}

export const ManageCashAccount = NiceModal.create<ManageCashAccountProps>(
  ({ deleteModalProps }) => {
    const { t } = useTranslation();

    const modal = useModal();

    const handleDelete = () => {
      NiceModal.show(MODAL_CONFIRM_DELETE_CASH_ACCOUNT, deleteModalProps);
    };

    return (
      <Modal
        modalName={t('modal.ManageCashAccount.name')}
        closeModal={modal.remove}
      >
        <Column>
          <CashAccountOperations uuid={deleteModalProps.uuid} />

          <Spacer />

          <Row justifyContent="flex-end">
            <Button
              color="error"
              minWidth="240px"
              onClick={handleDelete}
              outline
            >
              {t('modal.ManageCashAccount.button.delete')}

              <Spreader spread="tiny" />

              <Icon icon={FaTrash} />
            </Button>
          </Row>
        </Column>
      </Modal>
    );
  },
);
