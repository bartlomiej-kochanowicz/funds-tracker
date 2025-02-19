import { Injectable } from "@nestjs/common";
import { CreateWalletInput } from "./dto/create-wallet.input";
import { UpdateWalletInput } from "./dto/update-wallet.input";
import { Wallet } from "./entities/wallet.entity";
import { PrismaService } from "@src/services/prisma/prisma.service";

@Injectable()
export class WalletService {
	constructor(private prisma: PrismaService) {}

	async create(userId: string, createWalletInput: CreateWalletInput): Promise<Wallet> {
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
		const wallet = await this.prisma.wallet.findUniqueOrThrow({
			where: {
				uuid,
				userUuid: userId,
			},
		});

		return wallet;
	}

	async update(userId: string, updateWalletInput: UpdateWalletInput): Promise<Wallet> {
		const wallet = await this.prisma.wallet.update({
			where: {
				uuid: updateWalletInput.uuid,
				userUuid: userId,
			},
			data: updateWalletInput,
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
