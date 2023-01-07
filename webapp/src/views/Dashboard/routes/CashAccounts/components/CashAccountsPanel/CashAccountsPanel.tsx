import { Row } from 'simple-flexbox';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { CashAccount } from '__generated__/graphql';
import { Panel } from 'components/molecules';
import { Text } from 'components/atoms';
import { Chart } from 'views/Dashboard/routes/CashAccounts/components/Chart';

export const CashAccountsPanel: FC<CashAccount> = ({ name, currency, balance, history }) => {
  const { i18n } = useTranslation();

  const formatter = new Intl.NumberFormat(i18n.language, {
    style: 'currency',
    currency,
  });

  return (
    <Panel>
      <Panel.Body>
        <Chart data={history} />
      </Panel.Body>

      <Panel.Footer>
        <Row justifyContent="space-between">
          <Text
            fontSize="1.25"
            fontWeight="700"
          >
            {name}
          </Text>

          <Text fontSize="1.25">{formatter.format(balance)}</Text>
        </Row>
      </Panel.Footer>
    </Panel>
  );
};
