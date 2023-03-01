import { GetCashAccountsQuery } from '__generated__/graphql';
import NiceModal from '@ebay/nice-modal-react';
import { Box, Text } from 'components/atoms';
import { formatCurrency } from 'helpers/formatCurrency';
import { MODAL_ADD_FUNDS_CASH_ACCOUNT } from 'modals/AddFundsCashAccount';
import { MODAL_CASH_ACCOUNT_OPERATIONS } from 'modals/CashAccountOperations';
import { MODAL_RENAME_CASH_ACCOUNT } from 'modals/RenameCashAccount';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Row } from 'simple-flexbox';

import { RenameButton } from './CashAccountPanel.styles';

interface CashAccountsPanelProps {
  updateCashAccountBalance: (data: { balance: number; uuid: string }) => void;
  updateCashAccountName: (data: { name: string; uuid: string }) => void;
  updateCashAccountList: (data: { uuid: string }) => void;
}

export const CashAccountsPanel: FC<
  GetCashAccountsQuery['cashAccounts'][0] & CashAccountsPanelProps
> = ({
  name,
  currency,
  balance,
  uuid,
  updateCashAccountBalance,
  updateCashAccountName,
  updateCashAccountList,
}) => {
  const { t } = useTranslation();

  const handleOpenAddFundsCashAccountModal = () => {
    NiceModal.show(MODAL_ADD_FUNDS_CASH_ACCOUNT, {
      callback: updateCashAccountBalance,
      uuid,
      currency,
    });
  };

  const handleOpenRenameModal = () => {
    NiceModal.show(MODAL_RENAME_CASH_ACCOUNT, {
      uuid,
      name,
      callback: updateCashAccountName,
    });
  };

  const handleOpenCashAccountOperationsModal = () => {
    NiceModal.show(MODAL_CASH_ACCOUNT_OPERATIONS, {
      deleteModalProps: { name, uuid, callback: updateCashAccountList },
      currency,
    });
  };

  return (
    <Box p="large">
      <Row justifyContent="space-between">
        <RenameButton
          onClick={handleOpenRenameModal}
          type="button"
        >
          {name}
        </RenameButton>

        <Text
          maxWidth="120px"
          textAlign="right"
        >
          {formatCurrency(balance, currency)}
        </Text>
      </Row>
    </Box>
  );
};
