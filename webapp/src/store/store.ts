import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { signinSlice } from 'store/slices/auth/signinSlice';
import { instrumentsSlice } from 'store/slices/model-portfolio/instrumentsSlice';

export const store = configureStore({
  reducer: {
    signin: signinSlice.reducer,
    modelPortfolio: combineReducers({ instruments: instrumentsSlice.reducer }),
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
