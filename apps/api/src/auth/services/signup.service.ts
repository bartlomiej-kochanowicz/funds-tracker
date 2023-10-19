import { IS_DEVELOPMENT, IS_TEST } from "@common/config/env";
import { COOKIE_NAMES, EXPIRES } from "@common/constants/cookies";
import { PrismaService } from "@app/prisma/prisma.service";
import { ForbiddenException, Injectable } from "@nestjs/common";
import bcrypt from "bcrypt";
import { Response } from "express";
import { AuthService } from "../auth.service";
import { ConfirmSignup, SendCode, SignupLocal } from "../entities";
import { ConfirmSignupInput, SendCodeInput, SignupInput } from "../inputs";

@Injectable()
export class SignupService {
	constructor(
		private prisma: PrismaService,
		private authService: AuthService,
	) {}

	async signupLocal(signupInput: SignupInput): Promise<SignupLocal> {
		const { email, password, name, token } = signupInput;

		const isHuman = await this.authService.validateHuman(token);

		if (!isHuman) {
			throw new ForbiddenException("You are a robot!");
		}

		const hashedPwd = await this.authService.hashData(password);

		const existedUser = await this.prisma.user.findUnique({ where: { email } });

		if (existedUser) {
			throw new ForbiddenException("Email already in use.");
		}

		const confirmationCode = this.authService.generateConfirmationCode();

		const hashedConfirmationCode = await this.authService.hashData(confirmationCode);

		const { uuid } = await this.prisma.user.create({
			data: {
				email,
				name,
				password: hashedPwd,
				confirmationCodeHash: hashedConfirmationCode,
			},
		});

		if (!IS_TEST) {
			await this.authService.sendEmailWithConfirmCode(email, uuid, confirmationCode);
		}

		return {
			success: true,
		};
	}

	async confirmSignup(
		confirmSignupInput: ConfirmSignupInput,
		res: Response,
	): Promise<ConfirmSignup> {
		const { code, email, token } = confirmSignupInput;

		const isHuman = await this.authService.validateHuman(token);

		if (!isHuman) {
			throw new ForbiddenException("You are a robot!");
		}

		const user = await this.prisma.user.findUnique({ where: { email } });

		if (!user) {
			throw new ForbiddenException("User not found.");
		}

		if (!user.confirmationCodeHash) {
			throw new ForbiddenException("User already confirmed.");
		}

		// allways pass for tests enviroment
		const isPasswordsMatches = IS_TEST || (await bcrypt.compare(code, user.confirmationCodeHash));

		if (!isPasswordsMatches) {
			throw new ForbiddenException("Wrong confirmation code.");
		}

		await this.prisma.user.update({
			where: { uuid: user.uuid },
			data: { confirmationCodeHash: null },
		});

		const { accessToken, refreshToken } = await this.authService.getTokens(user.uuid, user.email);

		await this.authService.addSession(
			user.uuid,
			refreshToken,
			this.authService.genereteIpName(res),
		);

		res.cookie(COOKIE_NAMES.ACCESS_TOKEN, accessToken, {
			maxAge: EXPIRES["15MIN"],
			secure: !IS_DEVELOPMENT,
			httpOnly: true,
		});

		res.cookie(COOKIE_NAMES.REFRESH_TOKEN, refreshToken, {
			maxAge: EXPIRES["15DAYS"],
			secure: !IS_DEVELOPMENT,
			httpOnly: true,
		});

		res.cookie(COOKIE_NAMES.IS_LOGGED_IN, true, {
			maxAge: EXPIRES["15DAYS"],
		});

		return {
			success: true,
		};
	}

	async sendCode(sendCode: SendCodeInput): Promise<SendCode> {
		const { email, token } = sendCode;

		const isHuman = await this.authService.validateHuman(token);

		if (!isHuman) {
			throw new ForbiddenException("You are a robot!");
		}

		const user = await this.prisma.user.findUnique({ where: { email } });

		if (!user) {
			throw new ForbiddenException("User not found.");
		}

		if (!user.confirmationCodeHash) {
			throw new ForbiddenException("User already confirmed.");
		}

		const confirmationCode = this.authService.generateConfirmationCode();

		const hashedConfirmationCode = await this.authService.hashData(confirmationCode);

		await this.prisma.user.update({
			where: { uuid: user.uuid },
			data: { confirmationCodeHash: hashedConfirmationCode },
		});

		if (!IS_TEST) {
			await this.authService.sendEmailWithConfirmCode(email, user.uuid, confirmationCode);
		}

		return {
			success: true,
		};
	}
}
