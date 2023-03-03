import { GetCashAccountsQuery } from '__generated__/graphql';
import NiceModal from '@ebay/nice-modal-react';
import { Box, Button, Icon, Text } from 'components/atoms';
import { useColorThemeContext } from 'contexts/ColorThemeContext';
import { formatCurrency } from 'helpers/formatCurrency';
import { useBreakpoint } from 'hooks/useBreakpoint';
import { MODAL_ADD_FUNDS_CASH_ACCOUNT } from 'modals/AddFundsCashAccount';
import { MODAL_CASH_ACCOUNT_OPERATIONS } from 'modals/CashAccountOperations';
import { MODAL_RENAME_CASH_ACCOUNT } from 'modals/RenameCashAccount';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { FaEllipsisV } from 'react-icons/fa';
import { Column, Row } from 'simple-flexbox';

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

  const isPhone = useBreakpoint('phone', 'max');

  const { isDark } = useColorThemeContext();

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
    <Box
      p={isPhone ? 'medium' : 'large'}
      hoverBackgroundColor="gray200"
      borderRadius="primary"
    >
      <Row justifyContent="space-between">
        <Column>
          <Text fontWeight="700">{name}</Text>

          <Text>{formatCurrency(balance, currency)}</Text>
        </Column>

        <Button
          outline
          size="small"
        >
          <Icon icon={FaEllipsisV} />
        </Button>
      </Row>
    </Box>
  );
};
