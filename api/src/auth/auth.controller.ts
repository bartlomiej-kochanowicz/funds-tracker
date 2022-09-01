import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Res,
  Get,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { GetCurrentUser, GetCurrentUserId, Public } from 'common/decorators';
import { RtGuard } from 'common/guards';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { SigninDto, SignupDto, EmailDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('local/signup')
  @HttpCode(HttpStatus.CREATED)
  signupLocal(@Body() dto: SignupDto, @Res() res: Response): Promise<unknown> {
    return this.authService.signupLocal(dto, res);
  }

  @Public()
  @Post('local/signin')
  @HttpCode(HttpStatus.OK)
  signinLocal(@Body() dto: SigninDto, @Res() res: Response): Promise<unknown> {
    return this.authService.signinLocal(dto, res);
  }

  @Public()
  @Post('check-email')
  @HttpCode(HttpStatus.OK)
  checkEmailExist(@Body() dto: EmailDto): Promise<{ exist: boolean }> {
    return this.authService.checkEmail(dto);
  }

  @Get('account')
  @HttpCode(HttpStatus.OK)
  getAccount(
    @GetCurrentUserId() userId: string,
  ): Promise<Pick<User, 'email' | 'uuid' | 'createdAt'>> {
    return this.authService.getAccount(userId);
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
