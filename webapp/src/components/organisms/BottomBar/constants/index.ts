import { FaHome, FaWallet, FaShapes } from 'react-icons/fa';
import { ROUTES } from 'routes/paths';

export const bottomBarNavigation = [
  { to: ROUTES.DASHBOARD.HOME, title: 'navigation.home', icon: FaHome },
  { to: ROUTES.DASHBOARD.PORTFOLIO, title: 'navigation.portfolios', icon: FaWallet },
  {
    to: ROUTES.DASHBOARD.HUB,
    title: 'navigation.hub',
    icon: FaShapes,
  },
];