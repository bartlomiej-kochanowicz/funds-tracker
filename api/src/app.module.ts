import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DB_URL } from 'config/database';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [MongooseModule.forRoot(DB_URL)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
