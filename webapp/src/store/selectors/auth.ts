import { RootState } from 'store';

export const selectSigninStatus = (state: RootState) => state.auth.status;
export const selectSigninData = (state: RootState) => state.auth.data;
export const selectSigninError = (state: RootState) => state.auth.error;
