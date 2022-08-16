import { client } from 'config/client';
import { retryHTTP } from 'utils/retryHTTP';

export interface SigninProps {
  userEmail: string;
  userPassword: string;
}

export interface SigninResponse {
  uuid: string;
  email: string;
  username: string;
}

export const signin = retryHTTP(
  ({ userEmail, userPassword }: SigninProps) =>
    client.post<SigninResponse>('/auth/login', {
      email: userEmail,
      password: userPassword,
    }),
  {
    maxAttempts: 3,
  },
);
