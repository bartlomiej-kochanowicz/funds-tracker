import { GetCashAccountsQuery } from '__generated__/graphql';
import NiceModal from '@ebay/nice-modal-react';
import { Button, Icon, Spacer, Spreader, Text } from 'components/atoms';
import { Panel } from 'components/molecules';
import { MODAL_ADD_FUNDS_CASH_ACCOUNT } from 'modals/AddFundsCashAccount';
import { MODAL_MANAGE_CASH_ACCOUNT } from 'modals/ManageCashAccount';
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
  const { i18n, t } = useTranslation();

  const formatter = new Intl.NumberFormat(i18n.language, {
    style: 'currency',
    currency,
  });

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

  const handleOpenManageCashAccountModal = () => {
    NiceModal.show(MODAL_MANAGE_CASH_ACCOUNT, {
      deleteModalProps: { name, uuid, callback: updateCashAccountList },
    });
  };

  return (
    <Panel>
      <Panel.Body>
        <Button
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
          onClick={handleOpenManageCashAccountModal}
        >
          {t('page.cash_accounts.button.manage')}

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
        </Button>
      </Panel.Body>

      <Panel.Footer>
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
            {formatter.format(balance)}
          </Text>
        </Row>
      </Panel.Footer>
    </Panel>
  );
};
