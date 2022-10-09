import { FaHome, FaWallet, FaHistory } from 'react-icons/fa';
import { MdAccountBalance } from 'react-icons/md';
import { BiTransfer } from 'react-icons/bi';
import { ROUTES } from 'routes/paths';

export const dashboardNavigation = [
  { to: ROUTES.DASHBOARD.HOME, title: 'sidebar.navigation.home', icon: FaHome },
  { to: ROUTES.DASHBOARD.PORTFOLIO, title: 'sidebar.navigation.portfolio', icon: FaWallet },
  {
    to: ROUTES.DASHBOARD.CASH_ACCOUNTS,
    title: 'sidebar.navigation.cash_accounts',
    icon: MdAccountBalance,
  },
  { to: ROUTES.DASHBOARD.TRANSACTIONS, title: 'sidebar.navigation.transactions', icon: BiTransfer },
  { to: ROUTES.DASHBOARD.HISTORY, title: 'sidebar.navigation.history', icon: FaHistory },
];
