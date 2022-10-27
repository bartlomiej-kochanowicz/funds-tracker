import { clientPrivate } from 'config/privateClient';
import { retryHTTP } from 'utils/retryHTTP';

export interface SigninProps {
  userEmail: string;
  userPassword: string;
  token: string;
}

export const signin = retryHTTP(
  ({ userEmail, userPassword, token }: SigninProps) =>
    clientPrivate.post('/auth/local/signin', {
      email: userEmail,
      password: userPassword,
      token,
    }),
  {
    maxAttempts: 3,
  },
);
