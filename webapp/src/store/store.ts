import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { accountSlice } from 'store/slices/account/accountSlice';
import { instrumentsSlice } from 'store/slices/model-portfolio/instrumentsSlice';

export const store = configureStore({
  reducer: {
    account: accountSlice.reducer,
    modelPortfolio: combineReducers({ instruments: instrumentsSlice.reducer }),
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
