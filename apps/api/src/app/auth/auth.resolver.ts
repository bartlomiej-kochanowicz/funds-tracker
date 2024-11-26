import { UseGuards } from "@nestjs/common";
import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { GetCurrentUserId } from "@decorators/get-current-user-id.decorator";
import { GetCurrentUser } from "@decorators/get-current-user.decorator";
import { Public } from "@decorators/public.decorator";
import { RtGuard } from "@guards/rt.guard";
import { Response } from "express";
import {
	ConfirmSignUp,
	Email,
	Logout,
	Refresh,
	ResetPassword,
	SetNewPassword,
	SignInLocal,
	SignUpLocal,
} from "./entities";
import { SendCode } from "./entities/send-code.entity";
import {
	ConfirmSignUpInput,
	EmailInput,
	ResetPasswordInput,
	SendCodeInput,
	SetNewPasswordInput,
	SignInInput,
	SignUpInput,
} from "./inputs";
import { SignUpService } from "./services/sign-up.service";
import { SignInService } from "./services/sign-in.service";
import { LogoutService } from "./services/logout.service";
import { PasswordService } from "./services/password.service";
import { TokenService } from "./services/token.service";

@Resolver()
export class AuthResolver {
	constructor(
		private signUpService: SignUpService,
		private signInService: SignInService,
		private logoutService: LogoutService,
		private passwordService: PasswordService,
		private tokenService: TokenService,
	) {}

	@Public()
	@Mutation(() => SignUpLocal)
	signUpLocal(
		@Args("data")
		signUpInput: SignUpInput,
	) {
		return this.signUpService.signUpLocal(signUpInput);
	}

	@Public()
	@Mutation(() => ConfirmSignUp)
	confirmSignUp(
		@Args("data")
		confirmSignUpInput: ConfirmSignUpInput,
		@Context("res") res: Response,
	) {
		return this.signUpService.confirmSignUp(confirmSignUpInput, res);
	}

	@Public()
	@Mutation(() => SendCode)
	sendCode(
		@Args("data")
		sendCodeInput: SendCodeInput,
	) {
		return this.signUpService.sendCode(sendCodeInput);
	}

	@Public()
	@Mutation(() => SignInLocal)
	signInLocal(
		@Args("data")
		signInInput: SignInInput,
		@Context("res") res: Response,
	) {
		return this.signInService.signInLocal(signInInput, res);
	}

	@Public()
	@Query(() => Email)
	emailExist(
		@Args("data")
		emailInput: EmailInput,
	): Promise<Email> {
		return this.signInService.checkEmail(emailInput);
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
