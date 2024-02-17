import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CashAccountOperationType, IntroductionStep } from "@prisma/client";
import { MAX_CASH_ACCOUNTS } from "@common/constants/common";
import { PrismaService } from "@app/prisma/prisma.service";
import {
	CashAccount,
	CashAccountDelete,
	CashAccountOperation,
	IntroductionCashAccounts,
} from "./entities";
import {
	CreateCashAccountInput,
	UpdateCashAccountInput,
	IntroductionCreateCashAccountsInput,
	CashAccountAddFundsInput,
} from "./inputs";

@Injectable()
export class CashAccountsService {
	constructor(private prisma: PrismaService) {}

	async create(
		userUuid: string,
		createCashAccountInput: CreateCashAccountInput,
	): Promise<Omit<CashAccount, "operations">> {
		const cashAccounts = await this.prisma.cashAccount.count({
			where: {
				userUuid,
			},
		});

		const { name, currency } = createCashAccountInput;

		if (cashAccounts >= MAX_CASH_ACCOUNTS) {
			throw new HttpException("Max accounts reached", HttpStatus.FORBIDDEN);
		}

		const cashAccount = await this.prisma.cashAccount.create({
			data: {
				userUuid,
				name,
				currency,
			},
		});

		return cashAccount;
	}

	async introductionCreateCashAccounts(
		userUuid: string,
		introductionCreateCashAccountInput: IntroductionCreateCashAccountsInput,
	): Promise<IntroductionCashAccounts> {
		const { introductionStep } = await this.prisma.user.findUnique({
			where: { uuid: userUuid },
			select: { introductionStep: true },
		});

		if (introductionStep !== IntroductionStep.CashAccounts) {
			throw new HttpException("Introduction step not valid", HttpStatus.FORBIDDEN);
		}

		await this.prisma.cashAccount.createMany({
			data: introductionCreateCashAccountInput.cashAccounts.map(cashAccount => ({
				userUuid,
				...cashAccount,
			})),
		});

		await this.prisma.user.update({
			where: { uuid: userUuid },
			data: {
				introductionStep: IntroductionStep.Portfolios,
			},
		});

		return {
			success: true,
		};
	}

	async findAll(userUuid: string): Promise<Omit<CashAccount, "operations">[]> {
		const cashAccounts = await this.prisma.cashAccount.findMany({
			where: {
				userUuid,
			},
		});

		return cashAccounts;
	}

	async findOne(userUuid: string, uuid: string): Promise<Omit<CashAccount, "operations">> {
		const cashAccount = await this.prisma.cashAccount.findUnique({
			where: {
				userUuid_uuid: {
					userUuid,
					uuid,
				},
			},
		});

		if (!cashAccount) {
			throw new HttpException("Account not found", HttpStatus.NOT_FOUND);
		}

		return cashAccount;
	}

	async findOperations(uuid: string, first: number, skip: number): Promise<CashAccountOperation[]> {
		const cashAccountOperations = await this.prisma.cashAccountOperation.findMany({
			where: {
				cashAccountUuid: uuid,
			},
			orderBy: { date: "asc" },
			take: first,
			skip,
		});

		if (!cashAccountOperations) {
			throw new HttpException("Account not found", HttpStatus.NOT_FOUND);
		}

		return cashAccountOperations.map(({ date, ...rest }) => ({
			...rest,
			date: date.toISOString(),
		}));
	}

	async update(
		userUuid: string,
		uuid: string,
		updateCashAccountInput: UpdateCashAccountInput,
	): Promise<Omit<CashAccount, "operations">> {
		try {
			const cashAccount = await this.prisma.cashAccount.update({
				where: {
					userUuid_uuid: {
						userUuid,
						uuid,
					},
				},
				data: updateCashAccountInput,
			});

			return cashAccount;
		} catch {
			throw new HttpException("Account not found", HttpStatus.NOT_FOUND);
		}
	}

	async delete(userUuid: string, uuid: string): Promise<CashAccountDelete> {
		await this.prisma.cashAccountOperation.deleteMany({
			where: {
				cashAccountUuid: uuid,
			},
		});

		await this.prisma.cashAccount
			.delete({
				where: {
					userUuid_uuid: {
						userUuid,
						uuid,
					},
				},
			})
			.catch(() => {
				throw new HttpException("Account not found", HttpStatus.NOT_FOUND);
			});

		return {
			success: true,
		};
	}

	async cashAccountAddFundsInput(
		userUuid: string,
		cashAccountAddFundsInput: CashAccountAddFundsInput,
	): Promise<Omit<CashAccount, "operations">> {
		const { uuid, amount } = cashAccountAddFundsInput;

		try {
			const cashAccount = await this.prisma.cashAccount.update({
				where: {
					userUuid_uuid: {
						userUuid,
						uuid,
					},
				},
				data: {
					balance: {
						increment: amount,
					},
				},
			});

			await this.prisma.cashAccountOperation.create({
				data: {
					cashAccountUuid: uuid,
					amount,
					type: CashAccountOperationType.deposit,
				},
			});

			return cashAccount;
		} catch {
			throw new HttpException("Account not found", HttpStatus.NOT_FOUND);
		}
	}
}
