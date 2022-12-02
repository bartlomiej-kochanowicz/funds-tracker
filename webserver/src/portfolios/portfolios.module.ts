import { Module } from '@nestjs/common';
import { PortfoliosService } from './portfolios.service';
import { PortfoliosResolver } from './portfolios.resolver';

@Module({
  providers: [PortfoliosResolver, PortfoliosService],
})
export class PortfoliosModule {}
