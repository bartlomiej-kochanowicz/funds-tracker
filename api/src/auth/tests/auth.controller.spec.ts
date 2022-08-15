import { Test } from '@nestjs/testing';
import { AuthController } from 'auth/auth.controller';
import { AuthService } from 'auth/auth.service';

describe('AuthConroller', () => {
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [],
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();
  });
});
