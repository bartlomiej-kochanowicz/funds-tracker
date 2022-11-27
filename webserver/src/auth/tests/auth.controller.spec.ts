import { Test } from '@nestjs/testing';
import { AuthController } from 'auth/auth.controller';
import { AuthService } from 'auth/auth.service';
import { createMock } from '@golevelup/ts-jest';
import { Response } from 'express';
import { signupStub, signinStub } from './stubs/auth.stub';

const mockResponseObject = () =>
  createMock<Response>({
    json: jest.fn().mockReturnThis(),
    status: jest.fn().mockReturnThis(),
  });

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
      const res = mockResponseObject();

      beforeEach(async () => {
        await authController.signupLocal(signupStub(), res);
      });

      it('should call signupLocal service', () => {
        expect(authService.signupLocal).toBeCalledWith(signupStub(), res);
      });
    });
  });

  describe('signinLocal', () => {
    describe('when signinLocal is called', () => {
      const res = mockResponseObject();

      beforeEach(async () => {
        await authController.signinLocal(signinStub(), res);
      });

      it('should call signinLocal service', () => {
        expect(authService.signinLocal).toBeCalledWith(signinStub(), res);
      });
    });
  });

  describe('logout', () => {
    describe('when logout is called', () => {
      const userId = 'c40ddade-02c0-448a-84b7-56de4da2ca70';

      const res = mockResponseObject();

      beforeEach(async () => {
        await authController.logout(userId, res);
      });

      it('should call logout service', () => {
        expect(authService.logout).toBeCalledWith(userId, res);
      });
    });
  });

  describe('refreshToken', () => {
    describe('when refreshToken is called', () => {
      const refreshDto = {
        userId: 'c40ddade-02c0-448a-84b7-56de4da2ca70',
        refreshToken: 'refresh-token-mock',
      };

      const res = mockResponseObject();

      beforeEach(async () => {
        await authController.refreshToken(
          refreshDto.userId,
          refreshDto.refreshToken,
          res,
        );
      });

      it('should call refreshToken service', () => {
        expect(authService.refreshToken).toBeCalledWith(
          refreshDto.userId,
          refreshDto.refreshToken,
          res,
        );
      });
    });
  });
});
