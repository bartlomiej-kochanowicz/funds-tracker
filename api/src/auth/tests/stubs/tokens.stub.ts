import { Tokens } from 'auth/types';

export const tokensStub = (): Tokens => ({
  access_token: 'access-token-stub',
  refresh_token: 'refresh-token-stub',
});
