import { IS_DEVELOPMENT } from "@config/env";
import { COOKIE_NAMES, EXPIRES } from "@constants/cookies";
import { ForbiddenException, Injectable } from "@nestjs/common";
import { Response } from "express";
import * as bcrypt from "bcrypt";
import { PrismaService } from "@services/prisma/prisma.service";
import { Email, SignInLocal } from "../entities";
import { EmailInput, SignInInput } from "../inputs";
import { AuthService } from "../auth.service";

@Injectable()
export class SignInService {
	constructor(
		private prisma: PrismaService,
		private authService: AuthService,
	) {}

	async signInLocal(signInInput: SignInInput, res: Response): Promise<SignInLocal> {
		const { email, password, token } = signInInput;

		const isHuman = await this.authService.validateHuman(token);

		if (!isHuman) {
			throw new ForbiddenException("api.you-are-a-robot");
		}

		const user = await this.prisma.user.findUnique({ where: { email } });

		if (!user) throw new ForbiddenException("api.account-not-found");

		const isPasswordsMatches = await bcrypt.compare(password, user.password);

		if (!isPasswordsMatches) throw new ForbiddenException("api.wrong-password");

		if (user.confirmationCodeHash) {
			throw new ForbiddenException("api.account-not-confirmed");
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

	async signInLocalForTests(
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
			throw new ForbiddenException("api.you-are-a-robot");
		}

		const user = await this.prisma.user.findUnique({ where: { email } });

		return {
			exist: Boolean(user),
		};
	}
}
