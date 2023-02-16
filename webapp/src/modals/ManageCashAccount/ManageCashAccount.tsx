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

export const MODAL_MANAGE_CASH_ACCOUNT = 'ManageCashAccount';

export interface ManageCashAccountProps {
  name: string;
}

export const ManageCashAccount: FC<Modal<ManageCashAccountProps>> = ({ openModal, name }) => {
  const { t } = useTranslation();

  const handleDelete = () => {
    openModal<ConfirmDeleteCashAccountProps>(MODAL_CONFIRM_DELETE_CASH_ACCOUNT, { name });
  };

  return (
    <Column>
      <Column>List with operations...</Column>

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
