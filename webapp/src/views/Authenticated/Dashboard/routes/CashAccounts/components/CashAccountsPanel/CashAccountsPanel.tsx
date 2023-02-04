import { Row } from 'simple-flexbox';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { GetCashAccountsQuery } from '__generated__/graphql';
import { Panel } from 'components/molecules';
import { Button, Spacer, Spreader, Text } from 'components/atoms';
import { FaChartLine } from 'react-icons/fa';

export const CashAccountsPanel: FC<GetCashAccountsQuery['cashAccounts'][0]> = ({
  name,
  currency,
  balance,
  // uuid,
}) => {
  const { i18n, t } = useTranslation();

  const formatter = new Intl.NumberFormat(i18n.language, {
    style: 'currency',
    currency,
  });

  return (
    <Panel>
      <Panel.Body>
        <Row>
          <Button width="50%">{t('page.cash_accounts.button.add_money')}</Button>

          <Spreader />

          <Button width="50%">{t('page.cash_accounts.button.operations')}</Button>
        </Row>

        <Spacer space="small" />

        <Button
          width="100%"
          flexGrow={1}
        >
          {t('page.cash_accounts.button.invest')} <Spreader spread="tiny" /> <FaChartLine />
        </Button>
      </Panel.Body>

      <Panel.Footer>
        <Row justifyContent="space-between">
          <Text
            fontWeight="700"
            maxWidth="170px"
          >
            {name}
          </Text>

          <Text>{formatter.format(balance)}</Text>
        </Row>
      </Panel.Footer>
    </Panel>
  );
};
