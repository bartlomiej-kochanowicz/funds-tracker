import { FaHome, FaShapes, FaWallet } from 'react-icons/fa';
import { ROUTES } from 'routes/paths';

export const mobileNavigationNavigation = [
  { to: ROUTES.DASHBOARD, title: 'navigation.dashboard', icon: FaHome },
  { to: ROUTES.PORTFOLIOS, title: 'navigation.portfolios', icon: FaWallet },
  {
    to: ROUTES.HUB,
    title: 'navigation.hub',
    icon: FaShapes,
  },
];
