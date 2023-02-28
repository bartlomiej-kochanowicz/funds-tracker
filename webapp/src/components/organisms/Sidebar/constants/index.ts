import { FaExchangeAlt, FaHistory, FaHome, FaWallet } from 'react-icons/fa';
import { MdAccountBalance } from 'react-icons/md';
import { ROUTES } from 'routes/paths';

export const sidebarNavigation = [
  { to: ROUTES.DASHBOARD, title: 'navigation.home', icon: FaHome },
  { to: ROUTES.PORTFOLIO, title: 'navigation.portfolios', icon: FaWallet },
  {
    to: ROUTES.CASH_ACCOUNTS,
    title: 'navigation.cash_accounts',
    icon: MdAccountBalance,
  },
  { to: ROUTES.TRANSACTIONS, title: 'navigation.transactions', icon: FaExchangeAlt },
  { to: ROUTES.HISTORY, title: 'navigation.history', icon: FaHistory },
];
