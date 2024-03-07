import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { ConfigService } from "@nestjs/config";
import { catchError, firstValueFrom, of } from "rxjs";
import { PrismaService } from "@services/prisma/prisma.service";
import { EodHistoricalDataSearchResponse } from "@src/types/eodhistoricaldata-search";
import { CreateTransactionInput } from "./inputs/createTransaction.input";

@Injectable()
export class TransactionsService {
	constructor(
		private readonly httpService: HttpService,
		private config: ConfigService,
		private prisma: PrismaService,
	) {}

	async createTransaction(userUuid: string, data: CreateTransactionInput) {
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

		const instrumentExists = await this.checkIfInstrumentExists(code, exchange);

		if (!instrumentExists) {
			throw new Error("Instrument does not exist");
		}

		const codeExchange = this.generateInstrumentCodeExchange(code, exchange);

		await this.addOperationToPortfolio(data, codeExchange);

		await this.addOparationToCashAccount(data);

		return {
			success: true,
		};
	}

	private async addOperationToPortfolio(data: CreateTransactionInput, codeExchange: string) {
		await this.prisma.transaction.create({
			data: {
				portfolio: {
					connect: {
						uuid: data.portfolioUuid,
					},
				},
				codeExchange,
				price: data.price,
				quantity: data.quantity,
				date: new Date(data.date),
				type: "buy",
			},
		});
	}

	private async addOparationToCashAccount(data: CreateTransactionInput) {
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

	private generateInstrumentCodeExchange(code: string, exchange: string) {
		return `${code.toUpperCase()}.${exchange.toUpperCase()}`;
	}

	private async getInstrument(code: string, exchange: string) {
		const { data } = await firstValueFrom(
			this.httpService
				.get<EodHistoricalDataSearchResponse>(
					`https://eodhistoricaldata.com/api/search/${code}.${exchange}`,
					{
						params: {
							api_token: this.config.get("EODHD_API_KEY"),
							fmt: "json",
						},
					},
				)
				.pipe(
					catchError(() => {
						return of(null);
					}),
				),
		);

		const [CODE, EXCHANGE] = [code.toUpperCase(), exchange.toUpperCase()];

		const instrument = data.find(({ Code, Exchange }) => Code === CODE && Exchange === EXCHANGE);

		return instrument || null;
	}

	private async checkIfInstrumentExists(code: string, exchange: string) {
		const data = await firstValueFrom(
			this.httpService
				.get(
					`https://eodhistoricaldata.com/api/eod/${code.toUpperCase()}.${exchange.toUpperCase()}`,
					{
						params: {
							api_token: this.config.get("EODHD_API_KEY"),
							fmt: "json",
							period: "1d",
							from: new Date().toISOString().split("T")[0],
							to: new Date().toISOString().split("T")[0],
						},
					},
				)
				.pipe(
					catchError(() => {
						return of(false);
					}),
				),
		);

		return Boolean(data);
	}
}
