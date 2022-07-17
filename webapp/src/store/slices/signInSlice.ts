import { createSlice } from '@reduxjs/toolkit';
import { SignInResponse } from 'services/auth/signIn';
import { signInThunk } from 'store/thunks/signInThunk';
import { RequestState } from 'types/store';

export const signInSlice = createSlice({
  name: 'auth/singIn',
  initialState: {
    data: {} as SignInResponse,
    status: 'idle' as RequestState,
    error: null as string | null,
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
      console.log(action);
      state.status = 'rejected';
      state.error = action.payload?.message ?? null;
    });
  },
});
