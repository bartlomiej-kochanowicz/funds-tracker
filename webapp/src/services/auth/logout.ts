import { client } from 'config/client';
import { retryHTTP } from 'utils/retryHTTP';

export const logout = retryHTTP(() => client.post('/auth/logout'));
