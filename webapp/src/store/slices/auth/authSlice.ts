import { createSlice } from '@reduxjs/toolkit';
import { STATUS } from 'constants/store';
import { setAccessToken, setRefreshToken } from 'helpers/accessTokens';
import { SigninResponse } from 'services/auth/signin';
import { refreshThunk } from 'store/thunks/auth/refreshThunk';
import { signinThunk } from 'store/thunks/auth/signinThunk';
import { ErrorObject, RequestState } from 'types/store';

const initialState = {
  data: {} as SigninResponse,
  status: STATUS.idle as RequestState,
  error: { code: undefined, message: undefined } as ErrorObject,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(signinThunk.pending, state => {
      state.status = 'pending';
    });

    builder.addCase(signinThunk.fulfilled, (state, action) => {
      state.status = 'fulfilled';
      state.data = action.payload;
      state.error = initialState.error;

      const { accessToken, refreshToken } = action.payload;

      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
    });

    builder.addCase(signinThunk.rejected, (state, action) => {
      state.status = 'rejected';
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

      const { accessToken, refreshToken } = action.payload;

      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
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
