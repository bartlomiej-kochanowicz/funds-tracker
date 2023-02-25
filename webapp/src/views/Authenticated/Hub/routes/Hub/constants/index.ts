import { FaExchangeAlt, FaHistory } from 'react-icons/fa';
import { MdAccountBalance } from 'react-icons/md';
import { ROUTES } from 'routes/paths';

export const hubNavigation = {
  essentials: [
    {
      to: ROUTES.DASHBOARD.CASH_ACCOUNTS,
      title: 'navigation.cash_accounts',
      icon: MdAccountBalance,
    },
    { to: ROUTES.DASHBOARD.TRANSACTIONS, title: 'navigation.transactions', icon: FaExchangeAlt },
    { to: ROUTES.DASHBOARD.HISTORY, title: 'navigation.history', icon: FaHistory },
  ],
};
