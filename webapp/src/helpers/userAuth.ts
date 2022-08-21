import { SigninResponse } from 'services/auth/signin';
import { saveStore, loadStore } from 'utils/localStorage';

export const setLocalAuth = (auth: unknown) => saveStore(auth, 'auth');
export const getLocalAuth = (): SigninResponse | undefined => loadStore('auth');
