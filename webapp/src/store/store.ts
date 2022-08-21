import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { authSlice } from 'store/slices/auth/authSlice';
import { instrumentsSlice } from 'store/slices/model-portfolio/instrumentsSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    modelPortfolio: combineReducers({ instruments: instrumentsSlice.reducer }),
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
