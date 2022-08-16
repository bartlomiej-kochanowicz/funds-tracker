import { RootState } from 'store';

export const selectSigninStatus = (state: RootState) => state.signin.status;
export const selectSigninData = (state: RootState) => state.signin.data;
export const selectSigninError = (state: RootState) => state.signin.error;
