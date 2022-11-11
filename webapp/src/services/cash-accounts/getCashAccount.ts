import { clientPrivate } from 'config/privateClient';
import { Currencies } from 'types/currencies.type';
import { retryHTTP } from 'utils/retryHTTP';

export interface GetCashAccountProps {
  uuid: string;
}

export interface GetCashAccountResponse {
  uuid: string;
  name: string;
  currency: Currencies;
  balance: number;
}

export const getCashAccount = retryHTTP(
  ({ uuid }: GetCashAccountProps) =>
    clientPrivate.get<GetCashAccountResponse>('/cash-accounts', {
      params: {
        uuid,
      },
    }),
  {
    maxAttempts: 3,
  },
);
