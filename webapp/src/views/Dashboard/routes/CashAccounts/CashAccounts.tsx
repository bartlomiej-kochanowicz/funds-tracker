import { Grid, Heading, Spacer, Text } from 'components/atoms';
import { useTranslation } from 'react-i18next';
import { CashAccountsPanel } from './components/CashAccountsPanel';

export const CashAccounts = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Heading>{t('navigation.cash_accounts')}</Heading>

      <Text>{t('page.cash_accounts.title.description')}</Text>

      <Spacer />

      <Grid
        columns={{
          desktop: 3,
          tablet: 2,
          phone: 1,
        }}
      >
        <CashAccountsPanel />
        <CashAccountsPanel />
        <CashAccountsPanel />
        <CashAccountsPanel />
        <CashAccountsPanel />
        <CashAccountsPanel />
        <CashAccountsPanel />
      </Grid>
    </div>
  );
};
