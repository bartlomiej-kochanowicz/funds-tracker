import { Module } from '@nestjs/common';
import { CashAccountsService } from './cash-accounts.service';
import { CashAccountsResolver } from './cash-accounts.resolver';

@Module({
  providers: [CashAccountsResolver, CashAccountsService],
})
export class CashAccountsModule {}
