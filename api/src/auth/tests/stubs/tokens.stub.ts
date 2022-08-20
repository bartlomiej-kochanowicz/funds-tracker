import { Tokens } from 'auth/types';

export const tokensStub = (): Tokens => ({
  accessToken: 'access-token-stub',
  refreshToken: 'refresh-token-stub',
});
