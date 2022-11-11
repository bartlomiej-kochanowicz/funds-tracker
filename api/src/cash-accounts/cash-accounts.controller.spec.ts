import { Test, TestingModule } from '@nestjs/testing';
import { CashAccountsController } from './cash-accounts.controller';
import { CashAccountsService } from './cash-accounts.service';

describe('CashAccountsController', () => {
  let controller: CashAccountsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CashAccountsController],
      providers: [CashAccountsService],
    }).compile();

    controller = module.get<CashAccountsController>(CashAccountsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
