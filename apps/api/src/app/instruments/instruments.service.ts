import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { catchError, firstValueFrom, of } from "rxjs";
import { ConfigService } from "@nestjs/config";
import { InstrumentType } from "@prisma/client";
import { InstrumentHistoryInput, SearchInstrumentInput } from "./inputs";
import { InstrumentHistory, SearchInstrument } from "./entities";
import { EodHistoricalDataSearchResponse } from "@src/types/eodhistoricaldata-search";
import { PrismaService } from "@src/services/prisma/prisma.service";
import { InstrumentCreateInput } from "./inputs/instrument-create.input";
import { Instrument } from "./entities/instrument.entity";

@Injectable()
export class InstrumentsService {
	constructor(
		private readonly httpService: HttpService,
		private config: ConfigService,
		private prisma: PrismaService,
	) {}

	async search(searchInstrumentInput: SearchInstrumentInput): Promise<SearchInstrument[]> {
		const type = this.getType(searchInstrumentInput.type);

		const { data } = await firstValueFrom(
			this.httpService
				.get(`https://eodhistoricaldata.com/api/search/${searchInstrumentInput.name}`, {
					params: {
						api_token: this.config.get("EODHD_API_KEY"),
						type,
						bonds_only: type === "bond" ? 1 : 0,
						fmt: "json",
					},
				})
				.pipe(
					catchError(e => {
						console.error(e);

						throw Error("Error fetching instruments");
					}),
				),
		);

		return data;
	}

	async findHistory(instrumentHistoryInput: InstrumentHistoryInput): Promise<InstrumentHistory[]> {
		const { code, exchange, from, to = new Date(), period = "1d" } = instrumentHistoryInput;

		const { data } = await firstValueFrom(
			this.httpService
				.get(`https://eodhistoricaldata.com/api/eod/${code}.${exchange}`, {
					params: {
						api_token: this.config.get("EODHD_API_KEY"),
						fmt: "json",
						period,
						from: new Date(from).toISOString().split("T")[0],
						to: new Date(to).toISOString().split("T")[0],
					},
				})
				.pipe(
					catchError(e => {
						console.error(e);

						throw Error("Error fetching instrument history");
					}),
				),
		);

		return data;
	}

	async instrumentExists(code: string, exchange: string): Promise<boolean> {
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

	async instrumentDB(codeExchange: string): Promise<Instrument> {
		const instrument = await this.prisma.instrument.findUnique({
			where: {
				codeExchange,
			},
		});

		return instrument;
	}

	async instrumentCreate(data: InstrumentCreateInput): Promise<Instrument> {
		const instrument = await this.prisma.instrument.create({
			data: {
				codeExchange: this.generateInstrumentCodeExchange(data.code, data.exchange),
				name: data.name,
				type: data.type,
				currency: data.currency,
			},
		});

		return instrument;
	}

	getType(type: SearchInstrumentInput["type"]): string {
		switch (type) {
			case InstrumentType.stocks:
				return "stock";
			case InstrumentType.bonds:
				return "bond";
			case InstrumentType.etfs:
				return "etf";
			case InstrumentType.crypto:
				return "crypto";
			default:
				return "all";
		}
	}

	async getInstrument(code: string, exchange: string) {
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

	generateInstrumentCodeExchange(code: string, exchange: string) {
		return `${code.toUpperCase()}.${exchange.toUpperCase()}`;
	}
}
