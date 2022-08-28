import { createSlice } from '@reduxjs/toolkit';
import { STATUS } from 'constants/store';
import { getLocalAccount, removeLocalAccount, setLocalAccount } from 'helpers/localAccount';
import { logoutThunk } from 'store/thunks/account/logoutThunk';
import { accountThunk } from 'store/thunks/account/accountThunk';
import { ErrorObject, RequestState } from 'types/store';
import { AccountResponse } from 'services/auth/account';

const localAccount = getLocalAccount();

const initialState = {
  data: localAccount ?? ({} as AccountResponse),
  status: (localAccount ? STATUS.fulfilled : STATUS.idle) as RequestState,
  error: { code: undefined, message: undefined } as ErrorObject,
};

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(accountThunk.pending, state => {
      state.status = STATUS.pending;
    });

    builder.addCase(accountThunk.fulfilled, (state, action) => {
      state.status = STATUS.fulfilled;
      state.data = action.payload;
      state.error = initialState.error;

      console.log('@@@', action.payload);

      setLocalAccount(action.payload);
    });

    builder.addCase(accountThunk.rejected, (state, action) => {
      state.status = STATUS.rejected;
      state.error = {
        code: action.error?.code ?? undefined,
        message: action.payload?.message ?? undefined,
      };
    });

    builder.addCase(logoutThunk.fulfilled, state => {
      state.data = {} as AccountResponse;
      state.status = STATUS.idle;
      state.error = initialState.error;

      removeLocalAccount();
    });
  },
});
