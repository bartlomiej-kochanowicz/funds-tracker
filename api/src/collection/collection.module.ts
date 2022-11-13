import { Global, Module } from '@nestjs/common';
import { CollectionService } from './collection.service';

@Global()
@Module({
  providers: [CollectionService],
  exports: [CollectionService],
})
export class CollectionModule {}
