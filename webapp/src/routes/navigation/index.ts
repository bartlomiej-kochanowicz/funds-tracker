import { FaHome, FaWallet, FaHistory, FaUserCircle } from 'react-icons/fa';
import { MdAccountBalance } from 'react-icons/md';
import { BiTransfer } from 'react-icons/bi';
import { ROUTES } from 'routes/paths';

export const dashboardNavigation = (isDesktop: boolean = false) => [
  { to: ROUTES.DASHBOARD.HOME, title: 'sidebar.navigation.home', icon: FaHome },
  { to: ROUTES.DASHBOARD.PORTFOLIO, title: 'sidebar.navigation.portfolios', icon: FaWallet },
  {
    to: ROUTES.DASHBOARD.CASH_ACCOUNTS,
    title: 'sidebar.navigation.cash_accounts',
    icon: MdAccountBalance,
  },
  { to: ROUTES.DASHBOARD.TRANSACTIONS, title: 'sidebar.navigation.transactions', icon: BiTransfer },
  { to: ROUTES.DASHBOARD.HISTORY, title: 'sidebar.navigation.history', icon: FaHistory },
  ...(isDesktop
    ? []
    : [
        {
          title: 'sidebar.navigation.my_profile',
          to: '/profile',
          icon: FaUserCircle,
        },
      ]),
];
