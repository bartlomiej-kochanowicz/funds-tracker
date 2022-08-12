import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DB_URL } from 'config/database';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [MongooseModule.forRoot(DB_URL), UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
