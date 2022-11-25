import { Test, TestingModule } from '@nestjs/testing';
import { AbcdResolver } from './abcd.resolver';
import { AbcdService } from './abcd.service';

describe('AbcdResolver', () => {
  let resolver: AbcdResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AbcdResolver, AbcdService],
    }).compile();

    resolver = module.get<AbcdResolver>(AbcdResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
