import { useQuery } from '@apollo/client';
import { Grid, Heading, Loader, Spacer, Text } from 'components/atoms';
import { ErrorContent } from 'components/molecules';
import { GET_CASH_ACCOUNTS } from 'graphql/query/GetCashAccounts';
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { CreateCashAccountMutation, GetCashAccountsQuery } from '__generated__/graphql';
import { CreateCashAccount } from './components/CreateCashAccount';
import { CashAccountsPanel } from './components/CashAccountsPanel';
import { CreateFirstCashAccount } from './components/CreateFirstCashAccount';

export const CashAccounts = () => {
  const { t } = useTranslation();

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

  return (
    <Fragment>
      <Heading>{t('navigation.cash_accounts')}</Heading>

      <Text>{t('page.cash_accounts.title.description')}</Text>

      <Spacer />

      {loading && <Loader size="large" />}

      {!loading && error && <ErrorContent />}

      {!loading && !cashAccountsExist && !error && (
        <CreateFirstCashAccount callback={addCashAccountToList} />
      )}

      {!loading && cashAccountsExist && !error && (
        <Grid
          columns={{
            desktop: 3,
            tablet: 2,
            phone: 1,
          }}
        >
          {data?.cashAccounts.map(({ uuid, ...rest }) => (
            <CashAccountsPanel
              key={uuid}
              uuid={uuid}
              updateCashAccountBalance={updateCashAccountBalance}
              {...rest}
            />
          ))}

          {renderCreateCashAccountButton && <CreateCashAccount callback={addCashAccountToList} />}
        </Grid>
      )}
    </Fragment>
  );
};
