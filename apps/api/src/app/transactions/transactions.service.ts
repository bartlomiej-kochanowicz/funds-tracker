import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "@services/prisma/prisma.service";
import { TransactionCreateInput } from "./inputs/transaction-create.input";
import { InstrumentsService } from "@app/instruments/instruments.service";

@Injectable()
export class TransactionsService {
	constructor(
		private prisma: PrismaService,
		private instruments: InstrumentsService,
	) {}

	async transactionCreate(userUuid: string, data: TransactionCreateInput) {
		const { instrument, portfolioUuid, cashAccountUuid } = data;

		const { symbol } = instrument;

		const user = await this.prisma.user.findUnique({
			where: { uuid: userUuid },
			include: { portfolios: true, cashAccounts: true },
		});

		const cashAccount = await user.cashAccounts.find(
			cashAccount => cashAccount.uuid === cashAccountUuid,
		);

		if (!cashAccount) {
			throw new HttpException("api.account_not_found", HttpStatus.NOT_FOUND);
		}

		if (!user.portfolios.some(portfolio => portfolio.uuid === portfolioUuid)) {
			throw new HttpException("api.portfolio_not_found", HttpStatus.NOT_FOUND);
		}

		if (cashAccount.balance < data.price * data.quantity + data.commission) {
			throw new HttpException("api.insufficient_funds", HttpStatus.BAD_REQUEST);
		}

		await this.addTransaction(data, symbol);

		await this.addCashAccountTransaction(data);

		return {
			success: true,
		};
	}

	private async addTransaction(data: TransactionCreateInput, symbol: string) {
		const instrument = await this.instruments.getOrCreateInstrumentInDB(symbol);

		await this.prisma.transaction.create({
			data: {
				portfolio: {
					connect: {
						uuid: data.portfolioUuid,
					},
				},
				price: data.price,
				quantity: data.quantity,
				date: new Date(data.date).toISOString(),
				commission: data.commission,
				type: "buy",
				instrument: {
					connect: {
						uuid: instrument.uuid,
					},
				},
			},
		});
	}

	private async addCashAccountTransaction(data: TransactionCreateInput) {
		await this.prisma.cashAccountOperation.create({
			data: {
				cashAccountUuid: data.cashAccountUuid,
				// TODO: currency calculate
				amount: data.price * data.quantity + data.commission,
				type: "transfer",
				portfolioUuid: data.portfolioUuid,
			},
		});
	}
}
