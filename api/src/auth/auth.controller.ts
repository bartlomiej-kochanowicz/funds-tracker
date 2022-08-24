import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Res,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { GetCurrentUser, GetCurrentUserId, Public } from 'common/decorators';
import { RtGuard } from 'common/guards';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { AuthDto, EmailDto } from './dto';
import { Tokens } from './types/tokens.type';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('local/signup')
  @HttpCode(HttpStatus.CREATED)
  signupLocal(@Body() dto: AuthDto, @Res() res: Response): Promise<unknown> {
    return this.authService.signupLocal(dto, res);
  }

  @Public()
  @Post('local/signin')
  @HttpCode(HttpStatus.OK)
  signinLocal(
    @Body() dto: AuthDto,
    @Res() res: Response,
  ): Promise<Response<Pick<User, 'uuid' | 'email'>>> {
    return this.authService.signinLocal(dto, res);
  }

  @Public()
  @Post('local/signin/email')
  @HttpCode(HttpStatus.OK)
  checkEmailExist(@Body() dto: EmailDto): Promise<void> {
    return this.authService.checkEmailExist(dto);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(
    @GetCurrentUserId() userId: string,
    @Res() res: Response,
  ): Promise<unknown> {
    return this.authService.logout(userId, res);
  }

  @Public()
  @UseGuards(RtGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refreshToken(
    @GetCurrentUserId() userId: string,
    @GetCurrentUser('refreshToken') refreshToken: string,
    @Res() res: Response,
  ): Promise<unknown> {
    return this.authService.refreshToken(userId, refreshToken, res);
  }
}
