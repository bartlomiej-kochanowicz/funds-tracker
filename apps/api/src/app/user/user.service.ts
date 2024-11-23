import { Injectable } from "@nestjs/common";
import { PrismaService } from "@services/prisma/prisma.service";
import { User } from "./entities";
import { UpdateUserInput } from "./inputs";

@Injectable()
export class UserService {
	constructor(private prisma: PrismaService) {}

	async getUser(userId: string): Promise<User> {
		const user = await this.prisma.user.findUnique({
			where: { uuid: userId },
		});

		if (!user) {
			throw new Error("User not found");
		}

		return user;
	}

	async updateUser(userId: string, updateUserInput: UpdateUserInput): Promise<User> {
		const user = await this.prisma.user.update({
			where: { uuid: userId },
			data: updateUserInput,
		});

		return user;
	}
}
