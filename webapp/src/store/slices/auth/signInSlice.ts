import { createSlice } from '@reduxjs/toolkit';
import { SignInResponse } from 'services/auth/signIn';
import { signInThunk } from 'store/thunks/auth/signInThunk';
import { ErrorObject, RequestState } from 'types/store';

export const signInSlice = createSlice({
  name: 'auth/singIn',
  initialState: {
    data: {} as SignInResponse,
    status: 'idle' as RequestState,
    error: { code: undefined, message: undefined } as ErrorObject,
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(signInThunk.pending, state => {
      state.status = 'pending';
    });

    builder.addCase(signInThunk.fulfilled, (state, action) => {
      state.status = 'fulfilled';
      state.data = action.payload;
    });

    builder.addCase(signInThunk.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = {
        code: action.error?.code ?? undefined,
        message: action.payload?.message ?? undefined,
      };
    });
  },
});
