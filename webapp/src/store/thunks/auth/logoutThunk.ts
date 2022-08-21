import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { logout } from 'services/auth/logout';
import { RequestReject } from 'types/service';
import { RejectValue } from 'types/store';

export const logoutThunk = createAsyncThunk<null, undefined, RejectValue>(
  'auth/logout',
  async (empty, { rejectWithValue }) => {
    try {
      await logout();

      return null;
    } catch (err) {
      const error = err as AxiosError<RequestReject>;

      return rejectWithValue({
        message: error.response?.data.message ?? 'service.unknown_error',
        code: error.code,
      });
    }
  },
);
