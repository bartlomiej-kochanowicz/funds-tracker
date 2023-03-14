import { Currency } from '__generated__/graphql';
import NiceModal from '@ebay/nice-modal-react';
import { Menu } from 'components/atoms';
import { MODAL_ADD_FUNDS_CASH_ACCOUNT } from 'modals/AddFundsCashAccount';
import { MODAL_CASH_ACCOUNT_OPERATIONS } from 'modals/CashAccountOperations';
import { MODAL_CONFIRM_DELETE_CASH_ACCOUNT } from 'modals/ConfirmDeleteCashAccount';
import { MODAL_RENAME_CASH_ACCOUNT } from 'modals/RenameCashAccount';
import { forwardRef } from 'react';
import { useTranslation } from 'react-i18next';
import { FaChartLine, FaListUl, FaPen, FaPlus, FaTrash } from 'react-icons/fa';

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

      handleToggle();
    };

    const handleOpenRenameModal = () => {
      NiceModal.show(MODAL_RENAME_CASH_ACCOUNT, {
        uuid,
        name,
        callback: updateCashAccountName,
      });

      handleToggle();
    };

    const handleOpenCashAccountOperationsModal = () => {
      NiceModal.show(MODAL_CASH_ACCOUNT_OPERATIONS, {
        deleteModalProps: { name, uuid },
        currency,
      });

      handleToggle();
    };

    const handleOpenDeleteCashAccountModal = () => {
      NiceModal.show(MODAL_CONFIRM_DELETE_CASH_ACCOUNT, {
        name,
        uuid,
        callback: updateCashAccountList,
      });

      handleToggle();
    };

    return (
      <Menu
        ref={ref}
        minMenuWidth="270px"
        {...rest}
      >
        <Menu.Item icon={FaChartLine}>{t('page.cash_accounts.button.invest')}</Menu.Item>

        <Menu.Item
          icon={FaListUl}
          onClick={handleOpenCashAccountOperationsModal}
        >
          {t('page.cash_accounts.button.operations')}
        </Menu.Item>

        <Menu.Item
          icon={FaPlus}
          onClick={handleOpenAddFundsCashAccountModal}
        >
          {t('page.cash_accounts.button.add_funds')}
        </Menu.Item>

        <Menu.Divider />

        <Menu.Item
          icon={FaPen}
          onClick={handleOpenRenameModal}
        >
          {t('common.rename')}
        </Menu.Item>

        <Menu.Item
          icon={FaTrash}
          onClick={handleOpenDeleteCashAccountModal}
        >
          {t('common.delete')}
        </Menu.Item>
      </Menu>
    );
  },
);
