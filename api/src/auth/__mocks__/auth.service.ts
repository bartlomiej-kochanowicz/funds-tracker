import { tokensStub } from 'auth/tests/stubs/tokens.stub';

export const AuthService = jest.fn().mockReturnValue({
  signupLocal: jest.fn().mockResolvedValue(tokensStub()),
  signinLocal: jest.fn().mockResolvedValue(tokensStub()),
  logout: jest.fn(),
  refreshToken: jest.fn().mockResolvedValue(tokensStub()),
});
