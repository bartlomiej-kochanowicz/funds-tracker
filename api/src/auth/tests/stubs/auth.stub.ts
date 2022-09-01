import { SignupDto, SigninDto } from 'auth/dto';

export const signupStub = (): SignupDto => ({
  email: 'bart.koch@funds-tracker.com',
  name: 'Bart',
  password: 'qwe123qwe',
});

export const signinStub = (): SigninDto => ({
  email: 'bart.koch@funds-tracker.com',
  password: 'qwe123qwe',
});
