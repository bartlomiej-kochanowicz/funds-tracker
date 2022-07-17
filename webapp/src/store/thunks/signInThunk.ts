import { createAsyncThunk } from '@reduxjs/toolkit';
import { signIn, SignInProps, SignInResponse } from 'services/auth/signIn';

export const signInThunk = createAsyncThunk<SignInResponse, SignInProps>(
  'auth/singIn',
  async ({ userEmail, userPassword }) => {
    const { data } = await signIn({ userEmail, userPassword });

    return data;
  },
);
