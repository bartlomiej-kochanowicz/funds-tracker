import { clientPrivate } from 'config/privateClient';
import { Currencies } from 'types/currencies.type';
import { retryHTTP } from 'utils/retryHTTP';

export type CashAccount = {
  uuid?: string;
  name: string;
  currency: Currencies;
  balance?: number;
};

export interface AddCashAccountsProps {
  cashAccounts: CashAccount[];
}

export const addCashAccounts = retryHTTP(
  ({ cashAccounts }: AddCashAccountsProps) =>
    clientPrivate.post('/cash-accounts', {
      cashAccounts,
    }),
  {
    maxAttempts: 3,
  },
);
