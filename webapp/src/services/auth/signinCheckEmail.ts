import { client } from 'config/client';
import { retryHTTP } from 'utils/retryHTTP';

export interface SigninCheckEmailProps {
  userEmail: string;
}

export interface SigninCheckEmailResponse {
  exist: boolean;
}

export const signinCheckEmail = retryHTTP(({ userEmail }: SigninCheckEmailProps) =>
  client.post<SigninCheckEmailResponse>('/auth/check-email', {
    email: userEmail,
  }),
);
