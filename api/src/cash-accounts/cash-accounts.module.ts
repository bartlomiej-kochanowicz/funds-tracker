import { Module } from '@nestjs/common';
import { CashAccountsService } from './cash-accounts.service';
import { CashAccountsController } from './cash-accounts.controller';

@Module({
  controllers: [CashAccountsController],
  providers: [CashAccountsService]
})
export class CashAccountsModule {}
