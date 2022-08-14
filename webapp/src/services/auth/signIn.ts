import { client } from 'common/config/client';
import { retryHTTP } from 'utils/retryHTTP';

export interface SignInProps {
  userEmail: string;
  userPassword: string;
}

export interface SignInResponse {
  uuid: string;
  email: string;
  username: string;
}

export const signIn = retryHTTP(
  ({ userEmail, userPassword }: SignInProps) =>
    client.post<SignInResponse>('/auth/login', {
      email: userEmail,
      password: userPassword,
    }),
  {
    maxAttempts: 3,
  },
);
