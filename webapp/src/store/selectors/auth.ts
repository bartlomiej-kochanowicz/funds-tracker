import { RootState } from 'store';

export const selectSignInData = (state: RootState) => state.signIn.data;
export const selectSignInErrorMessage = (state: RootState) => state.signIn.error;
