export const AuthService = jest.fn().mockReturnValue({
  signupLocal: jest.fn(),
  signinLocal: jest.fn(),
  logout: jest.fn(),
  refreshToken: jest.fn(),
});
