import { createSlice } from '@reduxjs/toolkit';
import { STATUS } from 'constants/store';
import { setLocalAuth, getLocalAuth } from 'helpers/userAuth';
import { SigninResponse } from 'services/auth/signin';
import { refreshThunk } from 'store/thunks/auth/refreshThunk';
import { signinThunk } from 'store/thunks/auth/signinThunk';
import { ErrorObject, RequestState } from 'types/store';

const initialState = {
  data: getLocalAuth() ?? ({} as SigninResponse),
  status: (getLocalAuth() ? STATUS.fulfilled : STATUS.idle) as RequestState,
  signinStatus: STATUS.idle as RequestState,
  error: { code: undefined, message: undefined } as ErrorObject,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(signinThunk.pending, state => {
      state.signinStatus = 'pending';
    });

    builder.addCase(signinThunk.fulfilled, (state, action) => {
      state.signinStatus = 'fulfilled';
      state.status = 'fulfilled';
      state.data = action.payload;
      state.error = initialState.error;

      setLocalAuth(action.payload);
    });

    builder.addCase(signinThunk.rejected, (state, action) => {
      state.signinStatus = 'rejected';
      state.error = {
        code: action.error?.code ?? undefined,
        message: action.payload?.message ?? undefined,
      };
    });

    builder.addCase(refreshThunk.pending, state => {
      state.status = 'pending';
    });

    builder.addCase(refreshThunk.fulfilled, (state, action) => {
      state.status = 'fulfilled';
      state.data = action.payload;
      state.error = initialState.error;

      setLocalAuth(action.payload);
    });

    builder.addCase(refreshThunk.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = {
        code: action.error?.code ?? undefined,
        message: action.payload?.message ?? undefined,
      };
    });
  },
});
