import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { signInSlice } from 'store/slices/auth/signInSlice';
import { instrumentsSlice } from 'store/slices/model-portfolio/instrumentsSlice';

export const store = configureStore({
  reducer: {
    signIn: signInSlice.reducer,
    modelPortfolio: combineReducers({ instruments: instrumentsSlice.reducer }),
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
