import { configureStore } from '@reduxjs/toolkit';
import { signInSlice } from 'store/slices/auth/signInSlice';

export const store = configureStore({
  reducer: {
    signIn: signInSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
