import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { HttpModule } from '@nestjs/axios';
import { SendGridModule } from '@app/send-grid/send-grid.module';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { AtStrategy, RtStrategy } from './strategies';

@Module({
  imports: [JwtModule.register({}), HttpModule, SendGridModule],
  providers: [AuthResolver, AuthService, AtStrategy, RtStrategy],
})
export class AuthModule {}
