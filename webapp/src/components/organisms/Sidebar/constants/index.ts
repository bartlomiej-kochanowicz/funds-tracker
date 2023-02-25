import { FaExchangeAlt, FaHistory, FaHome, FaWallet } from 'react-icons/fa';
import { MdAccountBalance } from 'react-icons/md';
import { ROUTES } from 'routes/paths';

export const sidebarNavigation = [
  { to: ROUTES.DASHBOARD.HOME, title: 'navigation.home', icon: FaHome },
  { to: ROUTES.DASHBOARD.PORTFOLIO, title: 'navigation.portfolios', icon: FaWallet },
  {
    to: ROUTES.DASHBOARD.CASH_ACCOUNTS,
    title: 'navigation.cash_accounts',
    icon: MdAccountBalance,
  },
  { to: ROUTES.DASHBOARD.TRANSACTIONS, title: 'navigation.transactions', icon: FaExchangeAlt },
  { to: ROUTES.DASHBOARD.HISTORY, title: 'navigation.history', icon: FaHistory },
];
