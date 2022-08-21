import { clientPrivate } from 'config/privateClient';
import { retryHTTP } from 'utils/retryHTTP';

export const logout = retryHTTP(() => clientPrivate.post('/auth/logout'));
