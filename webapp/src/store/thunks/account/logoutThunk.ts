import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { showErrorToast } from 'helpers/showToast';
import { logout } from 'services/auth/logout';
import { ErrorResponse } from 'types/service.type';
import { RejectValue } from 'types/store.type';

export const logoutThunk = createAsyncThunk<null, undefined, RejectValue>(
  'logout',
  async (empty, { rejectWithValue }) => {
    try {
      await logout();

      return null;
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;

      const message = error.response?.data.message ?? 'service.unknown_error';

      showErrorToast(message);

      return rejectWithValue({
        message,
        code: error.code,
      });
    }
  },
);
