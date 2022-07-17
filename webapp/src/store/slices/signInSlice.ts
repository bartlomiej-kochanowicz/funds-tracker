/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { SignInResponse } from 'services/auth/signIn';
import { signInThunk } from 'store/thunks/signInThunk';

type RequestState = 'idle' | 'pending' | 'fulfilled' | 'rejected';

export const signInSlice = createSlice({
  name: 'auth/singIn',
  initialState: {
    data: {} as SignInResponse,
    status: 'idle' as RequestState,
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

    builder.addCase(signInThunk.rejected, state => {
      state.status = 'rejected';
    });
  },
});
