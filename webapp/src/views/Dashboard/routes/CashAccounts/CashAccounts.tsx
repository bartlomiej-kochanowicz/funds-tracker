import { useQuery } from '@apollo/client';
import { Grid, Heading, Loader, Spacer, Text } from 'components/atoms';
import { GET_CASH_ACCOUNTS } from 'graphql/query/GetCashAccounts';
import { i18n as I18n } from 'i18next';
import { useTranslation } from 'react-i18next';
import { GetCashAccountQuery } from '__generated__/graphql';
import { CashAccountsPanel } from './components/CashAccountsPanel';

const generateMockHistory = (i18n: I18n) => {
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
};

export const CashAccounts = () => {
  const { t } = useTranslation();

  const { loading, data } = useQuery<GetCashAccountQuery>(GET_CASH_ACCOUNTS);

  const { i18n } = useTranslation();

  const processData =
    data?.cashAccounts.map(account => ({ ...account, history: generateMockHistory(i18n) })) ?? [];

  return (
    <div>
      <Heading>{t('navigation.cash_accounts')}</Heading>

      <Text>{t('page.cash_accounts.title.description')}</Text>

      <Spacer />

      {loading && <Loader />}

      {!loading && processData && (
        <Grid
          columns={{
            desktop: 3,
            tablet: 2,
            phone: 1,
          }}
        >
          {processData.map(({ uuid, ...rest }) => (
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
