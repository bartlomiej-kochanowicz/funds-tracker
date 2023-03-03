import { GetCashAccountsQuery } from '__generated__/graphql';
import { Box, Button, Dropdown, Icon, Text } from 'components/atoms';
import { ContentProps } from 'components/atoms/Dropdown';
import { formatCurrency } from 'helpers/formatCurrency';
import { useBreakpoint } from 'hooks/useBreakpoint';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { FaEllipsisV } from 'react-icons/fa';
import { Column, Row } from 'simple-flexbox';

import { DropdownContent } from './components/DropdownContent';

interface CashAccountsPanelProps {
  updateCashAccountBalance: (data: { balance: number; uuid: string }) => void;
  updateCashAccountName: (data: { name: string; uuid: string }) => void;
  updateCashAccountList: (data: { uuid: string }) => void;
}

export const CashAccountsPanel: FC<
  GetCashAccountsQuery['cashAccounts'][0] & CashAccountsPanelProps
> = ({
  name,
  currency,
  balance,
  uuid,
  updateCashAccountBalance,
  updateCashAccountName,
  updateCashAccountList,
}) => {
  const { t } = useTranslation();

  const isPhone = useBreakpoint('phone', 'max');

  const content = (props: ContentProps) => (
    <DropdownContent
      uuid={uuid}
      name={name}
      currency={currency}
      updateCashAccountBalance={updateCashAccountBalance}
      updateCashAccountName={updateCashAccountName}
      updateCashAccountList={updateCashAccountList}
      {...props}
    />
  );

  return (
    <Box
      p={isPhone ? 'medium' : 'large'}
      borderRadius="primary"
    >
      <Row justifyContent="space-between">
        <Column>
          <Text fontWeight="700">{name}</Text>

          <Text>{formatCurrency(balance, currency)}</Text>
        </Column>

        <Dropdown
          content={content}
          placement="bottom-end"
        >
          {props => (
            <Button
              outline
              size="small"
              {...props}
            >
              <Icon icon={FaEllipsisV} />
            </Button>
          )}
        </Dropdown>
      </Row>
    </Box>
  );
};
