import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GetCurrentUser, GetCurrentUserId, Public } from 'common/decorators';
import { RtGuard } from 'common/guards';
import { Response } from 'express';
import { AuthService } from './auth.service';
import {
  ConfirmSignup,
  Email,
  Logout,
  Refresh,
  ResetPassword,
  SigninLocal,
  SignupLocal,
} from './entities';
import { SendCode } from './entities/send-code.entity';
import {
  ConfirmSignupInput,
  EmailInput,
  ResetPasswordInput,
  SendCodeInput,
  SigninInput,
  SignupInput,
} from './inputs';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Public()
  @Mutation(() => SignupLocal)
  signupLocal(
    @Args('data')
    signupInput: SignupInput,
  ) {
    return this.authService.signupLocal(signupInput);
  }

  @Public()
  @Mutation(() => SendCode)
  sendCode(
    @Args('data')
    sendCodeInput: SendCodeInput,
  ) {
    return this.authService.sendCode(sendCodeInput);
  }

  @Public()
  @Mutation(() => ConfirmSignup)
  confirmSignup(
    @Args('data')
    confirmSignupInput: ConfirmSignupInput,
    @Context('res') res: Response,
  ) {
    return this.authService.confirmSignup(confirmSignupInput, res);
  }

  @Public()
  @Mutation(() => SigninLocal)
  signinLocal(
    @Args('data')
    signinInput: SigninInput,
    @Context('res') res: Response,
  ) {
    return this.authService.signinLocal(signinInput, res);
  }

  @Public()
  @Query(() => Email)
  emailExist(
    @Args('data')
    emailInput: EmailInput,
  ): Promise<Email> {
    return this.authService.checkEmail(emailInput);
  }

  @Mutation(() => Logout)
  logout(@GetCurrentUserId() userId: string, @Context('res') res: Response): Promise<Logout> {
    return this.authService.logout(userId, res);
  }

  @Public()
  @UseGuards(RtGuard)
  @Mutation(() => Refresh)
  refreshToken(
    @GetCurrentUserId() userId: string,
    @GetCurrentUser('refreshToken') refreshToken: string,
    @Context('res') res: Response,
  ): Promise<Refresh> {
    return this.authService.refreshToken(userId, refreshToken, res);
  }

  @Public()
  @Mutation(() => ResetPassword)
  resetPassword(
    @Args('data')
    resetPasswordInput: ResetPasswordInput,
  ) {
    return this.authService.resetPassword(resetPasswordInput);
  }
}
