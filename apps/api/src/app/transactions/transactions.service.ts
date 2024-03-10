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

		const { code, exchange } = instrument;

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

		const instrumentExists = await this.instruments.instrumentExists(code, exchange);

		if (!instrumentExists) {
			throw new Error("Instrument does not exist");
		}

		const codeExchange = this.instruments.generateInstrumentCodeExchange(code, exchange);

		await this.addTransaction(data, codeExchange);

		await this.addCashAccountTransaction(data);

		return {
			success: true,
		};
	}

	private async addTransaction(data: TransactionCreateInput, codeExchange: string) {
		let instrument = await this.instruments.instrumentDB(codeExchange);

		if (!instrument) {
			instrument = await this.instruments.instrumentCreate({
				code: data.instrument.code,
				exchange: data.instrument.exchange,
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
				amount: data.price * data.quantity + data.comission,
				type: "transfer",
				portfolioUuid: data.portfolioUuid,
			},
		});
	}
}
