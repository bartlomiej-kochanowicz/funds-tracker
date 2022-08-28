import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { AccountResponse, getAccount } from 'services/auth/account';
import { RequestReject } from 'types/service';
import { RejectValue } from 'types/store';

export const accountThunk = createAsyncThunk<AccountResponse, undefined, RejectValue>(
  'account',
  async (empty, { rejectWithValue }) => {
    try {
      const { data } = await getAccount();

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
