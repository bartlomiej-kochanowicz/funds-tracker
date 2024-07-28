import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { catchError, firstValueFrom, of } from "rxjs";
import { ConfigService } from "@nestjs/config";
import { InstrumentHistoryInput, SearchInstrumentInput } from "./inputs";
import { InstrumentHistory, SearchInstrument } from "./entities";
import { MarketDataSearchResponse } from "@src/types/market";
import { PrismaService } from "@services/prisma/prisma.service";
import { InstrumentCreateInput } from "./inputs/instrument-create.input";
import { Instrument } from "./entities/instrument.entity";
import { MarketService } from "@services/market/market.service";

@Injectable()
export class InstrumentsService {
	constructor(
		private readonly httpService: HttpService,
		private config: ConfigService,
		private prisma: PrismaService,
		private marketService: MarketService,
	) {}

	async search(searchInstrumentInput: SearchInstrumentInput): Promise<SearchInstrument[]> {
		const { data } = await firstValueFrom(
			this.httpService
				.get("https://financialmodelingprep.com/api/v3/search", {
					params: {
						apikey: this.config.get("FINANCIAL_MODELING_API_KEY"),
						query: searchInstrumentInput.name,
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
		const data = await this.marketService.getMarketInstrumentHistory(instrumentHistoryInput);

		return data;
	}

	async instrumentExists(symbol: string): Promise<boolean> {
		const data = await firstValueFrom(
			this.httpService
				.get(`https://eodhistoricaldata.com/api/eod/${symbol}`, {
					params: {
						api_token: this.config.get("EODHD_API_KEY"),
						fmt: "json",
						period: "1d",
						from: new Date().toISOString().split("T")[0],
						to: new Date().toISOString().split("T")[0],
					},
				})
				.pipe(
					catchError(() => {
						return of(false);
					}),
				),
		);

		return Boolean(data);
	}

	async instrumentDB(symbol: string): Promise<Instrument> {
		const instrument = await this.prisma.instrument.findUnique({
			where: {
				symbol,
			},
		});

		return instrument;
	}

	async instrumentCreate(data: InstrumentCreateInput): Promise<Instrument> {
		const instrument = await this.prisma.instrument.create({
			data: {
				symbol: data.symbol,
				name: data.name,
				type: data.type,
				currency: data.currency,
			},
		});

		return instrument;
	}

	async getInstrument(symbol: string) {
		const { data } = await firstValueFrom(
			this.httpService
				.get<MarketDataSearchResponse>(`https://eodhistoricaldata.com/api/search/${symbol}`, {
					params: {
						api_token: this.config.get("EODHD_API_KEY"),
						fmt: "json",
					},
				})
				.pipe(
					catchError(() => {
						return of(null);
					}),
				),
		);

		const instrument = data.find(({ symbol: dataSymbol }) => dataSymbol === symbol);

		return instrument || null;
	}
}
