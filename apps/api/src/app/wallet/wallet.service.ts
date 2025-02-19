import { Injectable } from "@nestjs/common";
import { CreateWalletInput } from "./dto/create-wallet.input";
import { UpdateWalletInput } from "./dto/update-wallet.input";
import { Wallet } from "./entities/wallet.entity";
import { PrismaService } from "@src/services/prisma/prisma.service";
import { SUBSCRIPTION } from "@src/constants/subscription";

@Injectable()
export class WalletService {
	constructor(private prisma: PrismaService) {}

	async create(userId: string, createWalletInput: CreateWalletInput): Promise<Wallet> {
		const user = await this.prisma.user.findUnique({
			where: {
				uuid: userId,
			},
			select: {
				subscription: true,
			},
		});

		const userWallets = await this.prisma.wallet.count({
			where: {
				userUuid: userId,
			},
		});

		if (userWallets + 1 > SUBSCRIPTION[user.subscription].maxWallets) {
			throw new Error(
				`You can't have more than ${SUBSCRIPTION[user.subscription].maxWallets} wallets`,
			); //TODO: translation
		}

		const wallet = await this.prisma.wallet.create({
			data: {
				...createWalletInput,
				user: {
					connect: {
						uuid: userId,
					},
				},
			},
		});

		return wallet;
	}

	async findAll(userId: string): Promise<Wallet[]> {
		const wallets = await this.prisma.wallet.findMany({
			where: {
				user: {
					uuid: userId,
				},
			},
		});

		return wallets;
	}

	async findOne(userId: string, uuid: string): Promise<Wallet> {
		const wallet = await this.prisma.wallet.findUnique({
			where: {
				uuid,
				userUuid: userId,
			},
		});

		if (!wallet) {
			throw new Error("Wallet not found"); //TODO: translation
		}

		return wallet;
	}

	async update(
		userId: string,
		uuid: string,
		updateWalletInput: UpdateWalletInput,
	): Promise<Wallet> {
		const wallet = await this.prisma.wallet
			.update({
				where: {
					uuid,
					userUuid: userId,
				},
				data: updateWalletInput,
			})
			.catch(error => {
				if (error.code === "P2025") throw new Error("Wallet not found");

				throw error;
			});

		return wallet;
	}

	async remove(userId: string, uuid: string) {
		await this.prisma.wallet.delete({
			where: {
				uuid,
				userUuid: userId,
			},
		});

		return {
			success: true,
		};
	}
}
