import { Module } from '@nestjs/common';
import { CurrenciesService } from './currencies.service';
import { CurrenciesResolver } from './currencies.resolver';

@Module({
  providers: [CurrenciesResolver, CurrenciesService],
})
export class CurrenciesModule {}
