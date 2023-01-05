import { FC } from 'react';
import { CashAccount } from '__generated__/graphql';
import { Wrapper } from './CashAccountsPanel.styles';

export const CashAccountsPanel: FC<CashAccount> = ({ name, currency, balance }) => {
  return (
    <Wrapper>
      {name}: {balance} {currency}
    </Wrapper>
  );
};
