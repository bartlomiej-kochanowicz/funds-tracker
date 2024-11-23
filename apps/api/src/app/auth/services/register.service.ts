import { IS_DEVELOPMENT, IS_TEST } from "@config/env";
import { COOKIE_NAMES, EXPIRES } from "@constants/cookies";
import { PrismaService } from "@services/prisma/prisma.service";
import { ForbiddenException, Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { Response } from "express";
import { AuthService } from "../auth.service";
import { RegisterConfirm, SendCode, RegisterLocal } from "../entities";
import { RegisterConfirmInput, SendCodeInput, RegisterInput } from "../inputs";

@Injectable()
export class RegisterService {
	constructor(
		private prisma: PrismaService,
		private authService: AuthService,
	) {}

	async registerLocal(registerInput: RegisterInput): Promise<RegisterLocal> {
		const { email, password, name, token } = registerInput;

		const isHuman = await this.authService.validateHuman(token);

		if (!isHuman) {
			throw new ForbiddenException("api.you-are-a-robot");
		}

		const hashedPwd = await this.authService.hashData(password);

		const existedUser = await this.prisma.user.findUnique({ where: { email } });

		if (existedUser) {
			throw new ForbiddenException("api.email-already-in-use");
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

	async confirmRegister(
		confirmRegisterInput: RegisterConfirmInput,
		res: Response,
	): Promise<RegisterConfirm> {
		const { code, email, token } = confirmRegisterInput;

		const isHuman = await this.authService.validateHuman(token);

		if (!isHuman) {
			throw new ForbiddenException("api.you-are-a-robot");
		}

		const user = await this.prisma.user.findUnique({ where: { email } });

		if (!user) {
			throw new ForbiddenException("api.user-not-found");
		}

		if (!user.confirmationCodeHash) {
			throw new ForbiddenException("api.email-already-confirmed");
		}

		// allways pass for tests enviroment
		const isCodesMatches = IS_TEST || (await bcrypt.compare(code, user.confirmationCodeHash));

		if (!isCodesMatches) {
			throw new ForbiddenException("api.wrong-registration-confirm-code");
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
			throw new ForbiddenException("api.you-are-a-robot");
		}

		const user = await this.prisma.user.findUnique({ where: { email } });

		if (!user) {
			throw new ForbiddenException("api.user-not-found");
		}

		if (!user.confirmationCodeHash) {
			throw new ForbiddenException("api.email-already-confirmed");
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
