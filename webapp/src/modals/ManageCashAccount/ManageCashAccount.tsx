import { Button, Icon, Spacer, Spreader } from 'components/atoms';
import {
  ConfirmDeleteCashAccountProps,
  MODAL_CONFIRM_DELETE_CASH_ACCOUNT,
} from 'modals/ConfirmDeleteCashAccount';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { FaTrash } from 'react-icons/fa';
import { Column, Row } from 'simple-flexbox';
import { Modal } from 'types/modal.type';
import { CashAccountOperations } from './components/CashAccountsOperations';

export const MODAL_MANAGE_CASH_ACCOUNT = 'ManageCashAccount';

export interface ManageCashAccountProps {
  deleteModalProps: {
    name: string;
    uuid: string;
    callback: (data: { uuid: string }) => void;
  };
}

export const ManageCashAccount: FC<Modal<ManageCashAccountProps>> = ({
  openModal,
  deleteModalProps,
}) => {
  const { t } = useTranslation();

  const handleDelete = () => {
    openModal<ConfirmDeleteCashAccountProps>(MODAL_CONFIRM_DELETE_CASH_ACCOUNT, deleteModalProps);
  };

  return (
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
  );
};
