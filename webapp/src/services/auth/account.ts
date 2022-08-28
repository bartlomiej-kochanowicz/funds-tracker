import { clientPrivate } from 'config/privateClient';
import { retryHTTP } from 'utils/retryHTTP';

export interface AccountResponse {
  uuid: string;
  email: string;
  createdAt: Date;
}

export const getAccount = retryHTTP(() => clientPrivate.get<AccountResponse>('/auth/account'));
