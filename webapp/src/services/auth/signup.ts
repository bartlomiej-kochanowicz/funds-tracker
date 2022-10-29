import { clientPrivate } from 'config/privateClient';
import { retryHTTP } from 'utils/retryHTTP';

export interface SignupProps {
  userName: string;
  userEmail: string;
  userPassword: string;
  token: string;
}

export const signup = retryHTTP(
  ({ userName, userEmail, userPassword, token }: SignupProps) =>
    clientPrivate.post('/auth/local/signup', {
      name: userName,
      email: userEmail,
      password: userPassword,
      token,
    }),
  {
    maxAttempts: 3,
  },
);
