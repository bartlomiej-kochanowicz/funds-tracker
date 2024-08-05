import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { catchError, firstValueFrom, of } from "rxjs";
import { GetInstrumentSearchResponse, GetInstrumentHistoryResponse } from "@src/types/market";
import { formatDate } from "@src/utils/format-date";
import { isBefore } from "date-fns";

@Injectable()
export class MarketService {
	constructor(
		private readonly httpService: HttpService,
		private config: ConfigService,
	) {}

	async getMarketInstrumentSearch(query: string): Promise<GetInstrumentSearchResponse> {
		const { data } = await firstValueFrom(
			this.httpService
				.get<GetInstrumentSearchResponse>("https://financialmodelingprep.com/api/v3/search", {
					params: {
						apikey: this.config.get("FINANCIAL_MODELING_API_KEY"),
						query,
					},
				})
				.pipe(
					catchError(e => {
						console.error(e);

						throw Error("Error fetching search instruments.");
					}),
				),
		);

		return data;
	}

	async getInstrumentBaseInfo(symbol: string): Promise<GetInstrumentSearchResponse[number] | null> {
		const { data } = await firstValueFrom(
			this.httpService
				.get<GetInstrumentSearchResponse>(
					`https://financialmodelingprep.com/api/v3/search/${symbol.toUpperCase()}`,
					{
						params: {
							apikey: this.config.get("FINANCIAL_MODELING_API_KEY"),
						},
					},
				)
				.pipe(
					catchError(() => {
						return of(null);
					}),
				),
		);

		return (
			data?.find(
				({ symbol: currentSymbol }) => currentSymbol.toUpperCase() === currentSymbol.toUpperCase(),
			) || null
		);
	}

	async getMarketInstrumentHistory({
		symbol,
		from,
		to = new Date(),
	}: {
		symbol: string;
		from: Date;
		to?: Date;
		period?: "1d" | "1w" | "1m";
	}): Promise<GetInstrumentHistoryResponse["historical"]> {
		if (isBefore(to, from)) {
			throw new Error('"from" date must be before "to" date');
		}

		const { data } = await firstValueFrom(
			this.httpService
				.get<GetInstrumentHistoryResponse>(
					`https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}`,
					{
						params: {
							apikey: this.config.get("FINANCIAL_MODELING_API_KEY"),
							from: formatDate(from),
							to: formatDate(to),
						},
					},
				)
				.pipe(
					catchError(e => {
						console.error(e);

						throw Error("Error fetching market instrument history");
					}),
				),
		);

		return data.historical;
	}
}
