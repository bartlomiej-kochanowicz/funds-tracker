import { useQuery } from '@apollo/client';
import { Grid, Heading, Loader, Spacer, Text } from 'components/atoms';
import { GET_CASH_ACCOUNTS } from 'graphql/query/GetCashAccounts';
import { useTranslation } from 'react-i18next';
import { GetCashAccountQuery } from '__generated__/graphql';
import { CashAccountsPanel } from './components/CashAccountsPanel';

/* const generateMockHistory = (i18n: I18n) => {
  const history = [];

  for (let i = 0; i < 30; i += 1) {
    const date = new Date();

    date.setDate(date.getDate() - i);

    history.push({
      uuid: String(i),
      date: date.toLocaleDateString(i18n.language),
      balance: Math.floor(Math.random() * 10000) + 1000,
    });
  }

  return history;
}; */

export const CashAccounts = () => {
  const { t } = useTranslation();

  const { loading, data } = useQuery<GetCashAccountQuery>(GET_CASH_ACCOUNTS);

  return (
    <div>
      <Heading>{t('navigation.cash_accounts')}</Heading>

      <Text>{t('page.cash_accounts.title.description')}</Text>

      <Spacer />

      {loading && <Loader />}

      {!loading && data && (
        <Grid
          columns={{
            desktop: 3,
            tablet: 2,
            phone: 1,
          }}
        >
          {data.cashAccounts.map(({ uuid, ...rest }) => (
            <CashAccountsPanel
              key={uuid}
              uuid={uuid}
              {...rest}
            />
          ))}
        </Grid>
      )}
    </div>
  );
};
