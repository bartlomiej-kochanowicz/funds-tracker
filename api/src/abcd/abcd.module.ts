import { Module } from '@nestjs/common';
import { AbcdService } from './abcd.service';
import { AbcdResolver } from './abcd.resolver';

@Module({
  providers: [AbcdResolver, AbcdService]
})
export class AbcdModule {}
