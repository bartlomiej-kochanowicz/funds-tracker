import { AccountResponse } from 'services/auth/account';
import { saveStore, loadStore, removeStore } from 'utils/localStorage';
import { isUserLoggedIn } from 'helpers/isUserLoggedIn';

export const setLocalAccount = (auth: AccountResponse) => saveStore(auth, 'account');
export const removeLocalAccount = () => removeStore('account');
export const getLocalAccount = (): AccountResponse | undefined =>
  isUserLoggedIn ? loadStore('account') : removeLocalAccount();
