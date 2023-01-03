import { Heading, Text } from 'components/atoms';
import { useTranslation } from 'react-i18next';

export const CashAccounts = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Heading>{t('navigation.cash_accounts')}</Heading>

      <Text>Ble ble ble</Text>
    </div>
  );
};
