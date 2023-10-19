import { IS_DEVELOPMENT } from "@app/common/config/env";
import { COOKIE_NAMES, EXPIRES } from "@app/common/constants/cookies";
import { ForbiddenException, Injectable } from "@nestjs/common";
import { Response } from "express";
import bcrypt from "bcrypt";
import { PrismaService } from "@app/prisma/prisma.service";
import { Email, SigninLocal } from "../entities";
import { EmailInput, SigninInput } from "../inputs";
import { AuthService } from "../auth.service";

@Injectable()
export class SigninService {
	constructor(
		private prisma: PrismaService,
		private authService: AuthService,
	) {}

	async signinLocal(signinInput: SigninInput, res: Response): Promise<SigninLocal> {
		const { email, password, token } = signinInput;

		const isHuman = await this.authService.validateHuman(token);

		if (!isHuman) {
			throw new ForbiddenException("You are a robot!");
		}

		const user = await this.prisma.user.findUnique({ where: { email } });

		if (!user) throw new ForbiddenException("Wrong credencials provided.");

		const isPasswordsMatches = await bcrypt.compare(password, user.password);

		if (!isPasswordsMatches) throw new ForbiddenException("Wrong password.");

		if (user.confirmationCodeHash) {
			throw new ForbiddenException("User not confirmed.");
		}

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

	async signinLocalForTests(
		email: string,
		sessionName: string,
	): Promise<{ accessToken: string; refreshToken: string }> {
		const user = await this.prisma.user.findUnique({ where: { email } });

		const { accessToken, refreshToken } = await this.authService.getTokens(user.uuid, user.email);

		await this.authService.addSession(user.uuid, refreshToken, sessionName);

		return {
			accessToken,
			refreshToken,
		};
	}

	async checkEmail(emailInput: EmailInput): Promise<Email> {
		const { email, token } = emailInput;

		const isHuman = await this.authService.validateHuman(token);

		if (!isHuman) {
			throw new ForbiddenException("You are a robot!");
		}

		const user = await this.prisma.user.findUnique({ where: { email } });

		return {
			exist: Boolean(user),
		};
	}
}
