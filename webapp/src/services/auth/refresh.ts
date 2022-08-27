import { clientPrivate } from 'config/privateClient';
import { retryHTTP } from 'utils/retryHTTP';

export const refresh = retryHTTP(() => clientPrivate.post('/auth/refresh'));
