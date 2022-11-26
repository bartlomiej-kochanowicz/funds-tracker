import {
  Args,
  Context,
  GraphQLExecutionContext,
  Mutation,
  Resolver,
} from '@nestjs/graphql';
import { GetCurrentUser, GetCurrentUserId, Public } from 'common/decorators';
import { RtGuard } from 'common/guards';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { User } from './entities';
import { SigninInput, SignupInput } from './inputs';

@Resolver(() => User)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Public()
  @Mutation(() => User)
  signupLocal(
    @Args('data')
    signupInput: SignupInput,
    @Context('res') res: Response,
  ): Promise<User> {
    return this.authService.signupLocal(signupInput, res);
  }

  /*   @Public()
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
  } */
}
