import { UseGuards } from "@nestjs/common";
import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { GetCurrentUserId } from "@decorators/get-current-user-id.decorator";
import { GetCurrentUser } from "@decorators/get-current-user.decorator";
import { Public } from "@decorators/public.decorator";
import { RtGuard } from "@guards/rt.guard";
import { Response } from "express";
import {
	RegisterConfirm,
	Email,
	Logout,
	Refresh,
	ResetPassword,
	SetNewPassword,
	LoginLocal,
	RegisterLocal,
} from "./entities";
import { SendCode } from "./entities/send-code.entity";
import {
	RegisterConfirmInput,
	EmailInput,
	ResetPasswordInput,
	SendCodeInput,
	SetNewPasswordInput,
	LoginInput,
	RegisterInput,
} from "./inputs";
import { RegisterService } from "./services/register.service";
import { LoginService } from "./services/login.service";
import { LogoutService } from "./services/logout.service";
import { PasswordService } from "./services/password.service";
import { TokenService } from "./services/token.service";

@Resolver()
export class AuthResolver {
	constructor(
		private registerService: RegisterService,
		private loginService: LoginService,
		private logoutService: LogoutService,
		private passwordService: PasswordService,
		private tokenService: TokenService,
	) {}

	@Public()
	@Mutation(() => RegisterLocal)
	registerLocal(
		@Args("data")
		registerInput: RegisterInput,
	) {
		return this.registerService.registerLocal(registerInput);
	}

	@Public()
	@Mutation(() => RegisterConfirm)
	registerConfirm(
		@Args("data")
		registerConfirmInput: RegisterConfirmInput,
		@Context("res") res: Response,
	) {
		return this.registerService.confirmRegister(registerConfirmInput, res);
	}

	@Public()
	@Mutation(() => SendCode)
	sendCode(
		@Args("data")
		sendCodeInput: SendCodeInput,
	) {
		return this.registerService.sendCode(sendCodeInput);
	}

	@Public()
	@Mutation(() => LoginLocal)
	loginLocal(
		@Args("data")
		loginInput: LoginInput,
		@Context("res") res: Response,
	) {
		return this.loginService.loginLocal(loginInput, res);
	}

	@Public()
	@Query(() => Email)
	emailExist(
		@Args("data")
		emailInput: EmailInput,
	): Promise<Email> {
		return this.loginService.checkEmail(emailInput);
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
