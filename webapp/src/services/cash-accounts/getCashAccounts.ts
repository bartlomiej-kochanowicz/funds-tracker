import { clientPrivate } from 'config/privateClient';
import { Currencies } from 'types/currencies.type';
import { Pagination } from 'types/pagination.type';
import { retryHTTP } from 'utils/retryHTTP';

export interface GetCashAccountResponse {
  uuid: string;
  name: string;
  currency: Currencies;
  balance: number;
}

export const getCashAccount = retryHTTP(
  () => clientPrivate.get<Pagination<GetCashAccountResponse>>('/cash-accounts'),
  {
    maxAttempts: 3,
  },
);
