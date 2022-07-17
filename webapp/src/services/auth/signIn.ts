import { client } from 'config/client';

export interface SignInProps {
  userEmail: string;
  userPassword: string;
}

export interface SignInResponse {
  uuid: string;
  email: string;
  username: string;
}

export const signIn = ({ userEmail, userPassword }: SignInProps) =>
  client.post<SignInResponse>('/auth/login', {
    email: userEmail,
    password: userPassword,
  });
