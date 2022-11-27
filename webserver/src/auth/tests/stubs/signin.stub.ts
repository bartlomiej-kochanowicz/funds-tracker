import { SignupInput } from 'auth/inputs';

export const signupUser: SignupInput = {
  email: 'testsignupuser@email.com',
  password: 'testsignupPassword',
  name: 'testsignupName',
  token: 'mocksignupToken',
};

export const testUser: SignupInput = {
  email: 'test@email.com',
  password: 'testPassword',
  name: 'testName',
  token: 'mockToken',
};
