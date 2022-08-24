import { clientPrivate } from 'config/privateClient';
import { retryHTTP } from 'utils/retryHTTP';

export interface SigninProps {
  userEmail: string;
  userPassword: string;
}

export interface SigninResponse {
  uuid: string;
  email: string;
}

export const signin = retryHTTP(
  ({ userEmail, userPassword }: SigninProps) =>
    clientPrivate.post<SigninResponse>('/auth/local/signin', {
      email: userEmail,
      password: userPassword,
    }),
  {
    maxAttempts: 3,
  },
);
