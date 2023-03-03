import { Currency } from '__generated__/graphql';
import NiceModal from '@ebay/nice-modal-react';
import { Menu } from 'components/atoms';
import { MODAL_ADD_FUNDS_CASH_ACCOUNT } from 'modals/AddFundsCashAccount';
import { MODAL_CASH_ACCOUNT_OPERATIONS } from 'modals/CashAccountOperations';
import { MODAL_RENAME_CASH_ACCOUNT } from 'modals/RenameCashAccount';
import { forwardRef } from 'react';
import { useTranslation } from 'react-i18next';

interface DropdownContentProps {
  handleToggle: () => void;
  uuid: string;
  currency: Currency;
  name: string;
  updateCashAccountBalance: (data: { balance: number; uuid: string }) => void;
  updateCashAccountName: (data: { name: string; uuid: string }) => void;
  updateCashAccountList: (data: { uuid: string }) => void;
}

export const DropdownContent = forwardRef<HTMLUListElement, DropdownContentProps>(
  (
    {
      handleToggle,
      uuid,
      currency,
      name,
      updateCashAccountBalance,
      updateCashAccountName,
      updateCashAccountList,
      ...rest
    },
    ref,
  ) => {
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
      <Menu
        ref={ref}
        minMenuWidth="270px"
        {...rest}
      >
        <Menu.Item>test</Menu.Item>

        <Menu.Item>aaa</Menu.Item>
      </Menu>
    );
  },
);
