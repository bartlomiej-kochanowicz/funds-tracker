import { useQuery } from '@apollo/client';
import { Grid, Heading, Loader, Spacer, Text } from 'components/atoms';
import { ErrorContent } from 'components/molecules';
import { GET_CASH_ACCOUNTS } from 'graphql/query/GetCashAccounts';
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { CreateCashAccountMutation, GetCashAccountQuery } from '__generated__/graphql';
import { CreateCashAccount } from './components/CreateCashAccount';
import { CashAccountsPanel } from './components/CashAccountsPanel';
import { CreateFirstCashAccount } from './components/CreateFirstCashAccount';

const generateMockHistory = () => {
  const history = [
    { uuid: 'a77d55b6-5e0d-4db9-a57a-66d9521b3324', date: '15-01-2022', balance: 0 },
    { uuid: '5fe14bfb-291f-43b3-8368-0b585b3c0f4c', date: '15-02-2022', balance: 1000 },
    { uuid: 'c7b690b9-7a1c-4a64-83af-6dc186b2540e', date: '15-03-2022', balance: 1000 },
    { uuid: 'af8fddd8-e831-4193-a4f4-fa82ccf18aca', date: '15-04-2022', balance: 1000 },
    { uuid: 'f29ffb0e-3c49-4d7e-a682-f5acdd8bcc37', date: '15-05-2022', balance: 2000 },
    { uuid: 'd896fc2c-2dc4-4e5a-989c-a21b21f061fb', date: '15-06-2022', balance: 3500 },
    { uuid: '342dd182-5ec9-4a2c-b253-97252b3631c6', date: '15-07-2022', balance: 3500 },
    { uuid: 'b1f1b16a-a12c-475b-9e54-bb773148d8f4', date: '15-08-2022', balance: 3500 },
    { uuid: '6dda16a3-4b60-442e-9afa-e969ed4a9447', date: '15-09-2022', balance: 3500 },
    { uuid: '7d45eab3-cd76-4972-a682-d422f6fe7536', date: '15-10-2022', balance: 4000 },
    { uuid: '285c7b31-54c4-4e15-b3d7-b774853222a9', date: '15-11-2022', balance: 4500 },
    { uuid: 'c759c956-99a6-49d7-beeb-0af64fdf0166', date: '15-12-2022', balance: 4500 },
  ];

  return history;
};

export const CashAccounts = () => {
  const { t } = useTranslation();

  const { loading, data, error, updateQuery } = useQuery<GetCashAccountQuery>(GET_CASH_ACCOUNTS);

  const processData = data?.cashAccounts.map(cashAccount => ({
    ...cashAccount,
    history: generateMockHistory(),
  }));

  const cashAccountsExist = Boolean(processData && processData.length > 0);

  const renderCreateCashAccountButton = Boolean(processData && processData.length < 10);

  const addCashAccountToList = (newCashAccountData: CreateCashAccountMutation) => {
    updateQuery(prev => {
      const newCashAccount = {
        ...newCashAccountData.createCashAccount,
        history: generateMockHistory(),
      };

      return {
        cashAccounts: [...prev.cashAccounts, newCashAccount],
      };
    });
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
          {processData?.map(({ uuid, ...rest }) => (
            <CashAccountsPanel
              key={uuid}
              uuid={uuid}
              {...rest}
            />
          ))}

          {renderCreateCashAccountButton && <CreateCashAccount callback={addCashAccountToList} />}
        </Grid>
      )}
    </Fragment>
  );
};
