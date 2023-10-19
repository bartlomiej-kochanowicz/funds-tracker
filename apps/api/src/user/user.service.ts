import { Injectable } from "@nestjs/common";
import { IntroductionStep } from "@prisma/client";
import { PrismaService } from "@app/prisma/prisma.service";
import { User } from "./entities";
import { UpdateUserInput } from "./inputs";

@Injectable()
export class UserService {
	constructor(private prisma: PrismaService) {}

	async getUser(userId: string): Promise<User> {
		const user = await this.prisma.user.findUnique({
			where: { uuid: userId },
		});

		return user;
	}

	async updateUser(userId: string, updateUserInput: UpdateUserInput): Promise<User> {
		const user = await this.prisma.user.update({
			where: { uuid: userId },
			data: updateUserInput,
		});

		// If the user has just set their default currency in introductiopn step, we need to update his introduction step
		if (
			updateUserInput.defaultCurrency &&
			user.introductionStep === IntroductionStep.DefaultCurrency
		) {
			const updatedUser = await this.prisma.user.update({
				where: { uuid: userId },
				data: { introductionStep: IntroductionStep.CashAccounts },
			});

			return updatedUser;
		}

		return user;
	}
}
