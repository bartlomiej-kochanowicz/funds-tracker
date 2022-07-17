import { RootState } from 'store';

export const selectSignInStatus = (state: RootState) => state.signIn.status;
export const selectSignInData = (state: RootState) => state.signIn.data;
export const selectSignInError = (state: RootState) => state.signIn.error;
