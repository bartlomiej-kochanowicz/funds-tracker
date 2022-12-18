import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GetCurrentUser, GetCurrentUserId, Public } from 'common/decorators';
import { RtGuard } from 'common/guards';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { Email, Logout, Refresh, User } from './entities';
import { EmailInput, SigninInput, SignupInput } from './inputs';

@Resolver(() => User)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Public()
  @Mutation(() => User)
  signupLocal(
    @Args('data')
    signupInput: SignupInput,
    @Context('res') res: Response,
  ): Promise<Omit<User, 'sessions'>> {
    return this.authService.signupLocal(signupInput, res);
  }

  @Public()
  @Mutation(() => User)
  signinLocal(
    @Args('data')
    signinInput: SigninInput,
    @Context('res') res: Response,
  ): Promise<Omit<User, 'sesions'>> {
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

  @Query(() => User)
  user(@GetCurrentUserId() userId: string): Promise<User> {
    return this.authService.getAccount(userId);
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
}
