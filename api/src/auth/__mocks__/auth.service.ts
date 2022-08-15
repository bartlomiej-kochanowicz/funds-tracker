export const AuthService = jest.fn().mockReturnValue({
  signupLocal: jest.fn().mockRr,
  signinLocal: null,
  logout: null,
  refreshToken: null,
});
