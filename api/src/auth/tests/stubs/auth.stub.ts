import { SignupInput, SigninInput } from 'auth/inputs';

export const signupStub = (): SignupInput => ({
  email: 'bart.koch@funds-tracker.com',
  name: 'Bart',
  password: 'qwe123qwe',
  token: 'token',
});

export const signinStub = (): SigninInput => ({
  email: 'bart.koch@funds-tracker.com',
  password: 'qwe123qwe',
  token: 'token',
});
