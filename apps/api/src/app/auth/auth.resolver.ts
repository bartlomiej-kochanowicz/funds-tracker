import { UseGuards } from "@nestjs/common";
import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { GetCurrentUserId } from "@decorators/get-current-user-id.decorator";
import { GetCurrentUser } from "@decorators/get-current-user.decorator";
import { Public } from "@decorators/public.decorator";
import { RtGuard } from "@guards/rt.guard";
import { Response } from "express";
import {
	ConfirmSignup,
	Email,
	Logout,
	Refresh,
	ResetPassword,
	SetNewPassword,
	SigninLocal,
	SignupLocal,
} from "./entities";
import { SendCode } from "./entities/send-code.entity";
import {
	ConfirmSignupInput,
	EmailInput,
	ResetPasswordInput,
	SendCodeInput,
	SetNewPasswordInput,
	SigninInput,
	SignupInput,
} from "./inputs";
import { SignupService } from "./services/sign-up.service";
import { SigninService } from "./services/sign-in.service";
import { LogoutService } from "./services/logout.service";
import { PasswordService } from "./services/password.service";
import { TokenService } from "./services/token.service";

@Resolver()
export class AuthResolver {
	constructor(
		private signupService: SignupService,
		private signinService: SigninService,
		private logoutService: LogoutService,
		private passwordService: PasswordService,
		private tokenService: TokenService,
	) {}

	@Public()
	@Mutation(() => SignupLocal)
	signupLocal(
		@Args("data")
		signupInput: SignupInput,
	) {
		return this.signupService.signupLocal(signupInput);
	}

	@Public()
	@Mutation(() => ConfirmSignup)
	confirmSignup(
		@Args("data")
		confirmSignupInput: ConfirmSignupInput,
		@Context("res") res: Response,
	) {
		return this.signupService.confirmSignup(confirmSignupInput, res);
	}

	@Public()
	@Mutation(() => SendCode)
	sendCode(
		@Args("data")
		sendCodeInput: SendCodeInput,
	) {
		return this.signupService.sendCode(sendCodeInput);
	}

	@Public()
	@Mutation(() => SigninLocal)
	signinLocal(
		@Args("data")
		signinInput: SigninInput,
		@Context("res") res: Response,
	) {
		return this.signinService.signinLocal(signinInput, res);
	}

	@Public()
	@Query(() => Email)
	emailExist(
		@Args("data")
		emailInput: EmailInput,
	): Promise<Email> {
		return this.signinService.checkEmail(emailInput);
	}

	@Mutation(() => Logout)
	logout(@GetCurrentUserId() userId: string, @Context("res") res: Response): Promise<Logout> {
		return this.logoutService.logout(userId, res);
	}

	@Public()
	@Mutation(() => ResetPassword)
	resetPassword(
		@Args("data")
		resetPasswordInput: ResetPasswordInput,
	) {
		return this.passwordService.resetPassword(resetPasswordInput);
	}

	@Public()
	@Mutation(() => SetNewPassword)
	setNewPassword(
		@Args("data")
		setNewPasswordInput: SetNewPasswordInput,
	) {
		return this.passwordService.setNewPassword(setNewPasswordInput);
	}

	@Public()
	@UseGuards(RtGuard)
	@Mutation(() => Refresh)
	refreshToken(
		@GetCurrentUserId() userId: string,
		@GetCurrentUser("refreshToken") refreshToken: string,
		@Context("res") res: Response,
	): Promise<Refresh> {
		return this.tokenService.refreshToken(userId, refreshToken, res);
	}
}
