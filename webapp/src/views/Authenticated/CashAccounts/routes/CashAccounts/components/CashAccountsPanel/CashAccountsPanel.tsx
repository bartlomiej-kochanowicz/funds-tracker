import { GetCashAccountsQuery } from '__generated__/graphql';
import NiceModal from '@ebay/nice-modal-react';
import { Button, Icon, Spacer, Spreader, Text } from 'components/atoms';
import { Panel } from 'components/molecules';
import { formatCurrency } from 'helpers/formatCurrency';
import { MODAL_ADD_FUNDS_CASH_ACCOUNT } from 'modals/AddFundsCashAccount';
import { MODAL_CASH_ACCOUNT_OPERATIONS } from 'modals/CashAccountOperations';
import { MODAL_RENAME_CASH_ACCOUNT } from 'modals/RenameCashAccount';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { FaChartLine, FaListUl, FaPlus } from 'react-icons/fa';
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
    <Panel>
      <Panel.Body>
        {/* <Button
          width="100%"
          onClick={handleOpenAddFundsCashAccountModal}
        >
          {t('page.cash_accounts.button.add_funds')}

          <Spreader spread="tiny" />

          <Icon icon={FaPlus} />
        </Button>

        <Spacer space="small" />

        <Button
          width="100%"
          onClick={handleOpenCashAccountOperationsModal}
        >
          {t('page.cash_accounts.button.operations')}

          <Spreader spread="tiny" />

          <Icon icon={FaListUl} />
        </Button>

        <Spacer space="small" />

        <Button width="100%">
          {t('page.cash_accounts.button.invest')}

          <Spreader spread="tiny" />

          <Icon
            icon={FaChartLine}
            size="1.25"
          />
        </Button> */}

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
      </Panel.Body>
    </Panel>
  );
};
