export const ROUTES = {
  HOME: '/',
  SIGNIN: '/signin',
  SIGNUP: {
    SIGNUP: '/signup',
    CONFIRM: '/signup/confirm',
  },
  RESET_PASSWORD: '/reset-password',
  INTRODUCTION: '/introduction',
  DASHBOARD: '/dashboard',
  PORTFOLIOS: {
    PORTFOLIOS: '/portfolios',
    PORTFOLIO: '/portfolios/:uuid',
  },
  CASH_ACCOUNTS: '/cash-accounts',
  TRANSACTIONS: '/transactions',
  HISTORY: '/history',
  HUB: '/hub',
  SETTINGS: {
    SETTINGS: '/settings',
    MY_PROFILE: '/settings/my-profile',
  },
  ANY: '*',
};
