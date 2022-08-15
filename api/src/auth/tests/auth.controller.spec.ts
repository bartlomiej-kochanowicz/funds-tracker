import { Test } from '@nestjs/testing';
import { AuthController } from 'auth/auth.controller';
import { AuthService } from 'auth/auth.service';
import { Tokens } from 'auth/types';
import { authStub } from './stubs/auth.stub';

jest.mock('auth/auth.service');

describe('AuthConroller', () => {
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
      let authDto: Tokens;

      beforeEach(async () => {
        authDto = await authController.signupLocal(authStub());
      });

      it('should call signupLocal service', () => {
        expect(authService.signupLocal).toBeCalledWith(authStub());
      });
    });
  });
});
