import { saveStore, loadStore, removeStore } from 'utils/localStorage';
import { isUserLoggedIn } from 'helpers/isUserLoggedIn';
import { User } from '__generated__/graphql';

export const setLocalAccount = (user: User) => saveStore(user, 'user');
export const removeLocalAccount = () => removeStore('user');
export const getLocalAccount = (): User | undefined =>
  isUserLoggedIn ? loadStore('user') : removeLocalAccount();
