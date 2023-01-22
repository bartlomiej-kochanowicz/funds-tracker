import { FaHistory } from 'react-icons/fa';
import { MdAccountBalance } from 'react-icons/md';
import { BiTransfer } from 'react-icons/bi';
import { ROUTES } from 'routes/paths';

export const hubNavigation = {
  essentials: [
    {
      to: ROUTES.DASHBOARD.CASH_ACCOUNTS,
      title: 'navigation.cash_accounts',
      icon: MdAccountBalance,
    },
    { to: ROUTES.DASHBOARD.TRANSACTIONS, title: 'navigation.transactions', icon: BiTransfer },
    { to: ROUTES.DASHBOARD.HISTORY, title: 'navigation.history', icon: FaHistory },
  ],
};
