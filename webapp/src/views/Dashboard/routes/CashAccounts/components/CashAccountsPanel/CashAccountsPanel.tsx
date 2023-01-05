import { Text } from 'components/atoms';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { CashAccount } from '__generated__/graphql';
import { Footer, Wrapper } from './CashAccountsPanel.styles';

export const CashAccountsPanel: FC<CashAccount> = ({ name, currency, balance }) => {
  const { i18n } = useTranslation();

  const formatter = new Intl.NumberFormat(i18n.language, {
    style: 'currency',
    currency,
  });

  return (
    <Wrapper>
      {name}:
      <Footer>
        <Text
          fontSize="1.25"
          fontWeight="700"
        >
          {formatter.format(balance)}
        </Text>
      </Footer>
    </Wrapper>
  );
};
