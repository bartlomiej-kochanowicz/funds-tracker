import { AccountResponse } from 'services/auth/account';
import { saveStore, loadStore, removeStore } from 'utils/localStorage';

export const setLocalAccount = (auth: AccountResponse) => saveStore(auth, 'account');
export const getLocalAccount = (): AccountResponse | undefined => loadStore('account');
export const removeLocalAccount = () => removeStore('auth');
