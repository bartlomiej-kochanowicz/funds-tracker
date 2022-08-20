import { createSlice } from '@reduxjs/toolkit';
import { STATUS } from 'constants/store';
import { SigninResponse } from 'services/auth/signin';
import { signinThunk } from 'store/thunks/auth/signinThunk';
import { ErrorObject, RequestState } from 'types/store';

export const signinSlice = createSlice({
  name: 'auth/singin',
  initialState: {
    data: {} as SigninResponse,
    status: STATUS.idle as RequestState,
    error: { code: undefined, message: undefined } as ErrorObject,
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(signinThunk.pending, state => {
      state.status = 'pending';
    });

    builder.addCase(signinThunk.fulfilled, (state, action) => {
      state.status = 'fulfilled';
      state.data = action.payload;
    });

    builder.addCase(signinThunk.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = {
        code: action.error?.code ?? undefined,
        message: action.payload?.message ?? undefined,
      };
    });
  },
});
