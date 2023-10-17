import { ConfirmSignupInput, SignupInput } from '@app/auth/inputs';

export const signupUserStub: SignupInput = {
  email: 'confirmsignup@test.com',
  password: 'testPassword',
  name: 'testName',
  token: 'mockToken',
};

export const confirmUserStub: ConfirmSignupInput = {
  email: 'confirmsignup@test.com',
  code: '123456',
  token: 'mockToken',
};
