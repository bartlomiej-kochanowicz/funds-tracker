import { SigninResponse } from 'services/auth/signin';
import { saveStore, loadStore, removeStore } from 'utils/localStorage';

export const setLocalAuth = (auth: unknown) => saveStore(auth, 'auth');
export const getLocalAuth = (): SigninResponse | undefined => loadStore('auth');
export const removeLocalAuth = () => removeStore('auth');
