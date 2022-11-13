import { clientPrivate } from 'config/privateClient';
import { retryHTTP } from 'utils/retryHTTP';

export interface DeleteCashAccountProps {
  uuid: string;
}

export const deleteCashAccount = retryHTTP(
  ({ uuid }: DeleteCashAccountProps) =>
    clientPrivate.delete('/cash-accounts', {
      params: {
        uuid,
      },
    }),
  {
    maxAttempts: 3,
  },
);
