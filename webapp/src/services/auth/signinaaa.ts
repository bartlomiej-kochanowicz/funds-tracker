import { clientPrivate } from 'config/privateClient';
import { retryHTTP } from 'utils/retryHTTP';

export interface SigninProps {
  userEmail: string;
  userPassword: string;
}

export const signin = retryHTTP(
  ({ userEmail, userPassword }: SigninProps) =>
    clientPrivate.post('/auth/local/signin', {
      email: userEmail,
      password: userPassword,
    }),
  {
    maxAttempts: 3,
  },
);
