import { client } from 'config/client';
import { retryHTTP } from 'utils/retryHTTP';

export interface SigninCheckEmailProps {
  userEmail: string;
}

export interface SigninCheckEmailResponse {
  status: string;
}

export const signinCheckEmail = retryHTTP(
  ({ userEmail }: SigninCheckEmailProps) =>
    client.post<SigninCheckEmailResponse>('/local/signin/email', {
      email: userEmail,
    }),
  {
    retryIf: e => {
      console.log('ERROR IS SERVICE', e);
      return true;
    },
  },
);
