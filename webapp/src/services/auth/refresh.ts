import { clientPrivate } from 'config/privateClient';

export const refresh = () => clientPrivate.post('/auth/refresh');
