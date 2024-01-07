import { PrismaService } from "@app/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { Response } from "express";
import * as bcrypt from "bcrypt";
import { COOKIE_NAMES } from "@app/common/constants/cookies";
import { IS_DEVELOPMENT } from "@app/common/config/env";
import { Logout } from "../entities";

@Injectable()
export class LogoutService {
	constructor(private prisma: PrismaService) {}

	async logout(userId: string, res: Response): Promise<Logout> {
		try {
			const userSessions = await this.prisma.session.findMany({
				where: { userUuid: userId },
			});

			const session = userSessions.find(
				async ({ rtHash }) => await bcrypt.compare(res.req.cookies.refreshToken, rtHash),
			);

			await this.prisma.session.deleteMany({
				where: { rtHash: session.rtHash },
			});

			res.clearCookie(COOKIE_NAMES.ACCESS_TOKEN, {
				secure: !IS_DEVELOPMENT,
				httpOnly: true,
			});

			res.clearCookie(COOKIE_NAMES.REFRESH_TOKEN, {
				secure: !IS_DEVELOPMENT,
				httpOnly: true,
			});

			res.clearCookie(COOKIE_NAMES.IS_LOGGED_IN);

			return {
				success: true,
			};
		} catch {
			return {
				success: false,
			};
		}
	}
}
