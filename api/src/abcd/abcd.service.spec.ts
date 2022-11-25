import { Test, TestingModule } from '@nestjs/testing';
import { AbcdService } from './abcd.service';

describe('AbcdService', () => {
  let service: AbcdService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AbcdService],
    }).compile();

    service = module.get<AbcdService>(AbcdService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
