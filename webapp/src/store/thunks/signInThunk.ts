import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { signIn, SignInProps, SignInResponse } from 'services/auth/signIn';
import { RequestReject } from 'types/service';
import { RejectValue } from 'types/store';

export const signInThunk = createAsyncThunk<SignInResponse, SignInProps, RejectValue>(
  'auth/singIn',
  async ({ userEmail, userPassword }, { rejectWithValue }) => {
    try {
      const { data } = await signIn({ userEmail, userPassword });

      return data;
    } catch (err) {
      const error = err as AxiosError<RequestReject>;

      return rejectWithValue(error.response?.data ?? { message: 'Unknown error' });
    }
  },
);
