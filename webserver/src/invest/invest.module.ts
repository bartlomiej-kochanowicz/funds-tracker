import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { InvestService } from './invest.service';
import { InvestResolver } from './invest.resolver';

@Module({ imports: [HttpModule], providers: [InvestResolver, InvestService] })
export class InvestModule {}
