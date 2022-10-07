import { FaHome, FaWallet, FaHistory } from 'react-icons/fa';
import { MdAccountBalance } from 'react-icons/md';
import { BiTransfer } from 'react-icons/bi';
import { ROUTES } from 'routes/paths';

export const dashboardNavigation = [
  { to: ROUTES.DASHBOARD.HOME, title: 'Home', icon: FaHome },
  { to: ROUTES.DASHBOARD.PORTFOLIO, title: 'Portfolio', icon: FaWallet },
  { to: ROUTES.DASHBOARD.CASH_ACCOUNTS, title: 'Cash accounts', icon: MdAccountBalance },
  { to: ROUTES.DASHBOARD.TRANSACTIONS, title: 'Transactions', icon: BiTransfer },
  { to: ROUTES.DASHBOARD.HISTORY, title: 'History', icon: FaHistory },
];
