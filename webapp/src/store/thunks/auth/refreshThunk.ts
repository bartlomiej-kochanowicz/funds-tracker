import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { refresh, RefreshProps, RefreshResponse } from 'services/auth/refresh';
import { RequestReject } from 'types/service';
import { RejectValue } from 'types/store';

export const refreshThunk = createAsyncThunk<RefreshResponse, RefreshProps, RejectValue>(
  'auth/refresh',
  async ({ refreshToken }, { rejectWithValue }) => {
    try {
      const { data } = await refresh({ refreshToken });

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
