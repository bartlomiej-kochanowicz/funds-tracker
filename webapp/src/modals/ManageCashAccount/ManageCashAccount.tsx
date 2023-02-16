import { Button, Icon, Spacer, Spreader } from 'components/atoms';
import { DELETE_CASH_ACCOUNT } from 'graphql/mutations';
import { MODAL_CONFIRM_DELETE_CASH_ACCOUNT } from 'modals/ConfirmDeleteCashAccount';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { FaTrash } from 'react-icons/fa';
import { Column, Row } from 'simple-flexbox';
import { Modal } from 'types/modal.type';

export const MODAL_MANAGE_CASH_ACCOUNT = 'ManageCashAccount';

export interface ManageCashAccountProps {}

export const ManageCashAccount: FC<Modal<ManageCashAccountProps>> = ({ openModal }) => {
  const { t } = useTranslation();

  const handleDelete = () => {
    openModal<{}>(MODAL_CONFIRM_DELETE_CASH_ACCOUNT);
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
