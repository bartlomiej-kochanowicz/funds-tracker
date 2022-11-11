import { clientPrivate } from 'config/privateClient';
import { Currencies } from 'types/currencies.type';
import { retryHTTP } from 'utils/retryHTTP';

export interface GetCashAccountResponse {
  uuid: string;
  name: string;
  currency: Currencies;
  balance: number;
}

export const getCashAccount = retryHTTP(
  () => clientPrivate.get<GetCashAccountResponse[]>('/cash-accounts'),
  {
    maxAttempts: 3,
  },
);
