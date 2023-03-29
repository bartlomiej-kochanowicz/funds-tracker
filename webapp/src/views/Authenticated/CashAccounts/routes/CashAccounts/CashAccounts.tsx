import { CreateCashAccountMutation, GetCashAccountsQuery } from '__generated__/graphql';
import { useQuery } from '@apollo/client';
import { Box, Heading, Loader, Spacer, Text } from 'components/atoms';
import { ErrorContent } from 'components/molecules';
import { useColorThemeContext } from 'contexts/ColorThemeContext';
import { GET_CASH_ACCOUNTS } from 'graphql/query/cashAccounts/GetCashAccounts';
import { useBreakpoint } from 'hooks/useBreakpoint';
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';

import { CashAccountsPanel } from './components/CashAccountsPanel';
import { CreateCashAccount } from './components/CreateCashAccount';
import { CreateFirstCashAccount } from './components/CreateFirstCashAccount';

export const CashAccounts = () => {
  const { t } = useTranslation();

  const { isDark } = useColorThemeContext();

  const isPhone = useBreakpoint('phone', 'max');

  const { loading, data, error, updateQuery } = useQuery<GetCashAccountsQuery>(GET_CASH_ACCOUNTS);

  const cashAccountsExist = Boolean(data && data.cashAccounts.length > 0);

  const renderCreateCashAccountButton = Boolean(data && data.cashAccounts.length < 10);

  const addCashAccountToList = (newCashAccountData: CreateCashAccountMutation) => {
    updateQuery(prev => ({
      cashAccounts: [...prev.cashAccounts, newCashAccountData.createCashAccount],
    }));
  };

  const updateCashAccountBalance = ({ balance, uuid }: { balance: number; uuid: string }) => {
    updateQuery(prev => ({
      cashAccounts: prev.cashAccounts.map(cashAccount => {
        if (cashAccount.uuid === uuid) {
          return {
            ...cashAccount,
            balance,
          };
        }

        return cashAccount;
      }),
    }));
  };

  const updateCashAccountName = ({ name, uuid }: { name: string; uuid: string }) => {
    updateQuery(prev => ({
      cashAccounts: prev.cashAccounts.map(cashAccount => {
        if (cashAccount.uuid === uuid) {
          return {
            ...cashAccount,
            name,
          };
        }

        return cashAccount;
      }),
    }));
  };

  const updateCashAccountList = ({ uuid }: { uuid: string }) => {
    updateQuery(prev => ({
      cashAccounts: prev.cashAccounts.filter(cashAccount => cashAccount.uuid !== uuid),
    }));
  };

  return (
    <Fragment>
      <Heading>{t('navigation.cash_accounts')}</Heading>

      <Text
        fontSize="0.875"
        fontColor="gray400"
      >
        {t('page.cash_accounts.title.description')}
      </Text>

      <Spacer />

      {loading && <Loader size="large" />}

      {!loading && error && <ErrorContent />}

      {!loading && !cashAccountsExist && !error && (
        <CreateFirstCashAccount callback={addCashAccountToList} />
      )}

      {!loading && cashAccountsExist && !error && (
        <Box
          borderRadius="primary"
          backgroundColor={isDark ? 'gray100' : 'white'}
          p={isPhone ? 'small' : 'large'}
        >
          {data?.cashAccounts.map(({ uuid, ...rest }) => (
            <CashAccountsPanel
              key={uuid}
              uuid={uuid}
              updateCashAccountBalance={updateCashAccountBalance}
              updateCashAccountName={updateCashAccountName}
              updateCashAccountList={updateCashAccountList}
              {...rest}
            />
          ))}
        </Box>
      )}

      <Spacer />

      {renderCreateCashAccountButton && <CreateCashAccount callback={addCashAccountToList} />}
    </Fragment>
  );
};
