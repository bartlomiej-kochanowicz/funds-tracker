import { client } from 'config/client';
import { retryHTTP } from 'utils/retryHTTP';

export interface CheckEmailProps {
  userEmail: string;
  token: string;
}

export interface CheckEmailResponse {
  exist: boolean;
}

export const checkEmail = retryHTTP(({ userEmail, token }: CheckEmailProps) =>
  client.post<CheckEmailResponse>('/auth/check-email', {
    email: userEmail,
    token,
  }),
);
