import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { ConfigService } from "@nestjs/config";
import { catchError, firstValueFrom, of } from "rxjs";
import { PrismaService } from "@app/prisma/prisma.service";
import { Instrument } from "@app/common/inputs/Instrument.input";
import { EodHistoricalDataSearchResponse } from "@app/common/types/eodhistoricaldata-search";
import { InvestInNewInstrumentInput } from "./inputs/InvestInNewInstrument.input";

@Injectable()
export class InvestService {
	constructor(
		private readonly httpService: HttpService,
		private config: ConfigService,
		private prisma: PrismaService,
	) {}

	async investInNewInstrumentInput(userUuid: string, data: InvestInNewInstrumentInput) {
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

		const isInstrumentAlreadyAdded = await this.prisma.instrument.findFirst({
			where: {
				codeExchange: this.generateInstrumentCodeExchange(code, exchange),
			},
		});

		if (!isInstrumentAlreadyAdded) {
			const { codeExchange } = await this.addInstrumentToDatabase(instrument);

			await this.addOperationToPortfolio(data, codeExchange);

			await this.addOparationToCashAccount(data);

			return {
				success: true,
			};
		}

		const { codeExchange } = isInstrumentAlreadyAdded;

		await this.addOperationToPortfolio(data, codeExchange);

		await this.addOparationToCashAccount(data);

		return {
			success: true,
		};
	}

	private async addOperationToPortfolio(data: InvestInNewInstrumentInput, codeExchange: string) {
		await this.prisma.portfolioOperation.create({
			data: {
				portfolio: {
					connect: {
						uuid: data.portfolioUuid,
					},
				},
				instrument: {
					connect: {
						codeExchange,
					},
				},
				price: data.price,
				quantity: data.quantity,
				date: new Date(data.date),
				type: "buy",
			},
		});
	}

	private async addOparationToCashAccount(data: InvestInNewInstrumentInput) {
		await this.prisma.cashAccountOperation.create({
			data: {
				cashAccountUuid: data.cashAccountUuid,
				// currency calculate
				amount: data.price * data.quantity + data.comission,
				type: "transfer",
				destinationUuid: data.portfolioUuid,
			},
		});
	}

	private generateInstrumentCodeExchange(code: string, exchange: string) {
		return `${code.toUpperCase()}.${exchange.toUpperCase()}`;
	}

	private async addInstrumentToDatabase(instrument: Instrument) {
		const { code, exchange, type } = instrument;

		const { Name, Currency, Country, ISIN } = await this.getInstrument(code, exchange);

		return await this.prisma.instrument.create({
			data: {
				codeExchange: this.generateInstrumentCodeExchange(code, exchange),
				name: Name,
				type,
				code,
				exchange,
				currency: Currency,
				country: Country,
				ISIN,
			},
		});
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
