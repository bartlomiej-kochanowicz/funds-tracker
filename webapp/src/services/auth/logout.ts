import { clientPrivate } from 'config/client';
import { retryHTTP } from 'utils/retryHTTP';

export const logout = retryHTTP(() => clientPrivate.post('/auth/logout'));
