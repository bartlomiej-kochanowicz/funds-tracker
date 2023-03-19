import { IS_DEVELOPMENT } from '@common/config/env';

export const MAX_CASH_ACCOUNTS = 10;
export const MAX_PORTFOLIOS = 10;
export const MAX_PER_PAGE = 10;
export const WEBAPP_URL = IS_DEVELOPMENT
  ? 'http://localhost:3000'
  : 'https://www.funds-tracker.com';
