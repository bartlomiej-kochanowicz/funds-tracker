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
  uuid,
}) => {
  const { i18n } = useTranslation();

  const formatter = new Intl.NumberFormat(i18n.language, {
    style: 'currency',
    currency,
  });

  return (
    <Panel>
      <Panel.Body>
        <Row>
          <Button flexGrow={1}>Add money</Button>

          <Spreader />

          <Button flexGrow={1}>Operations</Button>
        </Row>

        <Spacer space="small" />

        <Row>
          <Button
            width="auto"
            flexGrow={1}
          >
            Invest <Spreader spread="tiny" /> <FaChartLine />
          </Button>
        </Row>
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
