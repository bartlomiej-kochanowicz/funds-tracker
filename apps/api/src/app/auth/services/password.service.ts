import { ForbiddenException, Injectable } from "@nestjs/common";
import * as crypto from "crypto";
import { PrismaService } from "@services/prisma/prisma.service";
import * as bcrypt from "bcrypt";
import { RedisService } from "@liaoliaots/nestjs-redis";
import Redis from "ioredis";
import { ttl24h } from "@constants/redis";
import { ConfigService } from "@nestjs/config";
import { AuthService } from "../auth.service";
import { ResetPassword, SetNewPassword } from "../entities";
import { ResetPasswordInput, SetNewPasswordInput } from "../inputs";

@Injectable()
export class PasswordService {
	private readonly redis: Redis | null;

	constructor(
		private authService: AuthService,
		private prisma: PrismaService,
		private readonly configService: ConfigService,
		private readonly redisService: RedisService,
	) {
		this.redis = this.redisService.getOrThrow();
	}

	async resetPassword(resetPasswordInput: ResetPasswordInput): Promise<ResetPassword> {
		const { email, token } = resetPasswordInput;

		const isHuman = await this.authService.validateHuman(token);

		if (!isHuman) {
			throw new ForbiddenException("You are a robot!");
		}

		const resetPasswordToken = crypto.randomBytes(32).toString("hex");

		const { uuid, name } = await this.prisma.user.findUniqueOrThrow({
			where: { email },
		});

		this.redis.set(resetPasswordToken, uuid, "EX", ttl24h);

		const resetPasswordLink = `${this.configService.get<string>(
			"WEBAPP_URL",
		)}/reset-password?token=${resetPasswordToken}`;

		await this.authService.sendEmailWithResetPasswordLink(email, name, resetPasswordLink);

		return {
			success: true,
		};
	}

	async setNewPassword(setNewPasswordInput: SetNewPasswordInput): Promise<SetNewPassword> {
		const { resetToken, token, password: newPassword } = setNewPasswordInput;

		const isHuman = await this.authService.validateHuman(token);

		if (!isHuman) {
			throw new ForbiddenException("You are a robot!");
		}
		const uuid = await this.redis.get(resetToken);

		if (!uuid) {
			throw new ForbiddenException("Invalid or expired token.");
		}

		const { password: currentPassword } = await this.prisma.user.findUnique({
			where: {
				uuid,
			},
		});

		const isPasswordsMatches = await bcrypt.compare(newPassword, currentPassword);

		if (isPasswordsMatches)
			throw new ForbiddenException("The new password must be different from the previous one.");

		await this.redis.del(resetToken);

		await this.prisma.user.update({
			where: {
				uuid,
			},
			data: {
				password: await this.authService.hashData(newPassword),
			},
		});

		return {
			success: true,
		};
	}
}
