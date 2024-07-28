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

		if (!user.cashAccounts.some(cashAccount => cashAccount.uuid === cashAccountUuid)) {
			throw new HttpException("Account not found", HttpStatus.NOT_FOUND);
		}

		if (!user.portfolios.some(portfolio => portfolio.uuid === portfolioUuid)) {
			throw new HttpException("Portfolio not found", HttpStatus.NOT_FOUND);
		}

		const instrumentExists = await this.instruments.instrumentExists(symbol);

		if (!instrumentExists) {
			throw new Error("Instrument does not exist");
		}

		await this.addTransaction(data, symbol);

		await this.addCashAccountTransaction(data);

		return {
			success: true,
		};
	}

	private async addTransaction(data: TransactionCreateInput, symbol: string) {
		let instrument = await this.instruments.instrumentDB(symbol);

		if (!instrument) {
			instrument = await this.instruments.instrumentCreate({
				symbol: data.instrument.symbol,
				name: data.instrument.name,
				type: data.instrument.type,
				currency: data.instrument.currency,
			});
		}

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
				// currency calculate
				amount: data.price * data.quantity + data.commission,
				type: "transfer",
				portfolioUuid: data.portfolioUuid,
			},
		});
	}
}
