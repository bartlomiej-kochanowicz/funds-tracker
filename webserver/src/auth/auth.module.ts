import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { HttpModule } from '@nestjs/axios';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { AtStrategy, RtStrategy } from './strategies';

@Module({
  imports: [JwtModule.register({}), HttpModule],
  providers: [AuthResolver, AuthService, AtStrategy, RtStrategy],
})
export class AuthModule {}
