import { client } from 'config/client';
import { retryHTTP } from 'utils/retryHTTP';

export interface CheckEmailProps {
  userEmail: string;
}

export interface CheckEmailResponse {
  exist: boolean;
}

export const checkEmail = retryHTTP(({ userEmail }: CheckEmailProps) =>
  client.post<CheckEmailResponse>('/auth/check-email', {
    email: userEmail,
  }),
);
