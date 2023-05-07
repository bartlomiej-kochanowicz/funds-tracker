import { GetCashAccountsQuery } from '__generated__/graphql';
import NiceModal from '@ebay/nice-modal-react';
import { Box, Button, Dropdown, Icon, Text } from 'components/atoms';
import type { DropdownItems } from 'components/atoms/Dropdown';
import { formatCurrency } from 'helpers/formatCurrency';
import { useBreakpoint } from 'hooks/useBreakpoint';
import { MODAL_ADD_FUNDS_CASH_ACCOUNT } from 'modals/AddFundsCashAccount';
import { MODAL_CASH_ACCOUNT_OPERATIONS } from 'modals/CashAccountOperations';
import { MODAL_CONFIRM_DELETE_CASH_ACCOUNT } from 'modals/ConfirmDeleteCashAccount';
import { MODAL_RENAME_CASH_ACCOUNT } from 'modals/RenameCashAccount';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { FaChartLine, FaEllipsisV, FaListUl, FaPen, FaPlus, FaTrash } from 'react-icons/fa';
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
  const isPhone = useBreakpoint('phone', 'max');

  const { t } = useTranslation();

  const items = [
    {
      icon: FaChartLine,
      label: t('page.cash_accounts.button.invest'),
      value: 'invest',
    },
    {
      icon: FaListUl,
      label: t('page.cash_accounts.button.operations'),
      value: 'operations',
      onClick: () => {
        NiceModal.show(MODAL_CASH_ACCOUNT_OPERATIONS, {
          deleteModalProps: { name, uuid },
          currency,
        });
      },
    },
    {
      icon: FaPlus,
      label: t('page.cash_accounts.button.add_funds'),
      value: 'add_funds',
      divider: 'bottom',
      onClick: () => {
        NiceModal.show(MODAL_ADD_FUNDS_CASH_ACCOUNT, {
          callback: updateCashAccountBalance,
          uuid,
          currency,
        });
      },
    },
    {
      icon: FaPen,
      label: t('common.rename'),
      value: 'rename',
      onClick: () => {
        NiceModal.show(MODAL_RENAME_CASH_ACCOUNT, {
          uuid,
          name,
          callback: updateCashAccountName,
        });
      },
    },
    {
      icon: FaTrash,
      label: t('common.delete'),
      value: 'delete',
      onClick: () => {
        NiceModal.show(MODAL_CONFIRM_DELETE_CASH_ACCOUNT, {
          name,
          uuid,
          callback: updateCashAccountList,
        });
      },
    },
  ] satisfies DropdownItems;

  return (
    <Box
      p={isPhone ? 'medium' : 'large'}
      borderRadius="0.7"
    >
      <Row justifyContent="space-between">
        <Column>
          <Text fontWeight="700">{name}</Text>

          <Text>{formatCurrency(balance, currency)}</Text>
        </Column>

        <Dropdown
          items={items}
          placement="bottom-end"
        >
          {props => (
            <Button
              outline
              size="small"
              {...props}
            >
              <Icon icon={FaEllipsisV} />
            </Button>
          )}
        </Dropdown>
      </Row>
    </Box>
  );
};
