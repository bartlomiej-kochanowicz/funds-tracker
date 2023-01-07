import { Text } from 'components/atoms';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { CashAccount } from '__generated__/graphql';
import { Panel } from 'components/molecules';

export const CashAccountsPanel: FC<CashAccount> = ({ name, currency, balance }) => {
  const { i18n } = useTranslation();

  const formatter = new Intl.NumberFormat(i18n.language, {
    style: 'currency',
    currency,
  });

  return (
    <Panel>
      <Panel.Body>{name}</Panel.Body>

      <Panel.Footer>
        <Text
          fontSize="1.25"
          fontWeight="700"
        >
          {formatter.format(balance)}
        </Text>
      </Panel.Footer>
    </Panel>
  );
};
