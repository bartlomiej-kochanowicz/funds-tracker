import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { formatDate } from "@src/utils/format-date";
import { isBefore } from "date-fns";
import { catchError, firstValueFrom } from "rxjs";

@Injectable()
export class MarketService {
	constructor(
		private readonly httpService: HttpService,
		private config: ConfigService,
	) {}

	async getMarketInstrumentHistory({
		code,
		exchange,
		from,
		to = new Date(),
		period = "1d",
	}: {
		code: string;
		exchange: string;
		from: Date;
		to?: Date;
		period?: "1d" | "1w" | "1m";
	}) {
		if (isBefore(to, from)) {
			throw new Error('"from" date must be before "to" date');
		}

		const { data } = await firstValueFrom(
			this.httpService
				.get<
					{
						date: string;
						open: number;
						high: number;
						low: number;
						close: number;
						adjusted_close: number;
						volume: number;
					}[]
				>(`https://eodhistoricaldata.com/api/eod/${code}.${exchange}`, {
					params: {
						api_token: this.config.get("EODHD_API_KEY"),
						fmt: "json",
						period,
						from: formatDate(from),
						to: formatDate(to),
					},
				})
				.pipe(
					catchError(e => {
						console.error(e);

						throw Error("Error fetching market instrument history");
					}),
				),
		);

		return data;
	}
}
