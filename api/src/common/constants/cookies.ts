export const EXPIRES = {
  '15MIN': new Date(new Date().getTime() + 15 * 60000),
  '7DAYS': new Date(new Date().getTime() + 7 * 24 * 60 * 60000),
};

export const COOKIE_NAMES = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
  IS_LOGGED_IN: 'isLoggedIn',
};
