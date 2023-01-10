import { Row } from 'simple-flexbox';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { CashAccount, CashAccountHistory } from '__generated__/graphql';
import { Panel } from 'components/molecules';
import { Text } from 'components/atoms';
import { Chart } from 'views/Dashboard/routes/CashAccounts/components/Chart';

interface CashAccountsPanelProps extends Omit<CashAccount, 'history'> {
  history: Omit<CashAccountHistory, 'uuid'>[];
}

export const CashAccountsPanel: FC<CashAccountsPanelProps> = ({
  name,
  currency,
  balance,
  history,
}) => {
  const { i18n } = useTranslation();

  const formatter = new Intl.NumberFormat(i18n.language, {
    style: 'currency',
    currency,
  });

  return (
    <Panel>
      <Panel.Chart>
        <Chart data={history} />
      </Panel.Chart>

      <Panel.Footer>
        <Row justifyContent="space-between">
          <Text
            fontWeight="700"
            maxWidth="150px"
          >
            {name}
          </Text>

          <Text>{formatter.format(balance)}</Text>
        </Row>
      </Panel.Footer>
    </Panel>
  );
};
