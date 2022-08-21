import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { signin, SigninProps, SigninResponse } from 'services/auth/signin';
import { RequestReject } from 'types/service';
import { RejectValue } from 'types/store';

export const refrestThunk = createAsyncThunk<SigninResponse, SigninProps, RejectValue>(
  'auth/refresh',
  async ({ userEmail, userPassword }, { rejectWithValue }) => {
    try {
      const { data } = await signin({ userEmail, userPassword });

      return data;
    } catch (err) {
      const error = err as AxiosError<RequestReject>;

      return rejectWithValue({
        message: error.response?.data.message ?? 'service.unknown_error',
        code: error.code,
      });
    }
  },
);
