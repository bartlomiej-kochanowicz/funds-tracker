import { Test } from '@nestjs/testing';
import { AuthController } from 'auth/auth.controller';
import { AuthService } from 'auth/auth.service';
import { Tokens } from 'auth/types';
import { authStub } from './stubs/auth.stub';
import { tokensStub } from './stubs/tokens.stub';

jest.mock('auth/auth.service');

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [],
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    authController = moduleRef.get<AuthController>(AuthController);
    authService = moduleRef.get<AuthService>(AuthService);

    jest.clearAllMocks();
  });

  describe('signupLocal', () => {
    describe('when signupLocal is called', () => {
      let tokens: Tokens;

      beforeEach(async () => {
        tokens = await authController.signupLocal(authStub());
      });

      it('should call signupLocal service', () => {
        expect(authService.signupLocal).toBeCalledWith(authStub());
      });

      it('should return a tokens', () => {
        expect(tokens).toEqual(tokensStub());
      });
    });
  });

  describe('signinLocal', () => {
    describe('when signinLocal is called', () => {
      let tokens: Tokens;

      beforeEach(async () => {
        tokens = await authController.signinLocal(authStub());
      });

      it('should call signinLocal service', () => {
        expect(authService.signinLocal).toBeCalledWith(authStub());
      });

      it('should return a tokens', () => {
        expect(tokens).toEqual(tokensStub());
      });
    });
  });

  describe('logout', () => {
    describe('when logout is called', () => {
      const userId = 'c40ddade-02c0-448a-84b7-56de4da2ca70';

      beforeEach(async () => {
        await authController.logout(userId);
      });

      it('should call logout service', () => {
        expect(authService.logout).toBeCalledWith(userId);
      });
    });
  });

  describe('refreshToken', () => {
    describe('when refreshToken is called', () => {
      let tokens: Tokens;

      const refreshDto = {
        userId: 'c40ddade-02c0-448a-84b7-56de4da2ca70',
        refreshToken: 'refresh-token-mock',
      };

      beforeEach(async () => {
        tokens = await authController.refreshToken(
          refreshDto.userId,
          refreshDto.refreshToken,
        );
      });

      it('should call refreshToken service', () => {
        expect(authService.refreshToken).toBeCalledWith(
          refreshDto.userId,
          refreshDto.refreshToken,
        );
      });

      it('should return a tokens', () => {
        expect(tokens).toEqual(tokensStub());
      });
    });
  });
});
